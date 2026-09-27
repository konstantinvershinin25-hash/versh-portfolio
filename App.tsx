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

type ProjectImage = {
  src: string
  caption: string
}

type CaseSection = {
  id: string
  type: 'TEXT' | 'IMAGE' | 'FULLSCREEN IMAGE' | '2 COLUMNS' | 'QUOTE' | 'IMAGE + TEXT' | 'GALLERY'
  title: string
  text: string
  image: string
  caption: string
  imagePosition: 'LEFT' | 'RIGHT'
}

type StoredProject = {
  id: string
  title: string
  type: string
  category: string
  year: string
  description: string
  services: string[]
  images: ProjectImage[]
  overviewTitle: string
  overviewText: string[]
  systemTitle: string
  systemText: string
  resultTitle: string
  resultText: string
  sections: CaseSection[]
}

const STORAGE_KEY = 'versh_custom_projects_v3'
const IMAGE_CAPTIONS = [
  '01 — HERO',
  '02 — OVERVIEW',
  '03 — SCREEN 01',
  '04 — SCREEN 02',
  '05 — SCREEN 03',
  '06 — SCREEN 04',
  '07 — SCREEN 05',
  '08 — RESULT',
]

function readStoredProjects(): StoredProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.map((project: any) => {
      const rawImages = Array.isArray(project.images)
        ? project.images
        : project.image
          ? [project.image]
          : []

      const images: ProjectImage[] = rawImages
        .filter(Boolean)
        .map((item: any, index: number) => ({
          src: typeof item === 'string' ? item : item.src || '',
          caption:
            typeof item === 'string'
              ? IMAGE_CAPTIONS[index] || `0${index + 1} — SCREEN`
              : item.caption || IMAGE_CAPTIONS[index] || `0${index + 1} — SCREEN`,
        }))
        .filter((item: ProjectImage) => item.src)

      return {
        id: String(project.id || crypto.randomUUID()),
        title: project.title || 'UNTITLED PROJECT',
        type: project.type || 'WEB DESIGN',
        category: project.category || project.type || 'WEB DESIGN',
        year: project.year || '2026',
        description: project.description || '',
        services: Array.isArray(project.services) ? project.services : [],
        images,
        overviewTitle: project.overviewTitle || 'FROM IDEA\nTO EXPERIENCE.',
        overviewText: Array.isArray(project.overviewText) ? project.overviewText.filter(Boolean) : [
          'Цифровой кейс, собранный как единая система: визуальная концепция, интерфейс, структура контента и взаимодействие с пользователем.',
          'Ниже — реальные макеты проекта, собранные в единую визуальную историю.',
        ],
        systemTitle: project.systemTitle || 'DESIGN\nSYSTEM.',
        systemText: project.systemText || 'Визуальная система проекта строится вокруг понятной навигации, выразительной типографики и крупных визуальных акцентов.',
        resultTitle: project.resultTitle || 'DIGITAL EXPERIENCE\nWITH PURPOSE.',
        resultText: project.resultText || 'A focused digital experience built as a coherent visual system.',
        sections: Array.isArray(project.sections) ? project.sections.map((section: any, index: number) => ({
          id: String(section.id || crypto.randomUUID()),
          type: section.type || 'TEXT',
          title: section.title || `SECTION ${index + 1}`,
          text: section.text || '',
          image: section.image || '',
          caption: section.caption || '',
          imagePosition: section.imagePosition === 'RIGHT' ? 'RIGHT' : 'LEFT',
        })) : [],
      }
    })
  } catch {
    return []
  }
}

function saveStoredProjects(projects: StoredProject[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const maxSize = 1800
        const ratio = Math.min(1, maxSize / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * ratio)
        canvas.height = Math.round(image.height * ratio)
        const context = canvas.getContext('2d')
        if (!context) return reject(new Error('Canvas is not available'))
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.84))
      }
      image.onerror = () => reject(new Error('Cannot read image'))
      image.src = String(reader.result)
    }
    reader.onerror = () => reject(new Error('Cannot read file'))
    reader.readAsDataURL(file)
  })
}

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

  const [storedProjects, setStoredProjects] = useState<StoredProject[]>(() => readStoredProjects())
  const [adminMode, setAdminMode] = useState(() => new URLSearchParams(window.location.search).get('admin') === '1')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [adminTitle, setAdminTitle] = useState('')
  const [adminType, setAdminType] = useState('WEB DESIGN')
  const [adminCategory, setAdminCategory] = useState('WEB DESIGN')
  const [adminYear, setAdminYear] = useState('2026')
  const [adminDescription, setAdminDescription] = useState('')
  const [adminServices, setAdminServices] = useState('ART DIRECTION, WEB DESIGN, UI / UX')
  const [adminImages, setAdminImages] = useState<ProjectImage[]>([])
  const [adminOverviewTitle, setAdminOverviewTitle] = useState('FROM IDEA\nTO EXPERIENCE.')
  const [adminOverviewText, setAdminOverviewText] = useState('Цифровой кейс, собранный как единая система: визуальная концепция, интерфейс, структура контента и взаимодействие с пользователем.\n\nНиже — реальные макеты проекта, собранные в единую визуальную историю.')
  const [adminSystemTitle, setAdminSystemTitle] = useState('DESIGN\nSYSTEM.')
  const [adminSystemText, setAdminSystemText] = useState('Визуальная система проекта строится вокруг понятной навигации, выразительной типографики и крупных визуальных акцентов.')
  const [adminResultTitle, setAdminResultTitle] = useState('DIGITAL EXPERIENCE\nWITH PURPOSE.')
  const [adminResultText, setAdminResultText] = useState('A focused digital experience built as a coherent visual system.')
  const [adminSections, setAdminSections] = useState<CaseSection[]>([])
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dropIndex, setDropIndex] = useState<number | null>(null)
  const [adminMessage, setAdminMessage] = useState('')
  const [customProjectId, setCustomProjectId] = useState<string | null>(() => new URLSearchParams(window.location.search).get('custom'))

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      setProjectKey(getProjectFromUrl())
      setCustomProjectId(params.get('custom'))
      setAdminMode(params.get('admin') === '1')
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

  const resetAdminForm = () => {
    setEditingId(null)
    setAdminTitle('')
    setAdminType('WEB DESIGN')
    setAdminCategory('WEB DESIGN')
    setAdminYear('2026')
    setAdminDescription('')
    setAdminServices('ART DIRECTION, WEB DESIGN, UI / UX')
    setAdminImages([])
    setAdminOverviewTitle('FROM IDEA\nTO EXPERIENCE.')
    setAdminOverviewText('Цифровой кейс, собранный как единая система: визуальная концепция, интерфейс, структура контента и взаимодействие с пользователем.\n\nНиже — реальные макеты проекта, собранные в единую визуальную историю.')
    setAdminSystemTitle('DESIGN\nSYSTEM.')
    setAdminSystemText('Визуальная система проекта строится вокруг понятной навигации, выразительной типографики и крупных визуальных акцентов.')
    setAdminResultTitle('DIGITAL EXPERIENCE\nWITH PURPOSE.')
    setAdminResultText('A focused digital experience built as a coherent visual system.')
    setAdminSections([])
  }

  const editStoredProject = (project: StoredProject) => {
    setEditingId(project.id)
    setAdminTitle(project.title)
    setAdminType(project.type)
    setAdminCategory(project.category)
    setAdminYear(project.year)
    setAdminDescription(project.description)
    setAdminServices(project.services.join(', '))
    setAdminImages(project.images)
    setAdminOverviewTitle(project.overviewTitle)
    setAdminOverviewText(project.overviewText.join('\n\n'))
    setAdminSystemTitle(project.systemTitle)
    setAdminSystemText(project.systemText)
    setAdminResultTitle(project.resultTitle)
    setAdminResultText(project.resultText)
    setAdminSections(project.sections || [])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const createSection = (type: CaseSection['type']): CaseSection => ({
    id: crypto.randomUUID(),
    type,
    title: type,
    text: '',
    image: '',
    caption: '',
    imagePosition: 'LEFT',
  })

  const addSection = (type: CaseSection['type']) => {
    setAdminSections((current) => [...current, createSection(type)])
  }

  const updateSection = (id: string, patch: Partial<CaseSection>) => {
    setAdminSections((current) => current.map((section) => section.id === id ? { ...section, ...patch } : section))
  }

  const removeSection = (id: string) => {
    setAdminSections((current) => current.filter((section) => section.id !== id))
  }

  const moveSection = (id: string, direction: -1 | 1) => {
    setAdminSections((current) => {
      const index = current.findIndex((section) => section.id === id)
      const nextIndex = index + direction
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current
      const next = [...current]
      const [item] = next.splice(index, 1)
      next.splice(nextIndex, 0, item)
      return next
    })
  }

  const handleSectionImage = async (id: string, file: File) => {
    try {
      const src = await compressImage(file)
      updateSection(id, { image: src })
      setAdminMessage('SECTION IMAGE ADDED')
    } catch {
      setAdminMessage('IMAGE ERROR')
    }
  }

  const handleAdminImage = async (file: File) => {
    try {
      const src = await compressImage(file)
      setAdminImages((current) => [
        ...current,
        {
          src,
          caption: IMAGE_CAPTIONS[current.length] || `${String(current.length + 1).padStart(2, '0')} — SCREEN`,
        },
      ])
      setAdminMessage('IMAGE ADDED')
    } catch {
      setAdminMessage('IMAGE ERROR')
    }
  }

  const removeAdminImage = (index: number) => {
    setAdminImages((current) => current.filter((_, itemIndex) => itemIndex !== index))
  }

  const updateCaption = (index: number, caption: string) => {
    setAdminImages((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, caption } : item))
  }

  const reorderAdminImages = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= adminImages.length || to >= adminImages.length) return
    setAdminImages((current) => {
      const next = [...current]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  const handleAdminSubmit = () => {
    if (!adminTitle.trim()) {
      setAdminMessage('ADD PROJECT TITLE')
      return
    }

    const project: StoredProject = {
      id: editingId || crypto.randomUUID(),
      title: adminTitle.trim(),
      type: adminType.trim() || 'WEB DESIGN',
      category: adminCategory.trim() || adminType.trim() || 'WEB DESIGN',
      year: adminYear.trim() || '2026',
      description: adminDescription.trim(),
      services: adminServices.split(',').map((item) => item.trim()).filter(Boolean),
      images: adminImages,
      overviewTitle: adminOverviewTitle.trim() || 'FROM IDEA\nTO EXPERIENCE.',
      overviewText: adminOverviewText.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean),
      systemTitle: adminSystemTitle.trim() || 'DESIGN\nSYSTEM.',
      systemText: adminSystemText.trim(),
      resultTitle: adminResultTitle.trim() || 'DIGITAL EXPERIENCE\nWITH PURPOSE.',
      resultText: adminResultText.trim(),
      sections: adminSections,
    }

    const next = editingId
      ? storedProjects.map((item) => item.id === editingId ? project : item)
      : [...storedProjects, project]

    try {
      saveStoredProjects(next)
      setStoredProjects(next)
      setAdminMessage(editingId ? 'PROJECT UPDATED' : 'PROJECT CREATED')
      resetAdminForm()
    } catch {
      setAdminMessage('STORAGE LIMIT — USE FEWER / SMALLER IMAGES')
    }
  }

  const deleteStoredProject = (id: string) => {
    const next = storedProjects.filter((item) => item.id !== id)
    saveStoredProjects(next)
    setStoredProjects(next)
    if (customProjectId === id) {
      window.history.pushState({}, '', window.location.pathname)
      setCustomProjectId(null)
    }
  }

  const openCustomCase = (id: string) => {
    window.history.pushState({}, '', `?custom=${encodeURIComponent(id)}`)
    setProjectKey(null)
    setCustomProjectId(id)
    setAdminMode(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const openAdmin = () => {
    window.history.pushState({}, '', '?admin=1')
    setProjectKey(null)
    setCustomProjectId(null)
    setAdminMode(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (adminMode) {
    return (
      <div className="site admin-page">
        <header className="nav admin-nav">
          <button className="case-logo" onClick={() => { window.history.pushState({}, '', window.location.pathname); setAdminMode(false) }}>VERSH<span>®</span></button>
          <span className="admin-nav-title">CONTENT MANAGER</span>
          <button className="case-back" onClick={() => { window.history.pushState({}, '', window.location.pathname); setAdminMode(false) }}>← BACK TO SITE</button>
        </header>

        <main className="admin-main">
          <section className="admin-head">
            <div>
              <span className="case-label">CMS / PROJECTS</span>
              <h1>BUILD YOUR <em>CASE.</em></h1>
            </div>
            <button className="admin-secondary" onClick={resetAdminForm}>NEW PROJECT +</button>
          </section>

          <section className="admin-editor">
            <div className="admin-form">
              <label>TITLE<input value={adminTitle} onChange={(e) => setAdminTitle(e.target.value)} placeholder="PROJECT NAME" /></label>
              <div className="admin-form-row">
                <label>TYPE<input value={adminType} onChange={(e) => setAdminType(e.target.value)} /></label>
                <label>CATEGORY<input value={adminCategory} onChange={(e) => setAdminCategory(e.target.value)} /></label>
                <label>YEAR<input value={adminYear} onChange={(e) => setAdminYear(e.target.value)} /></label>
              </div>
              <label>DESCRIPTION<textarea value={adminDescription} onChange={(e) => setAdminDescription(e.target.value)} rows={5} /></label>
              <label>SERVICES <span className="admin-hint">comma separated</span><input value={adminServices} onChange={(e) => setAdminServices(e.target.value)} /></label>

              <label>OVERVIEW TITLE <span className="admin-hint">use a new line for the italic second line</span><textarea value={adminOverviewTitle} onChange={(e) => setAdminOverviewTitle(e.target.value)} rows={2} /></label>
              <label>OVERVIEW TEXT <span className="admin-hint">separate paragraphs with an empty line</span><textarea value={adminOverviewText} onChange={(e) => setAdminOverviewText(e.target.value)} rows={6} /></label>
              <div className="admin-form-row admin-form-row--two">
                <label>SYSTEM TITLE<textarea value={adminSystemTitle} onChange={(e) => setAdminSystemTitle(e.target.value)} rows={2} /></label>
                <label>RESULT TITLE<textarea value={adminResultTitle} onChange={(e) => setAdminResultTitle(e.target.value)} rows={2} /></label>
              </div>
              <div className="admin-form-row admin-form-row--two">
                <label>SYSTEM TEXT<textarea value={adminSystemText} onChange={(e) => setAdminSystemText(e.target.value)} rows={5} /></label>
                <label>RESULT TEXT<textarea value={adminResultText} onChange={(e) => setAdminResultText(e.target.value)} rows={5} /></label>
              </div>

              <div className="admin-upload-head admin-sections-head">
                <div><strong>CASE SECTIONS</strong><span> {adminSections.length}</span></div>
                <small>BUILD THE CASE WITHOUT TOUCHING CODE</small>
              </div>

              <div className="admin-section-add">
                {(['TEXT', 'IMAGE', 'FULLSCREEN IMAGE', '2 COLUMNS', 'QUOTE', 'IMAGE + TEXT', 'GALLERY'] as CaseSection['type'][]).map((type) => (
                  <button key={type} type="button" onClick={() => addSection(type)}>+ {type}</button>
                ))}
              </div>

              <div className="admin-section-list">
                {adminSections.map((section, index) => (
                  <article className="admin-section-card" key={section.id}>
                    <div className="admin-section-card-head">
                      <div><b>{String(index + 1).padStart(2, '0')}</b><strong>{section.type}</strong></div>
                      <div className="admin-section-controls">
                        <button type="button" disabled={index === 0} onClick={() => moveSection(section.id, -1)}>↑</button>
                        <button type="button" disabled={index === adminSections.length - 1} onClick={() => moveSection(section.id, 1)}>↓</button>
                        <button type="button" onClick={() => removeSection(section.id)}>DELETE</button>
                      </div>
                    </div>
                    <div className="admin-section-fields">
                      <label>TITLE<input value={section.title} onChange={(e) => updateSection(section.id, { title: e.target.value })} /></label>
                      {(section.type === 'TEXT' || section.type === '2 COLUMNS' || section.type === 'QUOTE' || section.type === 'IMAGE + TEXT') && <label>TEXT<textarea value={section.text} onChange={(e) => updateSection(section.id, { text: e.target.value })} rows={5} /></label>}
                      {(section.type === 'IMAGE' || section.type === 'FULLSCREEN IMAGE' || section.type === 'IMAGE + TEXT' || section.type === 'GALLERY') && (
                        <div className="admin-section-media">
                          {section.image ? <div className="admin-section-media-preview"><img src={section.image} alt="" /><button type="button" onClick={() => updateSection(section.id, { image: '' })}>REMOVE IMAGE</button></div> : <label className="admin-section-image-upload"><input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) void handleSectionImage(section.id, file); e.currentTarget.value = '' }} /><span>+</span>UPLOAD IMAGE</label>}
                          <label>CAPTION<input value={section.caption} onChange={(e) => updateSection(section.id, { caption: e.target.value })} /></label>
                        </div>
                      )}
                      {section.type === 'IMAGE + TEXT' && <label>IMAGE POSITION<select value={section.imagePosition} onChange={(e) => updateSection(section.id, { imagePosition: e.target.value as 'LEFT' | 'RIGHT' })}><option value="LEFT">LEFT</option><option value="RIGHT">RIGHT</option></select></label>}
                    </div>
                  </article>
                ))}
              </div>

              <div className="admin-upload-head">
                <div><strong>IMAGES</strong><span> {adminImages.length}/8</span></div>
                <small>UPLOAD, THEN DRAG TO REORDER</small>
              </div>

              <div className="admin-image-grid">
                {adminImages.map((image, index) => (
                  <article
                    key={`${image.src.slice(-30)}-${index}`}
                    className={`admin-image-slot ${dragIndex === index ? 'is-dragging' : ''} ${dropIndex === index ? 'is-drop-target' : ''}`}
                    draggable
                    onDragStart={() => setDragIndex(index)}
                    onDragOver={(event) => { event.preventDefault(); setDropIndex(index) }}
                    onDragLeave={() => setDropIndex(null)}
                    onDrop={(event) => { event.preventDefault(); if (dragIndex !== null) reorderAdminImages(dragIndex, index); setDragIndex(null); setDropIndex(null) }}
                    onDragEnd={() => { setDragIndex(null); setDropIndex(null) }}
                  >
                    <div className="admin-image-preview"><img src={image.src} alt={image.caption || `Image ${index + 1}`} /><span>{String(index + 1).padStart(2, '0')}</span><button type="button" onClick={() => removeAdminImage(index)}>×</button></div>
                    <div className="admin-image-meta"><b>↕ DRAG</b><input value={image.caption} onChange={(e) => updateCaption(index, e.target.value)} placeholder={IMAGE_CAPTIONS[index]} /></div>
                  </article>
                ))}

                {adminImages.length < 8 && (
                  <label className="admin-image-upload">
                    <input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) void handleAdminImage(file); event.currentTarget.value = '' }} />
                    <span>+</span><strong>ADD IMAGE</strong><small>{8 - adminImages.length} SLOT(S) LEFT</small>
                  </label>
                )}
              </div>

              <div className="admin-actions">
                <button className="admin-primary" onClick={handleAdminSubmit}>{editingId ? 'SAVE CHANGES' : 'CREATE PROJECT'} ↗</button>
                {editingId && <button className="admin-secondary" onClick={resetAdminForm}>CANCEL</button>}
                {adminMessage && <span className="admin-message">{adminMessage}</span>}
              </div>
            </div>

            <aside className="admin-projects">
              <div className="admin-projects-head"><strong>YOUR PROJECTS</strong><span>{storedProjects.length}</span></div>
              {storedProjects.length === 0 ? <p className="admin-empty">Projects created here will appear in this list.</p> : storedProjects.map((project) => (
                <article className="admin-project-row" key={project.id}>
                  <div className="admin-project-thumb">{project.images[0] ? <img src={project.images[0].src} alt="" /> : <span>NO IMG</span>}</div>
                  <div className="admin-project-info"><strong>{project.title}</strong><small>{project.year} / {project.images.length} IMAGES</small></div>
                  <div className="admin-project-actions"><button onClick={() => editStoredProject(project)}>EDIT</button><button onClick={() => openCustomCase(project.id)}>VIEW</button><button onClick={() => deleteStoredProject(project.id)}>DELETE</button></div>
                </article>
              ))}
            </aside>
          </section>
        </main>
      </div>
    )
  }

  const customProject = storedProjects.find((item) => item.id === customProjectId)

  if (customProjectId && customProject) {
    const hero = customProject.images[0]
    const gallery = customProject.images.slice(1)

    return (
      <div className="site case-page">
        <div className="cursor" ref={cursor}><span>BACK</span></div>
        <header className="nav case-nav"><button className="case-logo" onClick={() => { window.history.pushState({}, '', window.location.pathname); setCustomProjectId(null) }}>VERSH<span>®</span></button><button className="case-back" onClick={() => { window.history.pushState({}, '', window.location.pathname); setCustomProjectId(null) }}>← BACK TO WORK</button></header>
        <main>
          <section className="case-hero case-custom">
            <div className="case-hero-top"><span>01 — {customProject.category}</span><span>{customProject.year}</span></div>
            <h1>{customProject.title}</h1>
            <div className="case-hero-bottom"><p>{customProject.description}</p><div className="case-services"><span>SERVICES</span>{customProject.services.map((service) => <b key={service}>{service}</b>)}</div></div>
          </section>
          <section className="case-intro"><div className="case-label">01 — OVERVIEW</div><div className="case-intro-grid"><h2>{customProject.overviewTitle.split('\n').map((line, index) => <React.Fragment key={line + index}>{index > 0 && <br />}<em>{index === customProject.overviewTitle.split('\n').length - 1 ? line : line}</em></React.Fragment>)}</h2><div>{customProject.overviewText.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></section>
          {customProject.sections.length ? customProject.sections.map((section, index) => {
            const label = `${String(index + 2).padStart(2, '0')} — ${section.type}`
            if (section.type === 'IMAGE' || section.type === 'FULLSCREEN IMAGE') return <section className={`case-feature ${section.type === 'FULLSCREEN IMAGE' ? 'case-custom-fullscreen' : ''}`} key={section.id}><div className="case-label">{label}</div>{section.image ? <figure className="case-real-image"><img src={section.image} alt={section.caption || section.title || customProject.title} /><figcaption>{section.caption}</figcaption></figure> : <div className="case-image-placeholder large"><span>ADD IMAGE IN CMS</span></div>}</section>
            if (section.type === 'GALLERY') return <section className="case-gallery" key={section.id}><div className="case-label">{label}</div>{section.image ? <div className="case-custom-gallery"><figure className="case-real-image case-custom-image"><img src={section.image} alt={section.caption || customProject.title} /><figcaption>{section.caption}</figcaption></figure></div> : <div className="case-image-placeholder full"><span>ADD GALLERY IMAGE IN CMS</span></div>}</section>
            if (section.type === 'QUOTE') return <section className="case-result case-custom-quote" key={section.id}><div className="case-label">{label}</div><blockquote>{section.text}</blockquote></section>
            if (section.type === 'IMAGE + TEXT') return <section className={`case-split case-custom-image-text ${section.imagePosition === 'RIGHT' ? 'is-image-right' : ''}`} key={section.id}><div className="case-label">{label}</div><div className="case-split-content"><div><h2>{section.title.split('\n').map((line, i) => <React.Fragment key={line + i}>{i > 0 && <br />}<em>{line}</em></React.Fragment>)}</h2><p>{section.text}</p></div>{section.image && <figure className="case-real-image"><img src={section.image} alt={section.caption || section.title} /><figcaption>{section.caption}</figcaption></figure>}</div></section>
            return <section className="case-intro case-custom-text" key={section.id}><div className="case-label">{label}</div><div className="case-intro-grid"><h2>{section.title.split('\n').map((line, i) => <React.Fragment key={line + i}>{i > 0 && <br />}<em>{line}</em></React.Fragment>)}</h2><div>{section.text.split(/\n\s*\n/).filter(Boolean).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div></div></section>
          }) : <>
            <section className="case-feature">{hero ? <figure className="case-real-image case-real-image--hero"><img src={hero.src} alt={hero.caption || customProject.title} /><figcaption>{hero.caption}</figcaption></figure> : <div className="case-image-placeholder large"><span>ADD MAIN VISUAL</span></div>}</section>
            <section className="case-split"><div className="case-label">02 — SYSTEM</div><div className="case-split-content"><h2>{customProject.systemTitle.split('\n').map((line, index) => <React.Fragment key={line + index}>{index > 0 && <br />}<em>{line}</em></React.Fragment>)}</h2><p>{customProject.systemText}</p></div></section>
            <section className="case-gallery">{gallery.length ? <div className="case-custom-gallery">{gallery.map((image, index) => <figure className="case-real-image case-custom-image" key={`${image.src.slice(-30)}-${index}`}><img src={image.src} alt={image.caption || customProject.title} /><figcaption>{image.caption}</figcaption></figure>)}</div> : <div className="case-image-placeholder full"><span>ADD MORE SCREENS IN CMS</span></div>}</section>
          </>}
          <section className="case-result"><div className="case-label">04 — RESULT</div><h2>{customProject.resultTitle.split('\n').map((line, index) => <React.Fragment key={line + index}>{index > 0 && <br />}<em>{line}</em></React.Fragment>)}</h2>{customProject.resultText && <p className="case-result-text">{customProject.resultText}</p>}</section>
        </main>
        <footer className="case-footer"><span>© 2026 VERSH®</span><button onClick={() => { window.history.pushState({}, '', window.location.pathname); setCustomProjectId(null) }}>BACK TO WORK ↑</button></footer>
      </div>
    )
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

            {storedProjects.map((p, index) => (
              <article
                className="project reveal custom-project-card"
                key={p.id}
                onClick={() => openCustomCase(p.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') openCustomCase(p.id)
                }}
                role="button"
                tabIndex={0}
              >
                <div
                  className="project-visual custom-project-visual"
                  style={p.images[0] ? { backgroundImage: `url(${p.images[0].src})` } : undefined}
                >
                  <div className="project-overlay"><span>VIEW CASE</span><span>↗</span></div>
                  <div className="project-number">{String(projects.length + index + 1).padStart(2, '0')}</div>
                </div>
                <div className="project-info">
                  <div><span className="number">{String(projects.length + index + 1).padStart(2, '0')}</span><h2>{p.title}</h2></div>
                  <div><span>{p.type}</span><span>{p.year}</span></div>
                </div>
              </article>
            ))}

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

            <h2 className="statement">

              DESIGNING
              <br />

              <em>
                WITH INTENT.
              </em>

            </h2>


            <div className="about-copy">

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

        <button
          onClick={openAdmin}
          style={{ background: 'none', border: 0, color: 'inherit', font: 'inherit', cursor: 'pointer', opacity: 0.35 }}
        >
          CMS
        </button>

      </footer>

    </div>
  )
}