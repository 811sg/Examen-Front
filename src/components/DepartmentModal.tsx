import { useEffect } from 'react'
import { useDepartmentDetail } from '../hooks/useDepartmentDetail'
import type { Department } from '../types/colombia'

interface DepartmentModalProps {
  department: Department
  onClose: () => void
}

export default function DepartmentModal({ department, onClose }: DepartmentModalProps) {
  const { detail, cities, loading, error, retry } = useDepartmentDetail(department)

  // cerrar con la tecla Escape
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="close" onClick={onClose}>Cerrar</button>
        <h2>{detail.name}</h2>
        {detail.description && <p>{detail.description}</p>}

        <ul className="facts">
          <li><b>Capital:</b> {detail.cityCapital?.name ?? 'sin dato'}</li>
          <li><b>Población:</b> {detail.population?.toLocaleString('es-CO') ?? 'sin dato'}</li>
          <li><b>Superficie:</b> {detail.surface?.toLocaleString('es-CO') ?? 'sin dato'} km²</li>
          <li><b>Municipios:</b> {detail.municipalities ?? 'sin dato'}</li>
          <li><b>Prefijo telefónico:</b> {detail.phonePrefix ? `+57 ${detail.phonePrefix}` : 'sin dato'}</li>
          <li><b>Región:</b> {detail.region?.name ?? 'sin dato'}</li>
        </ul>

        <h3>Ciudades {!loading && !error && `(${cities.length})`}</h3>
        {loading && <p className="modal-loading">Cargando ciudades...</p>}
        {error && (
          <div className="error-box">
            <p>{error}</p>
            <button onClick={retry}>Reintentar</button>
          </div>
        )}
        <ul className="cities">
          {cities.map((city) => (
            <li key={city.id}>
              {city.name}
              {city.population ? <small> · {city.population.toLocaleString('es-CO')} hab.</small> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
