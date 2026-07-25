import { useEffect, useState } from 'react';
import { useCms, CmsData } from '../../context/CmsContext';
import { Save, Upload } from 'lucide-react';
import { MediaRenderer } from '../../components/MediaRenderer';
import { uploadFile } from '../../utils/uploadFile';

export default function AdminSettings() {
  const { data, updateData } = useCms();
  
  const [formData, setFormData] = useState<CmsData>(data);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateData(formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const path = name.split('.');
    
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string[]) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadFile(file);
      setFormData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]];
        }
        current[path[path.length - 1]] = url;
        return newData;
      });
    } catch (err) {
      alert("Dosya yüklenirken bir hata oluştu.");
    }
  };

  return (
    <div className="relative pb-20">
      {/* Toast Notification */}
      <div className={`fixed top-6 right-6 bg-cef-turquoise text-[#0A0A0A] px-6 py-3 rounded-md shadow-2xl transition-all duration-500 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <p className="font-medium tracking-wide">Değişiklikler başarıyla kaydedildi!</p>
      </div>

      <div className="p-8 md:p-12 max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-light mb-2">Profil ve Genel Ayarlar</h2>
          <p className="text-white/40 font-light">Web sitenizin genel görünümünü ve iletişim bilgilerini buradan yönetebilirsiniz.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-12">
          
          {/* Section 1: Kimlik & SEO */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-md">
            <h3 className="text-xl font-medium mb-6 text-cef-turquoise">Kimlik ve SEO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Site Başlığı (Meta Title)</label>
                <input 
                  type="text" name="general.siteTitle" value={formData.general.siteTitle} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Logo Metni</label>
                <input 
                  type="text" name="general.logoText" value={formData.general.logoText} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Favicon Yükle</label>
                <div className="flex gap-4 items-center">
                  {formData.general.faviconUrl && (
                    <MediaRenderer src={formData.general.faviconUrl} alt="Favicon" className="w-12 h-12 object-cover rounded-md bg-white/10" />
                  )}
                  <label className="cursor-pointer bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Upload size={16} />
                    <span>Dosya Seç</span>
                    <input 
                      type="file" 
                      accept="image/*,video/mp4,video/webm"
                      onChange={(e) => handleFileUpload(e, ['general', 'faviconUrl'])} 
                      className="hidden"
                    />
                  </label>
                  {formData.general.faviconUrl && (
                    <span className="text-xs text-white/50 truncate max-w-xs">{formData.general.faviconUrl}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: İletişim Bilgileri */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-md">
            <h3 className="text-xl font-medium mb-6 text-cef-orange">İletişim Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Telefon Numarası</label>
                <input 
                  type="text" name="general.contact.phone" value={formData.general.contact.phone} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">E-Posta Adresi</label>
                <input 
                  type="email" name="general.contact.email" value={formData.general.contact.email} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Açık Adres</label>
                <input 
                  type="text" name="general.contact.address" value={formData.general.contact.address} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Sosyal Medya */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-md">
            <h3 className="text-xl font-medium mb-6 text-white/80">Sosyal Medya Bağlantıları</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Instagram URL</label>
                <input 
                  type="text" name="general.socialLinks.instagram" value={formData.general.socialLinks.instagram} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-white/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">LinkedIn URL</label>
                <input 
                  type="text" name="general.socialLinks.linkedin" value={formData.general.socialLinks.linkedin} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-white/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Twitter/X URL</label>
                <input 
                  type="text" name="general.socialLinks.twitter" value={formData.general.socialLinks.twitter} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-white/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">YouTube URL</label>
                <input 
                  type="text" name="general.socialLinks.youtube" value={formData.general.socialLinks.youtube} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-white/50 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="flex items-center gap-2 bg-cef-cream text-cef-black px-8 py-4 rounded-xl font-medium tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_30px_rgba(244,242,238,0.2)] hover:shadow-[0_0_40px_rgba(244,242,238,0.4)]"
            >
              <Save size={18} />
              Değişiklikleri Kaydet
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
