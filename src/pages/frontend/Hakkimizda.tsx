import { useDocumentTitle } from "../../hooks/useDocumentTitle"
import { MediaRenderer } from "../../components/MediaRenderer"
import { motion } from "framer-motion"
import { Camera, Film, MonitorPlay } from "lucide-react"
import { Navbar } from "../../components/Navbar"
import { Footer } from "../../components/Footer"
import { useCms } from "../../context/CmsContext"

export default function Hakkimizda() {
  useDocumentTitle("Hakkımızda")

  const { data } = useCms()
  const partners =
    data.aboutPage?.brands?.map((b, i) => ({ ...b, id: i })) || []

  const icons = [MonitorPlay, Camera, Film]
  const values = data.about.values.map((val, idx) => ({
    title: val.title,
    desc: val.desc,
    icon: icons[idx % icons.length],
  }))

  return (
    <div className="bg-cef-black min-h-screen text-cef-cream selection:bg-cef-orange selection:text-white pb-24">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-52 pb-20 px-8 md:px-16 lg:px-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-cef-black via-cef-black/80 to-transparent z-10" />
          <MediaRenderer
            src={
              data.aboutPage?.heroBg ||
              "https://images.unsplash.com/photo-1576280314550-773c50583407?auto=format&fit=crop&q=80&w=1920"
            }
            alt="Cinematic Behind the Scenes"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
        </div>

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
              <span className="text-cef-orange font-medium">HAKKIMIZDA</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">
              Hakkımızda<span className="text-cef-orange">.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Vision / Intro Section */}
      <section className="px-8 md:px-16 lg:px-32 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-block">
              <span className="text-[10px] tracking-[0.25em] font-medium border border-white/10 py-1.5 px-3 rounded-full text-white/70 uppercase">
                {data.aboutPage?.modernDesign?.subtitle}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight whitespace-pre-line">
              {data.aboutPage?.modernDesign?.title}
            </h2>
            <p className="text-lg text-cef-cream/60 leading-relaxed font-light max-w-xl mt-8">
              {data.about.mission}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cef-turquoise/20 to-transparent z-10 opacity-30 mix-blend-overlay" />
            <MediaRenderer
              src={data.aboutPage?.modernDesign?.image}
              alt="Modern Design"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-cef-black border border-white/10 flex items-center justify-center z-20">
              <div className="text-center">
                <p className="text-4xl font-light text-cef-orange mb-1">10+</p>
                <p className="text-xs tracking-widest text-white/50 uppercase">
                  Yıllık Tecrübe
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Optional Video Section */}
      {data.aboutPage?.videoUrl && (
        <section className="px-8 md:px-16 lg:px-32 pb-20 flex justify-center mt-8">
          <div className="w-full max-w-4xl aspect-video bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl">
            <video
              src={data.aboutPage.videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Trust / Reference Logos Band */}
      <section className="py-20 border-y border-white/5 overflow-hidden bg-white/[0.02]">
        <div className="flex w-fit animate-marquee">
          <div className="flex gap-24 px-12 items-center">
            {partners.concat(partners).map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="w-40 h-20 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-500"
              >
                <MediaRenderer
                  src={partner.image}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Values / Video Factory */}
      <section className="px-8 md:px-16 lg:px-32 py-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Video Fabrikası Yaklaşımı
          </h3>
          <p className="text-white/50 font-light leading-relaxed">
            Sadece içerik üretmiyoruz. İhtiyacınız olan hikayeyi, doğru zamanda,
            en yüksek standartlarda ve mükemmel bir akışla kurguluyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl mb-32">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative flex flex-col items-center text-center p-12 border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500 rounded-full aspect-square justify-center"
            >
              <div className="absolute top-8 text-cef-turquoise/30 group-hover:text-cef-turquoise/80 transition-colors duration-500">
                <val.icon size={32} strokeWidth={1} />
              </div>
              <h4 className="text-xl tracking-wider font-medium mt-4 mb-3 group-hover:text-cef-orange transition-colors duration-300">
                {val.title}
              </h4>
              <p className="text-sm text-white/40 leading-relaxed max-w-[200px]">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Yaratıcı Yaklaşım - Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full mt-8 lg:mt-0">
              {/* Asymmetric offset frame */}
              <div className="absolute inset-0 border border-white/10 translate-x-4 -translate-y-4" />
              <MediaRenderer
                src={data.aboutPage?.creativeApproach?.image}
                alt="Creative Approach"
                className="w-full h-full object-cover transition-all duration-700 relative z-10"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cef-orange flex items-center justify-center rounded-full z-20">
                <span className="text-white text-xs uppercase tracking-widest rotate-[-15deg] font-medium">
                  Creative
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-block mb-8">
              <span className="text-[10px] tracking-[0.25em] font-medium border border-white/10 py-1.5 px-3 rounded-full text-cef-turquoise">
                YARATICI YAKLAŞIM
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8 whitespace-pre-line">
              {data.aboutPage?.creativeApproach?.title}
            </h2>

            <div className="space-y-6 text-lg text-cef-cream/60 leading-relaxed font-light whitespace-pre-line">
              <p>{data.aboutPage?.creativeApproach?.desc}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Adding a global marquee animation in a style tag for simplicity */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
