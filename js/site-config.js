/* =====================================================================
   RELAKS CAM SİSTEMLERİ — SİTE AYARLARI
   ---------------------------------------------------------------------
   Sitedeki iletişim bilgileri, hizmet metinleri ve galeri fotoğrafları
   yalnızca bu dosyadan düzenlenir. Köşeli parantezle yazılmış değerler
   ("[TELEFON]" gibi) "henüz girilmedi" sayılır ve sitede gösterilmez.
   ===================================================================== */
window.SITE_CONFIG = {
  firmaAdi: "Relaks Cam Sistemleri",

  iletisim: {
    // Görünen telefon. Örnek: "0532 123 45 67"
    telefon: "[TELEFON]",
    // Örnek: "info@relakscam.com"
    eposta: "[E-POSTA]",
    // Açık adres. Girilince "Yol Tarifi Al" bağlantısı otomatik çıkar.
    adres: "[ADRES]",
    // Örnek: "Ankara — Çankaya, Yenimahalle, Etimesgut, Gölbaşı"
    hizmetBolgeleri: "[HİZMET VERİLEN İL VE İLÇELER]",
    // WhatsApp numarası. "0532 123 45 67" ya da "+90 532 123 45 67"
    // yazabilirsiniz; bağlantıda otomatik olarak 905321234567 biçimine çevrilir.
    whatsapp: "[WHATSAPP NUMARASI]",
    whatsappMesaji: "Merhaba, Relaks Cam Sistemleri’nden projem için bilgi ve teklif almak istiyorum."
  },

  form: {
    // Form gönderimlerinin ulaşacağı e-posta adresi.
    // FormSubmit (formsubmit.co) altyapısı kullanılır; ek kurulum gerekmez.
    // İlk gönderimde bu adrese bir onay e-postası gelir; onaylandıktan
    // sonra tüm talepler doğrudan bu adrese iletilir.
    aliciEposta: "[FORM ALICI E-POSTASI]",
    konu: "Web sitesinden yeni teklif talebi"
  },

  /* HİZMETLER
     vurgu: kartta başlığın altında öne çıkan kısa cümle
     gorsel: kart fotoğrafı (800 px genişlik yeterli)
     temsili: true ise kartta "Temsili görsel" etiketi görünür.
     Gerçek fotoğraf eklediğinizde gorsel yolunu değiştirip temsili:false yapın. */
  hizmetler: [
    {
      ad: "Alüminyum Doğrama",
      vurgu: "Daha ince profil, daha geniş cam, daha çok gün ışığı.",
      aciklama: "Pencere, kapı ve vitrinlerde ısı yalıtımlı ya da yalıtımsız alüminyum sistemler. Her doğramayı yerinde alınan ölçüye göre planlıyoruz.",
      gorsel: "images/projeler/dograma-06-800.webp",
      alt: "Tek katlı bir yapıda antrasit renkli alüminyum pencere ve kapı doğramaları",
      temsili: false
    },
    {
      ad: "Kompozit Cephe Kaplama",
      vurgu: "Binanızın dışa bakan yüzünü yenileyin.",
      aciklama: "Kompozit panellerle cepheye düzgün, temiz ve modern bir görünüm kazandırıyoruz. Renk ve doku seçimini binanın mimarisine göre birlikte yapıyoruz.",
      gorsel: "images/projeler/cephe-03-800.webp",
      alt: "Koyu gri panellerle kaplanmış üç katlı bir binanın cephesi ve geniş camları",
      temsili: false
    },
    {
      ad: "Ofis Bölme ve Cam Kapı",
      vurgu: "Duvar örmeden alan ayırın.",
      aciklama: "Cam bölmeler ofisi aydınlık ve açık tutarken toplantı odalarına ve çalışma alanlarına düzen getirir. Giriş ve iç mekân cam kapılarıyla birlikte uygulanır.",
      gorsel: "images/projeler/ofis-bolme-01-800.webp",
      alt: "Bir iş yerinin iç mekânında ince siyah profilli cam bölme ve sürgülü cam kapı",
      temsili: false
    },
    {
      ad: "Kumandalı Giyotin Cam Sistemi",
      vurgu: "Tek tuşla açılan, tek tuşla kapanan teras.",
      aciklama: "Cam paneller kumandayla dikey olarak yukarı ve aşağı hareket eder. Kafe, restoran ve ev teraslarını havaya göre açık ya da kapalı kullanmanızı sağlar.",
      gorsel: "images/hizmetler/giyotin-temsili.svg",
      alt: "Dikey hareket eden cam panellerden oluşan giyotin cam sisteminin şematik çizimi",
      temsili: true
    },
    {
      ad: "Cam Balkon ve Sürme Cam Sistemleri",
      vurgu: "Balkonunuz kışın da kullanılsın.",
      aciklama: "Katlanır cam balkon ve yana kayan sürme sistemlerle balkonu rüzgâra, yağmura ve toza karşı kapatıyor, yılın her ayı oturabileceğiniz bir alana dönüştürüyoruz.",
      gorsel: "images/projeler/cam-balkon-03-800.webp",
      alt: "Apartman balkonunda antrasit profilli cam balkon uygulaması",
      temsili: false
    },
    {
      ad: "PVC Doğrama",
      vurgu: "Daha sessiz, daha sıcak bir ev.",
      aciklama: "PVC pencere ve kapılar ısı ve ses yalıtımına katkı sağlar. Yeni yapılarda da eski doğramaların yenilenmesinde de uygun bir çözümdür.",
      gorsel: "images/projeler/pvc-01-800.webp",
      alt: "Bir binanın çıkma balkonunda beyaz PVC pencere doğramaları",
      temsili: false
    },
    {
      ad: "Cam Korkuluk",
      vurgu: "Manzara açık, kenarlar korunaklı.",
      aciklama: "Balkon, teras ve merdivenlerde görüşü kapatmayan, sade ve şık cam korkuluklar. Mekâna ağırlık yapmadan çevreyi güvenli hâle getirir.",
      gorsel: "images/hizmetler/cam-korkuluk-640.webp",
      alt: "Apartman balkonunda çerçevesiz cam korkuluk",
      temsili: false
    },
    {
      ad: "Teras Kapatma",
      vurgu: "Kullanılmayan terası evin en sevilen köşesine çevirin.",
      aciklama: "Cam ve alüminyum sistemlerle terası kapatıyor, dört mevsim kullanabileceğiniz aydınlık bir yaşam alanı oluşturuyoruz.",
      gorsel: "images/projeler/teras-02-800.webp",
      alt: "Cam çatılı ve cam duvarlı kapatılmış bir çatı terasının içi",
      temsili: false
    },
    {
      ad: "Kış Bahçesi Uygulamaları",
      vurgu: "Bahçenin içinde, havanın dışında.",
      aciklama: "Çatısı ve duvarları camdan oluşan kış bahçeleriyle bahçe manzarasını içeri alıyor, her mevsim oturabileceğiniz bir alan kuruyoruz.",
      gorsel: "images/projeler/kis-bahcesi-04-800.webp",
      alt: "Bahçeye bakan, içinde oturma grubu bulunan antrasit profilli kış bahçesi",
      temsili: false
    }
  ],

  /* GALERİ
     kategori: "cam-balkon" | "teras-kis-bahcesi" | "ofis-cam-kapi" | "cephe-dograma"
     ekKategoriler: fotoğrafın ayrıca görüneceği filtreler, örn. ["ic-mekan"]
     kucuk: liste görünümü (800 px), buyuk: büyütülmüş görünüm (1600 px)
     temsili: true → "Temsili görsel" etiketi. Galerideki görsellerin tamamı
     temsiliyse başlık otomatik olarak "Uygulama Örnekleri" olur. */
  galeriKategorileri: [
    { id: "cam-balkon", ad: "Cam Balkon" },
    { id: "teras-kis-bahcesi", ad: "Teras ve Kış Bahçesi" },
    { id: "ofis-cam-kapi", ad: "Ofis ve Cam Kapı" },
    { id: "cephe-dograma", ad: "Cephe ve Doğrama" },
    { id: "ic-mekan", ad: "İç Mekân" }
  ],

  galeri: [
    { dosya: "kis-bahcesi-01", w: 1728, h: 1728, kategori: "teras-kis-bahcesi", alt: "Ahşap görünümlü cepheye sahip bir evde antrasit profilli cam sistemleri ve sürme kapılar" },
    { dosya: "cam-balkon-03", w: 2048, h: 907, kategori: "cam-balkon", alt: "Modern bir apartmanda cam balkon ve önünde cam korkuluk" },
    { dosya: "kis-bahcesi-06", w: 1536, h: 2048, kategori: "teras-kis-bahcesi", alt: "Havuz kenarında antrasit alüminyum profilli kış bahçesi" },
    { dosya: "ofis-bolme-01", w: 1536, h: 2048, kategori: "ofis-cam-kapi", ekKategoriler: ["ic-mekan"], alt: "İş yeri iç mekânında ince siyah profilli cam bölme ve sürgülü kapı" },
    { dosya: "cephe-04", w: 921, h: 924, kategori: "cephe-dograma", alt: "Koyu panel kaplı cephede geniş alüminyum pencereler ve zemin katta cam duvar" },
    { dosya: "cam-balkon-01", w: 2048, h: 907, kategori: "cam-balkon", alt: "Apartmanın köşe balkonunda antrasit profilli cam balkon" },
    { dosya: "kis-bahcesi-04", w: 1077, h: 1442, kategori: "teras-kis-bahcesi", alt: "Bahçeye bakan, içinde oturma grubu bulunan camlı kış bahçesi" },
    { dosya: "cam-kapi-05", w: 2048, h: 1536, kategori: "ofis-cam-kapi", alt: "Bina girişinde saçaklı cam giriş bölümü ve cam kapı" },
    { dosya: "dograma-06", w: 2048, h: 1536, kategori: "cephe-dograma", alt: "Taş kaplamalı tek katlı yapıda antrasit alüminyum doğramalar" },
    { dosya: "teras-04", w: 1051, h: 1320, kategori: "teras-kis-bahcesi", ekKategoriler: ["ic-mekan"], alt: "Şehir manzaralı, aydınlatmalı tavanlı kapatılmış teras" },
    { dosya: "cam-balkon-04", w: 1536, h: 2048, kategori: "cam-balkon", alt: "Çok katlı bir binada üst üste cam balkon uygulamaları" },
    { dosya: "kis-bahcesi-13", w: 921, h: 692, kategori: "teras-kis-bahcesi", alt: "Çimenlik bahçede antrasit profilli geniş kış bahçesi" },
    { dosya: "cam-kapi-02", w: 923, h: 2048, kategori: "ofis-cam-kapi", alt: "Ev girişinde antrasit profilli cam rüzgârlık ve kapı" },
    { dosya: "cephe-05", w: 921, h: 1577, kategori: "cephe-dograma", alt: "Koyu renk cepheli üç katlı binada cam korkuluklu balkonlar ve zemin kat camları" },
    { dosya: "teras-05", w: 1080, h: 486, kategori: "teras-kis-bahcesi", ekKategoriler: ["ic-mekan"], alt: "Deniz manzaralı, LED aydınlatmalı pergole altında camlı teras" },
    { dosya: "kis-bahcesi-11", w: 1536, h: 2048, kategori: "teras-kis-bahcesi", alt: "Sonbahar bahçesine bakan beyaz profilli kış bahçesi" },
    { dosya: "cam-balkon-06", w: 1536, h: 2048, kategori: "cam-balkon", alt: "Yüksek binanın köşe katında antrasit profilli cam kapatma" },
    { dosya: "cam-kapi-03", w: 1080, h: 1755, kategori: "ofis-cam-kapi", alt: "Bina köşesinde füme camlı giriş ve cam kapı" },
    { dosya: "cephe-02", w: 1077, h: 955, kategori: "cephe-dograma", alt: "Taş kaplamalı cephede kat kat geniş camlı alüminyum doğramalar" },
    { dosya: "kis-bahcesi-12", w: 1055, h: 1442, kategori: "teras-kis-bahcesi", alt: "Bahçede çakıl taşı kenarlı, antrasit profilli kış bahçesi" },
    { dosya: "teras-01", w: 1046, h: 1442, kategori: "teras-kis-bahcesi", alt: "Villanın terasında beyaz profilli cam kapatma ve çatı" },
    { dosya: "cam-balkon-02", w: 2048, h: 908, kategori: "cam-balkon", alt: "Akşam saatinde aydınlatılmış en üst kat cam balkon" },
    { dosya: "kis-bahcesi-10", w: 1080, h: 812, kategori: "teras-kis-bahcesi", alt: "Ahşap tavanlı, antrasit profilli bahçe kış bahçesi" },
    { dosya: "cam-kapi-04", w: 921, h: 1531, kategori: "ofis-cam-kapi", alt: "Villa girişinde antrasit profilli camlı giriş bölümü" },
    { dosya: "cephe-03", w: 921, h: 1232, kategori: "cephe-dograma", alt: "Koyu gri panel kaplı binada geniş alüminyum pencereler" },
    { dosya: "teras-02", w: 1056, h: 1896, kategori: "teras-kis-bahcesi", ekKategoriler: ["ic-mekan"], alt: "Cam çatılı kapatılmış çatı terasının içten görünümü" },
    { dosya: "kis-bahcesi-08", w: 923, h: 2048, kategori: "teras-kis-bahcesi", alt: "Apartman zemin katında bahçeye açılan kış bahçesi" },
    { dosya: "cam-balkon-05", w: 1536, h: 2048, kategori: "cam-balkon", alt: "Eski bir apartmanda cam balkonla kapatılmış balkon" },
    { dosya: "dograma-04", w: 2048, h: 1536, kategori: "cephe-dograma", alt: "Yeni yapılan evde antrasit alüminyum pencere ve kapılar" },
    { dosya: "kis-bahcesi-02", w: 1728, h: 1728, kategori: "teras-kis-bahcesi", alt: "Ağaçlarla çevrili evde iki katlı cam uygulaması" },
    { dosya: "cam-kapi-01", w: 1066, h: 1880, kategori: "ofis-cam-kapi", alt: "Dükkân cephesinde antrasit profilli cam vitrin ve kapılar" },
    { dosya: "teras-06", w: 921, h: 1193, kategori: "teras-kis-bahcesi", ekKategoriler: ["ic-mekan"], alt: "Ahşap zeminli, cam çatılı geniş kapatılmış teras" },
    { dosya: "dograma-01", w: 907, h: 2048, kategori: "cephe-dograma", alt: "Beşik çatılı evin cephesinde büyük alüminyum doğramalar" },
    { dosya: "kis-bahcesi-03", w: 1536, h: 2048, kategori: "teras-kis-bahcesi", alt: "Çimenlik alanda antrasit çatılı cam yapı" },
    { dosya: "kis-bahcesi-05", w: 1536, h: 2048, kategori: "teras-kis-bahcesi", alt: "Villa girişinde kahverengi profilli kış bahçesi" },
    { dosya: "cephe-01", w: 1536, h: 2048, kategori: "cephe-dograma", alt: "Yüksek bir konut binasında cephe çalışması sırasında vinçli araç" },
    { dosya: "kis-bahcesi-09", w: 2048, h: 923, kategori: "teras-kis-bahcesi", alt: "Bahçe katında beyaz profilli geniş cam kapatma" },
    { dosya: "dograma-05", w: 2048, h: 921, kategori: "cephe-dograma", alt: "Bahçeye bakan binada zemin kat cam doğramaları" },
    { dosya: "teras-03", w: 1037, h: 1869, kategori: "teras-kis-bahcesi", alt: "Apartmanın çatı katında cam kapatılmış teras" },
    { dosya: "kis-bahcesi-07", w: 1536, h: 2048, kategori: "teras-kis-bahcesi", alt: "Taş duvara bitişik antrasit profilli kış bahçesi" },
    { dosya: "dograma-02", w: 1080, h: 661, kategori: "cephe-dograma", ekKategoriler: ["ic-mekan"], alt: "Yüksek kattan manzaraya bakan geniş cam doğrama" },
    { dosya: "dograma-03", w: 1536, h: 2048, kategori: "cephe-dograma", alt: "Beyaz cepheli evde zemin kat PVC kapı ve pencere" },
    { dosya: "pvc-01", w: 1536, h: 2048, kategori: "cephe-dograma", alt: "Çıkma balkonda beyaz PVC pencere doğramaları" }
  ].map(function (g) {
    return {
      kucuk: "images/projeler/" + g.dosya + "-800.webp",
      buyuk: "images/projeler/" + g.dosya + "-1600.webp",
      w: g.w, h: g.h, kategori: g.kategori, ekKategoriler: g.ekKategoriler || [], alt: g.alt, temsili: false
    };
  })
};
