import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api.php"
      const res = await fetch(`${apiUrl}?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.success) {
        setError(false)
        sessionStorage.setItem("isAdmin", "true")
        navigate("/admin")
      } else {
        setError(true)
      }
    } catch (err) {
      console.error(err)
      setError(true)
    }
  }

  return (
    <div className="bg-cef-black min-h-screen text-cef-cream flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cef-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cef-turquoise/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-10 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-montserrat font-light tracking-tight mb-2">
              Sisteme{" "}
              <span className="text-cef-orange font-medium italic">Bağlan</span>
            </h1>
            <p className="text-cef-cream/50 text-sm tracking-widest uppercase">
              Yönetici Paneli
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              {/* Username */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-cef-turquoise transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError(false)
                  }}
                  placeholder="Kullanıcı Adı"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-light text-white placeholder-white/30 outline-none focus:border-cef-turquoise/50 focus:bg-white/[0.05] transition-all"
                  autoComplete="off"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-cef-turquoise transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(false)
                  }}
                  placeholder="Şifre"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-sm font-light text-white placeholder-white/30 outline-none focus:border-cef-turquoise/50 focus:bg-white/[0.05] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <div className="h-6 flex items-center justify-center">
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-cef-orange text-xs tracking-wider"
                >
                  Girdiğiniz bilgiler hatalı. Lütfen tekrar deneyin.
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cef-cream text-cef-black font-medium py-4 rounded-xl text-sm tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 group"
            >
              Giriş Yap
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Return Home Link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-xs text-white/30 hover:text-white/70 transition-colors tracking-widest uppercase"
            >
              &larr; Siteye Dön
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
