import { config } from '../config'
import type { City, Department } from '../types/colombia'

export class ApiError extends Error {
    readonly status: number
    constructor(message: string, status: number) { super(message); this.name = 'ApiError'; this.status = status }
}

function messageFor(status: number) {
    if (status === 404) return 'No se encontró la información pedida (error 404).'
    if (status === 429) return 'Se hicieron demasiadas peticiones, espera un momento (error 429).'
    if (status >= 500) return `API Colombia no está disponible ahora (error ${status}).`
    return `La API respondió con error ${status}.`
}

async function request<T>(path: string): Promise<T> {
    let response: Response
    try { response = await fetch(`${config.apiUrl}${path}`) } catch { throw new Error('No se pudo conectar con API Colombia. Revisa tu internet.') }
    if (!response.ok) throw new ApiError(messageFor(response.status), response.status)
    return response.json() as Promise<T>
}

export const colombiaApi = {
    getDepartments: () => request<Department[]>('/api/v1/Department'),
    getDepartment: (id: number) => request<Department>(`/api/v1/Department/${id}`),
    getCities: (id: number) => request<City[]>(`/api/v1/Department/${id}/cities`),
}
