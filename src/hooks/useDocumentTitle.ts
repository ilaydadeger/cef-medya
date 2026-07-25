import { useEffect } from 'react';
import { useCms } from '../context/CmsContext';

export function useDocumentTitle(title: string) {
  const { data } = useCms();

  useEffect(() => {
    // Sitenin ana ismini CmsContext'ten (veritabanından) al
    const baseTitle = data.general.siteTitle || 'Cef Medya';
    
    // Eğer başlık verilmişse "Cef Medya | Başlık", verilmemişse sadece "Cef Medya" yap
    document.title = title ? `${baseTitle} | ${title}` : baseTitle;
  }, [title, data.general.siteTitle]);
}
