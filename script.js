/* ============================================================
   كمبيوترجي ماهر · NIGHT CITY — script.js
   01 · i18n
   02 · boot + clock
   03 · smooth scroll (Lenis) + GSAP ScrollTrigger
   04 · WebGL particle city (three.js, morph per section)
   05 · reveals + split headings
   06 · scroll rail + active nav
   07 · "how it works" scrub
   08 · counters
   09 · magnetic buttons + tilt + glow-follow
   10 · custom cursor
   11 · statement band drift + hero parallax
   12 · WhatsApp booking + toast
   13 · project modal
   ============================================================ */

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ─── 01 · TRANSLATION ENGINE ─── */
const translations = {
  ar: {
    boot1: "// جاري تشغيل النظام",
    boot2: "MAHER-TECH v3.077 :: تهيئة الواجهة",
    status_online: "النظام متصل",
    status_mid: "جدة، السعودية · استوديو واجهات وتطوير وأمن سيبراني",
    status_hours: "السبت–الخميس 10ص–10م",
    brand: "كمبيوترجي ماهر",
    brand_sub: "واجهات · تطوير متكامل · أمن سيبراني",
    nav_services: "الخدمات", nav_how: "آلية العمل", nav_products: "العتاد", nav_projects: "المشاريع", nav_reviews: "آراء العملاء", nav_contact: "تواصل معنا",
    nav_book: "احجز الآن",
    hero_eyebrow: "// حلول تقنية موثوقة منذ 2016",
    hero_h1_line1: "نُصلح أجهزتك،", hero_h1_line2: "ونُجهّز", hero_h1_line3: "مستقبلك.",
    hero_sub: "من إصلاح الطابعات ومشاكل الواي فاي إلى تجهيز مكتبك بأحدث الكابلات والمحولات — فريق ماهر يصل إليك أينما كنت.",
    hero_cta1: "احجز جلسة الآن", hero_cta2: "تصفح العتاد",
    scrollcue: "مرّر للأسفل",
    hud_monitor: "مراقبة النظام", hud_desc: "نسبة رضا العملاء<br>خلال آخر 200 مشروع ومهمة",
    services_tag: "// الخدمات", services_h2: "احجز جلسة دعم فني في دقائق",
    services_p: "اختر نوع الخدمة، حدد الموعد المناسب، وسيصلك فنيّ مختص — أو انضم لجلسة عن بُعد فورية.",
    s1_title: "جلسة استشارة تقنية", s1_desc: "مكالمة فيديو مع مختص لتشخيص المشكلة، مراجعة الكود أو البنية، واختيار المسار التقني المناسب لمشروعك.",
    s2_title: "بناء واجهات أمامية", s2_desc: "واجهات إنتاجية سريعة ومتجاوبة بحركات نظيفة — من التصميم إلى كود يعمل، جاهز للنشر ومهيّأ للأداء.",
    s3_title: "تطوير متكامل", s3_desc: "من الواجهة إلى الخادم: واجهات برمجية، قواعد بيانات، مصادقة، ونشر — نظام كامل يُسلَّم ويعمل.",
    s4_title: "تأمين واختبار الأمن السيبراني", s4_desc: "فحص بأسلوب اختبار الاختراق، مراجعة الصلاحيات والثغرات الشائعة، وتقرير تقوية عملي لموقعك أو نظامك.",
    per_session: "/ الجلسة (45 دقيقة)", per_project: "/ المشروع", per_scan: "/ الفحص", book_now: "احجز الآن",
    how_tag: "// آلية العمل", how_h2: "أربع خطوات، ومشروعك يُسلَّم",
    how1_h: "حدّد النطاق", how1_p: "نتفق على ما يجب إنجازه بالضبط: الميزات، الصفحات، والنتيجة المتوقعة.",
    how2_h: "نتفق على الخطة", how2_p: "جدول زمني واضح، مراحل تسليم، وتكلفة ثابتة قبل أن نبدأ.",
    how3_h: "نبدأ التنفيذ", how3_p: "بناء تدريجي مع معاينات حيّة — ترى التقدّم أولاً بأول لا في النهاية فقط.",
    how4_h: "التسليم والمتابعة", how4_p: "نشر نهائي، كود مُوثّق، وفترة متابعة لأي تعديل أو سؤال.",
    products_tag: "// العتاد", products_h2: "العتاد الذي أعتمد عليه",
    products_p: "قطع مُجرَّبة على طاولة العمل — كابلات ومحولات أصلية أرشّحها وأوفّرها مع ضمان.",
    p_new: "جديد", p_hot: "الأكثر طلباً",
    p1_title: "كابل HDMI 4K", p1_desc: "طول 2 متر، دعم 4K@60Hz، مضفر ومقاوم للتلف.",
    p2_title: "محول USB-C إلى HDMI", p2_desc: "وصل جهازك بأي شاشة أو بروجكتر بدقة 4K.",
    p3_title: "كابل USB-C إلى Lightning", p3_desc: "شحن سريع ونقل بيانات لأجهزة آيفون وآيباد.",
    p4_title: "هَب USB-C متعدد المنافذ", p4_desc: "7 في 1: HDMI، USB 3.0، قارئ بطاقات، وشحن.",
    p5_title: "ماوس لاسلكي", p5_desc: "اتصال ثنائي، بطارية تدوم شهرين، تصميم صامت.",
    p6_title: "لوحة مفاتيح ميكانيكية", p6_desc: "إضاءة RGB، مفاتيح باللمس الأزرق، لوحة تقنية.",
    stat1: "مشروع ومهمة مُنجزة", stat2: "تقييم متوسط من العملاء", stat3: "متوسط زمن أول رد", stat4: "سنوات خبرة",
    band_text: "نبني تجارب لا صفحات · نبني تجارب لا صفحات · ",
    projects_tag: "// المشاريع", projects_h2: "مشاريع وأنظمة رقمية نفّذناها",
    projects_p: "نماذج حقيقية لمشاريع ومواقع رقمية وأنظمة تفاعلية تم تطويرها وتدشينها على الويب.",
    proj_preview_btn: "معاينة سريعة", proj_visit_btn: "زيارة الموقع ↗", proj_details_btn: "التفاصيل والمعاينة", proj_close_modal: "إغلاق",
    modal_client: "العميل:", modal_year: "سنة التنفيذ:", modal_stack: "تقنيات العمل:",
    p1_cat: "مكتبة رقمية", p1_proj_title: "مشروع إيلوريا — حكايات تُكتب لتبقى", p1_proj_desc: "منصة رقمية ومكتبة تفاعلية لعرض القصص والروايات والاقتباسات الأدبية بتصميم بصري وظيفي ودعم لوضع الكاتبة.",
    p2_cat: "بوابة إلكترونية", p2_proj_title: "بوابة مؤسسة الماهرين", p2_proj_desc: "بوابة تفاعلية بصرياً تجمع المشاريع العائلية والمنصات التقنية الصغيرة في واجهة دخول مبتكرة ومؤثرات خاصة.",
    reviews_tag: "// آراء العملاء", reviews_h2: "موثوق من عملاء حقيقيين",
    t1_p: "سلّم الواجهة خلال أيام، كود نظيف ومنظّم وشرح واضح لكل قرار تقني.", t1_name: "سارة العتيبي", t1_role: "صاحبة عمل صغير",
    t2_p: "بنى لنا نظاماً متكاملاً للحجوزات، ثابت وسريع ويشتغل بدون مشاكل من أول يوم.", t2_name: "فهد القحطاني", t2_role: "مدير مكتب",
    t3_p: "راجع أمان الموقع وطلّع لنا تقرير واضح بالثغرات وكيف نسدّها، شغل محترف.", t3_name: "نورة الحربي", t3_role: "مصممة جرافيك",
    t4_p: "استعنت بكمبيوترجي ماهر للعمل على موقعين في وقت قياسي وأتم ذلك بنجاح!", t4_name: "رئيسة موقع ايلوريا", t4_role: "كاتبة",
    cta_h2: "جاهز تحل مشكلتك التقنية؟", cta_p: "احجز جلستك الآن وخلّي فريق ماهر يتكفّل بالباقي.", cta_btn: "احجز جلستك الآن",
    footer_desc: "استوديو واجهات وتطوير متكامل وأمن سيبراني — نصل إليك أينما كنت في جدة والمنطقة الغربية.",
    footer_services: "الخدمات", footer_company: "الشركة", footer_careers: "الوظائف",
    footer_contact: "تواصل معنا", footer_addr: "جدة، المملكة العربية السعودية",
    footer_copy: "© 2077/12/12 — كمبيوترجي ماهر. جميع الحقوق محفوظة (نموذج تجريبي).",
    footer_note: "مصمم لأغراض العرض فقط",
    toast_book: "تم استلام الطلب — سيتواصل معك فريقنا قريباً",
    toast_cart: "تمت الإضافة إلى السلة",
    toast_wa: "جاري تحويلك إلى واتساب..."
  },
  en: {
    boot1: "// booting system",
    boot2: "MAHER-TECH v3.077 :: initialising interface",
    status_online: "SYSTEM ONLINE",
    status_mid: "Jeddah, Saudi Arabia · frontend, full-stack & security studio",
    status_hours: "Sat–Thu 10AM–10PM",
    brand: "Maher Tech",
    brand_sub: "FRONTEND · FULL-STACK · SECURITY",
    nav_services: "Services", nav_how: "Process", nav_products: "Bench", nav_projects: "Projects", nav_reviews: "Reviews", nav_contact: "Contact",
    nav_book: "Book now",
    hero_eyebrow: "// Trusted tech solutions since 2016",
    hero_h1_line1: "We fix your gear,", hero_h1_line2: "and gear up", hero_h1_line3: "your future.",
    hero_sub: "From printer jams and wifi dropouts to kitting out your desk with the latest cables and adapters — a skilled technician, wherever you are.",
    hero_cta1: "Book a session", hero_cta2: "Browse the bench",
    scrollcue: "SCROLL DOWN",
    hud_monitor: "SYSTEM MONITOR", hud_desc: "Customer satisfaction rate<br>across the last 200 projects & tasks",
    services_tag: "// Services", services_h2: "Book a technical session in minutes",
    services_p: "Pick a service, choose a time slot, and a specialist gets to work — or join an instant remote session.",
    s1_title: "Consulting Session", s1_desc: "A video call with a specialist to diagnose the problem, review your code or architecture, and choose the right technical path for your project.",
    s2_title: "Frontend Building Service", s2_desc: "Fast, responsive production interfaces with clean motion — from design to working, deploy-ready, performance-tuned code.",
    s3_title: "Full-Stack Development", s3_desc: "Front to back: APIs, databases, auth, and deployment — a complete system, delivered and running.",
    s4_title: "Securing & Cybersecurity Testing", s4_desc: "A pentest-style review of permissions and common vulnerabilities, with a practical hardening report for your site or system.",
    per_session: "/ session (45 min)", per_project: "/ project", per_scan: "/ scan", book_now: "Book now",
    how_tag: "// Process", how_h2: "Four steps, and your project ships",
    how1_h: "Define the scope", how1_p: "We agree on exactly what needs to be built: features, pages, and the expected outcome.",
    how2_h: "Agree on the plan", how2_p: "A clear timeline, delivery milestones, and a fixed price before we start.",
    how3_h: "Start building", how3_p: "Incremental builds with live previews — you see progress as it happens, not just at the end.",
    how4_h: "Ship & follow up", how4_p: "Final deploy, documented code, and a follow-up window for any tweak or question.",
    products_tag: "// The bench", products_h2: "The gear I rely on",
    products_p: "Bench-tested parts — genuine cables and adapters I recommend and stock, all warrantied.",
    p_new: "New", p_hot: "Most requested",
    p1_title: "HDMI 4K Cable", p1_desc: "2m length, 4K@60Hz support, braided and tangle-resistant.",
    p2_title: "USB-C to HDMI Adapter", p2_desc: "Connect your device to any display or projector in 4K.",
    p3_title: "USB-C to Lightning Cable", p3_desc: "Fast charging and data transfer for iPhone and iPad.",
    p4_title: "USB-C Multiport Hub", p4_desc: "7-in-1: HDMI, USB 3.0, card reader, and charging pass-through.",
    p5_title: "Wireless Mouse", p5_desc: "Dual connectivity, two-month battery life, silent clicks.",
    p6_title: "Mechanical Keyboard", p6_desc: "RGB backlight, blue tactile switches, tech-forward build.",
    stat1: "Projects & tasks delivered", stat2: "Average customer rating", stat3: "Average first-reply time", stat4: "Years of experience",
    band_text: "WE BUILD EXPERIENCES NOT PAGES · WE BUILD EXPERIENCES NOT PAGES · ",
    projects_tag: "// Projects", projects_h2: "Live web projects & platforms",
    projects_p: "Real digital platforms, interactive libraries, and custom portals built and deployed on the web.",
    proj_preview_btn: "Quick Preview", proj_visit_btn: "Visit Site ↗", proj_details_btn: "Details & Preview", proj_close_modal: "Close",
    modal_client: "Client:", modal_year: "Year:", modal_stack: "Tech Stack:",
    p1_cat: "Digital Library", p1_proj_title: "Eloria Project — Stories Made to Last", p1_proj_desc: "An interactive digital library and web platform for stories, web novels, and curated literary quotes.",
    p2_cat: "Web Portal", p2_proj_title: "Al-Maheren Foundation Portal", p2_proj_desc: "Interactive digital portal showcasing family projects and custom tech platforms with immersive visual effects.",
    reviews_tag: "// Reviews", reviews_h2: "Trusted by real customers",
    t1_p: "Delivered the frontend in days — clean, well-organised code and a clear rationale for every technical call.", t1_name: "Sarah Al-Otaibi", t1_role: "Small business owner",
    t2_p: "Built us a full booking system — stable, fast, and working without issues from day one.", t2_name: "Fahad Al-Qahtani", t2_role: "Office manager",
    t3_p: "Reviewed the site's security and gave us a clear report of the vulnerabilities and how to close them. Professional work.", t3_name: "Noura Al-Harbi", t3_role: "Graphic designer",
    t4_p: "I hired Computerjy Maher to work on two sites in record time — and it was done successfully!", t4_name: "Eloria site lead", t4_role: "Writer",
    cta_h2: "Ready to solve your technical problem?", cta_p: "Book your session now and let the Maher team take it from here.", cta_btn: "Book your session",
    footer_desc: "A frontend, full-stack and security studio — reaching you anywhere in Jeddah and the Western Region.",
    footer_services: "Services", footer_company: "Company", footer_careers: "Careers",
    footer_contact: "Contact", footer_addr: "Jeddah, Saudi Arabia",
    footer_copy: "© 2077/12/12 — Maher Tech. All rights reserved (mock site).",
    footer_note: "Designed for demo purposes only",
    toast_book: "Request received — our team will reach out shortly",
    toast_cart: "Added to cart",
    toast_wa: "Redirecting you to WhatsApp..."
  }
};

let currentLang = "ar";

function applyLang(lang) {
  currentLang = lang;
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  html.setAttribute("data-lang", lang);
  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = lang === "ar" ? "EN" : "AR";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = translations[lang][key];
    if (val !== undefined) el.innerHTML = val;
  });
  const gw = document.querySelector(".glitch-word");
  if (gw) gw.setAttribute("data-text", translations[lang].hero_h1_line2);
  buildSplits();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}

document.getElementById("langBtn").addEventListener("click", () => {
  const btn = document.getElementById("langBtn");
  btn.classList.add("glitching");
  setTimeout(() => btn.classList.remove("glitching"), 400);
  applyLang(currentLang === "ar" ? "en" : "ar");
});

/* ─── 02 · BOOT + CLOCK ─── */
(function boot() {
  const bootEl = document.getElementById("boot");
  const bar = bootEl.querySelector(".bar");
  const pct = bootEl.querySelector(".boot-pct");
  let done = false;
  const hide = () => {
    if (done) return;
    done = true;
    bootEl.classList.add("hide");
    bootEl.style.pointerEvents = "none";
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  };
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 20 + 8);
    bar.style.width = p + "%";
    pct.textContent = Math.round(p) + "%";
    if (p >= 100) { clearInterval(tick); setTimeout(hide, 280); }
  }, 120);
  // hard safety nets — wall-clock and on load, whichever comes first
  setTimeout(hide, 2600);
  window.addEventListener("load", () => setTimeout(hide, 400));
})();

function tickClock() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  const el = document.getElementById("clock");
  if (el) el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
tickClock();
setInterval(tickClock, 1000);

/* ─── 03 · SMOOTH SCROLL + SCROLLTRIGGER ─── */
let lenis = null;
const NO_LENIS = location.hash === "#static" || location.search.includes("static");
if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

if (!REDUCE && !NO_LENIS && window.Lenis) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, smoothWheel: true });
  if (window.ScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}

function goto(sel) {
  const target = document.querySelector(sel);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: -60, duration: 1.4 });
  else target.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" });
}
window.goto = goto;
document.querySelectorAll("[data-scroll]").forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("#")) { e.preventDefault(); goto(href); }
  });
});

/* ─── 04 · WEBGL PARTICLE CITY ─── */
(function particleCity() {
  const canvas = document.getElementById("fx");
  if (!canvas || !window.THREE) return;

  const COUNT = isTouch ? 2600 : 5200;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
  renderer.setSize(innerWidth, innerHeight);

  const shapes = {
    globe: new Float32Array(COUNT * 3),
    torus: new Float32Array(COUNT * 3),
    helix: new Float32Array(COUNT * 3),
    lattice: new Float32Array(COUNT * 3),
    skyline: new Float32Array(COUNT * 3),
    ring: new Float32Array(COUNT * 3)
  };
  const rnd = (a, b) => a + Math.random() * (b - a);

  const latN = Math.round(Math.cbrt(COUNT));
  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;

    // globe
    const phi = Math.acos(-1 + (2 * i) / COUNT);
    const theta = Math.sqrt(COUNT * Math.PI) * phi;
    const gr = 3 + Math.random() * 0.08;
    shapes.globe[i3] = gr * Math.cos(theta) * Math.sin(phi);
    shapes.globe[i3 + 1] = gr * Math.sin(theta) * Math.sin(phi);
    shapes.globe[i3 + 2] = gr * Math.cos(phi);

    // torus
    const u = Math.random() * Math.PI * 2, v = Math.random() * Math.PI * 2;
    const R = 3.1, r = 0.9 + Math.random() * 0.25;
    shapes.torus[i3] = (R + r * Math.cos(v)) * Math.cos(u);
    shapes.torus[i3 + 1] = r * Math.sin(v);
    shapes.torus[i3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);

    // helix (double)
    const ht = (i / COUNT) * Math.PI * 12;
    const strand = i % 2 === 0 ? 0 : Math.PI;
    const hr = 1.7;
    shapes.helix[i3] = Math.cos(ht + strand) * hr;
    shapes.helix[i3 + 1] = (i / COUNT) * 9 - 4.5;
    shapes.helix[i3 + 2] = Math.sin(ht + strand) * hr;

    // lattice cube
    const lx = i % latN;
    const ly = Math.floor(i / latN) % latN;
    const lz = Math.floor(i / (latN * latN)) % latN;
    const step = 5 / (latN - 1);
    shapes.lattice[i3] = lx * step - 2.5 + rnd(-0.05, 0.05);
    shapes.lattice[i3 + 1] = ly * step - 2.5 + rnd(-0.05, 0.05);
    shapes.lattice[i3 + 2] = lz * step - 2.5 + rnd(-0.05, 0.05);

    // skyline — particles stacked into building columns
    const cols = 26;
    const c = i % cols;
    const bx = (c / (cols - 1) - 0.5) * 12;
    const bh = 1.2 + (Math.sin(c * 12.9898) * 43758.5453 % 1 + 1) % 1 * 4.4;
    shapes.skyline[i3] = bx + rnd(-0.16, 0.16);
    shapes.skyline[i3 + 1] = -3 + Math.random() * bh;
    shapes.skyline[i3 + 2] = rnd(-2.4, 1.2) - Math.floor(i / cols) % 3 * 0.6;

    // ring burst
    const a = Math.random() * Math.PI * 2;
    const rr = 6.4 + Math.random() * 1.6;
    shapes.ring[i3] = Math.cos(a) * rr;
    shapes.ring[i3 + 1] = rnd(-0.7, 0.7);
    shapes.ring[i3 + 2] = Math.sin(a) * rr;
  }

  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(shapes.globe);
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#35e6ff") },
      uColorB: { value: new THREE.Color("#ff2e97") },
      uSize: { value: isTouch ? 9 : 12 }
    },
    vertexShader: `
      uniform float uTime; uniform float uSize;
      varying float vMix;
      void main(){
        vec3 p = position;
        p.y += sin(uTime*0.6 + p.x*0.5) * 0.06;
        p.x += cos(uTime*0.5 + p.z*0.4) * 0.06;
        vMix = clamp((p.y + 4.0) / 9.0, 0.0, 1.0);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uSize / -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColorA; uniform vec3 uColorB;
      varying float vMix;
      void main(){
        vec2 d = gl_PointCoord - 0.5;
        float l = length(d);
        if (l > 0.5) discard;
        vec3 col = mix(uColorA, uColorB, vMix);
        float alpha = (0.5 - l) * 1.9;
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  function baseCam() {
    if (innerWidth > 1024) { camera.position.set(2.1, 0.4, 7); }
    else { camera.position.set(0, 0.2, 9); }
    camera.lookAt(0, 0, 0);
  }
  baseCam();

  addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    baseCam();
  });

  // pointer parallax
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  if (!isTouch) {
    addEventListener("pointermove", (e) => {
      ptr.tx = (e.clientX / innerWidth - 0.5);
      ptr.ty = (e.clientY / innerHeight - 0.5);
    });
  }

  const clock = new THREE.Clock();
  let scrollDolly = 0;

  function render() {
    const t = clock.getElapsedTime();
    mat.uniforms.uTime.value = t;
    ptr.x = lerp(ptr.x, ptr.tx, 0.04);
    ptr.y = lerp(ptr.y, ptr.ty, 0.04);
    points.rotation.y = t * 0.04 + ptr.x * 0.5;
    points.rotation.x = ptr.y * 0.3;
    const targetZ = (innerWidth > 1024 ? 7 : 9) + scrollDolly;
    camera.position.z = lerp(camera.position.z, targetZ, 0.05);
    renderer.render(scene, camera);
  }

  if (REDUCE) {
    render();
  } else {
    renderer.setAnimationLoop(render);
  }
  requestAnimationFrame(() => canvas.classList.add("ready"));

  // morphing
  function morph(name, colA, colB) {
    const target = shapes[name];
    if (!target) return;
    document.documentElement.style.setProperty("--accent-live", colA);
    setGlow(colA, colB);
    if (REDUCE) {
      geo.attributes.position.array.set(target);
      geo.attributes.position.needsUpdate = true;
      mat.uniforms.uColorA.value.set(colA);
      mat.uniforms.uColorB.value.set(colB);
      render();
      return;
    }
    gsap.to(geo.attributes.position.array, {
      endArray: target, duration: 1.6, ease: "power2.inOut",
      onUpdate: () => { geo.attributes.position.needsUpdate = true; }
    });
    gsap.to(mat.uniforms.uColorA.value, { r: new THREE.Color(colA).r, g: new THREE.Color(colA).g, b: new THREE.Color(colA).b, duration: 1.4 });
    gsap.to(mat.uniforms.uColorB.value, { r: new THREE.Color(colB).r, g: new THREE.Color(colB).g, b: new THREE.Color(colB).b, duration: 1.4 });
  }

  function setGlow(a, b) {
    const bg = document.querySelector(".bg-glow");
    if (!bg) return;
    const ca = hexToRgba(a, 0.16), cb = hexToRgba(b, 0.13);
    document.documentElement.style.setProperty("--glow-a", ca);
    document.documentElement.style.setProperty("--glow-b", cb);
  }
  function hexToRgba(hex, alpha) {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map(x => x + x).join("") : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }

  const BEATS = [
    { sel: "#top", shape: "globe", a: "#35e6ff", b: "#9b6cff" },
    { sel: "#services", shape: "torus", a: "#35e6ff", b: "#ff2e97" },
    { sel: "#how", shape: "helix", a: "#9b6cff", b: "#35e6ff" },
    { sel: "#products", shape: "lattice", a: "#ff2e97", b: "#ffb020" },
    { sel: "#projects", shape: "skyline", a: "#35e6ff", b: "#c8ff3d" },
    { sel: "#reviews", shape: "ring", a: "#9b6cff", b: "#ff2e97" },
    { sel: ".cta-section", shape: "ring", a: "#c8ff3d", b: "#35e6ff" }
  ];

  // pick the active beat by scroll position — deterministic, no retroactive callbacks
  const beatEls = BEATS.map(b => ({ ...b, el: document.querySelector(b.sel) })).filter(b => b.el);
  let activeBeat = -1;
  function syncBeat() {
    const line = innerHeight * 0.4;
    let idx = 0;
    beatEls.forEach((b, i) => { if (b.el.getBoundingClientRect().top <= line) idx = i; });
    if (idx !== activeBeat) {
      activeBeat = idx;
      morph(beatEls[idx].shape, beatEls[idx].a, beatEls[idx].b);
    }
    const h = document.documentElement.scrollHeight - innerHeight;
    scrollDolly = (h > 0 ? (scrollY / h) : 0) * -2.2;
  }
  let beatTick = false;
  addEventListener("scroll", () => {
    if (beatTick) return;
    beatTick = true;
    requestAnimationFrame(() => { syncBeat(); beatTick = false; });
  }, { passive: true });
  if (lenis) lenis.on("scroll", syncBeat);
  setTimeout(syncBeat, 60);
})();

/* ─── 05 · SPLIT HEADINGS + REVEALS ─── */
function buildSplits() {
  document.querySelectorAll("h2.split").forEach(h => {
    // re-splittable: after i18n sets innerHTML to a plain string there are no .word children
    if (h.querySelector(".word")) return;
    const text = h.textContent.trim();
    h.innerHTML = text.split(/\s+/).map(w => `<span class="word"><span>${w}</span></span>`).join(" ");
    // if the heading is already on screen (e.g. language toggled mid-page), show it
    if (h.getBoundingClientRect().top < innerHeight * 0.9) h.classList.add("is-in");
  });
}
buildSplits();

// Reveals + split headings use IntersectionObserver — independent of any
// scroll-library / scroller-detection quirks, so content can never get stuck hidden.
(function revealSystem() {
  if (location.search.includes("show")) {           // QA helper: reveal everything at once
    document.querySelectorAll(".reveal, h2.split").forEach(el => el.classList.add("is-in"));
    document.querySelectorAll(".line-in").forEach(el => el.style.transform = "none");
    document.querySelectorAll(".step").forEach(el => el.classList.add("active"));
    return;
  }
  const seen = new WeakSet();
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal, h2.split").forEach(el => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting || seen.has(entry.target)) return;
      seen.add(entry.target);
      const delay = entry.target.classList.contains("reveal") ? (i % 6) * 80 : 0;
      setTimeout(() => entry.target.classList.add("is-in"), delay);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal, h2.split").forEach(el => io.observe(el));
  // absolute failsafe: nothing stays invisible past 4s
  setTimeout(() => document.querySelectorAll(".reveal:not(.is-in), h2.split:not(.is-in)").forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight) el.classList.add("is-in");
  }), 4000);
})();

/* ─── 06 · SCROLL RAIL + ACTIVE NAV ─── */
(function railAndNav() {
  const fill = document.getElementById("railFill");
  const labels = [...document.querySelectorAll(".rail-labels li")];
  const navLinks = [...document.querySelectorAll("nav.links a")];
  const nav = document.getElementById("mainNav");
  const map = { hero: "#top", services: "#services", how: "#how", products: "#products", projects: "#projects", reviews: "#reviews" };

  function onScroll() {
    const st = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - innerHeight;
    const p = h > 0 ? st / h : 0;
    if (fill) fill.style.height = (p * 100).toFixed(2) + "%";
    nav.classList.toggle("scrolled", st > 40);

    let current = "hero";
    Object.keys(map).forEach(key => {
      const el = document.querySelector(map[key]);
      if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) current = key;
    });
    labels.forEach(l => l.classList.toggle("active", l.dataset.section === current));
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === map[current]));
  }
  addEventListener("scroll", onScroll, { passive: true });
  if (lenis) lenis.on("scroll", onScroll);
  onScroll();
})();

/* ─── 07 · HOW-IT-WORKS SCRUB ─── */
(function stepsScrub() {
  const wrap = document.getElementById("steps");
  const fill = document.getElementById("stepsFill");
  const steps = [...document.querySelectorAll(".step")];
  if (!wrap) return;
  const showAll = () => { steps.forEach(s => s.classList.add("active")); if (fill) fill.style.width = "100%"; };
  if (!window.ScrollTrigger || REDUCE) { showAll(); return; }
  ScrollTrigger.create({
    trigger: wrap, start: "top 70%", end: "bottom 60%", scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress;
      if (fill) fill.style.width = (p * 100).toFixed(1) + "%";
      steps.forEach((s, i) => s.classList.toggle("active", p >= (i / steps.length) * 0.92));
    }
  });
  // failsafe: if the section is on screen and still dark after 4.5s, just light it up
  setTimeout(() => {
    if (!steps.some(s => s.classList.contains("active")) && wrap.getBoundingClientRect().top < innerHeight) showAll();
  }, 4500);
})();

/* ─── 08 · COUNTERS (IntersectionObserver — scroller-agnostic) ─── */
(function counters() {
  const els = [...document.querySelectorAll("[data-count]")];
  const run = (el) => {
    const end = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || "0");
    const suf = el.dataset.suffix || "";
    if (REDUCE || !window.gsap) { el.textContent = end.toFixed(dec) + suf; return; }
    const o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = o.v.toFixed(dec) + suf; } });
  };
  if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
})();

/* ─── 09 · MAGNETIC + TILT + GLOW-FOLLOW ─── */
if (!isTouch && !REDUCE) {
  document.querySelectorAll("[data-magnetic]").forEach(el => {
    const strength = 0.4;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  document.querySelectorAll("[data-tilt]").forEach(el => {
    const max = 7;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -2 * max;
      const ry = (px - 0.5) * 2 * max;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      el.style.setProperty("--mx", (px * 100) + "%");
      el.style.setProperty("--my", (py * 100) + "%");
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });
}

/* ─── 10 · CUSTOM CURSOR ─── */
(function cursor() {
  if (isTouch || REDUCE) return;
  document.documentElement.classList.add("has-cursor");
  const cur = document.querySelector(".cursor");
  const dot = cur.querySelector(".cursor-dot");
  const ring = cur.querySelector(".cursor-ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
  addEventListener("pointerdown", () => cur.classList.add("is-down"));
  addEventListener("pointerup", () => cur.classList.remove("is-down"));
  const hoverSel = "a, button, [data-magnetic], [data-tilt], input, .cart-btn";
  document.addEventListener("pointerover", (e) => { if (e.target.closest(hoverSel)) cur.classList.add("is-hover"); });
  document.addEventListener("pointerout", (e) => { if (e.target.closest(hoverSel)) cur.classList.remove("is-hover"); });
  (function follow() {
    rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(follow);
  })();
})();

/* ─── 11 · BAND DRIFT + HERO PARALLAX + GLITCH ─── */
if (window.gsap && window.ScrollTrigger && !REDUCE) {
  const band = document.querySelector(".band-track");
  if (band) {
    gsap.to(band, {
      xPercent: currentLang === "ar" ? 40 : -40, ease: "none",
      scrollTrigger: { trigger: ".band", start: "top bottom", end: "bottom top", scrub: 1 }
    });
  }
  gsap.utils.toArray("[data-parallax]").forEach(el => {
    const amt = parseFloat(el.dataset.parallax) || 0.1;
    gsap.fromTo(el, { y: -amt * 120 }, {
      y: amt * 120, ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
    });
  });
  gsap.to(".hero-left", {
    y: 90, opacity: 0.15, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
}

// hero headline entrance — CSS-driven so it can never get stuck by a throttled ticker
function heroEntrance() {
  const lines = document.querySelectorAll(".line-in");
  if (REDUCE || !window.gsap) { lines.forEach(l => l.style.transform = "none"); return; }
  gsap.to(lines, { y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, delay: 0.15 });
  // failsafe: force final state if the animation never completes
  setTimeout(() => lines.forEach(l => { l.style.transform = "none"; }), 2600);
}
if (document.readyState === "complete") heroEntrance();
else window.addEventListener("load", heroEntrance);

// glitch word
(function glitch() {
  const w = document.querySelector(".glitch-word");
  if (!w || REDUCE) return;
  setInterval(() => {
    if (Math.random() > 0.6) {
      w.classList.add("glitch");
      setTimeout(() => w.classList.remove("glitch"), 180);
    }
  }, 2600);
})();

/* ─── 12 · WHATSAPP BOOKING + TOAST ─── */
const WHATSAPP_NUMBER = "966555972970";
let toastTimer;

function showToast(key) {
  const toast = document.getElementById("toast");
  document.getElementById("toastText").textContent = translations[currentLang][key] || translations[currentLang].toast_book;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
  showToast("toast_wa");
}

function withSending(btn, fn) {
  // keep the window.open call inside the user gesture so it isn't popup-blocked
  if (btn) { btn.classList.add("sending"); setTimeout(() => btn.classList.remove("sending"), 900); }
  fn();
}

function bookService(key) {
  const btn = event && event.currentTarget;
  const name = translations.ar[key + "_title"];
  withSending(btn, () => openWhatsApp(`مرحباً، أرغب في حجز «${name}». أرجو التواصل معي لتحديد الموعد.`));
}
function buyProduct(key) {
  const btn = event && event.currentTarget;
  const name = translations.ar[key + "_title"];
  withSending(btn, () => openWhatsApp(`مرحباً، أرغب في طلب «${name}». أرجو تزويدي بتفاصيل الطلب.`));
}
function bookGeneral() {
  const btn = event && event.currentTarget;
  withSending(btn, () => openWhatsApp("مرحباً، أرغب في حجز جلسة مع كمبيوترجي ماهر."));
}
window.bookService = bookService;
window.buyProduct = buyProduct;
window.bookGeneral = bookGeneral;

/* ─── 13 · PROJECT MODAL ─── */
const projectsData = {
  proj1: {
    url: "https://abdullah2036.github.io/eloriaproject",
    img: "assets/projects/eloria.png", id: "PRJ / 01",
    ar: { title: "مشروع إيلوريا — حكايات تُكتب لتبقى", cat: "مكتبة رقمية", desc: "منصة رقمية ومكتبة تفاعلية لعرض القصص والروايات والاقتباسات الأدبية بتصميم بصري وظيفي ودعم لوضع الكاتبة والتصفح السلس.", client: "مشروع إيلوريا الأدبي", year: "2024" },
    en: { title: "Eloria Project — Stories Made to Last", cat: "Digital Library", desc: "An interactive digital library and web platform for stories, web novels, and curated literary quotes with a custom author mode.", client: "Eloria Project", year: "2024" },
    stack: ["HTML5", "CSS3", "JavaScript", "SPA Engine"]
  },
  proj2: {
    url: "https://abdullah2036.github.io/maheren",
    img: "assets/projects/maheren.png", id: "PRJ / 02",
    ar: { title: "بوابة مؤسسة الماهرين", cat: "بوابة إلكترونية", desc: "بوابة تفاعلية بصرياً تجمع المشاريع العائلية والمنصات التقنية الصغيرة في واجهة دخول مبتكرة ومؤثرات خاصة.", client: "مؤسسة الماهرين", year: "2024" },
    en: { title: "Al-Maheren Foundation Portal", cat: "Web Portal", desc: "Interactive digital portal showcasing family projects and custom tech platforms with immersive visual effects and gatehouse entry.", client: "Al-Maheren Foundation", year: "2024" },
    stack: ["HTML5", "Cyber CSS", "JS FX", "Interactive UI"]
  }
};

function openProjectModal(key) {
  const d = projectsData[key];
  if (!d) return;
  const L = d[currentLang] || d.ar;
  document.getElementById("modalUrl").textContent = d.url;
  document.getElementById("modalImg").src = d.img;
  document.getElementById("modalImg").alt = L.title;
  document.getElementById("modalCat").textContent = L.cat;
  document.getElementById("modalId").textContent = d.id;
  document.getElementById("modalTitle").textContent = L.title;
  document.getElementById("modalDesc").textContent = L.desc;
  document.getElementById("modalClient").textContent = L.client;
  document.getElementById("modalYear").textContent = L.year;
  document.getElementById("modalVisitBtn").href = d.url;
  document.getElementById("modalStack").innerHTML = d.stack.map(t => `<span>${t}</span>`).join("");
  document.getElementById("projectModal").classList.add("active");
  document.body.classList.add("no-scroll");
  if (lenis) lenis.stop();
}
function closeProjectModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains("modal-close")) return;
  document.getElementById("projectModal").classList.remove("active");
  document.body.classList.remove("no-scroll");
  if (lenis) lenis.start();
}
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProjectModal(); });

/* ─── init ─── */
applyLang("ar");

// re-measure once fonts / images have settled so ScrollTrigger starts are accurate
window.addEventListener("load", () => { if (window.ScrollTrigger) ScrollTrigger.refresh(); });
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => { if (window.ScrollTrigger) ScrollTrigger.refresh(); });
}
