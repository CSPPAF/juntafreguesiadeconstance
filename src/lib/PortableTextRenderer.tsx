import { PortableText } from '@portabletext/react'

export default function PortableTextRenderer({ value }: { value: any }) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="list-disc ml-6 mb-4">{children}</ul>
          ),
        },
        listItem: {
          bullet: ({ children }) => <li className="mb-2">{children}</li>,
        },
      }}
    />
  )
}
