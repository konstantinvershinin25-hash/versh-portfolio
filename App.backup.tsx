import React, { useEffect, useRef, useState } from 'react'

import kristallHome from './assets/kristall-home.png'
import kristallShops from './assets/kristall-shops.png'
import kristallAbout from './assets/kristall-about.png'

import petDayHero from './assets/pet-day/pet-day-01-hero.png'
import petDayAbout from './assets/pet-day/pet-day-02-about.png'
import petDayProgram from './assets/pet-day/pet-day-03-program.png'
import petDaySpeakers from './assets/pet-day/pet-day-04-speakers.png'
import petDayWhy from './assets/pet-day/pet-day-05-why.png'
import petDayRegistration from './assets/pet-day/pet-day-06-registration.png'
import petDayFaq from './assets/pet-day/pet-day-07-faq.png'
import petDayFooter from './assets/pet-day/pet-day-08-footer.png'

const projects = [
  {
    n: '01',
    title: 'ТЦ КРИСТАЛЛ',
    type: 'WEB DESIGN',
    year: '2026',
    cls: 'crystal',
    image: '',
  },
  {
    n: '02',
    title: 'ТЦ АТЛАНТ',
    type: 'WEB / ART DIRECTION',
    year: '2026',
    cls: 'atlant',
    image: '',
  },
  {
    n: '03',
    title: 'YANDEX PET DAY',
    type: 'DIGITAL / CAMPAIGN',
    year: '2026',
    cls: 'pet',
    image: '',
  },
]

const caseStudies = {
  crystal: {
    number: '01',
    title: 'ТЦ КРИСТАЛЛ',
    category: 'WEB DESIGN / DIGITAL EXPERIENCE',
    year: '2026',
    description:
      'Разработка современного цифрового опыта для торгового центра. Основная задача — объединить навигацию, арендаторов, услуги и информацию о комплексе в единой визуальной системе.',
    services: [
      'ART DIRECTION',
      'UI / UX DESIGN',
      'WEB DEVELOPMENT',
      'MOTION DESIGN',
    ],
  },

  atlant: {
    number: '02',
    title: 'ТЦ АТЛАНТ',
    category: 'WEB / ART DIRECTION',
    year: '2026',
    description:
      'Цифровая концепция сайта торгового центра с акцентом на визуальную подачу пространства, арендаторов и коммерческую привлекательность объекта.',
    services: [
      'ART DIRECTION',
      'WEB DESIGN',
      'UI / UX',
      'DEVELOPMENT',
    ],
  },

  pet: {
    number: '03',
    title: 'YANDEX PET DAY',
    category: 'DIGITAL / CAMPAIGN',
    year: '2026',
    description:
      'Концепция и дизайн digital-сайта Yandex Pet Day — конференции о digital-продуктах в сфере pet-tech. Задача — превратить насыщенный контент конференции в понятный, эмоциональный и визуально цельный пользовательский опыт.',
    services: [
      'CREATIVE DIRECTION',
      'WEB DESIGN',
      'UI / UX DESIGN',
      'ART DIRECTION',
    ],
  },
}

type ProjectKey = keyof typeof caseStudies

const petDayImages = [
  {
    image: petDayAbout,
    number: '02',
    title: 'О конференции',
    alt: 'Yandex Pet Day — о конференции',
  },
  {
    image: petDayProgram,
    number: '03',
    title: 'Программа конференции',
    alt: 'Yandex Pet Day — программа',
  },
  {
    image: petDaySpeakers,
    number: '04',
    title: 'Спикеры',
    alt: 'Yandex Pet Day — спикеры',
  },
  {
    image: petDayWhy,
    number: '05',
    title: 'Why attend',
    alt: 'Yandex Pet Day — почему стоит пойти',
  },
  {
    image: petDayRegistration,
    number: '06',
    title: 'Регистрация',
    alt: 'Yandex Pet Day — регистрация',
  },
  {
    image: petDayFaq,
    number: '07',
    title: 'FAQ',
    alt: 'Yandex Pet Day — FAQ',
  },
  {
    image: petDayFooter,
    number: '08',
    title: 'Footer',
    alt: 'Yandex Pet Day — footer',
  },
]

export default function App() {
  const cursor = useRef<HTMLDivElement>(null)

  const getProjectFromUrl = (): ProjectKey | null => {
    const value = new URLSearchParams(window.location.search).get('project')

    return value && value in caseStudies
      ? (value as ProjectKey)
      : null
  }

  const [projectKey, setProjectKey] =
    useState<ProjectKey | null>(getProjectFromUrl)

  useEffect(() => {
    const handlePopState = () => {
      setProjectKey(getProjectFromUrl())
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    const cursorElement = cursor.current

    if (!cursorElement) return

    const handleMouseMove = (event: MouseEvent) => {
      cursorElement.style.left = `${event.clientX}px`
      cursorElement.style.top = `${event.clientY}px`
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
  const selector = projectKey
    ? '.case-pet-gallery .case-pet-image'
    : '.reveal'

  const elements = document.querySelectorAll(selector)

  if (!elements.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -5% 0px',
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })

  return () => {
    observer.disconnect()
  }
}, [projectKey])

  const openCase = (key: ProjectKey) => {
    window.history.pushState({}, '', `?project=${key}`)
    setProjectKey(key)

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }

  const closeCase = () => {
    window.history.pushState({}, '', window.location.pathname)
    setProjectKey(null)

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }

  /*
   * =========================================================
   * CASE PAGE
   * =========================================================
   */

  if (projectKey) {
    const project = caseStudies[projectKey]

    const nextKey: ProjectKey =
      projectKey === 'crystal'
        ? 'atlant'
        : projectKey === 'atlant'
          ? 'pet'
          : 'crystal'

    const nextProject = caseStudies[nextKey]

    return (
      <div className="site case-page">

        <div className="cursor" ref={cursor}>
          <span>BACK</span>
        </div>

        {/* NAVIGATION */}

        <header className="nav case-nav">

          <button
            className="case-logo"
            onClick={closeCase}
          >
            VERSH<span>®</span>
          </button>

          <button
            className="case-back"
            onClick={closeCase}
          >
            ← BACK TO WORK
          </button>

        </header>

        <main>

          {/* =================================================
              CASE HERO
             ================================================= */}

          <section className={`case-hero case-${projectKey}`}>

            <div className="case-hero-top">

              <span>
                {project.number} — {project.category}
              </span>

              <span>
                {project.year}
              </span>

            </div>

            <h1>
              {project.title}
            </h1>

            <div className="case-hero-bottom">

              <p>
                {project.description}
              </p>

              <div className="case-services">

                <span>SERVICES</span>

                {project.services.map((service) => (
                  <b key={service}>
                    {service}
                  </b>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              OVERVIEW
             ================================================= */}

          <section className="case-intro">

            <div className="case-label">
              01 — OVERVIEW
            </div>

            <div className="case-intro-grid">

              <h2>
                FROM IDEA
                <br />
                <em>TO EXPERIENCE.</em>
              </h2>

              <div>

                <p>
                  Цифровой кейс, собранный как единая
                  система: визуальная концепция, интерфейс,
                  структура контента и взаимодействие
                  с пользователем.
                </p>

                <p>
                  Ниже — реальные макеты проекта,
                  собранные в единую визуальную историю.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              MAIN VISUAL
             ================================================= */}

          <section className="case-feature">

            {projectKey === 'crystal' ? (

              <figure className="case-real-image case-real-image--hero">

                <img
                  src={kristallHome}
                  alt="Главная страница сайта ТЦ Кристалл"
                />

                <figcaption>
                  Главная страница — концепция и первый экран
                </figcaption>

              </figure>

            ) : projectKey === 'pet' ? (

              <figure className="case-real-image case-real-image--hero case-pet-image">

                <img
                  src={petDayHero}
                  alt="Yandex Pet Day — первый экран"
                />

                <figcaption>
                  01 — Главный экран — визуальная концепция Yandex Pet Day
                </figcaption>

              </figure>

            ) : (

              <div className="case-image-placeholder large">

                <span>
                  MAIN VISUAL
                </span>

                <small>
                  Здесь разместим главный экран проекта
                </small>

              </div>

            )}

          </section>


          {/* =================================================
              SYSTEM
             ================================================= */}

          <section className="case-split">

            <div className="case-label">
              02 — SYSTEM
            </div>

            <div className="case-split-content">

              <h2>
                DESIGN
                <br />
                <em>SYSTEM.</em>
              </h2>

              <p>
                Визуальная система проекта строится
                вокруг понятной навигации, выразительной
                типографики и крупных визуальных акцентов.
              </p>

            </div>

          </section>


          {/* =================================================
              GALLERY
             ================================================= */}

          <section className="case-gallery">

            {projectKey === 'crystal' ? (

              <>

                <figure className="case-real-image case-real-image--half">

                  <img
                    src={kristallShops}
                    alt="Раздел магазинов ТЦ Кристалл"
                  />

                  <figcaption>
                    Каталог магазинов — фильтрация по этажам
                  </figcaption>

                </figure>


                <figure className="case-real-image case-real-image--half">

                  <img
                    src={kristallAbout}
                    alt="Раздел о комплексе ТЦ Кристалл"
                  />

                  <figcaption>
                    О комплексе — контентная страница и преимущества
                  </figcaption>

                </figure>

              </>

            ) : projectKey === 'pet' ? (

              <div className="case-pet-gallery">

                {petDayImages.map((item) => (

                  <figure
                    className="case-real-image case-pet-image"
                    key={item.number}
                  >

                    <img
                      src={item.image}
                      alt={item.alt}
                    />

                    <figcaption>
                      {item.number} — {item.title}
                    </figcaption>

                  </figure>

                ))}

              </div>

            ) : (

              <>

                <div className="case-image-placeholder half">
                  <span>SCREEN 01</span>
                </div>

                <div className="case-image-placeholder half">
                  <span>SCREEN 02</span>
                </div>

                <div className="case-image-placeholder full">
                  <span>SCREEN 03</span>
                </div>

              </>

            )}

          </section>


          {/* =================================================
              RESULT
             ================================================= */}

          <section className="case-result">

            <div className="case-label">
              04 — RESULT
            </div>

            <h2>
              DIGITAL EXPERIENCE
              <br />
              <em>WITH PURPOSE.</em>
            </h2>

          </section>


          {/* =================================================
              NEXT PROJECT
             ================================================= */}

          <section className="case-next">

            <span className="case-label">
              NEXT PROJECT
            </span>

            <button
              onClick={() => openCase(nextKey)}
            >

              <small>
                {nextProject.number} — {nextProject.category}
              </small>

              <strong>
                {nextProject.title}
              </strong>

              <span>
                VIEW CASE ↗
              </span>

            </button>

          </section>

        </main>


        {/* FOOTER */}

        <footer className="case-footer">

          <span>
            © 2026 VERSH®
          </span>

          <button onClick={closeCase}>
            BACK TO WORK ↑
          </button>

        </footer>

      </div>
    )
  }


  /*
   * =========================================================
   * HOME PAGE
   * =========================================================
   */

  return (

    <div className="site">

      <div
        className="cursor"
        ref={cursor}
      >
        <span>
          VIEW
        </span>
      </div>


      {/* =====================================================
          NAV
         ===================================================== */}

      <header className="nav">

        <a
          className="logo"
          href="/"
        >
          VERSH<span>®</span>
        </a>

        <div className="nav-right">

          <a href="#work">
            WORK
          </a>

          <a href="#about">
            ABOUT
          </a>

          <a href="#contact">
            CONTACT
          </a>

          <span className="status">
            <i />
            AVAILABLE
          </span>

        </div>

      </header>


      <main>

        {/* ===================================================
            HERO
           =================================================== */}

        <section className="hero">

          <div className="hero-grid" />

          <div className="hero-orb" />

          <div className="hero-content">

            <div className="eyebrow hero-meta">
              INDEPENDENT DIGITAL DESIGNER / 2026
            </div>

            <h1>

              <span className="hero-word">
                I BUILD
              </span>

              <span className="hero-word indent">
                DIGITAL
              </span>

              <span className="hero-word">

                EXPERIENCES
                <span className="dot">
                  .
                </span>

              </span>

            </h1>

            <div className="hero-bottom hero-meta">

              <p>
                WEB DESIGN / BRANDING / ART DIRECTION
                <br />
                BASED IN EUROPE — WORKING WORLDWIDE
              </p>

              <a
                href="#work"
                className="scroll"
              >
                SCROLL TO EXPLORE <b>↓</b>
              </a>

            </div>

          </div>

        </section>


        {/* ===================================================
            WORK
           =================================================== */}

        <section
          id="work"
          className="work section"
        >

          <div className="section-head reveal">

            <span>
              01 — SELECTED WORKS
            </span>

            <span>
              (03)
            </span>

          </div>


          <div className="projects">

            {projects.map((p) => {

              const key =
                p.cls === 'crystal'
                  ? 'crystal'
                  : p.cls === 'atlant'
                    ? 'atlant'
                    : 'pet'

              return (

                <article
                  className="project reveal"
                  key={p.n}
                  onClick={() => openCase(key)}
                  onKeyDown={(event) => {

                    if (
                      event.key === 'Enter' ||
                      event.key === ' '
                    ) {
                      openCase(key)
                    }

                  }}
                  role="button"
                  tabIndex={0}
                >

                  <div
                    className={`project-visual ${p.cls}`}
                    style={
                      p.image
                        ? {
                          backgroundImage:
                            `url(${p.image})`,
                        }
                        : undefined
                    }
                  >

                    <div className="project-overlay">

                      <span>
                        VIEW CASE
                      </span>

                      <span>
                        ↗
                      </span>

                    </div>

                    <div className="project-number">
                      {p.n}
                    </div>

                  </div>


                  <div className="project-info">

                    <div>

                      <span className="number">
                        {p.n}
                      </span>

                      <h2>
                        {p.title}
                      </h2>

                    </div>


                    <div>

                      <span>
                        {p.type}
                      </span>

                      <span>
                        {p.year}
                      </span>

                    </div>

                  </div>

                </article>

              )
            })}

          </div>

        </section>


        {/* ===================================================
            ABOUT
           =================================================== */}

        <section
          id="about"
          className="about section"
        >

          <div className="section-head">

            <span>
              02 — ABOUT
            </span>

            <span>
              VERSH®
            </span>

          </div>


          <div className="about-grid">

            <div className="about-intro">
              <span className="about-kicker">INDEPENDENT / DIGITAL / DESIGN</span>
              <span className="about-index">24 — 2026</span>
            </div>

            <h2 className="statement">

              DESIGNING
              <br />

              <em>
                WITH INTENT.
              </em>

            </h2>


            <div className="about-copy">

              <div className="about-copy-top">
                <span>CHELYABINSK → EUROPE</span>
                <span>WORKING WORLDWIDE</span>
              </div>

              <p>
                I’m Konstantin — an independent digital
                designer creating identities, websites
                and digital experiences for brands that
                want to stand out.
              </p>

              <p>
                From the first concept to the final
                interaction, I combine visual direction,
                interface design and development into
                one process.
              </p>

              <div className="about-stats">
                <div><strong>04</strong><span>YEARS IN DESIGN</span></div>
                <div><strong>03</strong><span>SELECTED PROJECTS</span></div>
                <div><strong>01</strong><span>DESIGN → DEVELOPMENT</span></div>
              </div>

              <a
                className="text-link"
                href="#contact"
              >
                MORE ABOUT ME <span>↗</span>
              </a>

            </div>

          </div>

        </section>


        {/* ===================================================
            SERVICES
           =================================================== */}

        <section className="services section">

          <div className="section-head">

            <span>
              03 — SERVICES
            </span>

            <span>
              WHAT I DO
            </span>

          </div>


          {[
            'WEB DESIGN',
            'BRANDING',
            'ART DIRECTION',
            'DIGITAL DESIGN',
          ].map((s, i) => (

            <div
              className="service"
              key={s}
            >

              <span>
                0{i + 1}
              </span>

              <h3>
                {s}
              </h3>

              <span>
                ↗
              </span>

            </div>

          ))}

        </section>


        {/* ===================================================
            CONTACT
           =================================================== */}

        <section
          id="contact"
          className="contact section"
        >

          <div className="section-head">

            <span>
              04 — CONTACT
            </span>

            <span>
              LET'S TALK
            </span>

          </div>


          <h2>

            HAVE A PROJECT
            <br />

            <em>
              IN MIND?
            </em>

          </h2>


          <a
            className="contact-link"
            href="mailto:hello@versh.design"
          >
            hello@versh.design
            <span>
              ↗
            </span>
          </a>

        </section>

      </main>


      {/* =====================================================
          HOME FOOTER
         ===================================================== */}

      <footer>

        <span>
          © 2026 VERSH®
        </span>

        <span>
          DESIGNED & BUILT BY VERSH
        </span>

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          style={{
            background: 'none',
            border: 0,
            color: 'inherit',
            font: 'inherit',
            cursor: 'pointer',
          }}
        >
          BACK TO TOP ↑
        </button>

      </footer>

    </div>
  )
}