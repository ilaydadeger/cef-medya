import { Link, useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { MediaRenderer } from '../../components/MediaRenderer';
import { useCms } from '../../context/CmsContext';
import { motion } from 'framer-motion';

export default function HizmetDetay() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data } = useCms();

  // Slug'dan hizmet adını geri dönüştür
  const decodedSlug = slug ? decodeURIComponent(slug) : '';
  const service = data.services.find(
    (s) => s.title.toLowerCase().replace(/\s+/g, '-') === decodedSlug ||
           s.title === decodedSlug
  );

  if (!service) {
    return (
      <div className="bg-cef-black min-h-screen text-cef-cream flex flex-col items-center justify-center gap-6">
        <Navbar />
        <p className="text-white/50">Hizmet bulunamadı.</p>
        <Link to="/hizmetler" className="text-cef-orange underline">Hizmetlere Dön</Link>
      </div>
    );
  }

  const detail = service.detail ?? {};
  const tagline = detail.tagline ?? service.desc;
  const intro = detail.intro ?? '';
  const sections = detail.sections ?? [];
  const accent = '#e94e1b';

  return (
    <div className="bg-cef-black min-h-screen text-cef-cream" style={{ overflowX: 'hidden' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-52 pb-20 px-8 md:px-16 lg:px-32 overflow-hidden border-b border-white/5">
        {/* Büyük arka plan ghost yazı */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '-2vw',
            transform: 'translateY(-50%)',
            fontSize: 'clamp(8rem, 20vw, 20rem)',
            fontWeight: 700,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(244,242,238,0.03)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {service.title.split(' ')[0].toUpperCase()}
        </div>

        <div className="relative z-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            {/* Breadcrumb */}
            <div className="text-xs tracking-[0.3em] text-cef-cream/50 uppercase mb-6">
              <Link to="/" className="hover:text-white cursor-pointer transition-colors">ANA SAYFA</Link>
              <span className="mx-2">/</span>
              <Link to="/hizmetler" className="hover:text-white cursor-pointer transition-colors">HİZMETLER</Link>
              <span className="mx-2">/</span>
              <span className="text-cef-orange font-medium uppercase">{service.title}</span>
            </div>

            {/* Ana başlık */}
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4 break-words">
              {service.title}<span className="text-cef-orange">.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Manifesto ── */}
      {(tagline || intro) && (
        <section className="px-8 md:px-16 lg:px-32 py-24 border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            {tagline && (
              <div className="max-w-4xl">
                <span className="text-cef-orange font-medium block text-sm tracking-[0.2em] uppercase mb-4">
                  Yaklaşımımız
                </span>
                {/* Tagline — Hizmetler intro title ile aynı boyut: text-3xl md:text-4xl */}
                <h2 className="text-3xl md:text-4xl font-light leading-tight">
                  {tagline}
                </h2>
              </div>
            )}

            {intro && (
              <div className="flex justify-end w-full">
                <div className="max-w-2xl border-l border-white/10 pl-8 md:pl-12">
                  <p style={{
                    fontFamily: 'sans-serif',
                    fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
                    lineHeight: 1.9,
                    color: '#a0a09a',
                    fontWeight: 300,
                  }}>
                    {intro}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Editorial Sections ── */}
      {sections.length > 0 && (
        <div style={{ paddingBottom: '8vw' }}>
          {sections.map((section, i) => {
            const isEven = i % 2 === 0;
            return (
              <section
                key={i}
                style={{
                  position: 'relative',
                  minHeight: section.img ? '90vh' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isEven ? 'flex-start' : 'flex-end',
                  padding: section.img ? '5vw 6vw' : '4vw 6vw',
                  overflow: 'hidden',
                  borderTop: '1px solid rgba(244,242,238,0.04)',
                }}
              >
                {/* Büyük arka plan numara */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 'clamp(15rem, 30vw, 30rem)',
                  fontWeight: 300,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(244, 242, 238, 0.025)',
                  zIndex: 0,
                  pointerEvents: 'none',
                  lineHeight: 1,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Görsel varsa göster */}
                {section.img && (
                  <div style={{
                    width: '55%',
                    height: '75vh',
                    minHeight: '500px',
                    position: 'relative',
                    zIndex: 1,
                  }} className="hd-img-container">
                    <MediaRenderer
                      src={section.img}
                      alt={section.heading}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(20%) contrast(1.1) brightness(0.8)',
                        transition: 'filter 0.8s ease, transform 1.2s ease',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%) contrast(1.05) brightness(1)';
                        (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(20%) contrast(1.1) brightness(0.8)';
                        (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                )}

                {/* Metin kutusu */}
                <div
                  style={{
                    width: section.img ? '42%' : '100%',
                    maxWidth: section.img ? undefined : '900px',
                    position: section.img ? 'absolute' : 'relative',
                    zIndex: 2,
                    ...(section.img ? {
                      [isEven ? 'right' : 'left']: '8vw',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    } : { margin: '0 auto' }),
                    padding: section.img ? '4vw 3.5vw' : '3rem 0',
                    background: section.img ? 'rgba(10, 10, 10, 0.7)' : 'transparent',
                    backdropFilter: section.img ? 'blur(24px)' : undefined,
                    border: section.img ? '1px solid rgba(244, 242, 238, 0.06)' : undefined,
                    boxShadow: section.img ? '0 40px 80px rgba(0,0,0,0.5)' : undefined,
                  }}
                  className="hd-text-box"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ width: '24px', height: '1px', backgroundColor: accent }} />
                    <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      Faz {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'sans-serif',
                    fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                    fontWeight: 300,
                    color: '#f4f2ee',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    marginBottom: '1.5rem',
                  }}>
                    {section.heading}
                  </h3>
                  <p style={{
                    fontFamily: 'sans-serif',
                    fontSize: '1rem',
                    lineHeight: 1.9,
                    color: '#a0a09a',
                    fontWeight: 300,
                  }}>
                    {section.body}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* ── CTA ── */}
      <section style={{
        padding: '12vw 6vw',
        backgroundColor: accent,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.8) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '1000px', position: 'relative', zIndex: 10 }}>
          <h2 style={{
            fontFamily: 'sans-serif',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 300,
            color: '#0A0A0A',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            marginBottom: '3rem',
          }}>
            Vizyonunuzu <br />
            <span style={{ fontStyle: 'italic', color: '#f4f2ee' }}>gerçeğe dönüştürelim.</span>
          </h2>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                fontFamily: 'sans-serif',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                backgroundColor: '#0A0A0A',
                color: '#f4f2ee',
                border: 'none',
                padding: '1.25rem 3.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#1a1a1a';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#0A0A0A';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Teklif Al
            </button>
            <button
              onClick={() => navigate('/hizmetler')}
              style={{
                fontFamily: 'sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                background: 'transparent',
                color: '#f4f2ee',
                border: '1px solid rgba(244,242,238,0.35)',
                padding: '1.25rem 3rem',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#f4f2ee';
                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(244,242,238,0.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,242,238,0.35)';
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              Tüm Hizmetler
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .hd-img-container {
            width: 100% !important;
            height: 55vh !important;
          }
          .hd-text-box {
            position: relative !important;
            width: 95% !important;
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            transform: translateY(-12%) !important;
            margin: 0 auto !important;
            padding: 8vw 6vw !important;
          }
        }
      `}</style>
    </div>
  );
}
