const numbers = new Intl.NumberFormat('es-CO')

export function formatNumber(value?: number | null) {
  return typeof value === 'number' ? numbers.format(value) : '—'
}

export function formatArea(value?: number | null) {
  return typeof value === 'number' ? `${numbers.format(value)} km²` : '—'
}

export function normalizeText(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}
