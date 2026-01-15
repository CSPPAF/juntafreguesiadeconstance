// schemas/news.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: 'Notícia',
  type: 'document',
  fields: [
	// ✅ NOVO — controlo de ordem no CMS
    defineField({
      name: 'order',
      title: 'Ordem da seção',
      type: 'number',
      description: 'Define a ordem das seções no site (1 = primeira)',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Data',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Resumo / descrição curta',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Imagem do card',
      type: 'image',
      options: {
        hotspot: true, // permite escolher o foco da imagem
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo completo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
