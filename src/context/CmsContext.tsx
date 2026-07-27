import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

export interface CmsData {
  general: {
    siteTitle: string
    logoText: string
    faviconUrl: string
    contact: {
      address: string
      phone: string
      email: string
    }
    socialLinks: {
      instagram: string
      linkedin: string
      twitter: string
      youtube: string
    }
  }
  home: {
    heroTitle: string
    heroSubtitle: string
    heroItems: { title: string; bgImg: string; accent: "orange" | "turquoise" }[]
    nelerYapiyoruz: {
      subtitle: string
      titleMain: string
      titleAccent: string
      titleEnd: string
      desc1: string
      desc2: string
      img1: string
      img2: string
    }
    showcaseVideo: string
    videoSteps: { step: string; title: string; desc: string; items: string[] }[]
    founder: {
      quote: string
      backgroundTextEn: string
      name: string
      role: string
    }
    stats: {
      img1: string
      img2: string
    }
    socialFollow: {
      title: string
      boxes: { image: string; link: string }[]
    }
  }
  about: {
    mission: string
    vision: string
    values: { title: string; desc: string }[]
  }
  faqPage: {
    heroBg: string
  }
  aboutPage: {
    heroBg: string
    modernDesign: {
      subtitle: string
      title: string
      image: string
    }
    videoUrl: string
    brands: { image: string; name: string }[]
    creativeApproach: {
      title: string
      desc: string
      image: string
    }
  }
  servicesPage: {
    heroBg: string
    intro: {
      subtitle: string
      title: string
      desc: string
      img1: string
      img2: string
    }
    opportunities: {
      title: string
      desc: string
    }
    surprise: {
      title: string
      desc1: string
      desc2: string
      videoPlaceholder: string
    }
    strengths: {
      title: string
      items: { title: string; image: string }[]
    }
  }
  services: {
    title: string
    desc: string
    detail?: {
      tagline?: string
      intro?: string
      sections?: { heading: string; body: string; img?: string }[]
    }
  }[]
  teamPage: {
    heroBg: string
    intro: {
      subtitle: string
      title: string
      desc: string
    }
  }
  team: {
    name: string
    role: string
    image: string
  }[]
  faq: {
    label: string
    items: { q: string; a: string }[]
  }[]
  portfolio: {
    heroBg: string
    categories: string[]
    projects: {
      id: string
      title: string
      category: string
      image: string
      detail?: {
        tagline?: string
        intro?: string
        sections: {
          heading: string
          body: string
          img?: string
        }[]
      }
    }[]
  }
}

export const defaultCmsData: CmsData = {
  general: {
    siteTitle: "Cef Medya",
    logoText: "Cef Medya",
    faviconUrl: "",
    contact: {
      address:
        "Müslhittin, Cemal Karamuğla Sk. No:50, 48000 Muğla Merkez/Muğla",
      phone: "0 (252) 213 14 21",
      email: "info@cefmedya.com",
    },
    socialLinks: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
      youtube: "#",
    },
  },
  faqPage: {
    heroBg:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
  },
  home: {
    heroTitle: "Markanızı Geleceğe Taşıyın.",
    heroSubtitle:
      "Cef Medya ile dijital dünyada izinizi bırakın. Strateji, tasarım ve teknolojiyi birleştirerek markanızı büyütüyoruz.",
    heroItems: [
      {
        title: "Grafik Tasarım",
        bgImg:
          "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
        accent: "turquoise",
      },
      {
        title: "Video Prodüksiyon",
        bgImg:
          "https://images.unsplash.com/photo-1590102604515-bb821db265e3?q=80&w=2070&auto=format&fit=crop",
        accent: "orange",
      },
      {
        title: "Profesyonel Çekim",
        bgImg:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2064&auto=format&fit=crop",
        accent: "orange",
      },
      {
        title: "Sosyal Medya",
        bgImg:
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
        accent: "turquoise",
      },
    ],
    nelerYapiyoruz: {
      subtitle: "Neler Yapıyoruz",
      titleMain: "Kameralarla anlattığımız hikayeler",
      titleAccent: "yaratıcı",
      titleEnd: "ekibimizin bir yansımasıdır.",
      desc1:
        "Her proje benzersiz bir vizyonla doğar. Stüdyomuz, sıradanı aşan prodüksiyon kalitesiyle markaların özünü yakalar ve onları görsel bir şölene dönüştürür.",
      desc2:
        "Tasarım disiplinimiz sakin, ölçülü ve her zaman detaylarda gizli mükemmelliği arar. Yapaylıktan uzak, gerçek hikayeler üretiyoruz.",
      img1: "https://images.unsplash.com/photo-1579294520038-f93339180735?auto=format&fit=crop&q=80&w=800",
      img2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    },
    showcaseVideo: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    videoSteps: [
      {
        step: "1. ADIM",
        title: "Senaryo & Prompt",
        desc: "Projenizin temel taşı atılıyor.",
        items: [
          "Hedef kitle analizi",
          "Hikaye kurgusu",
          "Görsel referansların belirlenmesi",
        ],
      },
      {
        step: "2. ADIM",
        title: "Çekim & Prodüksiyon",
        desc: "Fikirler gerçeğe dönüşüyor.",
        items: [
          "Profesyonel ekipmanlarla çekim",
          "Mekan ve ışık yönetimi",
          "Yüksek kaliteli ham kayıt",
        ],
      },
      {
        step: "3. ADIM",
        title: "Kurgu & Post-Prod.",
        desc: "Görseller işlenip ritim buluyor.",
        items: [
          "Renk düzenlemesi (Color Grading)",
          "Ses miksajı ve efektler",
          "Dinamik geçişler ve montaj",
        ],
      },
      {
        step: "4. ADIM",
        title: "Yayın & Dağıtım",
        desc: "Eseriniz dünyayla buluşuyor.",
        items: [
          "Platformlara özel formatlama",
          "SEO uyumlu başlık ve metinler",
          "Performans takibi ve analiz",
        ],
      },
    ],
    founder: {
      quote:
        "Animasyon, grafik ve dijital prodüksiyon alanında ustalığın gururudur.",
      backgroundTextEn:
        "ANIMATION, GRAPHICS AND DIGITAL PRODUCTION, CRAFTED WITH BRILLIANCE, LOVE, AND CARE.",
      name: "Cemal DÜLGER",
      role: "Kurucu",
    },
    stats: {
      img1: "https://images.unsplash.com/photo-1595859702674-1776cece0043?q=80&w=2074&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1621516248386-b4bc2fde1e27?q=80&w=1969&auto=format&fit=crop",
    },
    socialFollow: {
      title: "Sosyal Medyadan Bizi Takip Edin",
      boxes: [
        { image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop", link: "#" },
        { image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=2061&auto=format&fit=crop", link: "#" },
        { image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop", link: "#" }
      ]
    },
  },
  about: {
    mission:
      "Markaların dijital dünyadaki varlıklarını güçlendirmek için yenilikçi, estetik ve işlevsel çözümler sunmak.",
    vision:
      "Sektördeki en iyi görsel iletişim ajansı olmak, yaratıcılığı teknolojiyle birleştirerek sınırları zorlamak.",
    values: [
      {
        title: "Strateji",
        desc: "Markanızın hedeflerine ulaşması için veriye dayalı, yaratıcı rotalar çiziyoruz.",
      },
      {
        title: "Tasarım",
        desc: "Estetik ve fonksiyonu birleştirerek dijital dünyada iz bırakan arayüzler kurguluyoruz.",
      },
      {
        title: "Prodüksiyon",
        desc: "Sinematik kalite standartlarında yüksek etkileşimli görsel hikayeler üretiyoruz.",
      },
    ],
  },
  aboutPage: {
    heroBg:
      "https://images.unsplash.com/photo-1576280314550-773c50583407?auto=format&fit=crop&q=80&w=1920",
    modernDesign: {
      subtitle: "MODERN TASARIM",
      title: "Dijital geleceği \n sizin için tasarlıyor \n ve yaratıyoruz.",
      image:
        "https://images.unsplash.com/photo-1699621106755-4fe40ce95d64?auto=format&fit=crop&q=80&w=1080",
    },
    videoUrl: "",
    brands: [
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        name: "gotha",
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        name: "logo2",
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        name: "MAG NET",
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        name: "magnus",
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        name: "moon",
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        name: "Opilgo",
      },
    ],
    creativeApproach: {
      title: "YARATICI YAKLAŞIM",
      desc: "Her marka bir hikaye anlatır. Bizim işimiz, bu hikayeyi en çarpıcı görsellerle, akılda kalıcı anlarla ve yenilikçi teknolojilerle hayata geçirmek. Fikirden yayına kadar her aşamada estetik ve etki odaklı çalışıyoruz.",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    },
  },
  servicesPage: {
    heroBg:
      "https://images.unsplash.com/photo-1611784728558-6c7d9b409cdf?auto=format&fit=crop&q=80&w=1920",
    intro: {
      subtitle: "HOŞGELDİNİZ",
      title: "Sınırları zorlayan yaratıcı çözümler.",
      desc: "Digital markanızı oluştururken, markanızın benzersiz kimliğini ve değerlerini öne çıkaran etkili stratejiler geliştiriyoruz. Görsel tasarımdan içerik üretimine, sosyal medya yönetiminden web geliştirmeye kadar geniş bir yelpazede entegre çözümler sunarak dijital varlığınızı güçlendiriyoruz.",
      img1: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      img2: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    },
    opportunities: {
      title: "Fırsatlar",
      desc: "Sizlere, dijital baskı, logo tasarımı, katalog tasarımı, ürün çekimleri ve sosyal medya yönetimi gibi birçok farklı hizmeti entegre bir şekilde sunmanın avantajlarını sunuyoruz. Tek bir noktadan markanızın tüm görsel ve dijital ihtiyaçlarını karşılıyor, tutarlı ve etkili bir marka imajı inşa etmenizi sağlıyoruz.",
    },
    surprise: {
      title: "Sizleri şaşırtmayı seviyoruz",
      desc1: "İz bırakmak isteyen markalar için çalışıyoruz.",
      desc2: "Sıradanlığı reddediyor, her projede yeniden keşfediyoruz.",
      videoPlaceholder:
        "https://images.unsplash.com/photo-1535016120720-40c746a46dc6?q=80&w=2070&auto=format&fit=crop",
    },
    strengths: {
      title: "Güçlü Yönlerimiz",
      items: [
        {
          title: "Animation",
          image:
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Commercial",
          image:
            "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Music Videos",
          image:
            "https://images.unsplash.com/photo-1598387181032-a310322db565?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Movies",
          image:
            "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2070&auto=format&fit=crop",
        },
      ],
    },
  },
  services: [
    {
      title: "Marka Kimliği",
      desc: "Sizi rakiplerinizden ayıracak güçlü bir görsel dil.",
      detail: {
        tagline:
          "Markanız sadece bir logo değil — bir his, bir duruş, bir vaattir.",
        intro:
          "CEF Medya olarak her marka kimliği projesine derin bir stratejik analiz ve yaratıcı keşifle başlarız. Renk, form, tipografi ve ton sesini harmanlayarak markanızı tek bir bakışta tanınır hale getiriyoruz. Yıllar içinde onlarca işletmenin kimliğini sıfırdan inşa ettik; her birinde markanın özünü bulmak için zaman harcadık.",
        sections: [
          {
            heading: "Stratejik Brifing & Keşif",
            body: 'Rekabetçi ortam analizi, hedef kitle profili çıkarma ve marka konumlandırma çalışmasıyla başlarız. Markanızın "neden"ini bulduktan sonra görsel dili şekillendiririz. Bu aşamada sizinle yüz yüze atölye çalışmaları yaparak ortak bir vizyon inşa ederiz.',
            img: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2070&auto=format&fit=crop",
          },
          {
            heading: "Logo & Görsel Sistem Tasarımı",
            body: "En az üç farklı konsept yönü geliştiriliyor, her biri farklı bir duygusal zemine oturuyor. Seçilen yön; birincil logo, varyasyonlar, renk paleti, tipografi seti ve baskı uygulamalarına dönüştürülüyor. Tüm dosyalar vektör formatında ve gelecekte kolayca güncellenebilecek şekilde teslim ediliyor.",
            img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop",
          },
          {
            heading: "Marka Kılavuzu & Teslim",
            body: "Logo kullanım kuralları, renk kodları (CMYK / RGB / HEX / Pantone), font lisansları ve uygulama örnekleriyle hazırlanan kapsamlı marka kılavuzu PDF ve dijital formatlarda teslim edilir. Böylece tüm mecralarda tutarlı bir görünüm sağlanır.",
            img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop",
          },
        ],
      },
    },
    {
      title: "Web Tasarım",
      desc: "Kullanıcı dostu, modern ve performanslı arayüzler.",
      detail: {
        tagline: "İlk tıklamadan dönüşüme uzanan dijital bir deneyim.",
        intro:
          "Bir web sitesi, markanızın 7/24 açık olan vitrinidir. CEF Medya olarak tasarladığımız her site; hız, estetik ve kullanıcı deneyimini bir arada sunacak şekilde kurgulanır. Mobil öncelikli yaklaşımımız ve SEO uyumlu altyapımızla dijital varlığınızı rakiplerinizin önüne taşıyoruz.",
        sections: [
          {
            heading: "UX Araştırması & Wireframe",
            body: "Kullanıcı yolculukları haritalandırılır, rakip siteleri analiz edilir ve sayfa yapısı (wireframe) oluşturulur. Bu aşamada içerik hiyerarşisi ve dönüşüm odaklı yerleşim planlanır. Ziyaretçiyi doğru yönlendiren bir mimari kurulmadan hiçbir piksel tasarlanmaz.",
            img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
          },
          {
            heading: "Görsel Tasarım & Prototip",
            body: "Marka kimliğinizle uyumlu, sektörünüzü yansıtan yüksek kaliteli görsel tasarımlar oluşturulur. İnteraktif Figma prototipleriyle onay öncesinde canlı deneyim sunulur. Animasyon, mikro-etkileşim ve geçiş tasarımları bu aşamada belirlenir.",
            img: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=2061&auto=format&fit=crop",
          },
          {
            heading: "Geliştirme & Yayına Alma",
            body: "React veya Next.js ile geliştirilen siteniz Core Web Vitals metriklerinde üst skorlar alacak şekilde optimize edilir. SSL, CDN, lazy loading ve schema markup dahil teknik SEO kurulumu teslimata dahildir. Yayına alındıktan sonra 30 gün teknik destek verilir.",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
          },
        ],
      },
    },
    {
      title: "Prodüksiyon",
      desc: "Reklam, tanıtım ve sosyal medya için sinematik çekimler.",
      detail: {
        tagline:
          "Her kare bir his, her sahne bir hikaye — sinematik prodüksiyon.",
        intro:
          "CEF Medya prodüksiyon ekibi; kurumsal tanıtım filmlerinden ürün reklamlarına, etkinlik çekimlerinden sosyal medya içeriklerine kadar geniş bir yelpazede hizmet verir. Profesyonel kamera sistemleri, drone ve jib ekipmanlarımızla sahnelerinizi sinematik bir kaliteye taşıyoruz.",
        sections: [
          {
            heading: "Ön Prodüksiyon & Senaryo",
            body: "Her proje bir brifing toplantısıyla başlar. Hedef, mesaj ve hedef kitle netleştikten sonra senaryo yazımı ve storyboard hazırlığına geçilir. Lokasyon scouting, oyuncu casting ve teknik ekipman planlaması bu aşamada tamamlanır. Çekime çıkmadan önce her kare kafada nettir.",
            img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
          },
          {
            heading: "Çekim Günü",
            body: "Cinema kameralar (RED, ARRI veya Sony FX serileri), profesyonel ışık ekipmanları ve deneyimli kamera ekibimizle set kurulur. Drone çekimleri, jib hareketi ve steadicam kullanımıyla dinamik sahneler elde edilir. Yönetmenimiz her sahneyi görsel hikaye anlatımı prensiplerine göre yönetir.",
            img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
          },
          {
            heading: "Post Prodüksiyon & Teslimat",
            body: "DaVinci Resolve ile renk düzenlemesi (color grading), Adobe Premiere Pro ile kurgu ve Pro Tools ile ses miksajı yapılır. Müzik lisanslama, ses efektleri ve grafik katmanları eklenerek final ürün teslim edilir. YouTube, Instagram, TikTok ve TV gibi tüm platformlara özel formatlar hazırlanır.",
            img: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop",
          },
        ],
      },
    },
    {
      title: "Sosyal Medya",
      desc: "Markanızın dijital sesini güçlendiren içerik yönetimi.",
      detail: {
        tagline:
          "Strateji, içerik ve topluluk — markanızın dijital sesi bizde güvende.",
        intro:
          "Sosyal medya artık sadece paylaşım yapmak değil; marka inşa etmek, topluluk oluşturmak ve satışa dönüştürmektir. CEF Medya olarak Instagram, TikTok, LinkedIn ve YouTube gibi platformlarda markanızın sesini tutarlı ve etkili biçimde yönetiyoruz.",
        sections: [
          {
            heading: "Marka Sesi & İçerik Stratejisi",
            body: "Hedef kitle analizi, rakip incelemesi ve platform dinamiklerine göre özelleştirilmiş bir içerik stratejisi geliştirilir. Aylık içerik takvimi, ton sesi kılavuzu ve görsel kimlik şablonlarıyla tüm paylaşımlar tutarlı bir marka dili taşır. Algoritma değişikliklerine hızla adapte olan esnek bir plan yürütürüz.",
            img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
          },
          {
            heading: "İçerik Üretimi & Yayın",
            body: "Fotoğraf, video, reels, story ve carousel gibi çok formatlı içerikler stüdyomuzda veya sahada üretilir. Her içerik platformun en iyi saatlerinde, hashtagleri ve açıklamalarıyla birlikte yayınlanır. Yorum yönetimi ve topluluk etkileşimi de hizmet kapsamına dahildir.",
            img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop",
          },
          {
            heading: "Reklam Yönetimi & Raporlama",
            body: "Meta Ads, TikTok Ads ve Google Ads platformlarında hedefli reklam kampanyaları yönetilir. A/B testleri, bütçe optimizasyonu ve dönüşüm takibiyle maksimum verim sağlanır. Haftalık özetler ve aylık kapsamlı raporlarla büyüme şeffaf biçimde takip edilir.",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
          },
        ],
      },
    },
  ],
  teamPage: {
    heroBg: "",
    intro: {
      subtitle: "PROFESYONEL KADRO",
      title: "Sektör Bağımsız Çözümler.",
      desc: "CEF Medya, sektör bağımsız çözümler üreterek işletmenizi bir adım öne taşıyor. Profesyonel kadromuz, alanında uzman ve yaratıcı bireylerden oluşmakta olup, ihtiyacınıza özel içerik, tanıtım filmi, sosyal medya yönetimi ve daha birçok hizmet sunmaktadır. Amacımız, işinizi doğru analiz ederek, sektörünüz ne olursa olsun etkili ve yaratıcı çözümlerle hedef kitlenize ulaşmanıza yardımcı olmaktır.",
    },
  },
  team: [
    { name: "Ahmet Yılmaz", role: "Kurucu & Yönetmen", image: "" },
    { name: "Elif Kaya", role: "Kreatif Direktör", image: "" },
    { name: "Can Özkan", role: "Baş Tasarımcı", image: "" },
  ],
  faq: [
    {
      label: "Süreç",
      items: [
        {
          q: "Bir projeyi teslim almak ne kadar sürer?",
          a: "Kapsama göre değişir: logo 5-10 gün, web sitesi 2-4 hafta arası sürebilir.",
        },
        {
          q: "Kaç revizyon hakkım var?",
          a: "Her paket en az 2 revizyon turu içerir.",
        },
      ],
    },
    {
      label: "Fiyatlandırma",
      items: [
        {
          q: "Fiyatlandırmanız nasıl belirleniyor?",
          a: "Sabit bir liste yerine kapsam bazlı fiyatlandırma yapıyoruz.",
        },
      ],
    },
  ],
  portfolio: {
    heroBg: "",
    categories: [
      "Tümünü Gör",
      "Prodüksiyon",
      "Tasarım",
      "Fotoğrafçılık",
      "Sosyal Medya",
    ],
    projects: [
      {
        id: "1",
        title: "Urban Lifestyle",
        category: "Fotoğrafçılık",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
        detail: {
          tagline: "MODA VE ŞEHİR YAŞAMI BİR ARADA",
          intro: "Şehrin dinamik yapısını ve modern yaşamın hızını yansıtan bu fotoğraf serisi, sokak stilini yüksek moda estetiğiyle harmanlayarak izleyicilere güçlü bir görsel deneyim sunmayı hedefledi.",
          sections: [
            {
              heading: "Konsept ve Hazırlık",
              body: "Projenin başlangıcında, şehrin en ikonik lokasyonları belirlendi ve doğru ışık koşullarını yakalamak için detaylı bir çekim takvimi oluşturuldu.",
              img: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2070&auto=format&fit=crop"
            },
            {
              heading: "Sokak Çekimleri",
              body: "Gerçek ve samimi anları yakalamak için doğal ışık tercih edildi. Modellerin şehirle kurduğu etkileşim, karelere ham ve güçlü bir enerji kattı.",
              img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop"
            }
          ]
        }
      },
      {
        id: "2",
        title: "Noir Film",
        category: "Prodüksiyon",
        image:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
        detail: {
          tagline: "SİNEMATİK BİR GİZEM HİKAYESİ",
          intro: "Karanlık sokaklar, keskin gölgeler ve derin bir gizem. Klasik Noir sinemasının estetiğini modern prodüksiyon teknikleriyle günümüze taşıyan bu kısa film projesinde, atmosfer yaratımı ve ışık yönetimi ön plandaydı.",
          sections: [
            {
              heading: "Senaryo ve Storyboard",
              body: "Hikayenin karanlık tonunu yansıtacak keskin diyaloglar yazıldı ve her sahnenin ışık haritasını içeren detaylı storyboardlar hazırlandı.",
              img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop"
            }
          ]
        }
      },
      {
        id: "3",
        title: "Tech Startup",
        category: "Tasarım",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        detail: {
          tagline: "GELECEĞİN TEKNOLOJİSİ İÇİN KİMLİK",
          intro: "Yenilikçi bir yazılım girişimi için sıfırdan kurumsal kimlik ve web arayüzü tasarlandı. Karmaşık verilerin basit ve şık bir şekilde sunulması projenin ana odak noktasıydı.",
          sections: [
            {
              heading: "Marka Kimliği",
              body: "Teknolojinin hızını ve güvenilirliğini yansıtan dinamik bir logo ve renk paleti oluşturuldu.",
              img: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=2061&auto=format&fit=crop"
            }
          ]
        }
      },
    ],
  },
}

interface CmsContextType {
  data: CmsData
  updateData: (newData: Partial<CmsData>) => void
}

const CmsContext = createContext<CmsContextType | undefined>(undefined)

export function CmsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CmsData>(defaultCmsData)
  const [isLoading, setIsLoading] = useState(true)

  // Load from MySQL via PHP API on mount
  useEffect(() => {
    const apiUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api.php"
    fetch(`${apiUrl}?action=cms`)
      .then((res) => res.json())
      .then((fetchedData) => {
        if (fetchedData) {
          const merge = (target: any, source: any): any => {
            if (
              typeof target !== "object" ||
              target === null ||
              Array.isArray(target)
            )
              return source !== undefined ? source : target
            if (
              typeof source !== "object" ||
              source === null ||
              Array.isArray(source)
            )
              return source !== undefined ? source : target

            const result = { ...target }
            for (const key of Object.keys(source)) {
              result[key] = merge(target[key], source[key])
            }
            return result
          }
          setData(merge(defaultCmsData, fetchedData))
        }
      })
      .catch((err) => {
        console.error("Veritabanından veri çekerken hata:", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const updateData = async (newData: Partial<CmsData>) => {
    const nextData = { ...data, ...newData } as CmsData
    setData(nextData)

    // Save to MySQL via PHP API
    try {
      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api.php"
      const res = await fetch(`${apiUrl}?action=cms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextData),
      })
      const result = await res.json()
      if (!result.success) {
        console.error("Kayıt hatası:", result.error)
      }
    } catch (err) {
      console.error("Veritabanına kaydederken hata:", err)
    }
  }

  useEffect(() => {
    document.title = data.general.siteTitle

    if (data.general.faviconUrl) {
      let link: HTMLLinkElement | null =
        document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement("link")
        link.rel = "icon"
        document.getElementsByTagName("head")[0].appendChild(link)
      }
      link.href = data.general.faviconUrl
    }
  }, [data.general.siteTitle, data.general.faviconUrl])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cef-black flex items-center justify-center text-cef-cream">
        Yükleniyor...
      </div>
    )
  }

  return (
    <CmsContext.Provider value={{ data, updateData }}>
      {children}
    </CmsContext.Provider>
  )
}

export const useCms = () => {
  const context = useContext(CmsContext)
  if (context === undefined) {
    throw new Error("useCms must be used within a CmsProvider")
  }
  return context
}
