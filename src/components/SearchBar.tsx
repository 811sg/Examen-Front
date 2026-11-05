interface SearchBarProps {
  value: string
  placeholder: string
  disabled: boolean
  onChange: (value: string) => void
}

export default function SearchBar({ value, placeholder, disabled, onChange }: SearchBarProps) {
  return (
    <input
      className="search"
      type="search"
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
