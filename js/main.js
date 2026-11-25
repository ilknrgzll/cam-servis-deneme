/* Relaks Cam Sistemleri — sayfa davranışları
   İçerik değişiklikleri için bu dosyayı değil, js/site-config.js dosyasını düzenleyin. */
(function () {
  "use strict";

  var C = window.SITE_CONFIG || {};
  var ILETISIM = C.iletisim || {};

  /* ---------- Yardımcılar ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function tanimli(v) { return typeof v === "string" && v.trim() !== "" && !/^\[.*\]$/.test(v.trim()); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") e.textContent = attrs[k];
      else if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    });
    if (html) e.innerHTML = html;
    return e;
  }
  var waSvg = '<svg class="wa-icon" aria-hidden="true" viewBox="0 0 32 32"><use href="#wa-logo"/></svg>';

  var toastTimer;
  function bildir(mesaj) {
    var t = $("#bildirim");
    t.textContent = mesaj; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 4500);
  }

  /* ---------- Telefon ve WhatsApp ---------- */
  // Türkiye numarasını wa.me biçimine çevirir: 905XXXXXXXXX (+, boşluk, baştaki 0 yok)
  function waNumara(ham) {
    if (!tanimli(ham)) return "";
    var d = ham.replace(/\D/g, "");
    if (d.indexOf("00") === 0) d = d.slice(2);
    if (d.indexOf("0") === 0) d = "90" + d.slice(1);
    if (d.length === 10 && d.charAt(0) === "5") d = "90" + d;
    return d.length >= 11 ? d : "";
  }
  function telLink(ham) {
    var d = waNumara(ham);
    return d ? "tel:+" + d : "tel:" + ham.replace(/[^\d+]/g, "");
  }
  function waLink(hizmet) {
    var no = waNumara(ILETISIM.whatsapp);
    if (!no) return "";
    var mesaj = ILETISIM.whatsappMesaji || "";
    if (hizmet) mesaj += " İlgilendiğim hizmet: " + hizmet + ".";
    return "https://wa.me/" + no + "?text=" + encodeURIComponent(mesaj);
  }

  // Tüm WhatsApp bağlantıları tıklama anında güncel mesajla açılır
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-whatsapp]");
    if (!a) return;
    var hizmet = a.getAttribute("data-hizmet") || "";
    if (a.hasAttribute("data-form-whatsapp")) hizmet = $("#hizmet").value || "";
    var url = waLink(hizmet);
    if (!url) {
      e.preventDefault();
      bildir("WhatsApp numarası henüz eklenmedi. Lütfen iletişim formunu kullanın.");
      return;
    }
    a.href = url;
  });
  function waHrefleriniHazirla() {
    $all("[data-whatsapp]").forEach(function (a) {
      var url = waLink(a.getAttribute("data-hizmet") || "");
      a.href = url || "#iletisim";
    });
  }

  /* ---------- Menü ---------- */
  var navToggle = $(".nav-toggle"), nav = $("#ana-menu");
  function menuKapat() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.querySelector(".sr-only").textContent = "Menüyü aç";
  }
  navToggle.addEventListener("click", function () {
    var acik = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", acik ? "true" : "false");
    navToggle.querySelector(".sr-only").textContent = acik ? "Menüyü kapat" : "Menüyü aç";
  });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) menuKapat(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) { menuKapat(); navToggle.focus(); } });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !e.target.closest(".site-header")) menuKapat();
  });

  // Menü, ana ekran fotoğrafının üstünde şeffaf; aşağı kaydırınca ya da menü açılınca zemin rengi alır
  var header = $(".site-header");
  function headerGuncelle() {
    header.classList.toggle("is-solid", window.scrollY > 40 || nav.classList.contains("is-open"));
  }
  window.addEventListener("scroll", headerGuncelle, { passive: true });
  navToggle.addEventListener("click", headerGuncelle);
  nav.addEventListener("click", function () { setTimeout(headerGuncelle, 0); });
  headerGuncelle();

  // Görünen bölüme göre menüde aktif bağlantı
  if ("IntersectionObserver" in window) {
    var navLinks = $all('.main-nav ul a');
    var bolumIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.setAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id ? "true" : "false");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["anasayfa", "hizmetler", "uygulamalar", "iletisim"].forEach(function (id) { var s = document.getElementById(id); if (s) bolumIO.observe(s); });
  }

  /* ---------- Hizmetler ---------- */
  var hizmetSelect = $("#hizmet");
  (C.hizmetler || []).forEach(function (h, i) {
    var kart = el("article", { "class": "service-card" });
    var medya = el("div", { "class": "service-media" });
    var img = el("img", { src: h.gorsel, alt: h.alt || h.ad, loading: "lazy", decoding: "async", width: "800", height: "600" });
    medya.appendChild(img);
    if (h.temsili) medya.appendChild(el("span", { "class": "badge-temsili", text: "Temsili görsel" }));
    kart.appendChild(medya);
    kart.appendChild(el("span", { "class": "service-no", "aria-hidden": "true", text: (i < 9 ? "0" : "") + (i + 1) }));
    kart.appendChild(el("h3", { text: h.ad }));
    if (h.vurgu) kart.appendChild(el("p", { "class": "service-hook", text: h.vurgu }));
    kart.appendChild(el("p", { "class": "service-desc", text: h.aciklama }));
    var linkler = el("div", { "class": "service-links" });
    var teklif = el("a", { "class": "link-teklif", href: "#iletisim", "data-teklif": "", "data-hizmet": h.ad, "aria-label": h.ad + " için teklif al" }, 'Teklif Al <span class="arrow" aria-hidden="true">→</span>');
    var wa = el("a", { "class": "link-wa", href: "#", "data-whatsapp": "", "data-hizmet": h.ad, target: "_blank", rel: "noopener", "aria-label": h.ad + " için WhatsApp’tan yaz" }, waSvg + "WhatsApp");
    linkler.appendChild(teklif); linkler.appendChild(wa);
    kart.appendChild(linkler);
    $("#hizmet-listesi").appendChild(kart);
    hizmetSelect.appendChild(el("option", { value: h.ad, text: h.ad }));
  });
  hizmetSelect.appendChild(el("option", { value: "Diğer / Emin değilim", text: "Diğer / Emin değilim" }));

  // "Teklif Al" bağlantıları: forma kaydır, ilgili hizmeti seç
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-teklif]");
    if (!a) return;
    var hizmet = a.getAttribute("data-hizmet");
    if (hizmet) {
      hizmetSelect.value = hizmet;
      var alan = hizmetSelect.closest(".field");
      alan.classList.remove("has-error"); $("#hizmet-hata").textContent = "";
      alan.classList.add("is-highlight");
      setTimeout(function () { alan.classList.remove("is-highlight"); }, 2500);
    }
    setTimeout(function () { $("#ad").focus({ preventScroll: true }); }, 600);
  });

  /* ---------- Galeri ---------- */
  var galeri = (C.galeri || []).slice();
  var kategoriler = C.galeriKategorileri || [];
  var kategoriAd = {};
  kategoriler.forEach(function (k) { kategoriAd[k.id] = k.ad; });

  var hepsiTemsili = galeri.length === 0 || galeri.every(function (g) { return g.temsili; });
  if (hepsiTemsili) {
    $("#galeri-baslik").textContent = "Uygulama Örnekleri";
    $("#galeri-aciklama").textContent = "Uygulama türlerine örnek olarak seçilmiş temsili görseller. Büyütmek için görsele dokunun.";
  }

  var liste = $("#galeri-listesi"), filtreKutusu = $("#galeri-filtre");
  var aktifKategori = "tumu", gorunenler = [];

  galeri.forEach(function (g, i) {
    var li = el("li", { "class": "gallery-item", "data-kategori": [g.kategori].concat(g.ekKategoriler || []).join(" ") });
    var btn = el("button", { type: "button", "data-index": i, "aria-label": "Büyüt: " + g.alt });
    btn.appendChild(el("img", { src: g.kucuk, alt: g.alt, loading: "lazy", decoding: "async", width: g.w, height: g.h }));
    if (g.temsili) btn.appendChild(el("span", { "class": "badge-temsili", text: "Temsili görsel" }));
    if (kategoriAd[g.kategori]) btn.appendChild(el("span", { "class": "g-cap", "aria-hidden": "true", text: kategoriAd[g.kategori] }));
    li.appendChild(btn);
    liste.appendChild(li);
  });

  function filtreButonu(id, ad, sayi) {
    var b = el("button", { type: "button", "class": "filter-btn", "data-filtre": id, "aria-pressed": id === aktifKategori ? "true" : "false" },
      ad + ' <span class="filter-count">(' + sayi + ")</span>");
    filtreKutusu.appendChild(b);
  }
  filtreButonu("tumu", "Tümü", galeri.length);
  kategoriler.forEach(function (k) {
    var n = galeri.filter(function (g) { return g.kategori === k.id || (g.ekKategoriler || []).indexOf(k.id) > -1; }).length;
    filtreButonu(k.id, k.ad, n);
  });
  filtreKutusu.addEventListener("click", function (e) {
    var b = e.target.closest(".filter-btn"); if (!b) return;
    aktifKategori = b.getAttribute("data-filtre");
    $all(".filter-btn", filtreKutusu).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    // Mobilde yatay kayan sekmelerde seçileni görünür alana getir
    if (filtreKutusu.scrollWidth > filtreKutusu.clientWidth) {
      var kr = filtreKutusu.getBoundingClientRect(), br = b.getBoundingClientRect();
      filtreKutusu.scrollTo({ left: filtreKutusu.scrollLeft + (br.left - kr.left) - (kr.width - br.width) / 2, behavior: "smooth" });
    }
    galeriyiGuncelle();
  });

  function galeriyiGuncelle() {
    gorunenler = [];
    $all(".gallery-item", liste).forEach(function (li) {
      var uygun = aktifKategori === "tumu" || li.getAttribute("data-kategori").split(" ").indexOf(aktifKategori) > -1;
      li.hidden = !uygun;
      li.classList.remove("is-large", "is-tall");
      if (!uygun) return;
      // Düzen: her 12 fotoğrafta iki büyük kare; dikey fotoğrafların bir kısmı uzun
      var sira = gorunenler.length, g = galeri[+li.firstChild.getAttribute("data-index")];
      if (sira % 12 === 0 || sira % 12 === 7) li.classList.add("is-large");
      else if (g.h > g.w * 1.2 && sira % 2 === 1) li.classList.add("is-tall");
      gorunenler.push(+li.firstChild.getAttribute("data-index"));
    });
    $("#galeri-bos").hidden = gorunenler.length > 0;
  }
  galeriyiGuncelle();

  // Ana ekrandaki kategori şeridi: galeriye kaydırır ve ilgili kategoriyi seçer
  $all("[data-galeri-filtre]").forEach(function (a) {
    a.addEventListener("click", function () {
      var b = filtreKutusu.querySelector('[data-filtre="' + a.getAttribute("data-galeri-filtre") + '"]');
      if (b) b.click();
    });
  });

  /* ---------- Büyütülmüş görünüm (lightbox) ---------- */
  var lb = $("#lightbox"), lbImg = $("#lb-gorsel"), lbCap = $("#lb-aciklama"), lbSayac = $("#lb-sayac");
  var lbSira = 0, lbTetikleyen = null;

  function lbGoster(sira) {
    var n = gorunenler.length; if (!n) return;
    lbSira = (sira + n) % n;
    var g = galeri[gorunenler[lbSira]];
    lbImg.src = g.buyuk; lbImg.alt = g.alt;
    lbImg.width = g.w; lbImg.height = g.h;
    lbCap.textContent = g.alt + (kategoriAd[g.kategori] ? " — " + kategoriAd[g.kategori] : "");
    if (g.temsili) lbCap.appendChild(el("span", { "class": "badge-inline", text: "Temsili görsel" }));
    lbSayac.textContent = (lbSira + 1) + " / " + n;
    [1, -1].forEach(function (d) { var k = galeri[gorunenler[(lbSira + d + n) % n]]; if (k) (new Image()).src = k.buyuk; });
  }
  function lbAc(index, tetikleyen) {
    lbTetikleyen = tetikleyen;
    lbGoster(gorunenler.indexOf(index));
    if (typeof lb.showModal === "function") lb.showModal(); else lb.setAttribute("open", "");
    document.documentElement.style.overflow = "hidden";
  }
  function lbKapat() {
    if (lb.open && typeof lb.close === "function") lb.close(); else lb.removeAttribute("open");
  }
  lb.addEventListener("close", function () {
    document.documentElement.style.overflow = "";
    lbImg.removeAttribute("src");
    if (lbTetikleyen) lbTetikleyen.focus({ preventScroll: true });
  });
  liste.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-index]"); if (!b) return;
    lbAc(+b.getAttribute("data-index"), b);
  });
  $("#lb-kapat").addEventListener("click", lbKapat);
  $("#lb-onceki").addEventListener("click", function () { lbGoster(lbSira - 1); });
  $("#lb-sonraki").addEventListener("click", function () { lbGoster(lbSira + 1); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); lbGoster(lbSira - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); lbGoster(lbSira + 1); }
  });
  // Fotoğrafın dışındaki boş alana tıklayınca kapan
  $(".lb-figure").addEventListener("click", function (e) { if (e.target === e.currentTarget) lbKapat(); });
  // Mobilde kaydırarak gezinme
  var dokunX = null, dokunY = null;
  lb.addEventListener("touchstart", function (e) { dokunX = e.touches[0].clientX; dokunY = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (dokunX === null) return;
    var dx = e.changedTouches[0].clientX - dokunX, dy = e.changedTouches[0].clientY - dokunY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) lbGoster(lbSira + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) lbKapat(); // aşağı kaydırınca kapat
    dokunX = dokunY = null;
  }, { passive: true });

  /* ---------- İletişim bilgileri ---------- */
  var ikon = {
    tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    eposta: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    adres: '<path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    bolge: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>'
  };
  function satir(tur, etiket, icerik) {
    var li = el("li");
    li.appendChild(el("span", { "class": "contact-icon", "aria-hidden": "true" }, '<svg viewBox="0 0 24 24">' + ikon[tur] + "</svg>"));
    var d = el("div"); d.appendChild(el("span", { "class": "contact-label", text: etiket }));
    icerik.forEach(function (x) { d.appendChild(x); });
    li.appendChild(d);
    $("#iletisim-listesi").appendChild(li);
  }
  var bilgiVar = false;
  if (tanimli(ILETISIM.telefon)) {
    bilgiVar = true;
    satir("tel", "Telefon", [el("a", { "class": "contact-value", href: telLink(ILETISIM.telefon), text: ILETISIM.telefon })]);
  }
  if (tanimli(ILETISIM.eposta)) {
    bilgiVar = true;
    satir("eposta", "E-posta", [el("a", { "class": "contact-value", href: "mailto:" + ILETISIM.eposta.trim(), text: ILETISIM.eposta })]);
  }
  if (tanimli(ILETISIM.adres)) {
    bilgiVar = true;
    var harita = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(ILETISIM.adres);
    satir("adres", "Adres", [
      el("span", { "class": "contact-value", text: ILETISIM.adres }), el("br"),
      el("a", { "class": "contact-extra", href: harita, target: "_blank", rel: "noopener", text: "Yol Tarifi Al →" })
    ]);
  }
  if (tanimli(ILETISIM.hizmetBolgeleri)) {
    bilgiVar = true;
    satir("bolge", "Hizmet verilen bölgeler", [el("span", { "class": "contact-value", text: ILETISIM.hizmetBolgeleri })]);
  }
  $("#iletisim-bos").hidden = bilgiVar;

  // Alt bilgide telefon ve e-posta
  var altListe = $("#footer-iletisim-listesi");
  if (tanimli(ILETISIM.telefon)) { var l1 = el("li"); l1.appendChild(el("a", { href: telLink(ILETISIM.telefon), text: ILETISIM.telefon })); altListe.appendChild(l1); }
  if (tanimli(ILETISIM.eposta)) { var l2 = el("li"); l2.appendChild(el("a", { href: "mailto:" + ILETISIM.eposta.trim(), text: ILETISIM.eposta })); altListe.appendChild(l2); }
  if (tanimli(ILETISIM.hizmetBolgeleri)) altListe.appendChild(el("li", { text: ILETISIM.hizmetBolgeleri }));
  $("#footer-iletisim").hidden = !altListe.children.length;

  /* ---------- Teklif formu ---------- */
  var form = $("#teklif-formu"), durum = $("#form-durum"), gonderBtn = $("#gonder-btn");
  var alici = (C.form || {}).aliciEposta;
  var formHazir = tanimli(alici) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alici.trim());
  if (!formHazir) {
    $("#form-kurulum-uyari").hidden = false;
    gonderBtn.disabled = true;
    gonderBtn.title = "Form alıcı e-posta adresi henüz tanımlanmadı";
  }

  var kurallar = [
    { id: "ad", kontrol: function (v) { return v.trim().length >= 3; }, mesaj: "Lütfen adınızı ve soyadınızı yazın." },
    { id: "telefon", kontrol: function (v) { var d = v.replace(/\D/g, ""); return d.length >= 10 && d.length <= 13; }, mesaj: "Lütfen geçerli bir telefon numarası yazın (örn. 0532 123 45 67)." },
    { id: "konum", kontrol: function (v) { return v.trim().length >= 2; }, mesaj: "Lütfen il ve ilçe bilgisini yazın." },
    { id: "eposta", kontrol: function (v) { return v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, mesaj: "E-posta adresi geçerli görünmüyor." },
    { id: "hizmet", kontrol: function (v) { return v !== ""; }, mesaj: "Lütfen ilgilendiğiniz hizmeti seçin." },
    { id: "aciklama", kontrol: function (v) { return v.trim().length >= 10; }, mesaj: "Lütfen projenizi birkaç cümleyle anlatın." }
  ];
  function alanKontrol(k) {
    var input = document.getElementById(k.id), alan = input.closest(".field"), hata = document.getElementById(k.id + "-hata");
    var gecerli = k.kontrol(input.value);
    alan.classList.toggle("has-error", !gecerli);
    hata.textContent = gecerli ? "" : k.mesaj;
    if (gecerli) input.removeAttribute("aria-invalid"); else input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", k.id + "-hata");
    return gecerli;
  }
  kurallar.forEach(function (k) {
    var input = document.getElementById(k.id);
    input.addEventListener("blur", function () { if (input.value !== "" || input.closest(".field").classList.contains("has-error")) alanKontrol(k); });
    input.addEventListener(input.tagName === "SELECT" ? "change" : "input", function () { if (input.closest(".field").classList.contains("has-error")) alanKontrol(k); });
  });

  function durumYaz(tur, mesaj) {
    durum.className = "form-status" + (tur ? " is-" + tur : "");
    durum.textContent = mesaj;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    durumYaz("", "");
    var ilkHata = null;
    kurallar.forEach(function (k) { if (!alanKontrol(k) && !ilkHata) ilkHata = document.getElementById(k.id); });
    if (ilkHata) {
      durumYaz("error", "Lütfen işaretli alanları kontrol edin.");
      ilkHata.focus();
      return;
    }
    if (!formHazir) {
      durumYaz("error", "Çevrim içi form henüz etkin değil. Lütfen bize telefonla ya da WhatsApp üzerinden ulaşın.");
      return;
    }
    if ($("#web-adresi").value) return; // bot

    var veri = {};
    ["ad", "telefon", "konum", "eposta", "hizmet", "aciklama"].forEach(function (id) {
      var i = document.getElementById(id); veri[i.name] = i.value.trim();
    });
    if (!veri["E-posta"]) delete veri["E-posta"]; else veri._replyto = veri["E-posta"];
    veri._subject = ((C.form || {}).konu || "Yeni teklif talebi") + " — " + veri["Hizmet"];
    veri._template = "table";
    veri._captcha = "false";
    veri._honey = "";

    gonderBtn.disabled = true;
    var eskiMetin = gonderBtn.textContent;
    gonderBtn.textContent = "Gönderiliyor…";
    var iptal = ("AbortController" in window) ? new AbortController() : null;
    var zaman = setTimeout(function () { if (iptal) iptal.abort(); }, 20000);

    fetch("https://formsubmit.co/ajax/" + alici.trim(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(veri),
      signal: iptal ? iptal.signal : undefined
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (s) {
        var basarili = s.ok && (s.j.success === true || s.j.success === "true");
        if (basarili) {
          form.reset();
          $all(".field", form).forEach(function (f) { f.classList.remove("has-error"); });
          durumYaz("success", "Teşekkürler, talebiniz bize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.");
        } else if (/activ/i.test(s.j.message || "")) {
          durumYaz("error", "Form henüz onaylanmadı. Alıcı e-posta adresine gelen onay bağlantısına tıklandıktan sonra talepler iletilecektir. Bu sırada bize telefonla ya da WhatsApp üzerinden ulaşabilirsiniz.");
        } else {
          throw new Error(s.j.message || "Gönderim başarısız");
        }
      })
      .catch(function () {
        durumYaz("error", "Talebiniz şu anda gönderilemedi. Lütfen internet bağlantınızı kontrol edip tekrar deneyin ya da bize telefonla veya WhatsApp üzerinden ulaşın.");
      })
      .then(function () {
        clearTimeout(zaman);
        gonderBtn.disabled = false;
        gonderBtn.textContent = eskiMetin;
      });
  });

  /* ---------- Sabit WhatsApp butonu ---------- */
  // Ana ekrandaki ve formdaki butonlar göründüğünde sabit buton gizlenir; böylece bu butonların üstüne binmez.
  var waFloat = $(".wa-float");
  if ("IntersectionObserver" in window) {
    var gorunur = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) gorunur.add(en.target); else gorunur.delete(en.target); });
      waFloat.classList.toggle("is-hidden", gorunur.size > 0);
    }, { threshold: 0 });
    $all(".hero-actions, #iletisim, .site-footer").forEach(function (x) { io.observe(x); });
  }

  /* ---------- Kaydırınca hafif beliriş ---------- */
  // Yalnızca ekranın altında kalan öğelere uygulanır; açılışta görünen içerik hiç gizlenmez.
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); revealIO.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    $all(".section-head, .intro-text, .intro-media, .service-card, .steps li, .contact-layout").forEach(function (x) {
      if (x.getBoundingClientRect().top > window.innerHeight) { x.classList.add("reveal"); revealIO.observe(x); }
    });
  }

  /* ---------- Diğer ---------- */
  $("#yil").textContent = new Date().getFullYear();
  waHrefleriniHazirla();
})();
