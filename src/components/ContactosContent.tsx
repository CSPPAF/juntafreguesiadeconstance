'use client'

export default function ContactosContent({
  onOpenForm,
}: {
  onOpenForm: () => void
}) {
  return (
    <div className="space-y-6 text-gray-700 text-sm">
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Telemóvel</h3>
        <p>
          Chamada para rede móvel:{' '}
          <strong>(+351) 967 152 991</strong>
        </p>

        <h3 className="text-lg font-semibold text-gray-900">Email</h3>
        <p>
          <a
            href="mailto:geral@jfconstance.pt"
            className="text-blue-600 hover:underline"
          >
            geral@jfconstance.pt
          </a>
        </p>

        <button
          onClick={onOpenForm}
          className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Contacta-nos
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Morada</h3>
        <p>
          Rua Santa Eulália, nº 9
          <br />
          4455-469 – Constance
          <br />
          Marco de Canaveses – Portugal
        </p>

        <h3 className="text-lg font-semibold text-gray-900">GPS</h3>
        <p>
          Latitude: 41º 13’ 29.2938”
          <br />
          Longitude: -8º 41’ 50.46”
        </p>

        <iframe
          className="w-full h-64 rounded-md shadow mt-4"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3047.719647!2d-8.1695894!3d41.2126716!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2464e617f47463%3A0x4b623df5be79aa44!2sRua%20Santa%20Eul%C3%A1lia%2C%209%2C%20Marco%20de%20Canaveses!5e0!3m2!1spt-PT!2spt!4v1710000000000"
          loading="lazy"
        />
      </section>
    </div>
  )
}
