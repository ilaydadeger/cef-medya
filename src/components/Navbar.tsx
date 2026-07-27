import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"

const InstagramIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Link } from "react-router-dom"
import { useCms } from "../context/CmsContext"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Navbar = () => {
  const { data } = useCms()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isKurumsalOpen, setIsKurumsalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileKurumsalOpen, setIsMobileKurumsalOpen] = useState(false)

  const logoParts = data.general.logoText.trim().split(" ")
  const firstWord = logoParts[0]
  const restWords = logoParts.slice(1).join(" ")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out border-b border-white/5",
        isScrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-xl py-2"
          : "bg-[#0A0A0A]/50 backdrop-blur-md py-3",
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {data.general.logoUrl ? (
            <img
              src={data.general.logoUrl}
              alt="Cef Medya Logo"
              className="h-16 md:h-20 object-contain"
            />
          ) : (
            <span className="text-2xl font-bold tracking-widest text-[#f4f2ee] uppercase font-montserrat flex items-center gap-2">
              <span className="text-[#e94e1b]">{firstWord}</span>
              {restWords && <span className="text-[#f4f2ee]">{restWords}</span>}
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="relative group text-[#f4f2ee] font-medium text-sm tracking-wide transition-colors hover:text-[#e94e1b]"
          >
            Ana Sayfa
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#e94e1b] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => setIsKurumsalOpen(true)}
            onMouseLeave={() => setIsKurumsalOpen(false)}
          >
            <a
              href="#"
              className="flex items-center gap-1 text-[#f4f2ee] font-medium text-sm tracking-wide transition-colors group-hover:text-[#01aca2]"
            >
              Kurumsal{" "}
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#01aca2] transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Dropdown */}
            <AnimatePresence>
              {isKurumsalOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl"
                >
                  <div className="py-2">
                    {[
                      "Hakkımızda",
                      "Hizmetlerimiz",
                      "Ekibimiz",
                      "Sıkça Sorulan Sorular",
                    ].map((item, idx) => (
                      <Link
                        key={idx}
                        to={
                          item === "Hakkımızda"
                            ? "/hakkimizda"
                            : item === "Hizmetlerimiz"
                              ? "/hizmetler"
                              : item === "Ekibimiz"
                                ? "/takimimiz"
                                : item === "Sıkça Sorulan Sorular"
                                  ? "/sss"
                                  : "/"
                        }
                        className="block px-6 py-3 text-sm text-[#f4f2ee]/80 hover:text-[#f4f2ee] hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/portfolyo"
            className="relative group text-[#f4f2ee] font-medium text-sm tracking-wide transition-colors hover:text-[#e94e1b]"
          >
            Portfolyo
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#e94e1b] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/iletisim"
            className="relative group text-[#f4f2ee] font-medium text-sm tracking-wide transition-colors hover:text-[#01aca2]"
          >
            İletişim
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#01aca2] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {data.general.socialLinks?.instagram &&
            data.general.socialLinks.instagram.trim() !== "" && (
              <a
                href={data.general.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white hover:scale-110 transition-transform shadow-[0_0_15px_rgba(233,78,27,0.3)]"
              >
                <InstagramIcon size={20} />
              </a>
            )}
        </nav>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-[#f4f2ee] p-2 relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col pt-24 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-medium text-[#f4f2ee]"
              >
                Ana Sayfa
              </Link>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setIsMobileKurumsalOpen(!isMobileKurumsalOpen)}
                  className="flex items-center justify-between text-2xl font-medium text-[#f4f2ee] w-full text-left"
                >
                  Kurumsal
                  <ChevronDown className={cn("transition-transform duration-300", isMobileKurumsalOpen ? "rotate-180" : "")} />
                </button>

                <AnimatePresence>
                  {isMobileKurumsalOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col gap-4 pl-4 overflow-hidden border-l-2 border-white/10"
                    >
                      {[
                        "Hakkımızda",
                        "Hizmetlerimiz",
                        "Ekibimiz",
                        "Sıkça Sorulan Sorular",
                      ].map((item, idx) => (
                        <Link
                          key={idx}
                          to={
                            item === "Hakkımızda" ? "/hakkimizda"
                              : item === "Hizmetlerimiz" ? "/hizmetler"
                              : item === "Ekibimiz" ? "/takimimiz"
                              : item === "Sıkça Sorulan Sorular" ? "/sss"
                              : "/"
                          }
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg text-[#f4f2ee]/70 hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/portfolyo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-medium text-[#f4f2ee]"
              >
                Portfolyo
              </Link>

              <Link
                to="/iletisim"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-medium text-[#f4f2ee]"
              >
                İletişim
              </Link>
              
              {data.general.socialLinks?.instagram &&
                data.general.socialLinks.instagram.trim() !== "" && (
                <div className="mt-8 pt-8 border-t border-white/10 flex justify-center">
                  <a
                    href={data.general.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white"
                  >
                    <InstagramIcon size={28} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
