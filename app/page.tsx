'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronUp, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'

import Footer from '@/components/Footer'
import MenuDesktop from '@/components/MenuDesktop'
import MenuMobile from '@/components/MenuMobile'
import Header from '@/components/Header'
import GallerySlider from '@/components/GallerySlider'
import FormularioOcorrencia from '@/components/FormularioOcorrencia'
import Calendar from '@/components/Calendar'
import EventFilter from '@/components/EventFilter'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import { MenuItem } from '@/components/MenuDesktopTypes'

import { getMenu } from './getMenu'
import { getSections } from './getSections'
import { getHeader } from './getHeader'
import { getNews, SanityNews } from './getNews'
import { getEvents, SanityEvent } from './getEvents'
import { urlFor } from './imageUrl'

import { SanityHeader } from './getHeader'
import { SanityMenuItem } from './getMenu'
import { SanitySection } from './getSections'

type Photographer = {
  photo?: {
    asset: {
      _ref: string
    }
  }
  name?: string
  role?: string
  description?: string
}

type Edital = {
  title: string
  date?: string
  file: {
    asset: {
      url: string
    }
  }
}

type EditaisPorAno = Record<string, Edital[]>

export default function HomePage() {
  const [header, setHeader] = useState<SanityHeader | null>(null)
  const [menu, setMenu] = useState<SanityMenuItem[]>([])
  const [sections, setSections] = useState<SanitySection[]>([])
  const [news, setNews] = useState<SanityNews[]>([])
  const [events, setEvents] = useState<SanityEvent[]>([])
  const [activeSection, setActiveSection] = useState<string>('')
  const [scrollFromFooter, setScrollFromFooter] = useState(false) // 🔑 novo flag
  const [openYear, setOpenYear] = useState<string | null>(null)

  const [eventType, setEventType] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // 🔹 Notícias slider
  const [newsIndex, setNewsIndex] = useState(0)
  const NEWS_PER_PAGE = 4

  /* 🔹 Carregar dados */
  useEffect(() => {
    getHeader().then(setHeader)
    getMenu().then(setMenu)

    getSections().then(data => {
      setSections(data)
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        setActiveSection(hash)
        return
      }
      if (data.length > 0) setActiveSection(data[0].slug.replace(/^#/, ''))
    })

    getNews().then(setNews)
    getEvents().then(setEvents)
  }, [])

  /* 🔹 Hash inicial */
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) setActiveSection(hash)
  }, [])

  /* 🔹 Ouvir mudanças de hash */
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) setActiveSection(hash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  /* 🔹 Scroll top */
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* 🔹 Scroll dinâmico do footer */
  useEffect(() => {
    if (!scrollFromFooter) return
    if (!activeSection) return

    const el = document.getElementById(activeSection)
    if (!el) return

    // 🔹 Scroll suave apenas quando clicado no footer
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setScrollFromFooter(false) // 🔑 reset
    })
  }, [activeSection, scrollFromFooter])

  if (!header || sections.length === 0) return null

  // 🔑 HOME = primeira section do CMS
  const homeSectionId = sections[0].slug.replace(/^#/, '')

  // 🔑 Section Eventos (dinâmico)
  const eventosSection = sections.find(s =>
    s.title.toLowerCase().includes('evento')
  )
  const eventosSectionId = eventosSection ? eventosSection.slug.replace(/^#/, '') : ''

  // 🔑 Ver se é uma notícia
  const isNewsOpen = news.some(n => n.slug === activeSection)

  // 🔑 Estamos na Home?
  const isHome = activeSection === homeSectionId || isNewsOpen

  const canGoPrev = newsIndex > 0
  const canGoNext = newsIndex + NEWS_PER_PAGE < news.length

  // 🔹 Filtrar eventos por tipo
  const filteredEvents = eventType
    ? events.filter(e => e.types?.includes(eventType))
    : events

  // 🔹 Evento em destaque (mais próximo no futuro)
  const today = new Date()
  const nextEvent = [...events]
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

  // 🔹 Próximos eventos (lista simples)
  const upcomingEvents = [...events]
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const transformedMenu: MenuItem[] = menu.map((item): MenuItem => ({
    title: item.label, // sempre existe
    slug: item.href || `#${item.label.replace(/\s+/g, '-').toLowerCase()}`, // fallback
    label: item.label,
    href: item.href,
    children: item.children?.map((child): MenuItem => ({
      title: child.label,
      slug: child.href || `#${child.label.replace(/\s+/g, '-').toLowerCase()}`,
      label: child.label,
      href: child.href,
      children: child.children?.map(grandchild => ({
        title: grandchild.label,
        slug: grandchild.href || `#${grandchild.label.replace(/\s+/g, '-').toLowerCase()}`,
        label: grandchild.label,
        href: grandchild.href,
      })),
    })),
  }))

  return (
    <main id="top" className="min-h-screen scroll-smooth">
      <Header header={header} />

      <div className="sticky top-0 z-50 bg-white">
        <MenuDesktop menu={transformedMenu} logo={header.logo} className="hidden lg:block" />
        <MenuMobile menu={transformedMenu} className="block lg:hidden" />
      </div>

      {/* ---------- SECTIONS ---------- */}
      {sections.map(section => {
        const sectionId = section.slug.replace(/^#/, '')
        const isActive =
          sectionId === homeSectionId ? isHome : sectionId === activeSection
        const hasImage = Boolean(section.image)

        return (
          <section
            key={sectionId}
            id={sectionId}
            className={`max-w-6xl mx-auto px-6 py-16 ${
              isActive ? 'block' : 'hidden'
            }`}
          >
            <h2 className="mb-4 text-2xl font-semibold text-blue-600">
              {section.title}
            </h2>

            <hr className="mb-10 border-gray-300" />

            <div
              className={`grid gap-10 items-start md:items-center ${
                hasImage ? 'md:grid-cols-3' : 'grid-cols-1'
              }`}
            >
              <div className={hasImage ? 'md:col-span-2 text-gray-700' : 'text-gray-700'}>
                <PortableTextRenderer value={section.content} />
              </div>

              {hasImage && (
                <Image
                  src={urlFor(section.image!)}
                  alt={section.title}
                  width={220}
                  height={280}
                  className="rounded-md shadow-md object-cover mx-auto md:mx-0"
                />
              )}
            </div>

            {/* Fotografias (Executivo) */}
            {(section.photographers?.length ?? 0) > 0 && (
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {section.photographers?.map((p: Photographer, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
                  >
                    {p.photo && (
                      <div className="w-[150px] h-[150px] overflow-hidden rounded-full shadow-md">
                        <Image
                          src={urlFor(p.photo)}
                          alt={p.name || `Fotógrafa ${idx + 1}`}
                          width={150}
                          height={150}
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                    )}

                    {p.name && (
                      <h3 className="mt-4 text-blue-600 text-lg font-semibold">
                        {p.name}
                      </h3>
                    )}

                    {p.role && (
                      <p className="mt-1 text-gray-700 font-medium">{p.role}</p>
                    )}

                    {p.description && (
                      <p className="mt-2 text-gray-600 text-sm">{p.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.editais && section.editais.length > 0 && (
			  <div className="space-y-6">
			    {(() => {
			      // Agrupa editais por ano
			      const editaisPorAno: EditaisPorAno = {}
			
			      section.editais.forEach((edital: Edital) => {
			        const year = edital.date
			          ? new Date(edital.date).getFullYear().toString()
			          : 'Sem Data'
			
			        if (!editaisPorAno[year]) editaisPorAno[year] = []
			        editaisPorAno[year].push(edital)
			      })
			
			      return Object.entries(editaisPorAno)
			        .sort(([a], [b]) => parseInt(b) - parseInt(a)) // anos decrescente
			        .map(([year, editais]) => {
			          const isOpen = openYear === year
			
			          return (
			            <div key={year} className="border rounded-lg overflow-hidden">
			              {/* HEADER DO ANO */}
			              <button
			                onClick={() => setOpenYear(openYear === year ? null : year)}
			                className="w-full flex items-center justify-between text-left font-semibold text-blue-600 text-lg py-3 hover:text-blue-800 transition"
			              >
			                <span>{year}</span>
			                {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
			              </button>
			
			              {/* CONTEÚDO (EDITAIS) */}
			              {isOpen && (
			                <div className="divide-y bg-white">
			                  {editais.map((edital, idx) => (
			                    <div
			                      key={idx}
			                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4"
			                    >
			                      <div>
			                        <p className="font-medium text-gray-800">{edital.title}</p>
			                        {edital.date && (
			                          <p className="text-sm text-gray-500">
			                            {new Date(edital.date).toLocaleDateString('pt-PT')}
			                          </p>
			                        )}
			                      </div>
			
			                      <a
			                        href={edital.file.asset.url}
			                        target="_blank"
			                        rel="noopener noreferrer"
			                        className="inline-flex justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
			                      >
			                        Abrir PDF
			                      </a>
			                    </div>
			                  ))}
			                </div>
			              )}
			            </div>
			          )
			        })
			    })()}
			  </div>
			)}

			{section.twoColumnPDFs && section.twoColumnPDFs.length > 0 && (
			  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
				{(() => {
				  // 1️⃣ Agrupar por TÍTULO
				  const groupedByTitle: Record<string, typeof section.twoColumnPDFs> = {}

				  section.twoColumnPDFs.forEach(item => {
					if (!groupedByTitle[item.title]) {
					  groupedByTitle[item.title] = []
					}
					groupedByTitle[item.title].push(item)
				  })

				  return Object.entries(groupedByTitle).map(([title, items]) => {
					// 2️⃣ Agrupar por ANO dentro do título
					const groupedByYear: Record<string, typeof items> = {}

					items.forEach(item => {
					  const year = item.year.toString()
					  if (!groupedByYear[year]) groupedByYear[year] = []
					  groupedByYear[year].push(item)
					})

					return (
					  <div key={title} className="space-y-4">
						{/* 🔹 TÍTULO DA COLUNA */}
						<h3 className="text-lg font-semibold text-gray-800">
						  {title}
						</h3>

						{/* 🔹 ANOS */}
						{Object.entries(groupedByYear)
						  .sort(([a], [b]) => parseInt(b) - parseInt(a))
						  .map(([year, yearItems]) => {
							const isOpen = openYear === `${title}-${year}`

							return (
							  <div key={year} className="border rounded-lg overflow-hidden">
								{/* HEADER DO ANO */}
								<button
								  onClick={() =>
									setOpenYear(isOpen ? null : `${title}-${year}`)
								  }
								  className="w-full flex items-center justify-between text-left font-semibold text-blue-600 text-base py-3 px-4 hover:text-blue-800 transition"
								>
								  <span>{year}</span>
								  {isOpen ? (
									<Minus className="w-5 h-5" />
								  ) : (
									<Plus className="w-5 h-5" />
								  )}
								</button>

								{/* PDFs */}
								{isOpen && (
								  <div className="bg-white px-6 pb-4 pt-2 space-y-2">
									{yearItems.flatMap(item =>
									  item.files.map((file, idx) => (
										<a
										  key={idx}
										  href={file.asset.url}
										  target="_blank"
										  rel="noopener noreferrer"
										  className="block text-blue-600 hover:underline text-sm"
										>
										  {file.asset.originalFilename}
										</a>
									  ))
									)}
								  </div>
								)}
							  </div>
							)
						  })}
					  </div>
					)
				  })
				})()}
			  </div>
			)}

            {(section.gallery?.length ?? 0) > 0 && (
              <div className="mt-16">
                <GallerySlider
                  images={section.gallery!.map(img => img.asset)}
                />
              </div>
            )}

            {section.showFormularioOcorrencias && (
			  <div
				className="mt-12 relative rounded-xl overflow-hidden"
				style={
				  section.ocorrenciasBackground
					? {
						backgroundImage: `url(${urlFor(section.ocorrenciasBackground)})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					  }
					: undefined
				}
			  >
				{/* Overlay escuro (como no site exemplo) */}
				<div className="absolute inset-0 bg-black/50" />

				{/* Conteúdo */}
				<div className="relative z-10 p-8 md:p-12 text-center">
				  <FormularioOcorrencia />
				</div>
			  </div>
			)}
          </section>
        )
      })}

      {/* ---------- EVENTOS ---------- */}
      <section
        id={eventosSectionId}
        className={`max-w-6xl mx-auto px-6 py-16 ${
          activeSection === eventosSectionId ? 'block' : 'hidden'
        }`}
      >
        <h2 className="mb-12 text-3xl font-bold text-blue-600 text-center">
          Eventos na Freguesia
        </h2>

        {/* 🔹 Evento em destaque */}
        {nextEvent && (
          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Próximo Evento: {nextEvent.title}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              {new Date(nextEvent.date).toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            {nextEvent.image && (
              <Image
                src={nextEvent.image.asset.url}
                alt={nextEvent.title}
                width={400}
                height={200}
                className="object-cover w-full rounded mb-2"
              />
            )}
          </div>
        )}

        {/* 🔹 Filtro tipo de evento */}
        <EventFilter value={eventType} onChange={setEventType} />

        {/* 🔹 Calendário */}
        <Calendar events={filteredEvents} />

        {/* 🔹 Lista Próximos eventos */}
        {upcomingEvents.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Próximos Eventos
            </h3>
            <ul className="space-y-2">
              {upcomingEvents.map(e => (
                <li key={e.slug} className="p-3 border rounded hover:bg-blue-50 transition">
                  <span className="font-medium text-gray-800">{e.title}</span> —{' '}
                  <span className="text-gray-600">
                    {new Date(e.date).toLocaleDateString('pt-PT', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ---------- NOTÍCIAS (só na Home) ---------- */}
      {isHome && news.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-blue-600">
              Notícias da Junta de Freguesia
            </h2>
          </div>

          <div className="relative">
            {canGoPrev && (
              <button
                onClick={() => setNewsIndex(newsIndex - NEWS_PER_PAGE)}
                className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2"
              >
                <ChevronLeft />
              </button>
            )}

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {news.slice(newsIndex, newsIndex + NEWS_PER_PAGE).map(item => (
                <div key={item.slug} className="bg-white rounded-xl shadow-md flex flex-col">
                  {item.image && (
                    <Image
                      src={urlFor(item.image)}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="h-44 w-full object-cover rounded-t-xl"
                    />
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(item.date).toLocaleDateString('pt-PT')}
                    </p>
                    {item.summary && (
                      <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                        {item.summary}
                      </p>
                    )}
                    <a
                      href={`#${item.slug}`}
                      onClick={() => setActiveSection(item.slug)}
                      className="mt-auto text-blue-600 font-medium hover:underline"
                    >
                      Ler mais →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {canGoNext && (
              <button
                onClick={() => setNewsIndex(newsIndex + NEWS_PER_PAGE)}
                className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2"
              >
                <ChevronRight />
              </button>
            )}
          </div>
        </section>
      )}

      {/* ---------- NOTÍCIA COMPLETA ---------- */}
      {news.map(item => (
        <section
          key={item.slug}
          id={item.slug}
          className={`max-w-6xl mx-auto px-6 py-16 ${
            item.slug === activeSection ? 'block' : 'hidden'
          }`}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-4">{item.title}</h2>
          <p className="text-sm text-gray-500 mb-6">
            {new Date(item.date).toLocaleDateString('pt-PT')}
          </p>
          {item.image && (
            <div className="w-1/2 mx-auto mb-6">
              <Image
                src={urlFor(item.image)}
                alt={item.title}
                width={400}
                height={200}
                className="w-full rounded-md object-cover"
              />
            </div>
          )}
          <PortableTextRenderer value={item.content} />
        </section>
      ))}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 p-3 text-white rounded-full shadow"
        >
          <ChevronUp size={22} />
        </button>
      )}

      <Footer 
        eventosSlug={eventosSectionId} 
        onGoToSection={(slug: string) => {
          setActiveSection(slug)
          setScrollFromFooter(true) // 🔑 dispara scroll apenas ao clicar no footer
        }} 
      />
    </main>
  )
}
