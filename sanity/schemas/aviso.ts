import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aviso',
  title: 'Aviso / Edital',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
	defineField({
	  name: 'date',
	  title: 'Data do Aviso',
	  type: 'date',
	  options: {
		dateFormat: 'DD/MM/YYYY',
	  },
	}),
    defineField({
      name: 'link',
      title: 'Link Externo',
      type: 'url',
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'pdf',
      title: 'PDF do Edital',
      type: 'file',
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Ordem',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
