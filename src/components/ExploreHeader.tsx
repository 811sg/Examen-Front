import { Search, X } from 'lucide-react'
import BrandMark from './BrandMark'

interface ExploreHeaderProps {
  query: string
  total: number
  shown: number
  disabled: boolean
  onQueryChange: (value: string) => void
}

export default function ExploreHeader({ query, total, shown, disabled, onQueryChange }: ExploreHeaderProps) {
  return (
    <header className="explore-header">
      <div className="brand"><BrandMark /><span>explora<strong>colombia</strong></span></div>
      <span className="eyebrow">TABLERO DE DEPARTAMENTOS</span>
      <h1>Explora Colombia<span>.</span></h1>
      <p className="header-copy">Filtra los departamentos en tiempo real y abre cada tarjeta para ver sus ciudades y datos clave.</p>
      <div className="search-row">
        <label className="search-box">
          <Search size={18} />
          <input
            type="search"
            value={query}
            disabled={disabled}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Busca por departamento, capital o región"
            aria-label="Filtrar departamentos"
          />
          {query && <button type="button" className="icon-button" onClick={() => onQueryChange('')} aria-label="Limpiar búsqueda"><X size={16} /></button>}
        </label>
        <span className="result-count" aria-live="polite">{disabled ? '…' : `${shown} de ${total}`}</span>
      </div>
    </header>
  )
}
