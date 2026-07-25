import React, { useEffect, useState } from 'react';
import { useCms, CmsData } from '../../context/CmsContext';
import { Save, Plus, Trash2, Upload } from 'lucide-react';
import { MediaRenderer } from '../../components/MediaRenderer';
import { uploadFile } from '../../utils/uploadFile';

export default function AdminAbout() {
  const { data, updateData } = useCms();
  const [aboutData, setAboutData] = useState<CmsData['about']>(data.about);
  const [aboutPageData, setAboutPageData] = useState<CmsData['aboutPage']>(data.aboutPage);
  const [showToast, setShowToast] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    setAboutData(data.about);
    setAboutPageData(data.aboutPage);
  }, [data.about, data.aboutPage]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ ...data, about: aboutData, aboutPage: aboutPageData });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // --- Image Uploader ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldPath: string, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingField(fieldPath);
    try {
      const url = await uploadFile(file);
      callback(url);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploadingField(null);
    }
  };

  const FileUploadButton = ({ id, label, onUpload, currentImg }: { id: string, label: string, onUpload: (e: any) => void, currentImg?: string }) => (
    <div className="flex flex-col gap-2">
      <label className="block text-xs uppercase tracking-widest text-white/50">{label}</label>
      <div className="flex items-center gap-4">
        {currentImg && (
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
            <MediaRenderer src={currentImg} alt="Preview" className="w-full h-full object-cover opacity-80" />
          </div>
        )}
        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-colors w-full text-sm font-medium">
          {uploadingField === id ? (
            <span className="text-white/50 animate-pulse">Yükleniyor...</span>
          ) : (
            <>
              <Upload className="w-4 h-4 text-cef-orange" />
              <span>Medya (Görsel/Video)</span>
            </>
          )}
          <input type="file" accept="image/*,video/mp4,video/webm" className="hidden" onChange={(e) => onUpload(e)} disabled={uploadingField === id} />
        </label>
      </div>
    </div>
  );

  // --- Handlers ---
  const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData(prev => ({ ...prev, [name]: value }));
  };

  const handleValueChange = (index: number, field: string, value: string) => {
    setAboutData(prev => {
      const newValues = [...prev.values];
      newValues[index] = { ...newValues[index], [field]: value };
      return { ...prev, values: newValues };
    });
  };

  const handleSectionChange = (section: 'modernDesign' | 'creativeApproach', field: string, value: string) => {
    setAboutPageData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleBrandChange = (index: number, field: string, value: string) => {
    setAboutPageData(prev => {
      const newBrands = [...prev.brands];
      newBrands[index] = { ...newBrands[index], [field]: value };
      return { ...prev, brands: newBrands };
    });
  };

  const addBrand = () => {
    setAboutPageData(prev => ({ ...prev, brands: [...prev.brands, { image: '', name: 'YENİ MARKA' }] }));
  };

  const removeBrand = (index: number) => {
    setAboutPageData(prev => ({
      ...prev,
      brands: prev.brands.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="relative pb-32">
      <div className={`fixed top-6 right-6 bg-cef-turquoise text-[#0A0A0A] px-6 py-3 rounded-md shadow-2xl transition-all duration-500 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <p className="font-medium tracking-wide">Değişiklikler başarıyla kaydedildi!</p>
      </div>

      <div className="p-8 md:p-12 max-w-5xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-light mb-2">Hakkımızda Yönetimi</h2>
            <p className="text-white/40 font-light">Sayfa metinlerini, marka şeridini ve şirket değerlerini düzenleyin.</p>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 bg-cef-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(233,78,27,0.3)]">
            <Save className="w-5 h-5" /> Kaydet
          </button>
        </div>

        <form className="space-y-12">
          
          {/* 0. HERO BG */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-white/80">Sayfa Üst Arka Plan Görseli</h3>
            <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5 w-fit">
              <FileUploadButton 
                id="aboutHeroBg" label="Arka Plan Görseli" currentImg={aboutPageData?.heroBg}
                onUpload={(e) => handleFileUpload(e, 'aboutHeroBg', (url) => setAboutPageData(prev => ({...prev, heroBg: url})))}
              />
            </div>
          </div>
          
          {/* 1. MODERN TASARIM */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-orange">1. Giriş / Modern Tasarım Alanı</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Etiket (Örn: MODERN TASARIM)</label>
                  <input type="text" value={aboutPageData?.modernDesign?.subtitle || ''} onChange={(e) => handleSectionChange('modernDesign', 'subtitle', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Devasa Başlık (Satır atlamak için Enter'a basın)</label>
                  <textarea rows={4} value={aboutPageData?.modernDesign?.title || ''} onChange={(e) => handleSectionChange('modernDesign', 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange resize-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Açıklama (Misyonumuz)</label>
                  <textarea name="mission" value={aboutData.mission} onChange={handleAboutChange} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange resize-none" />
                </div>
              </div>
              <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5 self-start">
                <FileUploadButton 
                  id="modernImg" label="Sağ Taraftaki Görsel" currentImg={aboutPageData?.modernDesign?.image}
                  onUpload={(e) => handleFileUpload(e, 'modernImg', (url) => handleSectionChange('modernDesign', 'image', url))}
                />
              </div>
            </div>
          </div>

          {/* 1.5. VİDEO ALANI */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-turquoise">VİDEO OYNATMA ALANI</h3>
            <p className="text-white/50 text-sm mb-6">Logo şeridinin üzerinde yer alacak, ortalanmış video alanı. Lütfen sadece video (mp4, webm vb.) dosyası yükleyin.</p>
            <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5 w-fit">
              <div className="flex flex-col gap-2">
                <label className="block text-xs uppercase tracking-widest text-white/50">Sayfa Videosu</label>
                <div className="flex items-center gap-4">
                  {aboutPageData?.videoUrl && (
                    <div className="w-32 h-20 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
                      <video src={aboutPageData.videoUrl} className="w-full h-full object-cover opacity-80" muted />
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-colors text-sm font-medium">
                    {uploadingField === 'pageVideo' ? (
                      <span className="text-white/50 animate-pulse">Yükleniyor...</span>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-cef-turquoise" />
                        <span>Video Yükle</span>
                      </>
                    )}
                    <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileUpload(e, 'pageVideo', (url) => setAboutPageData(prev => ({...prev, videoUrl: url})))} disabled={uploadingField === 'pageVideo'} />
                  </label>
                  {aboutPageData?.videoUrl && (
                    <button type="button" onClick={() => setAboutPageData(prev => ({...prev, videoUrl: ''}))} className="text-white/30 hover:text-red-500 transition-colors p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. REFERANS MARKALAR (KAYAN YAZI) */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-white/80">2. Referans Markalar (Kayan Şerit)</h3>
            <div className="space-y-4">
              {aboutPageData?.brands?.map((brand, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-[#0A0A0A] p-4 rounded-xl border border-white/5">
                  <div className="w-16 h-12 rounded bg-white/5 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                    {brand.image ? <MediaRenderer src={brand.image} className="w-full h-full object-contain brightness-0 invert" /> : <span className="text-[10px] text-white/30">Görsel Yok</span>}
                  </div>
                  <label className="text-xs uppercase tracking-widest text-white/50 hover:text-white cursor-pointer transition-colors bg-white/5 px-3 py-2 rounded">
                    {uploadingField === `brand${idx}` ? '...' : 'Görsel'}
                    <input type="file" accept="image/*,video/mp4,video/webm" className="hidden" onChange={(e) => handleFileUpload(e, `brand${idx}`, (url) => handleBrandChange(idx, 'image', url))} disabled={uploadingField === `brand${idx}`} />
                  </label>
                  <input 
                    type="text" value={brand.name} onChange={(e) => handleBrandChange(idx, 'name', e.target.value)} placeholder="Marka Adı"
                    className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-white/30"
                  />
                  <button type="button" onClick={() => removeBrand(idx)} className="text-white/30 hover:text-red-500 transition-colors p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addBrand} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium mt-4">
                <Plus className="w-4 h-4" /> Yeni Marka Ekle
              </button>
            </div>
          </div>

          {/* 3. YARATICI YAKLAŞIM */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-turquoise">3. Yaratıcı Yaklaşım Alanı</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5 self-start order-2 lg:order-1">
                <FileUploadButton 
                  id="creativeImg" label="Sol Taraftaki Görsel" currentImg={aboutPageData?.creativeApproach?.image}
                  onUpload={(e) => handleFileUpload(e, 'creativeImg', (url) => handleSectionChange('creativeApproach', 'image', url))}
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Büyük Başlık (Satır atlamak için Enter'a basın)</label>
                  <textarea rows={3} value={aboutPageData?.creativeApproach?.title || ''} onChange={(e) => handleSectionChange('creativeApproach', 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise resize-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Uzun Açıklama Metni</label>
                  <textarea rows={5} value={aboutPageData?.creativeApproach?.desc || ''} onChange={(e) => handleSectionChange('creativeApproach', 'desc', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise resize-none" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. VİZYON & DEĞERLER (Video Fabrikası altı vs) */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-white/80">4. Ajans Değerleri (Alt Alan)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {aboutData.values.map((val, index) => (
                <div key={index} className="p-6 border border-white/10 rounded-xl bg-[#0A0A0A]">
                  <div className="mb-4 text-xs font-bold tracking-[0.2em] text-white/30 uppercase">Değer {index + 1}</div>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Başlık</label>
                      <input 
                        type="text" value={val.title} onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Açıklama</label>
                      <textarea 
                        value={val.desc} onChange={(e) => handleValueChange(index, 'desc', e.target.value)} rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-white/30 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
