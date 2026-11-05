import { useEffect, useState } from 'react'
import { colombiaApi } from '../lib/api'
import type { Department } from '../types/colombia'

// Pide la lista de departamentos y guarda el estado de carga y de error.
export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        const data = await colombiaApi.getDepartments()
        if (!ignore) setDepartments([...data].sort((a, b) => a.name.localeCompare(b.name)))
      } catch (err) {
        if (!ignore) setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => { ignore = true }
  }, [attempt])

  function retry() {
    setLoading(true)
    setError('')
    setAttempt((current) => current + 1)
  }

  return { departments, loading, error, retry }
}
