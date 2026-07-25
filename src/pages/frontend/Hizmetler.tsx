import { MediaRenderer } from '../../components/MediaRenderer';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Share2, 
  Fingerprint, 
  Camera, 
  Package, 
  Gift, 
  Box, 
  PenTool, 
  Coffee, 
  Cuboid, 
  Film, 
  Monitor 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useCms } from '../../context/CmsContext';

export default function Hizmetler() {
  const { data } = useCms();
  const ICONS = [BookOpen, Share2, Fingerprint, Camera, Package, Gift, Box, PenTool, Coffee, Cuboid, Film, Monitor];
  const servicesList = data.services.map((s, idx) => ({
    name: s.title,
    desc: s.desc,
    icon: ICONS[idx % ICONS.length]
  }));

  const strengths = data.servicesPage?.strengths?.items || [];

  return (
    <div className="bg-cef-black min-h-screen text-cef-cream selection:bg-cef-orange selection:text-white">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-52 pb-20 px-8 md:px-16 lg:px-32 overflow-hidden border-b border-white/5">
        {data.servicesPage?.heroBg && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-cef-black via-cef-black/80 to-transparent z-10" />
            <MediaRenderer              src={data.servicesPage.heroBg}
              alt="Cinematic Services Background"
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
              <span className="hover:text-white cursor-pointer transition-colors">ANA SAYFA</span>
              <span className="mx-2">/</span>
              <span className="text-cef-orange font-medium">HİZMETLER</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">
              Hizmetlerimiz<span className="text-cef-orange">.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 3. Welcome / What we do Section */}
      <section className="px-8 md:px-16 lg:px-32 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-3xl md:text-4xl font-light leading-tight whitespace-pre-line">
              <span className="text-cef-orange font-medium block text-sm tracking-[0.2em] uppercase mb-4 uppercase">{data.servicesPage?.intro?.subtitle}</span>
              {data.servicesPage?.intro?.title}
            </h2>
            <p className="text-lg text-cef-cream/60 leading-relaxed font-light whitespace-pre-line">
              {data.servicesPage?.intro?.desc}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            <MediaRenderer
              src={data.servicesPage?.intro?.img1}
              alt="Agency Work"
              className="w-full h-64 object-cover rounded-sm transition-all duration-700"
            />
            <MediaRenderer
              src={data.servicesPage?.intro?.img2}
              alt="Creative Strategy"
              className="w-full h-64 object-cover rounded-sm transition-all duration-700 translate-y-8"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="px-8 md:px-16 lg:px-32 py-32 bg-cef-black relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cef-turquoise/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cef-orange/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
          {servicesList.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Link
                to={`/hizmetler/${encodeURIComponent(data.services[idx].title)}`}
                className="group border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col items-center text-center hover:bg-white/[0.05] hover:border-cef-orange/30 transition-all duration-500 cursor-pointer block"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-cef-cream/70 group-hover:text-cef-orange group-hover:scale-110 transition-all duration-500">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium tracking-wide mb-2 group-hover:text-white transition-colors">
                  {service.name}
                </h3>
                {service.desc && (
                  <p className="text-xs text-white/50 group-hover:text-white/80 transition-colors mt-2">
                    {service.desc}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Opportunities Section */}
      <section className="px-8 md:px-16 lg:px-32 py-24 bg-gradient-to-b from-cef-black to-white/[0.02] border-t border-white/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-8 whitespace-pre-line">{data.servicesPage?.opportunities?.title}</h2>
          <p className="text-lg text-cef-cream/60 leading-relaxed font-light whitespace-pre-line">
            {data.servicesPage?.opportunities?.desc}
          </p>
        </motion.div>
      </section>

      {/* 5. Creative Approach */}
      <section className="px-8 md:px-16 lg:px-32 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full group cursor-pointer"
          >
            <div className="absolute inset-0 bg-cef-black/40 group-hover:bg-cef-black/20 transition-all duration-500 z-10" />
            <MediaRenderer
              src={data.servicesPage?.surprise?.videoPlaceholder}
              alt="Creative Behind The Scenes"
              className="w-full h-full object-cover transition-all duration-700"
            />
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-cef-orange/90 group-hover:border-cef-orange transition-all duration-500">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6 whitespace-pre-line">
              {data.servicesPage?.surprise?.title}
            </h2>
            <div className="text-lg text-cef-cream/60 leading-relaxed font-light mb-10 whitespace-pre-line">
              <p className="mb-4">{data.servicesPage?.surprise?.desc1}</p>
              <p>{data.servicesPage?.surprise?.desc2}</p>
            </div>
            
            <ul className="flex flex-col gap-5">
              {[
                'Özgün ve Çarpıcı Kurgu',
                'Marka Etkileşimini Güçlendirme',
                'Sektöre Uygun Yaratıcı Çözümler'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-cef-cream/80 text-lg font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-cef-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 6. Strengths */}
      <section className="px-8 md:px-16 lg:px-32 py-32 bg-white/[0.01] border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light whitespace-pre-line">{data.servicesPage?.strengths?.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-default"
            >
              <div className="relative h-[400px] overflow-hidden rounded-sm mb-6">
                <div className="absolute inset-0 bg-cef-black/40 z-10 group-hover:bg-transparent transition-all duration-500" />
                  <MediaRenderer
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <h3 className="text-xl font-medium tracking-wide mb-2 group-hover:text-cef-orange transition-colors">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-white/40 tracking-wider uppercase">
                <span>Many Options</span>
                <span>•</span>
                <span>Custom Design</span>
                <span>•</span>
                <span>App Ideas</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
