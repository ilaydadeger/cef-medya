import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { MediaRenderer } from '../../components/MediaRenderer';
import { useCms } from '../../context/CmsContext';

export default function Sss() {
  const navigate = useNavigate();
  const { data } = useCms();

  const FAQ_CATEGORIES = data.faq.map((cat, idx) => ({
    label: cat.label,
    accent: idx % 2 === 0 ? '#e94e1b' : '#01aca2',
    items: cat.items
  }));

  return (
    <div className="bg-cef-black min-h-screen text-cef-cream selection:bg-cef-orange selection:text-white">
      <Navbar />
      <main className="bg-[#0A0A0A] min-h-screen">
        {/* ── Hero ── */}
        <section className="relative pt-52 pb-20 px-8 md:px-16 lg:px-32 overflow-hidden border-b border-white/5">
          {data.faqPage?.heroBg && (
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
              <MediaRenderer
                src={data.faqPage.heroBg}
                alt="FAQ Background"
                className="w-full h-full object-cover opacity-50 scale-105"
              />
            </div>
          )}

          {/* Ghost text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black opacity-[0.02] tracking-tighter whitespace-nowrap pointer-events-none mix-blend-overlay z-10">
            SSS
          </div>

          <div className="relative z-20 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <div className="text-xs tracking-[0.3em] text-cef-cream/50 uppercase mb-6">
                <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>ANA SAYFA</span>
                <span className="mx-2">/</span>
                <span className="text-cef-orange font-medium">SSS</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4 break-words">
                Sıkça Sorulan Sorular<span className="text-cef-orange">.</span>
              </h1>
              <p className="text-[#888880] text-sm md:text-base max-w-sm leading-relaxed">
                Merak ettiklerinizin büyük çoğunluğunun yanıtı burada. Yanıt bulamazsanız doğrudan iletişime geçin.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ categories ── */}
        {FAQ_CATEGORIES.map((cat, catIdx) => (
          <section
            key={cat.label}
            style={{
              padding: '5rem 3rem',
              borderBottom: '1px solid #1a1a1a',
              backgroundColor: catIdx % 2 === 0 ? '#0A0A0A' : '#0d0d0d',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '240px 1fr',
                  gap: '5rem',
                  alignItems: 'start',
                }}
                className="faq-cat-grid"
              >
                {/* Category label */}
                <div style={{ position: 'sticky', top: '100px' }}>
                  <p
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.6rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: cat.accent,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {String(catIdx + 1).padStart(2, '0')}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: '1.4rem',
                      fontWeight: 400,
                      color: '#f4f2ee',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {cat.label}
                  </p>
                </div>

                {/* Q&A list */}
                <div>
                  {cat.items.map((item, i) => (
                    <div
                      key={item.q}
                      style={{
                        paddingBottom: '3rem',
                        marginBottom: '3rem',
                        borderBottom: i < cat.items.length - 1 ? '1px solid #1a1a1a' : 'none',
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: 'Fraunces, serif',
                          fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)',
                          fontWeight: 400,
                          color: '#f4f2ee',
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em',
                          marginBottom: '1.25rem',
                        }}
                      >
                        {item.q}
                      </h2>
                      <p
                        style={{
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          fontSize: '0.95rem',
                          lineHeight: 1.8,
                          color: '#888880',
                          maxWidth: '680px',
                        }}
                      >
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ── Still have questions ── */}
        <section
          style={{
            padding: '7rem 3rem',
            backgroundColor: '#060606',
            borderTop: '1px solid #1a1a1a',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
            className="contact-grid"
          >
            <div>
              <p
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#e94e1b',
                  marginBottom: '1.25rem',
                }}
              >
                Hâlâ Sorunuz Mu Var?
              </p>
              <h2
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 300,
                  color: '#f4f2ee',
                  lineHeight: 1.05,
                  letterSpacing: '-0.015em',
                }}
              >
                Doğrudan bize
                <br />
                <em style={{ fontStyle: 'italic', color: '#e94e1b' }}>yazın.</em>
              </h2>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '0.95rem',
                  lineHeight: 1.75,
                  color: '#888880',
                  marginBottom: '2rem',
                }}
              >
                Yanıt bulamadığınız sorularınız için 24 saat içinde dönüş garantisiyle ekibimize ulaşabilirsiniz.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('/iletisim')}
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    backgroundColor: '#e94e1b',
                    color: '#f4f2ee',
                    border: 'none',
                    padding: '1rem 2.5rem',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  Bize Ulaşın
                </button>
                <button
                  onClick={() => navigate('/hizmetler')}
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '0.8rem',
                    background: 'transparent',
                    color: '#f4f2ee',
                    border: '1px solid rgba(244,242,238,0.2)',
                    padding: '1rem 2rem',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,242,238,0.5)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,242,238,0.2)' }}
                >
                  Hizmetleri Gör
                </button>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @media (max-width: 820px) {
            .faq-header-grid, .faq-cat-grid, .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            .faq-cat-grid > div:first-child { position: static !important; }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  )
}
