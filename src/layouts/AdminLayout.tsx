import { useEffect } from "react"
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom"
import {
  Settings,
  Home,
  Building2,
  Image as ImageIcon,
  Users,
  HelpCircle,
  Briefcase,
  LogOut,
  ChevronDown,
} from "lucide-react"

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") !== "true") {
      navigate("/admin/login")
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin")
    navigate("/")
  }

  const menuItems = [
    {
      path: "/admin/settings",
      label: "Profil / Genel Ayarlar",
      icon: <Settings size={18} />,
    },
    {
      path: "/admin/home",
      label: "Anasayfa Yönetimi",
      icon: <Home size={18} />,
    },
  ]

  const corporateItems = [
    {
      path: "/admin/about",
      label: "Hakkımızda",
      icon: <Building2 size={16} />,
    },
    {
      path: "/admin/services",
      label: "Hizmetler",
      icon: <Briefcase size={16} />,
    },
    { path: "/admin/team", label: "Ekibimiz", icon: <Users size={16} /> },
    { path: "/admin/faq", label: "SSS", icon: <HelpCircle size={16} /> },
  ]

  const isCorporateActive =
    location.pathname.includes("/admin/about") ||
    location.pathname.includes("/admin/services") ||
    location.pathname.includes("/admin/team") ||
    location.pathname.includes("/admin/faq")

  return (
    <div className="bg-cef-black min-h-screen text-cef-cream flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-white/[0.02] backdrop-blur-xl flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8 border-b border-white/5">
          <h1
            className="text-xl font-light tracking-wide cursor-pointer hover:text-white transition-colors"
            onClick={() => navigate("/")}
          >
            Cef Medya <span className="text-cef-orange font-medium">Panel</span>
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-cef-orange/10 text-cef-orange font-medium"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          {/* Kurumsal Dropdown Group */}
          <div className="pt-2 pb-2">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 ${
                isCorporateActive
                  ? "text-cef-turquoise font-medium"
                  : "text-white/50"
              }`}
            >
              <Building2 size={18} />
              Kurumsal
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform ${
                  isCorporateActive ? "rotate-180 text-cef-turquoise" : ""
                }`}
              />
            </div>
            <div className="pl-6 space-y-1 border-l border-white/10 ml-6">
              {corporateItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-cef-turquoise/10 text-cef-turquoise font-medium"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink
            to="/admin/portfolio"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-cef-orange/10 text-cef-orange font-medium"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <ImageIcon size={18} />
            Portfolyo Yönetimi
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all duration-300"
          >
            <LogOut size={18} />
            Güvenli Çıkış
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden relative h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
