import React, { useEffect, useState } from 'react';
import { useCms, CmsData } from '../../context/CmsContext';
import { Save, Plus, Trash2, GripVertical, Upload } from 'lucide-react';
import { MediaRenderer } from '../../components/MediaRenderer';
import { uploadFile } from '../../utils/uploadFile';

export default function AdminHome() {
  const { data, updateData } = useCms();
  const [formData, setFormData] = useState<CmsData['home']>(data.home);
  const [showToast, setShowToast] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    setFormData(data.home);
  }, [data.home]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ ...data, home: formData });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // --- File Upload Helper ---
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

  // --- Nested Handlers ---
  const handleHeroItemChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newItems = [...prev.heroItems];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, heroItems: newItems };
    });
  };

  const handleNelerYapiyoruzChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, nelerYapiyoruz: { ...prev.nelerYapiyoruz, [name]: value } }));
  };

  const handleFounderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, founder: { ...prev.founder, [name]: value } }));
  };

  const handleStepChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newSteps = [...prev.videoSteps];
      newSteps[index] = { ...newSteps[index], [field]: value };
      return { ...prev, videoSteps: newSteps };
    });
  };

  const handleStepItemChange = (stepIndex: number, itemIndex: number, value: string) => {
    setFormData(prev => {
      const newSteps = [...prev.videoSteps];
      const newItems = [...newSteps[stepIndex].items];
      newItems[itemIndex] = value;
      newSteps[stepIndex].items = newItems;
      return { ...prev, videoSteps: newSteps };
    });
  };

  const addStepItem = (stepIndex: number) => {
    setFormData(prev => {
      const newSteps = [...prev.videoSteps];
      newSteps[stepIndex].items.push('');
      return { ...prev, videoSteps: newSteps };
    });
  };

  const removeStepItem = (stepIndex: number, itemIndex: number) => {
    setFormData(prev => {
      const newSteps = [...prev.videoSteps];
      newSteps[stepIndex].items.splice(itemIndex, 1);
      return { ...prev, videoSteps: newSteps };
    });
  };

  return (
    <div className="relative pb-32">
      {/* Toast Notification */}
      <div className={`fixed top-6 right-6 bg-cef-turquoise text-[#0A0A0A] px-6 py-3 rounded-md shadow-2xl transition-all duration-500 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <p className="font-medium tracking-wide">Değişiklikler başarıyla kaydedildi!</p>
      </div>

      <div className="p-8 md:p-12 max-w-5xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-light mb-2">Anasayfa Yönetimi</h2>
            <p className="text-white/40 font-light">Hero, Hizmetler, Kurucu ve Rakamlar bölümlerini düzenleyin.</p>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-cef-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(233,78,27,0.3)]"
          >
            <Save className="w-5 h-5" /> Kaydet
          </button>
        </div>

        <form className="space-y-12">
          
          {/* 1. HERO SECTION */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-orange">1. Hero Alanı (Üst Kısım 4'lü Kutu)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {formData.heroItems?.map((item, idx) => (
                <div key={idx} className="bg-[#0A0A0A] p-6 border border-white/5 rounded-xl space-y-4">
                  <h4 className="text-white/70 font-medium">Kutu {idx + 1}</h4>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Kutu Başlığı</label>
                    <input 
                      type="text" value={item.title} onChange={(e) => handleHeroItemChange(idx, 'title', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Vurgu Rengi</label>
                    <select 
                      value={item.accent} onChange={(e) => handleHeroItemChange(idx, 'accent', e.target.value)}
                      className="w-full bg-[#111] border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-orange transition-colors text-white"
                    >
                      <option value="orange">Turuncu</option>
                      <option value="turquoise">Turkuaz</option>
                    </select>
                  </div>
                  <FileUploadButton 
                    id={`heroImg_${idx}`} label="Arkaplan Resmi" currentImg={item.bgImg}
                    onUpload={(e) => handleFileUpload(e, `heroImg_${idx}`, (url) => handleHeroItemChange(idx, 'bgImg', url))}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 2. NELER YAPIYORUZ */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-turquoise">2. Neler Yapıyoruz Alanı</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Alt Başlık (Örn: Neler Yapıyoruz)</label>
                  <input type="text" name="subtitle" value={formData.nelerYapiyoruz?.subtitle} onChange={handleNelerYapiyoruzChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Ana Başlık (Normal Metin 1)</label>
                  <input type="text" name="titleMain" value={formData.nelerYapiyoruz?.titleMain} onChange={handleNelerYapiyoruzChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Ana Başlık (Vurgulu Turuncu Kelime)</label>
                  <input type="text" name="titleAccent" value={formData.nelerYapiyoruz?.titleAccent} onChange={handleNelerYapiyoruzChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Ana Başlık (Normal Metin 2)</label>
                  <input type="text" name="titleEnd" value={formData.nelerYapiyoruz?.titleEnd} onChange={handleNelerYapiyoruzChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Açıklama Paragrafı 1</label>
                  <textarea name="desc1" rows={4} value={formData.nelerYapiyoruz?.desc1} onChange={handleNelerYapiyoruzChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise resize-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Açıklama Paragrafı 2</label>
                  <textarea name="desc2" rows={3} value={formData.nelerYapiyoruz?.desc2} onChange={handleNelerYapiyoruzChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise resize-none" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5">
                  <FileUploadButton 
                    id="nelerImg1" label="Sol İnce Uzun Resim" currentImg={formData.nelerYapiyoruz?.img1}
                    onUpload={(e) => handleFileUpload(e, 'nelerImg1', (url) => setFormData(p => ({...p, nelerYapiyoruz: {...p.nelerYapiyoruz, img1: url}})))}
                  />
                </div>
                <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5">
                  <FileUploadButton 
                    id="nelerImg2" label="Sağ Kare Resim" currentImg={formData.nelerYapiyoruz?.img2}
                    onUpload={(e) => handleFileUpload(e, 'nelerImg2', (url) => setFormData(p => ({...p, nelerYapiyoruz: {...p.nelerYapiyoruz, img2: url}})))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. KURUCU VİZYONU */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-white/80">3. Kurucu Vizyonu</h3>
            <div className="grid gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Merkezdeki Büyük Söz ("GURURUDUR" kelimesi turuncu olur)</label>
                <textarea name="quote" rows={2} value={formData.founder?.quote} onChange={handleFounderChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-white/30 resize-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Arkaplandaki İngilizce Yazı (Devasa Transparan Metin)</label>
                <textarea name="backgroundTextEn" rows={2} value={formData.founder?.backgroundTextEn} onChange={handleFounderChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-white/30 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">İsim Soyisim</label>
                  <input type="text" name="name" value={formData.founder?.name} onChange={handleFounderChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-white/30" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Unvan</label>
                  <input type="text" name="role" value={formData.founder?.role} onChange={handleFounderChange} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-white/30" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. RAKAMLARLA BİZ */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-orange">4. Rakamlarla Biz Alanı</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5">
                <FileUploadButton 
                  id="statsImg1" label="Sol Üst Resim (Dikey)" currentImg={formData.stats?.img1}
                  onUpload={(e) => handleFileUpload(e, 'statsImg1', (url) => setFormData(p => ({...p, stats: {...p.stats, img1: url}})))}
                />
              </div>
              <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5">
                <FileUploadButton 
                  id="statsImg2" label="Sağ Alt Resim (Kare)" currentImg={formData.stats?.img2}
                  onUpload={(e) => handleFileUpload(e, 'statsImg2', (url) => setFormData(p => ({...p, stats: {...p.stats, img2: url}})))}
                />
              </div>
            </div>
          </div>

          {/* 5. VIDEO FABRİKASI */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-turquoise">5. Video Fabrikası (4 Adımlı Akış)</h3>
            
            <div className="space-y-12">
              {formData.videoSteps?.map((step, stepIndex) => (
                <div key={stepIndex} className="bg-[#0A0A0A] p-6 border border-white/5 rounded-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                      {stepIndex + 1}
                    </span>
                    <h4 className="text-lg text-white/80 font-medium">Adım Düzenle</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Adım Etiketi</label>
                      <input 
                        type="text" value={step.step} onChange={(e) => handleStepChange(stepIndex, 'step', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-turquoise"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Başlık</label>
                      <input 
                        type="text" value={step.title} onChange={(e) => handleStepChange(stepIndex, 'title', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-turquoise"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Kısa Açıklama</label>
                      <input 
                        type="text" value={step.desc} onChange={(e) => handleStepChange(stepIndex, 'desc', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-turquoise"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Alt Maddeler</label>
                    <div className="space-y-3">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-cef-turquoise/50 shrink-0" />
                          <input 
                            type="text" value={item} onChange={(e) => handleStepItemChange(stepIndex, itemIndex, e.target.value)}
                            className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-turquoise"
                          />
                          <button type="button" onClick={() => removeStepItem(stepIndex, itemIndex)} className="text-white/30 hover:text-red-500 transition-colors p-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={() => addStepItem(stepIndex)} className="mt-4 flex items-center gap-2 text-cef-turquoise hover:text-white transition-colors text-sm font-medium">
                      <Plus className="w-4 h-4" /> Madde Ekle
                    </button>
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
