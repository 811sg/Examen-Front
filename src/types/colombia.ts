export interface Region { id: number; name: string }
export interface Department { id: number; name: string; description?: string; municipalities?: number; surface?: number; population?: number; phonePrefix?: string; cityCapital?: { id: number; name: string } | null; region?: Region | null }
export interface City { id: number; name: string; population?: number }
