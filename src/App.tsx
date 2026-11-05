import { useMemo, useState } from 'react'
import { config } from './config'
import { useDepartments } from './hooks/useDepartments'
import type { Department } from './types/colombia'
import SearchBar from './components/SearchBar'
import DepartmentCard from './components/DepartmentCard'
import DepartmentModal from './components/DepartmentModal'
import './App.css'

// quita tildes y pasa a minúsculas para que "bogota" encuentre "Bogotá"
function clean(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function App() {
  const { departments, loading, error, retry } = useDepartments()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Department | null>(null)

  const filtered = useMemo(() => {
    const text = clean(search.trim())
    return departments.filter((department) =>
      clean(`${department.name} ${department.cityCapital?.name ?? ''} ${department.region?.name ?? ''}`).includes(text),
    )
  }, [departments, search])

  return (
    <main className="page">
      <h1>{config.title}</h1>
      <p className="subtitle">{config.subtitle}</p>
      <p className={error ? 'status bad' : 'status ok'}>
        {loading && 'Conectando con API Colombia...'}
        {!loading && !error && `Conectado a API Colombia · ${departments.length} departamentos`}
        {!loading && error && 'Sin conexión con la API'}
      </p>

      <SearchBar value={search} placeholder={config.searchPlaceholder} disabled={loading || Boolean(error)} onChange={setSearch} />
      {!loading && !error && <p className="count">Mostrando {filtered.length} de {departments.length}</p>}

      {loading && <p>Cargando departamentos...</p>}
      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={retry}>Reintentar</button>
        </div>
      )}
      {!loading && !error && filtered.length === 0 && <p>No hay departamentos que coincidan con "{search}".</p>}

      <div className="grid">
        {filtered.map((department) => (
          <DepartmentCard key={department.id} department={department} onSelect={setSelected} />
        ))}
      </div>

      {selected && <DepartmentModal key={selected.id} department={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}

export default App
