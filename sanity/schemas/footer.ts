import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Rodapé',
  type: 'document',

  fields: [
    defineField({
      name: 'logo',
      title: 'Logotipo da Junta',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),

    defineField({
      name: 'address',
      title: 'Morada',
      type: 'text',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
    }),

    defineField({
      name: 'openingHours',
      title: 'Horário',
      type: 'text',
    }),

    defineField({
      name: 'columns',
      title: 'Colunas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título da coluna',
              type: 'string',
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Texto',
                      type: 'string',
                    },
                    {
                      name: 'action',
                      title: 'Tipo',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Link normal', value: 'link' },
                          { title: 'Abrir modal', value: 'modal' },
                        ],
                      },
                    },
                    {
                      name: 'value',
                      title: 'URL ou nome do modal',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
    }),
  ],
})
