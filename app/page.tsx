"use client";

import { useEffect, useRef, useCallback } from "react";

const PAGES = ["inicio", "servicios", "portfolio", "sobre-mi", "contacto"];
const HERO_PAGES = ["inicio"];

/* ── Gradient "photos" ── */
const GRADIENTS = {
  hero: `radial-gradient(ellipse at 45% 28%,rgba(240,180,80,.28) 0%,transparent 55%),
    radial-gradient(ellipse at 80% 75%,rgba(10,5,2,.6) 0%,transparent 55%),
    radial-gradient(ellipse at 20% 80%,rgba(10,5,2,.4) 0%,transparent 45%),
    linear-gradient(165deg,#1A0C06 0%,#3A1E0A 12%,#5E3018 22%,#8A4A20 32%,#B06828 40%,#C8882E 48%,#E0A838 55%,#D09430 63%,#A87028 72%,#784818 82%,#441E08 92%,#1A0A04 100%)`,
  garden: `radial-gradient(ellipse at 40% 30%,rgba(200,160,60,.25) 0%,transparent 50%),
    linear-gradient(160deg,#0E0906 0%,#2E1A0A 15%,#5A3212 30%,#8C5020 45%,#B8701A 58%,#D48C22 68%,#B8701A 78%,#6A3A10 90%,#1A0A04 100%)`,
  ceremony: `radial-gradient(ellipse at 60% 25%,rgba(220,180,80,.3) 0%,transparent 45%),
    linear-gradient(155deg,#0A0806 0%,#221408 12%,#4A2A10 24%,#7A4418 36%,#A86018 48%,#CC7C22 58%,#E0941C 65%,#C07818 74%,#824010 85%,#2A1006 94%,#0A0602 100%)`,
  reception: `radial-gradient(ellipse at 35% 35%,rgba(180,140,50,.22) 0%,transparent 50%),
    linear-gradient(170deg,#120A06 0%,#321808 14%,#622C12 28%,#924820 42%,#B8641A 55%,#D07C1E 65%,#B4601A 75%,#6E3010 87%,#1E0A04 100%)`,
  details: `radial-gradient(ellipse at 50% 20%,rgba(240,190,70,.28) 0%,transparent 48%),
    linear-gradient(145deg,#0C0804 0%,#2A1606 12%,#543010 24%,#844C1C 36%,#B46C1C 48%,#D08820 60%,#B46C1C 72%,#784010 84%,#180802 100%)`,
  couple: `radial-gradient(ellipse at 45% 40%,rgba(210,160,70,.26) 0%,transparent 52%),
    linear-gradient(158deg,#0E0A06 0%,#301A0A 14%,#5E3214 28%,#8E4E1E 42%,#BA6C1C 56%,#D8841E 66%,#BA6C1C 76%,#703A10 88%,#1A0804 100%)`,
  portrait: `radial-gradient(ellipse at 55% 30%,rgba(230,175,65,.24) 0%,transparent 50%),
    linear-gradient(162deg,#100806 0%,#2C1608 12%,#582C12 24%,#8A481A 36%,#B8661A 48%,#D47E1E 60%,#BC681A 72%,#7A3C0E 84%,#1C0A02 100%)`,
  about1: `radial-gradient(ellipse at 40% 35%,rgba(215,155,65,.22) 0%,transparent 52%),
    linear-gradient(155deg,#120A06 0%,#341A0A 15%,#663010 28%,#9A4C1C 42%,#C06A1C 54%,#D8801C 64%,#C26A1C 74%,#7A3C0E 86%,#1E0A02 100%)`,
  about2: `radial-gradient(ellipse at 60% 40%,rgba(200,150,55,.20) 0%,transparent 50%),
    linear-gradient(160deg,#0E0806 0%,#2E1608 14%,#5C2E10 28%,#8C4A1A 42%,#B6661A 56%,#CE7E1C 66%,#B6661A 76%,#703A0E 88%,#1A0804 100%)`,
};

const photoStyle = (g: string) => ({
  background: g,
  width: "100%",
  height: "100%",
});

export default function Home() {
  const currentPage = useRef("inicio");
  const hdrRef = useRef<HTMLElement>(null);
  const mnavRef = useRef<HTMLDivElement>(null);
  const hbgRef = useRef<HTMLButtonElement>(null);

  const initAnim = useCallback(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document
      .querySelectorAll(".page.act .fu, .page.act .fu2, .page.act .fu3")
      .forEach((el) => {
        el.classList.remove("in");
        io.observe(el);
      });
    return io;
  }, []);

  const nav = useCallback(
    (p: string) => {
      PAGES.forEach((id) => {
        const el = document.getElementById("page-" + id);
        if (el) el.classList.toggle("act", id === p);
      });
      document.querySelectorAll(".nav-list a, .mnav a").forEach((a) => {
        a.classList.toggle("act", (a as HTMLElement).dataset.p === p);
      });
      const hdr = hdrRef.current;
      if (hdr) {
        hdr.classList.toggle("on-hero", HERO_PAGES.includes(p));
        hdr.classList.toggle("solid", !HERO_PAGES.includes(p));
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.pushState({ p }, "", "#" + p);
      currentPage.current = p;
      setTimeout(initAnim, 50);
      // close mobile nav
      mnavRef.current?.classList.remove("open");
      hbgRef.current?.classList.remove("open");
      document.body.style.overflow = "";
    },
    [initAnim]
  );

  useEffect(() => {
    // Set initial page from hash
    const hash = window.location.hash.slice(1);
    const initial = PAGES.includes(hash) ? hash : "inicio";
    nav(initial);

    // Scroll handler
    const onScroll = () => {
      const hdr = hdrRef.current;
      if (!hdr) return;
      const pg = document.getElementById("page-inicio");
      const heroEl = pg?.querySelector<HTMLElement>(".hero");
      if (heroEl && pg?.classList.contains("act")) {
        const past = window.scrollY > heroEl.offsetHeight - 80;
        hdr.classList.toggle("solid", past);
        hdr.classList.toggle("on-hero", !past);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Popstate
    const onPop = (e: PopStateEvent) => {
      const p = e.state?.p || "inicio";
      if (PAGES.includes(p)) nav(p);
    };
    window.addEventListener("popstate", onPop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
    };
  }, [nav]);

  const toggleMenu = () => {
    const open = mnavRef.current?.classList.toggle("open");
    hbgRef.current?.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.style.display = "none";
    const success = document.getElementById("fsuccess");
    if (success) success.classList.add("show");
  };

  return (
    <>
      {/* ── HEADER ── */}
      <header className="hdr on-hero" ref={hdrRef}>
        <span className="logo" onClick={() => nav("inicio")}>
          La Maldita Boda
        </span>
        <nav>
          <ul className="nav-list">
            {[
              ["inicio", "Inicio"],
              ["servicios", "Servicios"],
              ["portfolio", "Portfolio"],
              ["sobre-mi", "Sobre mí"],
              ["contacto", "Contacto"],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  data-p={id}
                  onClick={() => nav(id)}
                  style={{ cursor: "pointer" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hdr-right">
          <button className="btn-solid" onClick={() => nav("contacto")}>
            Reservar consultoría <span className="arr">→</span>
          </button>
          <button className="hbg" ref={hbgRef} onClick={toggleMenu} aria-label="Menú">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── MOBILE NAV ── */}
      <div className="mnav" ref={mnavRef}>
        <button className="mnav-close" onClick={toggleMenu}>✕</button>
        {[
          ["inicio", "Inicio"],
          ["servicios", "Servicios"],
          ["portfolio", "Portfolio"],
          ["sobre-mi", "Sobre mí"],
          ["contacto", "Contacto"],
        ].map(([id, label]) => (
          <a key={id} data-p={id} onClick={() => nav(id)} style={{ cursor: "pointer" }}>
            {label}
          </a>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          PAGE: INICIO
      ══════════════════════════════════════════ */}
      <main id="page-inicio" className="page">
        {/* Hero */}
        <section className="hero">
          <div className="hero-copy">
            <p className="hero-tag fu">Wedding Planner · Madrid</p>
            <h1 className="hero-h fu2">
              Tu boda,<br />sin perder<br />la cabeza.
            </h1>
            <p className="hero-p fu3">
              Coordinación integral para parejas que saben lo que quieren pero
              no tienen tiempo, ni ganas, de gestionar cien proveedores a la vez.
            </p>
            <div className="hero-acts fu">
              <button className="btn-hero-p" onClick={() => nav("servicios")}>
                Ver servicios <span className="arr">→</span>
              </button>
              <button className="btn-ghost-hero" onClick={() => nav("portfolio")}>
                Ver bodas
              </button>
            </div>
          </div>
          <div className="hero-img">
            <div className="hero-img-bg" style={photoStyle(GRADIENTS.hero)} />
            <div className="hero-img-vignette" />
            <div className="hero-edge" />
          </div>
          <div className="hero-scroll">Desplázate</div>
        </section>

        {/* Manifesto */}
        <section className="manifesto">
          <div className="w">
            <div className="manifesto-nums fu">
              {[
                ["+200", "bodas coordinadas"],
                ["12", "años de experiencia"],
                ["98%", "clientes satisfechos"],
              ].map(([v, l]) => (
                <div className="mnum" key={l}>
                  <div className="mnum-v">{v}</div>
                  <div className="mnum-l">{l}</div>
                </div>
              ))}
            </div>
            <div>
              <p className="manifesto-q fu2">
                Una boda bien hecha no es cara.<br />
                Es <em>cara cuando sale mal.</em>
              </p>
              <p className="manifesto-body fu3">
                Llevo doce años haciendo que el día más importante de la vida de
                mis clientes salga exactamente como lo imaginaron, o mejor.
                Sin improvisaciones, sin sustos de última hora, sin el caos que
                nadie te cuenta cuando decides organizarlo todo sola.
              </p>
            </div>
          </div>
        </section>

        {/* Service list teaser */}
        <section className="svc-sec">
          <div className="w">
            <div className="svc-header">
              <div>
                <span className="sec-label fu">Servicios</span>
                <h2 className="sec-title fu2">
                  Lo que hago<br />por tu boda.
                </h2>
              </div>
              <p className="sec-body fu3">
                Desde la coordinación completa hasta una consultoría de una tarde.
                Cada servicio está diseñado para darte exactamente lo que necesitas,
                sin pagar por lo que no.
              </p>
            </div>
          </div>
          <div className="svc-rows">
            {[
              ["01", "Wedding Planning Integral", "Coordinación completa de principio a fin"],
              ["02", "Coordinación de Día", "Tu gran día en las mejores manos"],
              ["03", "Consultoría y Asesoría", "Orientación experta para cada decisión"],
              ["04", "Diseño y Estilismo", "La estética que siempre imaginaste"],
            ].map(([n, name, tag]) => (
              <button
                className="svc-row fu"
                key={n}
                onClick={() => nav("servicios")}
              >
                <span className="svc-n">{n}</span>
                <span className="svc-name">{name}</span>
                <span className="svc-tag">{tag}</span>
                <span className="svc-arr">→</span>
              </button>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="quote-sec">
          <div className="ws">
            <p className="quote-q fu">
              &ldquo;No soy la wedding planner que aparece en Instagram con paletas de
              colores Pantone. Soy la que resuelve el problema del catering a las
              11 de la noche antes de tu boda.&rdquo;
            </p>
            <p className="quote-a fu2">Pilar Gómez · La Maldita Boda</p>
          </div>
        </section>

        {/* Portfolio teaser */}
        <section className="port-home">
          <div className="w">
            <div className="port-home-header fu">
              <div>
                <span className="sec-label">Portfolio</span>
                <h2 className="sec-title">Bodas recientes.</h2>
              </div>
              <button className="btn-text" onClick={() => nav("portfolio")}>
                Ver todas <span className="arr">→</span>
              </button>
            </div>
            <div className="port-home-grid">
              {[
                { g: GRADIENTS.garden, n: "Carmen y Álvaro", l: "Marbella, 2024" },
                { g: GRADIENTS.ceremony, n: "Isabel y Miguel", l: "Toledo, 2024" },
                { g: GRADIENTS.reception, n: "Laura y Javier", l: "Sevilla, 2023" },
                { g: GRADIENTS.details, n: "Ana y Roberto", l: "Granada, 2023" },
                { g: GRADIENTS.couple, n: "Sofía y David", l: "Valencia, 2024" },
              ].map(({ g, n, l }) => (
                <div className="pi fu" key={n} onClick={() => nav("portfolio")}>
                  <div className="pi-bg" style={photoStyle(g)} />
                  <div className="pi-over">
                    <div>
                      <div className="pi-name">{n}</div>
                      <div className="pi-loc">{l}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Big CTA */}
        <section className="cta-sec">
          <div className="w">
            <button className="cta-big" onClick={() => nav("contacto")}>
              Hablemos.
            </button>
            <span className="cta-sub">
              Una conversación de 30 minutos para ver si encajamos.
              Sin compromiso, sin presión.
            </span>
            <div className="cta-btns">
              <button className="btn-dark-solid" onClick={() => nav("contacto")}>
                Reservar consultoría <span className="arr">→</span>
              </button>
              <button className="btn-text" onClick={() => nav("sobre-mi")}>
                Conocer a Pilar <span className="arr">→</span>
              </button>
            </div>
          </div>
        </section>

        <footer className="ftr">
          <div className="w ftr-inner">
            <span className="ftr-logo">La Maldita Boda</span>
            <ul className="ftr-nav">
              {[["inicio","Inicio"],["servicios","Servicios"],["portfolio","Portfolio"],["sobre-mi","Sobre mí"],["contacto","Contacto"]].map(([id,l])=>(
                <li key={id}><a onClick={()=>nav(id)} style={{cursor:"pointer"}}>{l}</a></li>
              ))}
            </ul>
            <span className="ftr-copy">© 2024 Pilar Gómez · @lamalditaboda</span>
          </div>
        </footer>
      </main>

      {/* ══════════════════════════════════════════
          PAGE: SERVICIOS
      ══════════════════════════════════════════ */}
      <main id="page-servicios" className="page">
        <section className="pg-intro">
          <div className="w">
            <div className="pg-intro-inner">
              <h1 className="pg-title fu">
                Servi<br />cios.
              </h1>
              <div>
                <span className="sec-label fu">Lo que ofrezco</span>
                <p className="sec-body fu2" style={{ maxWidth: 480 }}>
                  Cada boda es diferente. Cada pareja tiene necesidades distintas.
                  Por eso no trabajo con paquetes cerrados: adapto mi servicio
                  a lo que tú necesitas de verdad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service panels */}
        {[
          {
            n: "01",
            name: "Wedding Planning Integral",
            body: [
              "El servicio completo para parejas que quieren delegar absolutamente todo. Desde la búsqueda del venue hasta el lazo en los ramos de las damas de honor.",
              "Gestiono cada proveedor, negocio cada contrato y coordino cada detalle durante los meses previos y el día de la boda.",
            ],
            note: "Disponible para bodas en toda España",
            grad: GRADIENTS.garden,
            reverse: false,
          },
          {
            n: "02",
            name: "Coordinación de Día",
            body: [
              "Para parejas que han organizado su boda pero necesitan a alguien de confianza que lo ejecute a la perfección el día D.",
              "Me incorporo 4-6 semanas antes para conocer a todos los proveedores y garantizar que nada falle cuando más importa.",
            ],
            note: "El servicio más demandado",
            grad: GRADIENTS.ceremony,
            reverse: true,
          },
          {
            n: "03",
            name: "Consultoría y Asesoría",
            body: [
              "Para las parejas que quieren llevar las riendas pero necesitan orientación experta en momentos clave: selección de proveedor, negociación de contratos, gestión de imprevistos.",
              "Sesiones de 2 horas enfocadas en resolver exactamente lo que necesitas.",
            ],
            note: "Desde 150 € / sesión",
            grad: GRADIENTS.reception,
            reverse: false,
          },
          {
            n: "04",
            name: "Diseño y Estilismo",
            body: [
              "La estética de tu boda es tan importante como la logística. Diseño el concepto visual completo: paleta de colores, floral, decoración, papelería y styling de los novios.",
              "Trabajo con mis proveedores de confianza para que la ejecución sea impecable.",
            ],
            note: "Complemento al Planning Integral",
            grad: GRADIENTS.details,
            reverse: true,
          },
        ].map(({ n, name, body, note, grad, reverse }) => (
          <div className={`svc-panel${reverse ? " reverse" : ""}`} key={n}>
            <div className={`sp-copy ${reverse ? "sp-copy-right" : "sp-copy-left"}`}>
              <span className="sp-num fu">{n}</span>
              <h2 className="sp-name fu2">{name}</h2>
              <div className="sp-body fu3">
                {body.map((b, i) => <p key={i}>{b}</p>)}
              </div>
              <span className="sp-note fu">{note}</span>
            </div>
            <div className="sp-img">
              <div className="sp-img-bg" style={photoStyle(grad)} />
              <div className="sp-img-overlay" />
            </div>
          </div>
        ))}

        {/* CTA */}
        <section className="cta-sec">
          <div className="w">
            <button className="cta-big" onClick={() => nav("contacto")}>
              ¿Hablamos?
            </button>
            <span className="cta-sub">
              Cuéntame tu boda y te digo qué servicio encaja mejor.
            </span>
            <div className="cta-btns">
              <button className="btn-dark-solid" onClick={() => nav("contacto")}>
                Contactar <span className="arr">→</span>
              </button>
            </div>
          </div>
        </section>

        <footer className="ftr">
          <div className="w ftr-inner">
            <span className="ftr-logo">La Maldita Boda</span>
            <ul className="ftr-nav">
              {[["inicio","Inicio"],["servicios","Servicios"],["portfolio","Portfolio"],["sobre-mi","Sobre mí"],["contacto","Contacto"]].map(([id,l])=>(
                <li key={id}><a onClick={()=>nav(id)} style={{cursor:"pointer"}}>{l}</a></li>
              ))}
            </ul>
            <span className="ftr-copy">© 2024 Pilar Gómez</span>
          </div>
        </footer>
      </main>

      {/* ══════════════════════════════════════════
          PAGE: PORTFOLIO
      ══════════════════════════════════════════ */}
      <main id="page-portfolio" className="page">
        <section className="pg-port-intro pg-intro">
          <div className="w">
            <h1 className="pg-title fu">
              Port<br />folio.
            </h1>
            <div>
              <span className="sec-label fu">Bodas coordinadas</span>
              <p className="sec-body fu2" style={{ maxWidth: 460 }}>
                Más de 200 bodas en toda España. Cada una diferente.
                Todas con la misma atención al detalle.
              </p>
            </div>
          </div>
        </section>

        <div className="port-full-grid">
          {[
            { g: GRADIENTS.garden, n: "Carmen y Álvaro", l: "Marbella · Junio 2024" },
            { g: GRADIENTS.ceremony, n: "Isabel y Miguel", l: "Toledo · Mayo 2024" },
            { g: GRADIENTS.reception, n: "Laura y Javier", l: "Sevilla · Octubre 2023" },
            { g: GRADIENTS.couple, n: "Sofía y David", l: "Valencia · Septiembre 2024" },
            { g: GRADIENTS.details, n: "Ana y Roberto", l: "Granada · Julio 2023" },
            { g: GRADIENTS.portrait, n: "Marina y Carlos", l: "Mallorca · Agosto 2024" },
            { g: GRADIENTS.about1, n: "Elena y Marcos", l: "Madrid · Abril 2024" },
            { g: GRADIENTS.about2, n: "Patricia y Sergio", l: "Barcelona · Mayo 2023" },
            { g: GRADIENTS.hero, n: "Lucía y Andrés", l: "Córdoba · Junio 2023" },
          ].map(({ g, n, l }) => (
            <div className="ppi fu" key={n}>
              <div className="ppi-bg" style={{ ...photoStyle(g), aspectRatio: "3/4" }} />
              <div className="ppi-over">
                <div className="ppi-cap">
                  <div className="ppi-cap-name">{n}</div>
                  <div className="ppi-cap-loc">{l}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="cta-sec">
          <div className="w">
            <button className="cta-big" onClick={() => nav("contacto")}>
              Tu boda.
            </button>
            <span className="cta-sub">
              La siguiente historia podría ser la tuya.
            </span>
            <div className="cta-btns">
              <button className="btn-dark-solid" onClick={() => nav("contacto")}>
                Empezar <span className="arr">→</span>
              </button>
            </div>
          </div>
        </section>

        <footer className="ftr">
          <div className="w ftr-inner">
            <span className="ftr-logo">La Maldita Boda</span>
            <ul className="ftr-nav">
              {[["inicio","Inicio"],["servicios","Servicios"],["portfolio","Portfolio"],["sobre-mi","Sobre mí"],["contacto","Contacto"]].map(([id,l])=>(
                <li key={id}><a onClick={()=>nav(id)} style={{cursor:"pointer"}}>{l}</a></li>
              ))}
            </ul>
            <span className="ftr-copy">© 2024 Pilar Gómez</span>
          </div>
        </footer>
      </main>

      {/* ══════════════════════════════════════════
          PAGE: SOBRE MI
      ══════════════════════════════════════════ */}
      <main id="page-sobre-mi" className="page">
        <section className="about-top w">
          <div className="about-photo fu">
            <div
              className="about-photo-img"
              style={{
                background: GRADIENTS.about1,
                aspectRatio: "4/5",
                width: "100%",
              }}
            />
            <div className="about-photo-caption">Pilar Gómez · Madrid</div>
          </div>
          <div>
            <span className="sec-label fu">Sobre mí</span>
            <h1 className="about-title fu2">
              Doce años haciendo que los días imposibles sean perfectos.
            </h1>
            <p className="about-p fu3">
              Empecé en esto por accidente. Fui a la boda de mi prima, vi el
              caos que se montó y pensé: &ldquo;Esto lo podría haber hecho mejor yo.&rdquo;
              Tenía razón. Y así empezó todo.
            </p>
            <p className="about-p fu3">
              Doce años después, he coordinado más de 200 bodas en toda España.
              He gestionado tormentas en el día de la boda, caterings que
              fallaron a última hora, y novias que querían cambiar la decoración
              completa 48 horas antes de la ceremonia.
            </p>
            <p className="about-p fu3">
              No prometo bodas perfectas. Prometo que cuando algo salga mal,
              tú no te enterarás.
            </p>
            <div className="about-highlights fu">
              {[
                ["Especialidad", "Bodas íntimas y grandes celebraciones en fincas"],
                ["Zona", "Madrid · Andalucía · Mediterráneo"],
                ["Formación", "Certificada WPIC · Máster en Eventos"],
                ["Idiomas", "Español · Inglés · Francés"],
              ].map(([n, v]) => (
                <div className="ahl" key={n}>
                  <div className="ahl-n">{n}</div>
                  <div className="ahl-v">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full width photo with quote */}
        <div className="about-full">
          <div
            className="about-full-bg"
            style={{
              background: GRADIENTS.about2,
              position: "absolute",
              inset: 0,
            }}
          />
          <div className="about-full-vignette" />
          <div className="about-full-text">
            <p className="about-full-q fu">
              &ldquo;Mi trabajo no acaba cuando termina la boda. Acaba cuando
              los novios me mandan la foto de la luna de miel.&rdquo;
            </p>
            <p className="about-full-a fu2">Pilar Gómez</p>
          </div>
        </div>

        <section className="cta-sec">
          <div className="w">
            <button className="cta-big" onClick={() => nav("contacto")}>
              Hola, Pilar.
            </button>
            <span className="cta-sub">
              Cuéntame tu historia. Me encanta conocer a las parejas
              antes de empezar a trabajar juntos.
            </span>
            <div className="cta-btns">
              <button className="btn-dark-solid" onClick={() => nav("contacto")}>
                Escribirle <span className="arr">→</span>
              </button>
              <button className="btn-text" onClick={() => nav("servicios")}>
                Ver servicios <span className="arr">→</span>
              </button>
            </div>
          </div>
        </section>

        <footer className="ftr">
          <div className="w ftr-inner">
            <span className="ftr-logo">La Maldita Boda</span>
            <ul className="ftr-nav">
              {[["inicio","Inicio"],["servicios","Servicios"],["portfolio","Portfolio"],["sobre-mi","Sobre mí"],["contacto","Contacto"]].map(([id,l])=>(
                <li key={id}><a onClick={()=>nav(id)} style={{cursor:"pointer"}}>{l}</a></li>
              ))}
            </ul>
            <span className="ftr-copy">© 2024 Pilar Gómez</span>
          </div>
        </footer>
      </main>

      {/* ══════════════════════════════════════════
          PAGE: CONTACTO
      ══════════════════════════════════════════ */}
      <main id="page-contacto" className="page">
        <section className="contact-top w">
          <div className="contact-sticky">
            <span className="sec-label fu">Contacto</span>
            <h1 className="contact-title fu2">
              Cuen<br />tame<br />todo.
            </h1>
            <p className="contact-p fu3">
              Una conversación de 30 minutos para ver si encajamos.
              Sin compromiso, sin presión. Solo hablamos de tu boda.
            </p>
            <div className="cdets fu">
              {[
                ["Instagram", "@lamalditaboda"],
                ["Email", "hola@lamalditaboda.es"],
                ["Teléfono", "+34 600 000 000"],
                ["Zona de trabajo", "Toda España"],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="cdet-l">{l}</div>
                  <div className="cdet-v">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <form className="cform" onSubmit={submitForm}>
              <div className="fg-row">
                <div className="fg">
                  <label htmlFor="fn">Nombre</label>
                  <input id="fn" type="text" placeholder="Tu nombre" required />
                </div>
                <div className="fg">
                  <label htmlFor="fln">Apellidos</label>
                  <input id="fln" type="text" placeholder="Tus apellidos" required />
                </div>
              </div>
              <div className="fg">
                <label htmlFor="fe">Email</label>
                <input id="fe" type="email" placeholder="tu@email.com" required />
              </div>
              <div className="fg">
                <label htmlFor="ff">Fecha de la boda</label>
                <input id="ff" type="text" placeholder="Mes y año aproximado" />
              </div>
              <div className="fg-row">
                <div className="fg">
                  <label htmlFor="fl">Lugar previsto</label>
                  <input id="fl" type="text" placeholder="Ciudad o provincia" />
                </div>
                <div className="fg">
                  <label htmlFor="fg2">Número de invitados</label>
                  <input id="fg2" type="text" placeholder="Aproximado" />
                </div>
              </div>
              <div className="fg">
                <label htmlFor="fb">Presupuesto estimado</label>
                <select id="fb" required>
                  <option value="">Seleccionar franja...</option>
                  <option>Menos de 15.000 €</option>
                  <option>15.000 € · 25.000 €</option>
                  <option>25.000 € · 40.000 €</option>
                  <option>40.000 € · 60.000 €</option>
                  <option>Más de 60.000 €</option>
                  <option>Prefiero comentarlo en persona</option>
                </select>
              </div>
              <div className="fg">
                <label htmlFor="fm">Cuéntame tu boda</label>
                <textarea id="fm" placeholder="¿Cómo la imaginas? ¿Qué es lo más importante para vosotros?" required />
              </div>
              <button type="submit" className="fsub">
                Enviar <span className="arr">→</span>
              </button>
            </form>
            <div className="fsuccess" id="fsuccess">
              <h3>Mensaje recibido.</h3>
              <p>Te escribo en menos de 48 horas. Mientras tanto, sígueme en @lamalditaboda.</p>
            </div>
          </div>
        </section>

        <footer className="ftr">
          <div className="w ftr-inner">
            <span className="ftr-logo">La Maldita Boda</span>
            <ul className="ftr-nav">
              {[["inicio","Inicio"],["servicios","Servicios"],["portfolio","Portfolio"],["sobre-mi","Sobre mí"],["contacto","Contacto"]].map(([id,l])=>(
                <li key={id}><a onClick={()=>nav(id)} style={{cursor:"pointer"}}>{l}</a></li>
              ))}
            </ul>
            <span className="ftr-copy">© 2024 Pilar Gómez</span>
          </div>
        </footer>
      </main>
    </>
  );
}
