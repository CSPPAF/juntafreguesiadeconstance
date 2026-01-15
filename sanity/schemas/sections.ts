import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Seção',
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
      title: 'Título da Seção',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / ID da Seção',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
    }),

    // Fotógrafas — mantém igual
    defineField({
      name: 'photographers',
      title: 'Fotógrafas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'photo', title: 'Foto', type: 'image' },
            { name: 'name', title: 'Nome', type: 'string' },
            { name: 'role', title: 'Função', type: 'string' },
            { name: 'description', title: 'Descrição', type: 'text' },
          ],
        },
      ],
    }),
	
	defineField({
	  name: 'gallery',
	  title: 'Galeria de Imagens',
	  description: 'Galeria com navegação por setas',
	  type: 'array',
	  of: [{ type: 'image' }],
	}),
	
	defineField({
	  name: 'showFormularioOcorrencias',
	  title: 'Mostrar formulário de ocorrências',
	  type: 'boolean',
	  initialValue: false,
	})
  ],
})
