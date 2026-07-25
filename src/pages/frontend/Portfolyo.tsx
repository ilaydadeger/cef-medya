import { MediaRenderer } from '../../components/MediaRenderer';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useCms } from '../../context/CmsContext';

export default function Portfolyo() {
  const { data } = useCms();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tümünü Gör');

  const categories = data.portfolio.categories;
  
  const filteredProjects = activeCategory === 'Tümünü Gör' 
    ? data.portfolio.projects 
    : data.portfolio.projects.filter(p => p.category === activeCategory);

  const chunks = [];
  for (let i = 0; i < filteredProjects.length; i += 4) {
    chunks.push(filteredProjects.slice(i, i + 4));
  }

  return (
    <div className="bg-cef-black min-h-screen text-cef-cream selection:bg-cef-orange selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-52 pb-20 px-8 md:px-16 lg:px-32 overflow-hidden border-b border-white/5">
        {data.portfolio?.heroBg && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-cef-black via-cef-black/80 to-cef-black/40 z-10" />
            <MediaRenderer              src={data.portfolio.heroBg}
              alt="Portfolio Background"
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
              <span className="text-cef-orange font-medium">PORTFOLYO</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">
              Portfolyo<span className="text-cef-turquoise">.</span>
            </h1>
          </motion.div>
        </div>

        {/* Filter Band */}
        <div className="flex flex-wrap gap-8 border-b border-white/10 pb-6 mt-16">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat)}
              className={`text-sm tracking-widest uppercase transition-colors ${
                activeCategory === cat ? 'text-white border-b border-cef-orange pb-1' : 'text-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Editorial Grid Showcase */}
      <section className="px-8 md:px-16 lg:px-32 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] gap-6">
          <AnimatePresence mode="popLayout">
            {chunks.map((chunk, chunkIdx) => (
              <React.Fragment key={chunkIdx}>
                
                {/* Project 1: Wide format */}
                {chunk[0] && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate(`/portfolyo/${encodeURIComponent(chunk[0].title)}`)}
                    className="md:col-span-12 md:row-span-2 relative group overflow-hidden bg-white/5 cursor-pointer"
                  >
                    <MediaRenderer
                      src={chunk[0].image} 
                      alt={chunk[0].title}
                      className="w-full h-full object-cover opacity-60 group-hover:-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cef-black/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                      <div>
                        <p className="text-cef-orange text-xs tracking-widest uppercase mb-2">{chunk[0].category}</p>
                        <h2 className="text-3xl md:text-4xl font-light">{chunk[0].title}</h2>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-cef-orange group-hover:text-white transition-all duration-300">
                        <ArrowUpRight size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Project 2: Vertical / Square */}
                {chunk[1] && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onClick={() => navigate(`/portfolyo/${encodeURIComponent(chunk[1].title)}`)}
                    className="md:col-span-5 md:row-span-2 relative group overflow-hidden bg-white/5 cursor-pointer"
                  >
                    <MediaRenderer
                      src={chunk[1].image} 
                      alt={chunk[1].title}
                      className="w-full h-full object-cover opacity-60 group-hover:-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cef-black/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                      <div>
                        <p className="text-cef-turquoise text-xs tracking-widest uppercase mb-2">{chunk[1].category}</p>
                        <h2 className="text-2xl font-light">{chunk[1].title}</h2>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-cef-orange group-hover:text-white transition-all duration-300">
                        <ArrowUpRight size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Project 3 & 4: Magazine Style stack */}
                {(chunk[2] || chunk[3]) && (
                  <div className="md:col-span-7 md:row-span-2 grid grid-rows-2 gap-6">
                    {chunk[2] && (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        onClick={() => navigate(`/portfolyo/${encodeURIComponent(chunk[2].title)}`)}
                        className="relative group overflow-hidden bg-white/5 cursor-pointer"
                      >
                        <MediaRenderer
                          src={chunk[2].image} 
                          alt={chunk[2].title}
                          className="w-full h-full object-cover opacity-60 group-hover:-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-cef-black/90 via-cef-black/40 to-transparent" />
                        <div className="absolute inset-y-0 left-8 flex flex-col justify-center">
                          <p className="text-white/50 text-xs tracking-widest uppercase mb-2">{chunk[2].category}</p>
                          <h2 className="text-2xl font-light max-w-xs">{chunk[2].title}</h2>
                        </div>
                        <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-cef-orange group-hover:text-white transition-all duration-300">
                          <ArrowUpRight size={24} strokeWidth={1.5} />
                        </div>
                      </motion.div>
                    )}

                    {chunk[3] && (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        onClick={() => navigate(`/portfolyo/${encodeURIComponent(chunk[3].title)}`)}
                        className="relative group overflow-hidden bg-white/5 cursor-pointer border border-white/5 hover:border-cef-orange/30 transition-colors"
                      >
                        <MediaRenderer
                          src={chunk[3].image} 
                          alt={chunk[3].title}
                          className="w-full h-full object-cover opacity-60 group-hover:-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cef-black/90 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                          <div>
                            <p className="text-cef-orange text-xs tracking-widest uppercase mb-1">{chunk[3].category}</p>
                            <h2 className="text-lg font-light">{chunk[3].title}</h2>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-cef-orange group-hover:text-white transition-all duration-300">
                            <ArrowUpRight size={24} strokeWidth={1.5} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center border-t border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <h2 className="text-4xl md:text-5xl font-light mb-10">Projelerinizi hayata geçirelim.</h2>
        <Link 
          to="/iletisim"
          className="inline-flex items-center gap-3 bg-cef-orange text-white px-8 py-4 rounded-sm uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-cef-black transition-colors duration-300"
        >
          İletişime Geç
          <ArrowUpRight size={18} />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
