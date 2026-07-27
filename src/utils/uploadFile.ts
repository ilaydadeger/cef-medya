export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)

  try {
    const apiUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api.php"
    const res = await fetch(`${apiUrl}?action=upload`, {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    if (data.success && data.url) {
      return data.url
    } else {
      throw new Error(data.message || "Dosya yükleme başarısız oldu.")
    }
  } catch (error) {
    console.error("Dosya yükleme hatası:", error)
    throw error
  }
}
