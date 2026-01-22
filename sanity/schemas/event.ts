import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Evento',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Evento',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / ID do Evento',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Data do Evento',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição do Evento',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Imagem do Evento',
      type: 'image',
    }),
	defineField({
	  name: 'types',
	  title: 'Tipos de Evento',
	  type: 'array',
	  of: [
		{
		  type: 'string',
		  options: {
			list: [
			  { title: 'Festividades', value: 'festividades' },
			  { title: 'Desporto', value: 'desporto' },
			  { title: 'Associações', value: 'associacoes' },
			  { title: 'Institucional', value: 'institucional' },
			  { title: 'Comissão de Festas', value: 'festas' },
			],
		  },
		},
	  ],
	  validation: Rule => Rule.min(1),
	}),
	
	defineField({
	  name: 'association',
	  title: 'Associação',
	  type: 'string',
	  options: {
		list: [
		  { title: 'Constance Telling', value: 'constance' },
		  { title: 'AMCC', value: 'amcc' },
		  { title: 'Rancho', value: 'rancho' },
		  { title: 'Arco', value: 'arco' },
		  { title: 'Elas', value: 'elas' },
		  { title: 'Associação Desportiva', value: 'desportiva' },
		  { title: 'Comissão de Festas', value: 'festas' },
		],
	  },
	  hidden: ({ document }) => !document?.types?.includes('associacoes'),
	})
  ],
})
