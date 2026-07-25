import React, { useEffect, useState } from 'react';
import { useCms, CmsData } from '../../context/CmsContext';
import { Save, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { MediaRenderer } from '../../components/MediaRenderer';
import { uploadFile } from '../../utils/uploadFile';

export default function AdminTeam() {
  const { data, updateData } = useCms();
  const [teamData, setTeamData] = useState<CmsData['team']>(data.team);
  const [teamPageData, setTeamPageData] = useState<CmsData['teamPage']>(data.teamPage);
  const [showToast, setShowToast] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    setTeamData(data.team);
    setTeamPageData(data.teamPage);
  }, [data.team, data.teamPage]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ ...data, team: teamData, teamPage: teamPageData });
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

  const handleSectionChange = (field: string, value: string) => {
    setTeamPageData(prev => ({
      ...prev,
      intro: { ...prev.intro, [field]: value }
    }));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    setTeamData(prev => {
      const newTeam = [...prev];
      newTeam[index] = { ...newTeam[index], [field]: value };
      return newTeam;
    });
  };

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingField(`member${index}`);
    try {
      const url = await uploadFile(file);
      handleMemberChange(index, 'image', url);
    } catch (err) {
      alert("Dosya yüklenirken bir hata oluştu.");
    } finally {
      setUploadingField(null);
    }
  };

  const addMember = () => {
    setTeamData(prev => [...prev, { name: 'Yeni Üye', role: 'Unvan', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800' }]);
  };

  const removeMember = (index: number) => {
    setTeamData(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative pb-32">
      <div className={`fixed top-6 right-6 bg-cef-turquoise text-[#0A0A0A] px-6 py-3 rounded-md shadow-2xl transition-all duration-500 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <p className="font-medium tracking-wide">Değişiklikler başarıyla kaydedildi!</p>
      </div>

      <div className="p-8 md:p-12 max-w-5xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-light mb-2">Ekibimiz Yönetimi</h2>
            <p className="text-white/40 font-light">Sayfa girişini ve ekip üyelerini düzenleyin.</p>
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
                id="teamHeroBg" label="Arka Plan Görseli" currentImg={teamPageData?.heroBg}
                onUpload={(e) => handleGeneralFileUpload(e, 'teamHeroBg', (url) => setTeamPageData(prev => ({...prev, heroBg: url})))}
              />
            </div>
          </div>

          {/* 1. GİRİŞ (PROFESYONEL KADRO) */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 text-cef-turquoise">1. Sayfa Girişi (Profesyonel Kadro)</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Üst Başlık (Örn: PROFESYONEL KADRO)</label>
                <input type="text" value={teamPageData?.intro?.subtitle || ''} onChange={(e) => handleSectionChange('subtitle', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Büyük Başlık (Satır atlamak için Enter'a basın)</label>
                <textarea rows={2} value={teamPageData?.intro?.title || ''} onChange={(e) => handleSectionChange('title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise resize-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Açıklama (Metin)</label>
                <textarea rows={5} value={teamPageData?.intro?.desc || ''} onChange={(e) => handleSectionChange('desc', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-cef-turquoise resize-none" />
              </div>
            </div>
          </div>

          {/* 2. EKİP ÜYELERİ */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-cef-orange">2. Ekip Üyeleri</h3>
              <p className="text-white/50 text-sm">Sayfanın alt kısmında listelenecek ekip üyeleri.</p>
              <button type="button" onClick={addMember} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" /> Yeni Üye Ekle
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {teamData.map((member, index) => (
                <div key={index} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl relative group flex flex-col sm:flex-row gap-6">
                  <button 
                    type="button" onClick={() => removeMember(index)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 z-10"
                  >
                    <Trash2 size={14} />
                  </button>
                  
                  {/* Image Preview & Upload */}
                  <div className="flex flex-col gap-3 shrink-0">
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center relative">
                      {member.image ? (
                        <MediaRenderer src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={24} className="text-white/20" />
                      )}
                    </div>
                    <label className="text-[10px] uppercase tracking-widest text-white/50 cursor-pointer text-center hover:text-cef-orange transition-colors">
                      {uploadingField === `member${index}` ? 'Yükleniyor...' : 'Görsel Seç'}
                      <input type="file" accept="image/*,video/mp4,video/webm" className="hidden" onChange={(e) => handleFileUpload(index, e)} disabled={uploadingField === `member${index}`} />
                    </label>
                  </div>

                  <div className="flex-1 grid gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Ad Soyad</label>
                      <input 
                        type="text" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-orange transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Unvan</label>
                      <input 
                        type="text" value={member.role} onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm outline-none focus:border-cef-orange transition-colors"
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
