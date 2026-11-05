import type { Department } from '../types/colombia'

interface DepartmentCardProps {
  department: Department
  onSelect: (department: Department) => void
}

export default function DepartmentCard({ department, onSelect }: DepartmentCardProps) {
  return (
    <button className="card" onClick={() => onSelect(department)}>
      <h3>{department.name}</h3>
      <p>Capital: {department.cityCapital?.name ?? 'sin dato'}</p>
      <p>{department.population?.toLocaleString('es-CO') ?? 'sin dato'} habitantes</p>
    </button>
  )
}
