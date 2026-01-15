import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome do menu',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'items',
      title: 'Itens do menu',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Item de menu',
          fields: [
            {
              name: 'label',
              title: 'Texto',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
            },
            {
              name: 'children',
              title: 'Submenu',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Sub-item',
                  fields: [
                    {
                      name: 'label',
                      title: 'Texto',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    },
                    {
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                    },
                    {
                      name: 'children',
                      title: 'Sub-submenu',
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
                              name: 'href',
                              title: 'Link',
                              type: 'string',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})