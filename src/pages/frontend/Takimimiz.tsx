import { useDocumentTitle } from "../../hooks/useDocumentTitle"
import { MediaRenderer } from "../../components/MediaRenderer"
import { motion } from "framer-motion"
import { Navbar } from "../../components/Navbar"
import { Footer } from "../../components/Footer"
import { useCms } from "../../context/CmsContext"

export default function Takimimiz() {
  useDocumentTitle("Ekibimiz")

  const { data } = useCms()
  const team = data.team

  return (
    <div className="bg-cef-black min-h-screen text-cef-cream selection:bg-cef-orange selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-52 pb-20 px-8 md:px-16 lg:px-32 overflow-hidden border-b border-white/5">
        {data.teamPage?.heroBg && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-cef-black via-cef-black/80 to-cef-black/40 z-10" />
            <MediaRenderer
              src={data.teamPage.heroBg}
              alt="Team Background"
              className="w-full h-full object-cover opacity-50 scale-105"
            />
          </div>
        )}
        <div className="relative z-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <div className="text-xs tracking-[0.3em] text-cef-cream/50 uppercase mb-6">
              <span className="hover:text-white cursor-pointer transition-colors">
                ANA SAYFA
              </span>
              <span className="mx-2">/</span>
              <span className="text-cef-orange font-medium">EKİBİMİZ</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">
              Ekibimiz<span className="text-cef-orange">.</span>
            </h1>

            <div className="inline-block mb-4">
              <span className="text-[10px] tracking-[0.25em] font-medium border border-white/10 py-1.5 px-3 rounded-full text-white/70 uppercase">
                {data.teamPage?.intro?.subtitle}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 whitespace-pre-line">
              {data.teamPage?.intro?.title}
            </h2>

            <p className="text-lg text-cef-cream/60 leading-relaxed font-light max-w-2xl whitespace-pre-line">
              {data.teamPage?.intro?.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="px-8 md:px-16 lg:px-32 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-default"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-black w-[85%] mx-auto">
                <div className="absolute inset-0 bg-cef-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                <MediaRenderer
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Decorative corner accents on hover */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cef-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 m-4" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cef-turquoise opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 m-4" />
              </div>

              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-medium tracking-wide mb-1 group-hover:text-white transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-cef-orange font-light tracking-widest uppercase">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
