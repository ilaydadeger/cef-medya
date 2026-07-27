import { useDocumentTitle } from "../../hooks/useDocumentTitle"
import { motion } from "framer-motion"
import {
  MapPin,
  Mail,
  Phone,
  Send,
  User,
  AtSign,
  MessageSquare,
  Briefcase,
} from "lucide-react"

const InstagramIcon = ({ size = 20, strokeWidth = 1.5, ...props }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const LinkedinIcon = ({ size = 20, strokeWidth = 1.5, ...props }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

import { Navbar } from "../../components/Navbar"
import { Footer } from "../../components/Footer"
import { useCms } from "../../context/CmsContext"
import React, { useState } from "react"

export default function Iletisim() {
  useDocumentTitle("İletişim")

  const { data } = useCms()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [privacy, setPrivacy] = useState(false)
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      setStatus("error")
      setErrorMessage("Lütfen tüm alanları doldurunuz.")
      return
    }
    if (!privacy) {
      setStatus("error")
      setErrorMessage(
        "Devam etmek için gizlilik sözleşmesini onaylamanız gerekmektedir.",
      )
      return
    }

    setStatus("loading")

    try {
      const fullMessage = `Telefon: ${formData.phone}\nKonu: ${formData.subject}\n\nMesaj:\n${formData.message}`

      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api.php"
      const response = await fetch(`${apiUrl}?action=send_contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: fullMessage,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
        setPrivacy(false)
      } else {
        setStatus("error")
        setErrorMessage(
          result.message ||
            "Bir hata oluştu, lütfen daha sonra tekrar deneyiniz.",
        )
      }
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        "Sunucuya ulaşılamıyor, lütfen daha sonra tekrar deneyiniz.",
      )
    }
  }
  return (
    <div className="bg-cef-black min-h-screen text-cef-cream selection:bg-cef-orange selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-52 pb-20 px-8 md:px-16 lg:px-32 border-b border-white/5 relative overflow-hidden">
        <div className="relative z-20 max-w-4xl">
          <div className="text-xs tracking-[0.3em] text-cef-cream/50 uppercase mb-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              ANA SAYFA
            </span>
            <span className="mx-2">/</span>
            <span className="text-cef-orange font-medium">İLETİŞİM</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">
            İletişim<span className="text-cef-orange">.</span>
          </h1>
        </div>
      </section>

      {/* Main Content Area: Two Column Editorial Layout */}
      <section className="px-8 md:px-16 lg:px-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-12"
          >
            <div>
              <h2 className="text-3xl font-light mb-8 pb-4 border-b border-white/10">
                İletişim Adreslerimiz
              </h2>

              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <div className="mt-1 text-cef-turquoise">
                    <MapPin strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-white/50 mb-2">
                      Adres
                    </h3>
                    <p className="font-light leading-relaxed text-lg">
                      {data.general.contact.address
                        .split(",")
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index !==
                              data.general.contact.address.split(",").length -
                                1 && <br />}
                          </React.Fragment>
                        ))}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 text-cef-orange">
                    <Mail strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-white/50 mb-2">
                      E-Posta
                    </h3>
                    <a
                      href={`mailto:${data.general.contact.email}`}
                      className="font-light text-lg hover:text-cef-orange transition-colors"
                    >
                      {data.general.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 text-white/50">
                    <Phone strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-white/50 mb-2">
                      Telefon
                    </h3>
                    <a
                      href={`tel:${data.general.contact.phone.replace(/[^0-9]/g, "")}`}
                      className="font-light text-lg hover:text-white transition-colors"
                    >
                      {data.general.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/50 mb-6">
                Bizi Takip Edin
              </h3>
              <div className="flex gap-4">
                <a
                  href={data.general.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-cef-orange transition-all duration-300"
                >
                  <InstagramIcon size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Decorative blurs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cef-orange/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cef-turquoise/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10">
                <p className="text-xl font-light text-white/80 mb-10 leading-relaxed italic border-l-2 border-cef-orange pl-6">
                  "İletişim, başarıya giden yolda ilk adımdır.{" "}
                  <br className="hidden md:block" />
                  Haydi, birlikte harika şeyler yapalım!"
                </p>

                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="relative group">
                      <div className="absolute left-0 top-3 text-white/30 group-focus-within:text-cef-turquoise transition-colors">
                        <User size={18} strokeWidth={1.5} />
                      </div>
                      <input
                        type="text"
                        placeholder="İsim Soyisim *"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          setStatus("idle")
                        }}
                        className="w-full bg-transparent border-b border-white/10 py-3 pl-8 pr-4 text-white font-light focus:outline-none focus:border-cef-turquoise transition-colors placeholder:text-white/20"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative group">
                      <div className="absolute left-0 top-3 text-white/30 group-focus-within:text-cef-orange transition-colors">
                        <AtSign size={18} strokeWidth={1.5} />
                      </div>
                      <input
                        type="email"
                        placeholder="E-Posta Adresi *"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value })
                          setStatus("idle")
                        }}
                        className="w-full bg-transparent border-b border-white/10 py-3 pl-8 pr-4 text-white font-light focus:outline-none focus:border-cef-orange transition-colors placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phone */}
                    <div className="relative group">
                      <div className="absolute left-0 top-3 text-white/30 group-focus-within:text-white/70 transition-colors">
                        <Phone size={18} strokeWidth={1.5} />
                      </div>
                      <input
                        type="tel"
                        placeholder="Telefon Numarası *"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value })
                          setStatus("idle")
                        }}
                        className="w-full bg-transparent border-b border-white/10 py-3 pl-8 pr-4 text-white font-light focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20"
                      />
                    </div>

                    {/* Subject */}
                    <div className="relative group">
                      <div className="absolute left-0 top-3 text-white/30 group-focus-within:text-white/70 transition-colors">
                        <Briefcase size={18} strokeWidth={1.5} />
                      </div>
                      <input
                        type="text"
                        placeholder="Konu *"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value })
                          setStatus("idle")
                        }}
                        className="w-full bg-transparent border-b border-white/10 py-3 pl-8 pr-4 text-white font-light focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative group mt-4">
                    <div className="absolute left-0 top-3 text-white/30 group-focus-within:text-white/70 transition-colors">
                      <MessageSquare size={18} strokeWidth={1.5} />
                    </div>
                    <textarea
                      rows={4}
                      placeholder="İletişim, başarıya giden yolda ilk adımdır... *"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value })
                        setStatus("idle")
                      }}
                      className="w-full bg-transparent border-b border-white/10 py-3 pl-8 pr-4 text-white font-light focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20 resize-none"
                    ></textarea>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-4 mt-2">
                    <div className="relative flex items-center justify-center mt-1">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={privacy}
                        onChange={(e) => {
                          setPrivacy(e.target.checked)
                          setStatus("idle")
                        }}
                        className="peer appearance-none w-5 h-5 border border-white/20 bg-transparent checked:bg-cef-orange checked:border-cef-orange transition-all cursor-pointer rounded-sm"
                      />
                      <svg
                        className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <label
                      htmlFor="privacy"
                      className="text-sm font-light text-white/50 cursor-pointer select-none leading-relaxed"
                    >
                      Verilerimin toplanmasına ve saklanmasını onaylıyorum. *
                    </label>
                  </div>

                  {/* Status Messages */}
                  {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                      {errorMessage}
                    </div>
                  )}
                  {status === "success" && (
                    <div className="p-4 bg-cef-turquoise/10 border border-cef-turquoise/20 text-cef-turquoise text-sm rounded-lg">
                      Mesajınız başarıyla iletildi. En kısa sürede size geri
                      dönüş yapacağız.
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex items-center justify-center gap-3 w-full md:w-auto self-start mt-4 bg-cef-orange text-white px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-cef-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Gönderiliyor..." : "Gönder"}
                    {status !== "loading" && (
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
