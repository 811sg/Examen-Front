import { RefreshCw, SearchX } from 'lucide-react'
import type { Department } from '../types/colombia'
import DepartmentCard from './DepartmentCard'

interface DepartmentGridProps {
  departments: Department[]
  loading: boolean
  error: string
  query: string
  onSelect: (id: number) => void
  onRetry: () => void
}

export default function DepartmentGrid({ departments, loading, error, query, onSelect, onRetry }: DepartmentGridProps) {
  if (loading) {
    return (
      <div className="department-grid" aria-busy="true" aria-label="Cargando departamentos">
        {Array.from({ length: 8 }, (_, index) => <div className="department-card skeleton" key={index} />)}
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error" role="alert">
        <span>{error}</span>
        <button className="secondary-button" onClick={onRetry}><RefreshCw size={15} />Reintentar</button>
      </div>
    )
  }

  if (departments.length === 0) {
    return (
      <div className="empty-state">
        <SearchX size={26} />
        <h3>Sin resultados</h3>
        <p>No encontramos departamentos para “{query}”. Prueba con otro nombre.</p>
      </div>
    )
  }

  return (
    <div className="department-grid">
      {departments.map((department) => <DepartmentCard key={department.id} department={department} onSelect={onSelect} />)}
    </div>
  )
}
