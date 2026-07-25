import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useCms } from '../../context/CmsContext';
import { MediaRenderer } from '../../components/MediaRenderer';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// --- Hero Section ---
const HeroItem = ({ title, bgImg, accent, initialPos, delay, panDirection }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: initialPos.x, y: initialPos.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative group overflow-hidden bg-[#0A0A0A] border border-white/5 flex items-center justify-center min-h-[50vh] md:min-h-0"
    >
      <div className="absolute inset-[-15%] opacity-70 group-hover:opacity-85 transition-opacity duration-1000">
        <MediaRenderer 
          src={bgImg} 
          alt={title}
          className="w-full h-full object-cover"
          style={{ animation: `heroPan-${panDirection} 9s ease-in-out infinite alternate` }}
        />
      </div>
      <div className={cn("absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20 opacity-90")} />
      
      <div className="relative z-10 text-center p-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-medium text-[#f4f2ee] tracking-widest uppercase mb-4 opacity-90 group-hover:opacity-100 transition-opacity">
          {title.split(' ').map((word: string, i: number) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.6 }}
          className={cn("h-[1px] w-12 mx-auto", accent === 'orange' ? 'bg-[#e94e1b]' : 'bg-[#01aca2]')}
        />
      </div>

      <style>{`
        @keyframes heroPan-right { from { transform: translateX(0%)   scale(1.12); } to { transform: translateX(-12%) scale(1.18); } }
        @keyframes heroPan-left  { from { transform: translateX(0%)   scale(1.12); } to { transform: translateX(12%)  scale(1.18); } }
        @keyframes heroPan-up    { from { transform: translateY(0%)   scale(1.12); } to { transform: translateY(-12%) scale(1.18); } }
        @keyframes heroPan-down  { from { transform: translateY(0%)   scale(1.12); } to { transform: translateY(12%)  scale(1.18); } }
      `}</style>
    </motion.div>
  );
};

const Hero = () => {
  const { data } = useCms();
  return (
    <section className="relative w-full h-screen min-h-[800px] pt-[80px] bg-[#0A0A0A] overflow-hidden">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2">
        {data.home.heroItems.map((item, idx) => {
          const panDirs = ['right', 'up', 'down', 'left'];
          return (
            <HeroItem 
              key={idx}
              title={item.title} 
              bgImg={item.bgImg} 
              accent={item.accent} 
              initialPos={{ 
                x: idx % 2 === 0 ? -100 : 100, 
                y: idx < 2 ? -100 : 100 
              }} 
              delay={0.1 * (idx + 1)}
              panDirection={panDirs[idx]}
            />
          );
        })}
      </div>
    </section>
  );
};

// --- Services (Editorial Layout) ---
const Services = () => {
  const { data } = useCms();
  const { nelerYapiyoruz } = data.home;

  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 flex flex-col items-start max-w-4xl">
          <span className="text-[#f4f2ee]/40 text-xs font-bold tracking-[0.3em] uppercase mb-8 border-b border-[#f4f2ee]/10 pb-2">
            {nelerYapiyoruz.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-montserrat font-light text-[#f4f2ee] leading-tight md:leading-tight">
            {nelerYapiyoruz.titleMain} <span className="text-[#e94e1b] font-medium italic">{nelerYapiyoruz.titleAccent}</span> {nelerYapiyoruz.titleEnd}
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
              <Link to="/hizmetler" className="inline-flex items-center gap-3 text-[#f4f2ee] font-medium text-sm tracking-widest uppercase hover:text-[#01aca2] transition-colors mt-8 group w-max">
                Tüm Hizmetler <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
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
              <MediaRenderer src={nelerYapiyoruz.img1} alt="Set 1" className="w-full h-full object-cover opacity-80 group-hover:-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group"
            >
              <MediaRenderer src={nelerYapiyoruz.img2} alt="Set 2" className="w-full h-full object-cover opacity-80 group-hover:-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Video Fabrikası (Yatay Akış) ---
const VideoFactory = () => {
  const { data } = useCms();
  const steps = data.home.videoSteps.map((s, idx) => ({
    id: s.step,
    title: s.title,
    desc: s.desc,
    items: s.items,
    color: idx % 2 === 0 ? "text-[#e94e1b]" : "text-[#01aca2]",
    dot: idx % 2 === 0 ? "bg-[#e94e1b]" : "bg-[#01aca2]",
  }));

  return (
    <section className="py-20 bg-[#0A0A0A] relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-montserrat font-light text-[#f4f2ee] mb-6">Video Fabrikası</h2>
          <p className="text-[#f4f2ee]/60 max-w-xl mx-auto text-lg font-light tracking-wide">4 adımda kusursuz prodüksiyon sürecimiz.</p>
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
                   <div className={cn("w-3 h-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]", step.dot)} />
                   <span className={cn("absolute -top-12 text-6xl font-black opacity-[0.03] tracking-tighter", step.color)}>
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
                    <li key={i} className="text-[#f4f2ee]/40 text-[13px] font-light flex items-start gap-2">
                      <div className={cn("w-1.5 h-1.5 mt-1.5 rounded-full shrink-0", step.dot)} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Portfolio ---
const Portfolio = () => {
  const { data } = useCms();
  const projects = data.portfolio.projects.slice(0, 3);

  return (
    <section className="pt-32 pb-0 bg-[#0A0A0A] overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-[#f4f2ee] mb-4">Öne Çıkanlar</h2>
          <p className="text-[#f4f2ee]/60 max-w-xl">Vizyonumuzu yansıtan sinematik projeler.</p>
        </div>
        <Link to="/portfolyo" className="flex items-center gap-2 text-[#01aca2] font-medium hover:text-[#f4f2ee] transition-colors group">
          Tümünü Gör <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${proj.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                  <Play className="w-6 h-6 ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[#01aca2] font-medium text-xs tracking-[0.2em] uppercase block mb-2">{proj.category}</span>
                <h3 className="text-2xl font-montserrat font-bold text-[#f4f2ee]">{proj.title}</h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// --- Yaratıcı Vizyon / Kurucu ---
const FounderSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useCms();
  const { founder } = data.home;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const words = founder.quote.split(" ");

  return (
    <section ref={containerRef} className="relative w-full min-h-[70vh] bg-[#0A0A0A] overflow-hidden flex flex-col justify-center py-24">
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
              const isHighlight = word.toLowerCase().includes("gururu");
              return (
                <WordReveal key={i} word={word} index={i} total={words.length} isHighlight={isHighlight} scrollYProgress={scrollYProgress} />
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
          <span className="text-[#f4f2ee] text-xl font-light tracking-wide mb-2">{founder.name}</span>
          <span className="text-[#f4f2ee]/50 text-sm tracking-[0.2em] uppercase">{founder.role}</span>
          <div className="w-12 h-[1px] bg-[#f4f2ee]/20 mt-4" />
        </motion.div>

      </div>
    </section>
  );
};

const WordReveal = ({ word, index, total, isHighlight, scrollYProgress }: any) => {
  const start = index / total;
  const end = start + (1 / total);
  
  // Create a smoother mapping range focusing on the middle part of the scroll
  const fillProgress = useTransform(scrollYProgress, [0.3 + start * 0.4, 0.3 + end * 0.4], [0, 1]);
  const color = useTransform(fillProgress, [0, 1], ["rgba(244, 242, 238, 0.15)", isHighlight ? "#e94e1b" : "#f4f2ee"]);

  return (
    <motion.span style={{ color }} className="transition-colors duration-200">
      {word}
    </motion.span>
  );
}

// --- Stats & Vision ---
const Stats = () => {
  const { data } = useCms();
  const { stats } = data.home;

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative h-[500px] w-full">
          <div className="absolute top-0 left-0 w-2/3 h-4/5 rounded-sm overflow-hidden border border-white/10 group">
            <MediaRenderer src={stats.img1} alt="Studio" className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-3/5 rounded-sm overflow-hidden border border-white/10 border-l-4 border-t-4 border-[#0A0A0A] group">
            <MediaRenderer src={stats.img2} alt="Camera" className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 p-px">
          <div className="col-span-1 sm:col-span-2 mb-8 bg-[#0A0A0A] p-8">
            <h2 className="text-3xl font-montserrat font-light text-[#f4f2ee] mb-4">Rakamlarla Biz</h2>
            <p className="text-[#f4f2ee]/50 leading-relaxed font-light">Yılların getirdiği tecrübe ve bitmeyen yaratıcılık tutkusuyla sektörde iz bırakıyoruz.</p>
          </div>

          {[
            { num: "400+", label: "Tamamlanan Proje", color: "text-[#f4f2ee]" },
            { num: "150+", label: "Mutlu Marka", color: "text-[#f4f2ee]" },
            { num: "10+", label: "Yıl Tecrübe", color: "text-[#f4f2ee]" },
            { num: "24/7", label: "Yaratıcı Destek", color: "text-[#f4f2ee]" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#0A0A0A] p-8 flex flex-col justify-center">
              <span className={cn("text-4xl font-light font-montserrat mb-2", stat.color)}>{stat.num}</span>
              <span className="text-[#f4f2ee]/50 text-xs tracking-widest uppercase">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- Marquee Strip ---
const MarqueeStrip = () => {
  return (
    <div className="w-full bg-[#0A0A0A] border-y border-white/10 py-6 overflow-hidden flex relative items-center">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-16 font-montserrat font-bold text-3xl md:text-5xl uppercase tracking-widest text-[#f4f2ee] whitespace-nowrap opacity-90"
      >
        {Array(4).fill(0).map((_, i) => (
          <React.Fragment key={i}>
            <span>YARATICI ÇÖZÜMLER</span>
            <span className="text-[#e94e1b] text-xl">✦</span>
            <span>SİNEMATİK PRODÜKSİYON</span>
            <span className="text-[#01aca2] text-xl">✦</span>
            <span>DİJİTAL ETKİ</span>
            <span className="text-[#e94e1b] text-xl">✦</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}




export default function Home() {
  useDocumentTitle('Anasayfa');

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#f4f2ee] selection:bg-[#e94e1b]/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <VideoFactory />
        <Portfolio />
        <FounderSection />
        <Stats />
        <MarqueeStrip />
      </main>
      <Footer />
    </div>
  );
}


