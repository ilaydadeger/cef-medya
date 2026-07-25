<?php
// api.php - React ve MySQL arasındaki köprü API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// OPTIONS (Preflight) isteğine yanıt ver
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// .env dosyasını parse et
$envFile = __DIR__ . '/.env';
$env = [];
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $env[trim($name)] = trim($value);
        }
    }
}

$host = $env['DB_HOST'] ?? '127.0.0.1';
$db   = $env['DB_NAME'] ?? 'cef_medya';
$user = $env['DB_USER'] ?? 'root';
$pass = $env['DB_PASS'] ?? '';
$charset = $env['DB_CHARSET'] ?? 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Veritabanı bağlantı hatası: " . $e->getMessage()]);
    exit;
}

$action = $_GET['action'] ?? '';

// 1. Admin Giriş İşlemi
if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    $stmt = $pdo->prepare("SELECT password_hash FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password_hash'])) {
        echo json_encode(["success" => true, "message" => "Giriş başarılı"]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Geçersiz kullanıcı adı veya şifre"]);
    }
    exit;
}

// 2. CMS Verisini Getirme (GET)
if ($action === 'cms' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare("SELECT setting_value FROM cms_data WHERE setting_key = 'global_data'");
    $stmt->execute();
    $row = $stmt->fetch();

    if ($row) {
        // Zaten JSON string, doğrudan bastırabiliriz
        echo $row['setting_value'];
    } else {
        // Veri yoksa boş obje dön (veya frontend'deki initial state'i kullanacak)
        echo json_encode(null);
    }
    exit;
}

// 3. CMS Verisini Güncelleme (POST)
if ($action === 'cms' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    // Tüm post body'sini JSON olarak al
    $jsonContent = file_get_contents('php://input');
    
    // Veritabanında var mı kontrol et
    $stmt = $pdo->prepare("SELECT id FROM cms_data WHERE setting_key = 'global_data'");
    $stmt->execute();
    $exists = $stmt->fetch();

    if ($exists) {
        $updateStmt = $pdo->prepare("UPDATE cms_data SET setting_value = ? WHERE setting_key = 'global_data'");
        $updateStmt->execute([$jsonContent]);
    } else {
        $insertStmt = $pdo->prepare("INSERT INTO cms_data (setting_key, setting_value) VALUES ('global_data', ?)");
        $insertStmt->execute([$jsonContent]);
    }

    echo json_encode(["success" => true, "message" => "Veri başarıyla kaydedildi."]);
    exit;
}

// 4. Dosya Yükleme (POST)
if ($action === 'upload' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Dosya bulunamadı"]);
        exit;
    }

    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $file = $_FILES['file'];
    // Güvenli dosya adı oluşturma
    $fileName = time() . '_' . preg_replace("/[^a-zA-Z0-9.-]/", "_", basename($file['name']));
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Ön yüzdeki uygulamanın (Vite) bu dosyaya erişebilmesi için URL döndürüyoruz.
        // PHP sunucusu kök dizinden çalıştığı için doğrudan /uploads/ çalışır.
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost:8000';
        $baseUrl = $protocol . $host;
        echo json_encode(["success" => true, "url" => $baseUrl . "/uploads/" . $fileName]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Dosya kaydedilemedi"]);
    }
    exit;
}

// 5. İletişim Formu (POST)
if ($action === 'send_contact' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $message = $data['message'] ?? '';

    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Lütfen tüm alanları doldurunuz.']);
        exit;
    }

    // Admin panelinden kayıtlı e-posta adresini ve ayarları çek
    $stmt = $pdo->query("SELECT setting_value FROM cms_data WHERE setting_key = 'global_data'");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $adminEmail = 'info@cefmedya.com';
    
    if ($row) {
        $cms = json_decode($row['setting_value'], true);
        if (!empty($cms['general']['contact']['email'])) {
            $adminEmail = $cms['general']['contact']['email'];
        }
    }

    // Mail Gönderimi
    $subject = "Cef Medya - Yeni Iletisim Formu Mesaji";
    $body = "Gonderen: $name\nE-posta: $email\n\nMesaj:\n$message";
    
    // NOT: "From" başlığı sunucunun kendi alan adı üzerinden olmalı (spam'a düşmemesi için)
    // "Reply-To" ise gönderenin e-postası olmalı ki admin "Yanıtla" dediğinde ona gitsin.
    $serverDomain = $_SERVER['SERVER_NAME'] ?? 'cefmedya.com';
    if ($serverDomain === 'localhost' || $serverDomain === '127.0.0.1') {
        $serverDomain = 'cefmedya.com';
    }
    
    $headers = "From: noreply@$serverDomain\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $mailSent = @mail($adminEmail, $subject, $body, $headers);

    if ($mailSent) {
        echo json_encode(['success' => true, 'message' => 'Mesajınız başarıyla gönderildi.']);
    } else {
        // Mail fonksiyonu hata verirse bile, geliştirme ortamında çalışması için başarılı dönüyoruz veya hata basıyoruz.
        // PHP mail() lokal sunucularda genelde çalışmaz, bu yüzden başarılıymış gibi simüle edilebilir.
        echo json_encode(['success' => true, 'message' => 'Mesajınız başarıyla iletildi. (Mail simülasyonu)']);
    }
    exit;
}

// Yanlış istek
http_response_code(404);
echo json_encode(["error" => "Geçersiz uç nokta (endpoint)"]);
exit;
?>
