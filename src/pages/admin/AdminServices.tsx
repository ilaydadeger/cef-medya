import React, { useEffect, useState } from 'react';
import { useCms, CmsData } from '../../context/CmsContext';
import { Save, Plus, Trash2, Upload } from 'lucide-react';
import { MediaRenderer } from '../../components/MediaRenderer';
import { uploadFile } from '../../utils/uploadFile';

export default function AdminServices() {
  const { data, updateData } = useCms();
  const [servicesData, setServicesData] = useState<CmsData['services']>(data.services);
  const [servicesPageData, setServicesPageData] = useState<CmsData['servicesPage']>(data.servicesPage);
  const [showToast, setShowToast] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    setServicesData(data.services);
    setServicesPageData(data.servicesPage);
  }, [data.services, data.servicesPage]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ ...data, services: servicesData, servicesPage: servicesPageData });
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
  const handleSectionChange = (section: keyof CmsData['servicesPage'], field: string, value: string) => {
    setServicesPageData(prev => ({
      ...prev,
      [section]: { ...(prev[section] as any), [field]: value }
    }));
  };

  // Strengths handlers
  const handleStrengthChange = (index: number, field: string, value: string) => {
    setServicesPageData(prev => {
      const newItems = [...prev.strengths.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, strengths: { ...prev.strengths, items: newItems } };
    });
  };

  const addStrength = () => {
    setServicesPageData(prev => ({
      ...prev,
      strengths: {
        ...prev.strengths,
        items: [...prev.strengths.items, { title: 'Yeni Güçlü Yön', image: '' }]
      }
    }));
  };

  const removeStrength = (index: number) => {
    setServicesPageData(prev => ({
      ...prev,
      strengths: {
        ...prev.strengths,
        items: prev.strengths.items.filter((_, i) => i !== index)
      }
    }));
  };

  // Services handlers
  const handleServiceChange = (index: number, field: string, value: string) => {
    setServicesData(prev => {
      const newServices = [...prev];
      newServices[index] = { ...newServices[index], [field]: value };
      return newServices;
    });
  };

  const handleServiceDetailChange = (index: number, field: string, value: string) => {
    setServicesData(prev => {
      const newServices = [...prev];
      const detail = newServices[index].detail ?? { tagline: '', intro: '', sections: [] };
      newServices[index] = { ...newServices[index], detail: { ...detail, [field]: value } };
      return newServices;
    });
  };

  const handleServiceSectionChange = (serviceIdx: number, secIdx: number, field: string, value: string) => {
    setServicesData(prev => {
      const newServices = [...prev];
      const detail = newServices[serviceIdx].detail ?? { sections: [] };
      const sections = [...(detail.sections ?? [])];
      sections[secIdx] = { ...sections[secIdx], [field]: value };
      newServices[serviceIdx] = { ...newServices[serviceIdx], detail: { ...detail, sections } };
      return newServices;
    });
  };

  const addServiceSection = (serviceIdx: number) => {
    setServicesData(prev => {
      const newServices = [...prev];
      const detail = newServices[serviceIdx].detail ?? { sections: [] };
      const sections = [...(detail.sections ?? []), { heading: 'Yeni Bölüm', body: '', img: '' }];
      newServices[serviceIdx] = { ...newServices[serviceIdx], detail: { ...detail, sections } };
      return newServices;
    });
  };

  const removeServiceSection = (serviceIdx: number, secIdx: number) => {
    setServicesData(prev => {
      const newServices = [...prev];
      const detail = newServices[serviceIdx].detail ?? { sections: [] };
      const sections = (detail.sections ?? []).filter((_, i) => i !== secIdx);
      newServices[serviceIdx] = { ...newServices[serviceIdx], detail: { ...detail, sections } };
      return newServices;
    });
  };

  const addService = () => {
    setServicesData(prev => [...prev, { title: 'Yeni Hizmet', desc: 'Hizmet açıklaması...', detail: { tagline: '', intro: '', sections: [] } }]);
  };

  const removeService = (index: number) => {
    setServicesData(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative pb-32">
      <div className={`fixed top-6 right-6 bg-cef-turquoise text-[#0A0A0A] px-6 py-3 rounded-md shadow-2xl transition-all duration-500 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <p className="font-medium tracking-wide">Değişiklikler başarıyla kaydedildi!</p>
      </div>

      <div className="p-8 md:p-12 max-w-5xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-light mb-2">Hizmetler Sayfası Yönetimi</h2>
            <p className="text-white/40 font-light">Ajansın sunduğu tüm hizmet başlıklarını, görsellerini ve içeriklerini yönetin.</p>
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
                id="servicesHeroBg" label="Arka Plan Görseli" currentImg={servicesPageData?.heroBg}
                onUpload={(e) => handleFileUpload(e, 'servicesHeroBg', (url) => setServicesPageData(prev => ({...prev, heroBg: url})))}
              />
            </div>
          </div>

          {/* 1. HOŞGELDİNİZ (GİRİŞ) */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-orange">1. Hoşgeldiniz Alanı</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Üst Başlık (Örn: Hoşgeldiniz)</label>
                  <input type="text" value={servicesPageData?.intro?.subtitle || ''} onChange={(e) => handleSectionChange('intro', 'subtitle', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Büyük Başlık</label>
                  <textarea rows={2} value={servicesPageData?.intro?.title || ''} onChange={(e) => handleSectionChange('intro', 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange resize-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Açıklama</label>
                  <textarea rows={4} value={servicesPageData?.intro?.desc || ''} onChange={(e) => handleSectionChange('intro', 'desc', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange resize-none" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5">
                  <FileUploadButton 
                    id="introImg1" label="Sağ Üst Görsel (Geniş)" currentImg={servicesPageData?.intro?.img1}
                    onUpload={(e) => handleFileUpload(e, 'introImg1', (url) => handleSectionChange('intro', 'img1', url))}
                  />
                </div>
                <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5">
                  <FileUploadButton 
                    id="introImg2" label="Sağ Alt Görsel (Geniş)" currentImg={servicesPageData?.intro?.img2}
                    onUpload={(e) => handleFileUpload(e, 'introImg2', (url) => handleSectionChange('intro', 'img2', url))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. HİZMETLER KARTLARI */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-white/80">2. Hizmet Kartları (Grid)</h3>
              <button type="button" onClick={addService} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" /> Yeni Kart Ekle
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {servicesData.map((service, index) => (
                <div key={index} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl relative group">
                  <button type="button" onClick={() => removeService(index)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20">
                    <Trash2 size={14} />
                  </button>
                  <div className="mb-4 text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Kart {index + 1}</div>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Başlık</label>
                      <input type="text" value={service.title} onChange={(e) => handleServiceChange(index, 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm outline-none focus:border-white/30 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Kısa Açıklama</label>
                      <textarea value={service.desc} onChange={(e) => handleServiceChange(index, 'desc', e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm outline-none focus:border-white/30 transition-colors resize-none" />
                    </div>

                    {/* Detay Sayfası Alanları */}
                    <div className="border-t border-white/10 pt-4 mt-2">
                      <p className="text-[10px] uppercase tracking-widest text-cef-orange mb-4">Detay Sayfası İçeriği</p>
                      <div className="grid gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Tagline (Büyük Başlık)</label>
                          <input type="text" value={service.detail?.tagline ?? ''} onChange={(e) => handleServiceDetailChange(index, 'tagline', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-orange" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Giriş Metni</label>
                          <textarea value={service.detail?.intro ?? ''} onChange={(e) => handleServiceDetailChange(index, 'intro', e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-orange resize-none" />
                        </div>

                        {/* Bölümler */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40">Bölümler (Faz)</label>
                            <button type="button" onClick={() => addServiceSection(index)} className="flex items-center gap-1 text-white/40 hover:text-white text-[10px] transition-colors">
                              <Plus size={10} /> Bölüm Ekle
                            </button>
                          </div>
                          <div className="space-y-3">
                            {(service.detail?.sections ?? []).map((sec, si) => (
                              <div key={si} className="bg-white/[0.03] border border-white/10 p-3 rounded-lg relative">
                                <button type="button" onClick={() => removeServiceSection(index, si)} className="absolute top-2 right-2 text-white/20 hover:text-red-500 transition-colors">
                                  <Trash2 size={12} />
                                </button>
                                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Faz {si + 1} Başlık</label>
                                <input type="text" value={sec.heading} onChange={(e) => handleServiceSectionChange(index, si, 'heading', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded py-1.5 px-3 text-xs outline-none focus:border-white/30 mb-2" />
                                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Faz {si + 1} Açıklama</label>
                                <textarea value={sec.body} onChange={(e) => handleServiceSectionChange(index, si, 'body', e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded py-1.5 px-3 text-xs outline-none focus:border-white/30 resize-none mb-2" />
                                <FileUploadButton
                                  id={`sec-img-${index}-${si}`}
                                  label="Bölüm Görseli (isteğe bağlı)"
                                  currentImg={sec.img}
                                  onUpload={(e) => handleFileUpload(e, `sec-img-${index}-${si}`, (url) => handleServiceSectionChange(index, si, 'img', url))}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. FIRSATLAR */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-turquoise">3. Fırsatlar Alanı</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Başlık</label>
                <input type="text" value={servicesPageData?.opportunities?.title || ''} onChange={(e) => handleSectionChange('opportunities', 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Açıklama</label>
                <textarea rows={4} value={servicesPageData?.opportunities?.desc || ''} onChange={(e) => handleSectionChange('opportunities', 'desc', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise resize-none" />
              </div>
            </div>
          </div>

          {/* 4. SİZLERİ ŞAŞIRTMAYI SEVİYORUZ (VİDEOLU ALAN) */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-orange">4. Şaşırtmayı Seviyoruz (Video Yanı)</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5 self-start">
                <FileUploadButton 
                  id="surpriseImg" label="Sol Taraftaki Video Kapak Görseli" currentImg={servicesPageData?.surprise?.videoPlaceholder}
                  onUpload={(e) => handleFileUpload(e, 'surpriseImg', (url) => handleSectionChange('surprise', 'videoPlaceholder', url))}
                />
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Başlık</label>
                  <textarea rows={2} value={servicesPageData?.surprise?.title || ''} onChange={(e) => handleSectionChange('surprise', 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange resize-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Metin 1 (Üst Paragraf)</label>
                  <textarea rows={3} value={servicesPageData?.surprise?.desc1 || ''} onChange={(e) => handleSectionChange('surprise', 'desc1', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange resize-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Metin 2 (Alt Paragraf)</label>
                  <textarea rows={3} value={servicesPageData?.surprise?.desc2 || ''} onChange={(e) => handleSectionChange('surprise', 'desc2', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-orange resize-none" />
                </div>
              </div>
            </div>
          </div>

          {/* 5. GÜÇLÜ YÖNLERİMİZ */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-white/80">5. Güçlü Yönlerimiz (Fotoğraflı Grid)</h3>
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Ana Başlık</label>
              <input type="text" value={servicesPageData?.strengths?.title || ''} onChange={(e) => handleSectionChange('strengths', 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-white/30" />
            </div>

            <div className="flex justify-between items-center mb-6 mt-8 border-t border-white/5 pt-6">
              <h4 className="text-lg font-medium text-white/60">Görseller</h4>
              <button type="button" onClick={addStrength} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" /> Yeni Ekle
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicesPageData?.strengths?.items?.map((item, index) => (
                <div key={index} className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl relative group">
                  <button type="button" onClick={() => removeStrength(index)} className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 z-10">
                    <Trash2 size={14} />
                  </button>
                  <div className="mb-4">
                    <FileUploadButton 
                      id={`strengthImg${index}`} label={`Görsel ${index + 1}`} currentImg={item.image}
                      onUpload={(e) => handleFileUpload(e, `strengthImg${index}`, (url) => handleStrengthChange(index, 'image', url))}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Görsel Altı Başlık</label>
                    <input type="text" value={item.title} onChange={(e) => handleStrengthChange(index, 'title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-white/30 transition-colors" />
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
