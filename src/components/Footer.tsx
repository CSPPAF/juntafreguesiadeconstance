'use client'

import { useEffect, useState } from 'react'
import FooterContent from './FooterContent'
import Modal from './Modal'
import FormularioContato from './FormularioContato'
import ContactosContent from './ContactosContent'
import { getFooter } from '../../app/getFooter'

export default function Footer() {
  const [footer, setFooter] = useState<any>(null)
  const [mostrarContactos, setMostrarContactos] = useState(false)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  useEffect(() => {
    getFooter().then(setFooter)
  }, [])

  if (!footer) return null

  return (
    <>
      <FooterContent
        footer={footer}
        onOpenContact={() => setMostrarContactos(true)}
      />

      {/* MODAL 1 */}
      {mostrarContactos && (
        <Modal
          title="Contactos"
          open
          onClose={() => {
            setMostrarContactos(false)
            setMostrarFormulario(false)
          }}
          overlayClassName="z-40"
          modalClassName="z-50"
        >
          <ContactosContent
            onOpenForm={() => setMostrarFormulario(true)}
          />
        </Modal>
      )}

      {/* MODAL 2 — EM CIMA */}
      {mostrarFormulario && (
        <Modal
          title="Pedido de Informação"
          open
          onClose={() => setMostrarFormulario(false)}
          overlayClassName="z-60"
          modalClassName="z-70"
        >
          <FormularioContato />
        </Modal>
      )}
    </>
  )
}
