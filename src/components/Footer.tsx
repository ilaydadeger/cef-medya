import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';
import { MediaRenderer } from './MediaRenderer';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export const Footer = () => {
  const { data } = useCms();

  const socialLinks = [
    { icon: InstagramIcon, url: data.general.socialLinks?.instagram },
    { icon: TwitterIcon, url: data.general.socialLinks?.twitter },
    { icon: LinkedinIcon, url: data.general.socialLinks?.linkedin },
    { icon: YoutubeIcon, url: data.general.socialLinks?.youtube }
  ].filter(item => {
    if (!item.url) return false;
    const trimmed = item.url.trim();
    return trimmed !== '' && trimmed !== '#' && trimmed !== 'http://' && trimmed !== 'https://';
  });

  return (
    <footer className="bg-[#0A0A0A] pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 w-fit hover:opacity-80 transition-opacity">
              {data.general.faviconUrl ? (
                <MediaRenderer src={data.general.faviconUrl} alt="Logo" className="h-16 w-auto object-contain" />
              ) : (
                <span className="text-3xl font-bold tracking-widest text-[#f4f2ee] uppercase font-montserrat">
                  <span className="text-[#e94e1b]">CEF</span> MEDYA
                </span>
              )}
            </Link>
            <p className="text-[#f4f2ee]/50 max-w-sm mb-8 leading-relaxed font-light">
              Hikayenizi en güçlü görsellerle anlatmak için buradayız. Prodüksiyondan dijitale tam hizmet yaratıcı ajans.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm bg-transparent border border-white/10 flex items-center justify-center text-[#f4f2ee] hover:border-[#f4f2ee] hover:text-cef-orange transition-all duration-300">
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-[#f4f2ee] font-medium mb-6 font-montserrat tracking-widest uppercase text-sm">Bağlantılar</h4>
            <ul className="space-y-3">
              <li><Link to="/hakkimizda" className="text-[#f4f2ee]/50 font-light hover:text-[#f4f2ee] transition-colors text-sm">Hakkımızda</Link></li>
              <li><Link to="/hizmetler" className="text-[#f4f2ee]/50 font-light hover:text-[#f4f2ee] transition-colors text-sm">Hizmetler</Link></li>
              <li><Link to="/portfolyo" className="text-[#f4f2ee]/50 font-light hover:text-[#f4f2ee] transition-colors text-sm">Portfolyo</Link></li>
              <li><Link to="/takimimiz" className="text-[#f4f2ee]/50 font-light hover:text-[#f4f2ee] transition-colors text-sm">Ekibimiz</Link></li>
              <li><Link to="/sss" className="text-[#f4f2ee]/50 font-light hover:text-[#f4f2ee] transition-colors text-sm">SSS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#f4f2ee] font-medium mb-6 font-montserrat tracking-widest uppercase text-sm">İletişim</h4>
            <ul className="space-y-3 text-sm text-[#f4f2ee]/50 font-light">
              <li>{data.general.contact.email}</li>
              <li>{data.general.contact.phone}</li>
              <li className="mt-4 pt-4 border-t border-white/5 leading-relaxed">
                {data.general.contact.address.split(',').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index !== data.general.contact.address.split(',').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-[#f4f2ee]/30 font-light">
          <p>© 2024 Cef Medya. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#f4f2ee] transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-[#f4f2ee] transition-colors">Kullanım Koşulları</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
