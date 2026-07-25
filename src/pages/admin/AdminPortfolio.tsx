import React, { useEffect, useState } from 'react';
import { useCms, CmsData } from '../../context/CmsContext';
import { Save, Plus, Trash2, GripVertical, Upload, Image as ImageIcon } from 'lucide-react';
import { MediaRenderer } from '../../components/MediaRenderer';
import { uploadFile } from '../../utils/uploadFile';

export default function AdminPortfolio() {
  const { data, updateData } = useCms();
  const [formData, setFormData] = useState<CmsData['portfolio']>(data.portfolio);
  const [showToast, setShowToast] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    setFormData(data.portfolio);
  }, [data.portfolio]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ ...data, portfolio: formData });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleGeneralFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldPath: string, callback: (url: string) => void) => {
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

  // --- Category Handlers ---
  const handleCategoryChange = (index: number, value: string) => {
    setFormData(prev => {
      const newCategories = [...prev.categories];
      newCategories[index] = value;
      return { ...prev, categories: newCategories };
    });
  };

  const addCategory = () => {
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, 'Yeni Kategori']
    }));
  };

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  // --- Project Handlers ---
  const handleProjectChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
  };

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(`project${index}`);
    try {
      const url = await uploadFile(file);
      handleProjectChange(index, 'image', url);
    } catch (err) {
      alert("Dosya yüklenirken bir hata oluştu.");
    } finally {
      setUploadingField(null);
    }
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...prev.projects, 
        { 
          id: String(Date.now()), 
          title: 'Yeni Proje', 
          category: prev.categories[1] || 'Tasarım', 
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' 
        }
      ]
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
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
            <h2 className="text-3xl font-light mb-2">Portfolyo Yönetimi</h2>
            <p className="text-white/40 font-light">Kategorileri belirleyin ve ajansın imza attığı projeleri düzenleyin.</p>
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
                id="portfolioHeroBg" label="Arka Plan Görseli" currentImg={formData?.heroBg}
                onUpload={(e) => handleGeneralFileUpload(e, 'portfolioHeroBg', (url) => setFormData(prev => ({...prev, heroBg: url})))}
              />
            </div>
          </div>

          {/* 1. KATEGORİLER */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-cef-turquoise">1. Portfolyo Kategorileri</h3>
              <button type="button" onClick={addCategory} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" /> Yeni Kategori Ekle
              </button>
            </div>
            
            <p className="text-sm text-white/40 mb-6">"Tümünü Gör" ilk sırada kalmalıdır. Diğer kategorileri ekleyip silebilirsiniz.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.categories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input 
                    type="text" value={cat} onChange={(e) => handleCategoryChange(idx, e.target.value)}
                    className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-turquoise"
                    disabled={idx === 0} // İlk eleman Tümünü Gör
                  />
                  {idx !== 0 && (
                    <button type="button" onClick={() => removeCategory(idx)} className="text-white/30 hover:text-red-500 transition-colors p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2. PROJELER */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-cef-orange">2. Projeler (Galeri)</h3>
              <button type="button" onClick={addProject} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" /> Proje Ekle
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formData.projects.map((project, index) => (
                <div key={project.id} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl relative group flex flex-col gap-4">
                  <button 
                    type="button" onClick={() => removeProject(index)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 z-10"
                  >
                    <Trash2 size={14} />
                  </button>
                  
                  {/* Image Preview */}
                  <div className="w-full h-40 shrink-0 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center relative group/img">
                    {project.image ? (
                      <MediaRenderer src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={24} className="text-white/20" />
                    )}
                  </div>

                  <div className="grid gap-4 mt-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Proje Adı</label>
                      <input 
                        type="text" value={project.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-orange transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Kategori</label>
                      <select 
                        value={project.category} onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-orange transition-colors appearance-none"
                      >
                        {formData.categories.filter(c => c !== 'Tümünü Gör').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Görsel Yükle</label>
                      <label className="w-full cursor-pointer bg-[#0A0A0A] border border-white/10 rounded-lg py-2 px-3 text-sm hover:bg-white/5 transition-colors flex items-center justify-between group/upload">
                        <span className="truncate text-white/50 max-w-[150px] group-hover/upload:text-white transition-colors">
                          {uploadingField === `project${index}` ? 'Yükleniyor...' : (project.image ? 'Değiştir...' : 'Dosya Seç')}
                        </span>
                        <Upload size={14} className="text-white/50 group-hover/upload:text-white" />
                        <input 
                          type="file" 
                          accept="image/*,video/mp4,video/webm"
                          onChange={(e) => handleFileUpload(index, e)} 
                          className="hidden"
                          disabled={uploadingField === `project${index}`}
                        />
                      </label>
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
