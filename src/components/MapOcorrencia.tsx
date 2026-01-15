"use client"

import { MapContainer, TileLayer, Marker, GeoJSON, useMapEvents, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useState, useEffect } from "react"
import constanceGeoRaw from "../data/constance.geo.json"
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"
import { point } from "@turf/helpers"
import { Feature, Polygon, MultiPolygon, GeoJsonObject } from "geojson"

// Forçar tipo correto para o GeoJSON
const constanceGeo = constanceGeoRaw as GeoJsonObject

// Ícone padrão
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

type Props = {
  onLocationChange: (data: {
    lat: number
    lng: number
    morada: string
    codigoPostal: string
  }) => void
}

type GeoFeature = Feature<Polygon | MultiPolygon>

// Componente para ajustar o mapa aos limites da freguesia
function MapSetup() {
  const map = useMap()

  useEffect(() => {
    const layer = L.geoJSON(constanceGeo)
    const bounds = layer.getBounds()
    map.fitBounds(bounds)
    map.setMaxBounds(bounds)
    map.setMinZoom(13)
    map.setMaxZoom(18)
  }, [map])

  return null
}

// Componente que lida com cliques e marcações
function ClickHandler({ onLocationChange }: Props) {
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null)

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng
      const pt = point([lng, lat])

      if (!booleanPointInPolygon(pt, constanceGeo as GeoFeature)) {
        alert("Por favor, clique apenas dentro da freguesia de Constance.")
        return
      }

      setMarkerPos([lat, lng])

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        )
        const data = await res.json()

        let morada = ""
        if (data.address?.road) {
          morada = data.address.road
          if (data.address.house_number) {
            morada += " " + data.address.house_number
          }
        }

        if (!morada && data.display_name) {
          morada = data.display_name
        }

        const codigoPostal = data.address?.postcode || ""

        onLocationChange({
          lat,
          lng,
          morada,
          codigoPostal,
        })
      } catch (error) {
        console.error("Erro ao buscar morada:", error)
      }
    },
  })

  return markerPos ? <Marker position={markerPos} icon={icon} /> : null
}

export default function MapOcorrencia({ onLocationChange }: Props) {
  return (
    <MapContainer
      center={[41.2135, -8.1648]}
      zoom={14}
      className="h-[600px] w-full rounded-md"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* GeoJSON da freguesia */}
      <GeoJSON data={constanceGeo} style={{ color: "blue", weight: 2 }} />

      {/* Ajuste automático do mapa */}
      <MapSetup />

      {/* Clique do usuário */}
      <ClickHandler onLocationChange={onLocationChange} />
    </MapContainer>
  )
}
