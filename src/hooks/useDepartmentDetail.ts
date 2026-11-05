import { useEffect, useState } from 'react'
import { colombiaApi } from '../lib/api'
import type { City, Department } from '../types/colombia'

// Pide el detalle y las ciudades de un departamento al abrir el modal.
export function useDepartmentDetail(department: Department) {
  const id = department.id
  const [detail, setDetail] = useState<Department>(department)
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        const [newDetail, newCities] = await Promise.all([colombiaApi.getDepartment(id), colombiaApi.getCities(id)])
        if (ignore) return
        setDetail((current) => ({ ...current, ...newDetail }))
        setCities([...newCities].sort((a, b) => a.name.localeCompare(b.name)))
      } catch (err) {
        if (!ignore) setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => { ignore = true }
  }, [id, attempt])

  function retry() {
    setLoading(true)
    setError('')
    setAttempt((current) => current + 1)
  }

  return { detail, cities, loading, error, retry }
}
