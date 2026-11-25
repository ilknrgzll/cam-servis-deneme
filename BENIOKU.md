# Relaks Cam Sistemleri — Web Sitesi

Tek sayfalık, statik bir site. Sunucu tarafı kod gerektirmez; her statik barındırma hizmetine
(Netlify, Vercel, GitHub Pages, cPanel vb.) klasör olarak yüklenebilir.

## Yayına almadan önce doldurulacaklar

Tüm bilgiler **`js/site-config.js`** dosyasındadır. Köşeli parantezli değerleri değiştirin:

| Alan | Örnek | Not |
|---|---|---|
| `telefon` | `0312 123 45 67` | Tıklanınca arama başlar |
| `eposta` | `info@alanadiniz.com` | |
| `adres` | `… Mah. … Cad. No:… Çankaya/Ankara` | Girilince "Yol Tarifi Al" bağlantısı çıkar |
| `hizmetBolgeleri` | `Ankara — Çankaya, Yenimahalle, Etimesgut` | |
| `whatsapp` | `0532 123 45 67` | Otomatik olarak `wa.me/905321234567` biçimine çevrilir |
| `form.aliciEposta` | `teklif@alanadiniz.com` | Form talepleri bu adrese gelir |

Doldurulmamış bilgiler sitede gösterilmez. Alıcı e-posta girilmeden form gönderim butonu kapalı kalır
ve ziyaretçiye telefon/WhatsApp ile ulaşması söylenir.

### Form nasıl çalışır?
Form, ücretsiz [FormSubmit](https://formsubmit.co) altyapısıyla gönderilir. Alıcı adresi girildikten
sonra **ilk gönderimde** o adrese bir "Activate Form" e-postası gelir; bağlantıya bir kez tıklanınca
sonraki tüm talepler doğrudan e-postanıza düşer.

### index.html içinde güncellenecekler
Alan adı belli olunca `index.html` başındaki `https://www.ornek-alanadi.com/` adreslerini
(canonical, og:url, og:image) kendi alan adınızla değiştirin.

## Fotoğraflar

- `images/projeler/` — gönderdiğiniz 52 fotoğraftan seçilen 43 proje fotoğrafı. Siyah kenarlar,
  WhatsApp durum çubukları (isimler, "Cevapla") ve konum etiketi kırpıldı. Her fotoğrafın
  800 px (liste) ve 1600 px (büyütme) WebP sürümü var.
- Tekrar eden çekimler galeriye eklenmedi.
- **Giyotin cam** için gerçek fotoğraf olmadığından hizmet kartında şematik bir çizim kullanıldı
  ve "Temsili görsel" olarak işaretlendi. Gerçek fotoğraf eklendiğinde `site-config.js` içinde
  o hizmetin `gorsel` yolunu değiştirip `temsili: false` yapın.
- Yeni galeri fotoğrafı eklemek için `galeri` listesine bir satır ekleyin; fotoğrafların
  800 ve 1600 px genişlikte iki kopyasını `images/projeler/` klasörüne koyun.
- `images/og-image.jpg` sosyal medya paylaşım görselidir (1200×630).

## Yayına yüklenecek dosyalar
`index.html`, `css/`, `js/`, `images/` klasörleri yeterlidir. Ana klasördeki orijinal
`WhatsApp Image …jpeg` dosyaları ve `.claude/` klasörü sitede kullanılmaz; yüklemeyin.
