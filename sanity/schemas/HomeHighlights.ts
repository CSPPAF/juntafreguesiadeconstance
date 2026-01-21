import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homeHighlight',
  title: 'Destaques da Home',
  type: 'document',
  fields: [
    defineField({
      name: 'titleTop',
      title: 'Texto superior',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    // ⚡ Campo removido: titleBottom
    defineField({
      name: 'icon',
      title: 'Ícone (Lucide)',
      description: 'Ex: Clock, ShieldCheck, Search, Calendar',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'targetSlug',
      title: 'Destino (slug da secção)',
      description: 'Ex: eventos, contactos, noticias',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
    }),
  ],
})
