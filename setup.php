<?php
// setup.php - Veritabanı kurulum betiği

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
    echo "Veritabanına bağlanıldı!\n";

    // 1. Admins Tablosunu Oluştur
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");
    echo "admins tablosu kontrol edildi/oluşturuldu.\n";

    // Admin kullanıcısını ekle (eğer yoksa)
    $stmt = $pdo->prepare("SELECT id FROM admins WHERE username = 'admin'");
    $stmt->execute();
    if (!$stmt->fetch()) {
        $password = '4524542';
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $insertAdmin = $pdo->prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?)");
        $insertAdmin->execute(['admin', $hash]);
        echo "Varsayılan admin eklendi (admin / 4524542).\n";
    }

    // 2. CMS Data Tablosunu Oluştur
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS cms_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            setting_key VARCHAR(50) NOT NULL UNIQUE,
            setting_value LONGTEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ");
    echo "cms_data tablosu kontrol edildi/oluşturuldu.\n";

    echo "\nKurulum başarıyla tamamlandı!\n";

} catch (\PDOException $e) {
    echo "Veritabanı Hatası: " . $e->getMessage() . "\n";
    exit;
}
?>
