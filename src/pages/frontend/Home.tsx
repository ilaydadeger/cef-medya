import { useDocumentTitle } from "../../hooks/useDocumentTitle"
import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Link } from "react-router-dom"
import { Navbar } from "../../components/Navbar"
import { Footer } from "../../components/Footer"
import { useCms } from "../../context/CmsContext"
import { MediaRenderer } from "../../components/MediaRenderer"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Hero Section ---
const HeroItem = ({
  title,
  bgImg,
  accent,
  initialPos,
  delay,
  panDirection,
}: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: initialPos.x, y: initialPos.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative group overflow-hidden bg-[#0A0A0A] border border-white/5 flex items-center justify-center min-h-[35vh] sm:min-h-[40vh] md:min-h-0"
    >
      <div className="absolute inset-[-15%] opacity-70 group-hover:opacity-85 transition-opacity duration-1000">
        <MediaRenderer
          src={bgImg}
          alt={title}
          className="w-full h-full object-cover"
          style={{
            animation: `heroPan-${panDirection} 9s ease-in-out infinite alternate`,
          }}
        />
      </div>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20 opacity-90",
        )}
      />

      <div className="relative z-10 text-center p-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-medium text-[#f4f2ee] tracking-widest uppercase mb-4 opacity-90 group-hover:opacity-100 transition-opacity">
          {title.split(" ").map((word: string, i: number) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.6 }}
          className={cn(
            "h-[1px] w-12 mx-auto",
            accent === "orange" ? "bg-[#e94e1b]" : "bg-[#01aca2]",
          )}
        />
      </div>

      <style>{`
        @keyframes heroPan-right { from { transform: translateX(0%)   scale(1.12); } to { transform: translateX(-12%) scale(1.18); } }
        @keyframes heroPan-left  { from { transform: translateX(0%)   scale(1.12); } to { transform: translateX(12%)  scale(1.18); } }
        @keyframes heroPan-up    { from { transform: translateY(0%)   scale(1.12); } to { transform: translateY(-12%) scale(1.18); } }
        @keyframes heroPan-down  { from { transform: translateY(0%)   scale(1.12); } to { transform: translateY(12%)  scale(1.18); } }
      `}</style>
    </motion.div>
  )
}

const Hero = () => {
  const { data } = useCms()
  return (
    <section className="relative w-full h-auto md:h-screen md:min-h-[800px] pt-[70px] md:pt-[80px] bg-[#0A0A0A] overflow-hidden">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2">
        {data.home.heroItems.map((item, idx) => {
          const panDirs = ["right", "up", "down", "left"]
          return (
            <HeroItem
              key={idx}
              title={item.title}
              bgImg={item.bgImg}
              accent={item.accent}
              initialPos={{
                x: idx % 2 === 0 ? -100 : 100,
                y: idx < 2 ? -100 : 100,
              }}
              delay={0.1 * (idx + 1)}
              panDirection={panDirs[idx]}
            />
          )
        })}
      </div>
    </section>
  )
}

// --- Services (Editorial Layout) ---
const Services = () => {
  const { data } = useCms()
  const { nelerYapiyoruz } = data.home

  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 flex flex-col items-start max-w-4xl">
          <span className="text-[#f4f2ee]/40 text-xs font-bold tracking-[0.3em] uppercase mb-8 border-b border-[#f4f2ee]/10 pb-2">
            {nelerYapiyoruz.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-montserrat font-light text-[#f4f2ee] leading-tight md:leading-tight">
            {nelerYapiyoruz.titleMain}{" "}
            <span className="text-[#e94e1b] font-medium italic">
              {nelerYapiyoruz.titleAccent}
            </span>{" "}
            {nelerYapiyoruz.titleEnd}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Text Area */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-8 lg:sticky lg:top-32">
            <p className="text-[#f4f2ee]/70 text-lg font-light leading-relaxed">
              {nelerYapiyoruz.desc1}
            </p>
            <p className="text-[#f4f2ee]/50 text-sm font-light leading-relaxed">
              {nelerYapiyoruz.desc2}
            </p>
            <Link
              to="/hizmetler"
              className="inline-flex items-center gap-3 text-[#f4f2ee] font-medium text-sm tracking-widest uppercase hover:text-[#01aca2] transition-colors mt-8 group w-max"
            >
              Tüm Hizmetler{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          {/* Asymmetric Gallery */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[3/4] md:mt-24 rounded-sm overflow-hidden border border-white/10 group"
            >
              <MediaRenderer
                src={nelerYapiyoruz.img1}
                alt="Set 1"
                className="w-full h-full object-cover opacity-80 group-hover:-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group"
            >
              <MediaRenderer
                src={nelerYapiyoruz.img2}
                alt="Set 2"
                className="w-full h-full object-cover opacity-80 group-hover:-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Ara Video (Showcase Video) ---
const ShowcaseVideoSection = () => {
  const { data } = useCms()
  const { showcaseVideo } = data.home

  // Zarif parçacık efektleri için sabit bir dizi oluşturuyoruz
  const particles = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2px ile 6px arası parçacıklar (daha belirgin)
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5,
    }))
  }, [])

  if (!showcaseVideo) return null

  return (
    <section className="relative py-32 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
      {/* 1. Arkaplan Işık Sızıntıları (Light Leaks) - Daha belirgin */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soldan gelen yumuşak turuncu ışık */}
        <div 
          className="absolute top-1/2 -left-32 w-[500px] h-[500px] md:w-[700px] md:h-[700px] -translate-y-1/2 rounded-full opacity-40 blur-[100px]" 
          style={{ background: 'radial-gradient(circle, #e94e1b 0%, transparent 70%)' }} 
        />
        
        {/* Sağdan gelen daha soğuk, beyaz ışık */}
        <div 
          className="absolute top-1/2 -right-32 w-[500px] h-[500px] md:w-[700px] md:h-[700px] -translate-y-1/2 rounded-full opacity-20 blur-[100px]" 
          style={{ background: 'radial-gradient(circle, #01aca2 0%, transparent 70%)' }} 
        />
      </div>

      {/* 2. Hareketli Toz / Dijital Ağ Parçacıkları (Particles) - Daha parlak */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/60"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              boxShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
            animate={{
              y: [0, -80, 0], // Yukarı doğru salınım
              x: [0, Math.random() * 60 - 30, 0], // Sağa sola kayma
              opacity: [0, 1, 0], // Parlayıp sönme efekti
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3. Ana Video İçeriği */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(233,78,27,0.15)] group">
          <MediaRenderer
            src={showcaseVideo}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            alt="Showcase Video"
          />
          {/* Videonun üzerine çok hafif bir sinematik karartma, üzerine gelince açılır */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

// --- Video Fabrikası (Yatay Akış) ---
const VideoFactory = () => {
  const { data } = useCms()
  const steps = data.home.videoSteps.map((s, idx) => ({
    id: s.step,
    title: s.title,
    desc: s.desc,
    items: s.items,
    color: idx % 2 === 0 ? "text-[#e94e1b]" : "text-[#01aca2]",
    dot: idx % 2 === 0 ? "bg-[#e94e1b]" : "bg-[#01aca2]",
  }))

  return (
    <section className="py-20 bg-[#0A0A0A] relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-montserrat font-light text-[#f4f2ee] mb-6">
            Video Fabrikası
          </h2>
          <p className="text-[#f4f2ee]/60 max-w-xl mx-auto text-lg font-light tracking-wide">
            4 adımda kusursuz prodüksiyon sürecimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative max-w-7xl mx-auto">
          {/* Horizontal Connecting line */}
          <div className="hidden lg:block absolute top-8 left-12 right-12 h-[1px] bg-white/10 pointer-events-none" />

          {steps.map((step, idx) => {
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="relative flex flex-col items-start lg:items-center text-left lg:text-center"
              >
                {/* Number / Dot Area */}
                <div className="mb-8 relative flex items-center justify-center w-16 h-16 shrink-0 bg-[#0A0A0A] border border-white/10 rounded-full z-10 mx-auto lg:mx-0">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]",
                      step.dot,
                    )}
                  />
                  <span
                    className={cn(
                      "absolute -top-12 text-6xl font-black opacity-[0.03] tracking-tighter",
                      step.color,
                    )}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-montserrat font-medium text-[#f4f2ee] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#f4f2ee]/60 text-sm font-light leading-relaxed mb-6 flex-grow">
                  {step.desc}
                </p>
                <ul className="space-y-3 w-full text-left">
                  {step.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-[#f4f2ee]/40 text-[13px] font-light flex items-start gap-2"
                    >
                      <div
                        className={cn(
                          "w-1.5 h-1.5 mt-1.5 rounded-full shrink-0",
                          step.dot,
                        )}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// --- Portfolio ---
const Portfolio = () => {
  const { data } = useCms()
  const projects = data.portfolio.projects.slice(0, 3)

  return (
    <section className="pt-32 pb-0 bg-[#0A0A0A] overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-[#f4f2ee] mb-4">
            Öne Çıkanlar
          </h2>
          <p className="text-[#f4f2ee]/60 max-w-xl">
            Vizyonumuzu yansıtan sinematik projeler.
          </p>
        </div>
        <Link
          to="/portfolyo"
          className="flex items-center gap-2 text-[#01aca2] font-medium hover:text-[#f4f2ee] transition-colors group"
        >
          Tümünü Gör{" "}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="flex gap-6 px-6 md:px-12 pb-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {projects.map((proj, idx) => (
          <Link
            key={idx}
            to={`/portfolyo/${encodeURIComponent(proj.title)}`}
            className="block"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative min-w-[300px] md:min-w-[500px] h-[400px] rounded-sm overflow-hidden snap-center group cursor-pointer border border-white/5"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${proj.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Play button removed as requested */}
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[#01aca2] font-medium text-xs tracking-[0.2em] uppercase block mb-2">
                  {proj.category}
                </span>
                <h3 className="text-2xl font-montserrat font-bold text-[#f4f2ee]">
                  {proj.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// --- Yaratıcı Vizyon / Kurucu ---
const FounderSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { data } = useCms()
  const { founder } = data.home
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const words = founder.quote.split(" ")

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[70vh] bg-[#0A0A0A] overflow-hidden flex flex-col justify-center py-24"
    >
      {/* Dynamic Background Text (Replacing Image) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
        <h1 className="text-[8vw] md:text-[6vw] font-black font-montserrat text-white/5 leading-[0.9] text-center opacity-50 select-none max-w-[150%] md:max-w-[120%] uppercase">
          {founder.backgroundTextEn}
        </h1>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-montserrat font-bold leading-tight uppercase flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words.map((word, i) => {
              // Highlight the word "gururudur." (case insensitive logic)
              const isHighlight = word.toLowerCase().includes("gururu")
              return (
                <WordReveal
                  key={i}
                  word={word}
                  index={i}
                  total={words.length}
                  isHighlight={isHighlight}
                  scrollYProgress={scrollYProgress}
                />
              )
            })}
          </h2>
        </div>

        <motion.div
          className="flex flex-col items-end md:pr-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-[#f4f2ee] text-xl font-light tracking-wide mb-2">
            {founder.name}
          </span>
          <span className="text-[#f4f2ee]/50 text-sm tracking-[0.2em] uppercase">
            {founder.role}
          </span>
          <div className="w-12 h-[1px] bg-[#f4f2ee]/20 mt-4" />
        </motion.div>
      </div>
    </section>
  )
}

const WordReveal = ({
  word,
  index,
  total,
  isHighlight,
  scrollYProgress,
}: any) => {
  const start = index / total
  const end = start + 1 / total

  // Dengeli bir hız için çarpanı 0.35 yapıyoruz (0.4 çok yavaştı, 0.25 çok hızlıydı)
  const fillProgress = useTransform(
    scrollYProgress,
    [0.2 + start * 0.35, 0.2 + end * 0.35],
    [0, 1],
  )
  const color = useTransform(fillProgress, [0, 1], [
    "rgba(244, 242, 238, 0.15)",
    isHighlight ? "#e94e1b" : "#f4f2ee",
  ])

  return (
    <motion.span style={{ color }} className="transition-colors duration-200">
      {word}
    </motion.span>
  )
}

// --- Stats & Vision ---
const Stats = () => {
  const { data } = useCms()
  const { stats } = data.home

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-[500px] w-full">
          <div className="absolute top-0 left-0 w-2/3 h-4/5 rounded-sm overflow-hidden border border-white/10 group">
            <MediaRenderer
              src={stats.img1}
              alt="Studio"
              className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-3/5 rounded-sm overflow-hidden border border-white/10 border-l-4 border-t-4 border-[#0A0A0A] group">
            <MediaRenderer
              src={stats.img2}
              alt="Camera"
              className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 p-px">
          <div className="col-span-1 sm:col-span-2 bg-[#0A0A0A] p-8 pb-12">
            <h2 className="text-3xl font-montserrat font-light text-[#f4f2ee] mb-4">
              Rakamlarla Biz
            </h2>
            <p className="text-[#f4f2ee]/50 leading-relaxed font-light">
              Yılların getirdiği tecrübe ve bitmeyen yaratıcılık tutkusuyla
              sektörde iz bırakıyoruz.
            </p>
          </div>

          {[
            { num: "400+", label: "Tamamlanan Proje", color: "text-[#f4f2ee]" },
            { num: "150+", label: "Mutlu Marka", color: "text-[#f4f2ee]" },
            { num: "10+", label: "Yıl Tecrübe", color: "text-[#f4f2ee]" },
            { num: "24/7", label: "Yaratıcı Destek", color: "text-[#f4f2ee]" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0A0A0A] p-8 flex flex-col justify-center"
            >
              <span
                className={cn(
                  "text-4xl font-light font-montserrat mb-2",
                  stat.color,
                )}
              >
                {stat.num}
              </span>
              <span className="text-[#f4f2ee]/50 text-xs tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Marquee Strip ---
const MarqueeStrip = () => {
  const items = [
    { text: "Yaratıcı Çözümler", accent: false },
    { text: "·", accent: true, color: "#e94e1b" },
    { text: "Sinematik Prodüksiyon", accent: false },
    { text: "·", accent: true, color: "#01aca2" },
    { text: "Dijital Etki", accent: false },
    { text: "·", accent: true, color: "#e94e1b" },
    { text: "Grafik Tasarım", accent: false },
    { text: "·", accent: true, color: "#01aca2" },
    { text: "Video Prodüksiyon", accent: false },
    { text: "·", accent: true, color: "#e94e1b" },
  ];

  return (
    <div className="w-full relative overflow-hidden py-8" style={{ background: '#0A0A0A' }}>
      {/* Subtle top & bottom rules */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)' }} />

      {/* Edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10" style={{ background: 'linear-gradient(90deg, #0A0A0A, transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10" style={{ background: 'linear-gradient(-90deg, #0A0A0A, transparent)' }} />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-10 whitespace-nowrap"
      >
        {Array(2).fill(0).map((_, rep) => (
          <React.Fragment key={rep}>
            {items.map((item, i) =>
              item.accent ? (
                <span
                  key={`${rep}-${i}`}
                  className="text-base select-none"
                  style={{ color: item.color, opacity: 0.6 }}
                >
                  {item.text}
                </span>
              ) : (
                <span
                  key={`${rep}-${i}`}
                  className="text-sm font-light tracking-[0.22em] uppercase select-none"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: 'rgba(244,242,238,0.45)',
                    letterSpacing: '0.22em',
                  }}
                >
                  {item.text}
                </span>
              )
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

// --- Social Follow Section ---
const SocialFollowSection = () => {
  const { data } = useCms()
  const { socialFollow } = data.home

  return (
    <section className="relative py-24 bg-[#0A0A0A]">
      {/* Title */}
      <div className="relative z-10 text-center mb-14 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-2xl md:text-4xl font-light tracking-[0.15em] uppercase text-[#f4f2ee]"
        >
          {socialFollow?.title}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-4 h-px w-16"
          style={{ background: 'linear-gradient(90deg, transparent, #7B3FE4, #e94e1b, transparent)' }}
        />
      </div>

      {/* Three connected cards */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(233,78,27,0.05)]">
          {socialFollow?.boxes?.map((box, idx) => (
            <motion.a
              key={idx}
              href={box.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex-1 relative h-[300px] md:h-[400px] lg:h-[500px] group overflow-hidden border-b md:border-b-0 md:border-r border-white/5 last:border-0 block"
            >
              <MediaRenderer
                src={box.image}
                alt={`Social ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hafif karartma ve hoverda parlama efekti */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-500" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useDocumentTitle("Anasayfa")

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#f4f2ee] selection:bg-[#e94e1b]/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ShowcaseVideoSection />
        <VideoFactory />
        <Portfolio />
        <FounderSection />
        <Stats />
        <MarqueeStrip />
        <SocialFollowSection />
      </main>
      <Footer />
    </div>
  )
}
