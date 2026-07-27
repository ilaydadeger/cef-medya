import React, { useEffect, useState } from "react"
import { useCms, CmsData } from "../../context/CmsContext"
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"

export default function AdminFaq() {
  const { data, updateData } = useCms()
  const [formData, setFormData] = useState<CmsData["faq"]>(data.faq)
  const [showToast, setShowToast] = useState(false)
  const [expandedCat, setExpandedCat] = useState<number | null>(0)

  useEffect(() => {
    setFormData(data.faq)
  }, [data.faq])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateData({ ...data, faq: formData })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleCategoryChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newFaq = [...prev]
      newFaq[index].label = value
      return newFaq
    })
  }

  const handleQuestionChange = (
    catIndex: number,
    qIndex: number,
    field: "q" | "a",
    value: string,
  ) => {
    setFormData((prev) => {
      const newFaq = [...prev]
      newFaq[catIndex].items[qIndex][field] = value
      return newFaq
    })
  }

  const addCategory = () => {
    setFormData((prev) => [
      ...prev,
      { label: "Yeni Kategori", items: [{ q: "Soru?", a: "Cevap..." }] },
    ])
    setExpandedCat(formData.length)
  }

  const removeCategory = (index: number) => {
    setFormData((prev) => prev.filter((_, i) => i !== index))
    if (expandedCat === index) setExpandedCat(null)
  }

  const addQuestion = (catIndex: number) => {
    setFormData((prev) => {
      const newFaq = [...prev]
      newFaq[catIndex].items.push({ q: "Yeni Soru?", a: "Yeni cevap..." })
      return newFaq
    })
  }

  const removeQuestion = (catIndex: number, qIndex: number) => {
    setFormData((prev) => {
      const newFaq = [...prev]
      newFaq[catIndex].items.splice(qIndex, 1)
      return newFaq
    })
  }

  return (
    <div className="relative pb-20">
      <div
        className={`fixed top-6 right-6 bg-cef-turquoise text-[#0A0A0A] px-6 py-3 rounded-md shadow-2xl transition-all duration-500 z-50 ${
          showToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <p className="font-medium tracking-wide">
          Değişiklikler başarıyla kaydedildi!
        </p>
      </div>

      <div className="p-8 md:p-12 max-w-4xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-light mb-2">SSS Yönetimi</h2>
            <p className="text-white/40 font-light">
              Sıkça sorulan soruları ve kategorileri düzenleyin.
            </p>
          </div>
          <button
            type="button"
            onClick={addCategory}
            className="bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> Kategori Ekle
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-6">
            {formData.map((cat, catIndex) => (
              <div
                key={catIndex}
                className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden"
              >
                <div
                  className="p-6 flex items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() =>
                    setExpandedCat(expandedCat === catIndex ? null : catIndex)
                  }
                >
                  <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={cat.label}
                      onChange={(e) =>
                        handleCategoryChange(catIndex, e.target.value)
                      }
                      className="bg-transparent border-b border-white/10 focus:border-cef-turquoise py-1 text-lg font-medium outline-none transition-colors w-full md:w-1/2"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeCategory(catIndex)
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    {expandedCat === catIndex ? (
                      <ChevronUp size={20} className="text-white/50" />
                    ) : (
                      <ChevronDown size={20} className="text-white/50" />
                    )}
                  </div>
                </div>

                {expandedCat === catIndex && (
                  <div className="p-6 pt-0 border-t border-white/5 bg-[#0A0A0A]/50">
                    <div className="space-y-6 mt-6">
                      {cat.items.map((item, qIndex) => (
                        <div
                          key={qIndex}
                          className="relative group pl-6 border-l-2 border-cef-turquoise/30 hover:border-cef-turquoise transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => removeQuestion(catIndex, qIndex)}
                            className="absolute -right-2 top-0 w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="grid gap-4 pr-8">
                            <div>
                              <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">
                                Soru
                              </label>
                              <input
                                type="text"
                                value={item.q}
                                onChange={(e) =>
                                  handleQuestionChange(
                                    catIndex,
                                    qIndex,
                                    "q",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg py-2.5 px-4 text-sm outline-none focus:border-cef-turquoise transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">
                                Cevap
                              </label>
                              <textarea
                                value={item.a}
                                onChange={(e) =>
                                  handleQuestionChange(
                                    catIndex,
                                    qIndex,
                                    "a",
                                    e.target.value,
                                  )
                                }
                                rows={3}
                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg py-2.5 px-4 text-sm outline-none focus:border-cef-turquoise transition-colors resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addQuestion(catIndex)}
                      className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-cef-turquoise hover:text-white transition-colors"
                    >
                      <Plus size={14} /> Soru Ekle
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-6 sticky bottom-6 z-10">
            <button
              type="submit"
              className="bg-cef-orange text-white px-8 py-3 rounded-lg font-medium tracking-wide flex items-center gap-2 shadow-2xl hover:bg-opacity-90 transition-all active:scale-95"
            >
              <Save size={18} />
              Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
