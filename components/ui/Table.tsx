import { ChevronUp, ChevronDown } from 'lucide-react'
import { Checkbox } from './Checkbox'

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface TableProps<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  selectable?: boolean
  selectedRows?: string[]
  onSelect?: (ids: string[]) => void
  sortKey?: keyof T
  sortDirection?: 'asc' | 'desc'
  onSort?: (key: keyof T) => void
}

export function Table<T extends { id: string }>({
  columns, data, selectable, selectedRows = [], onSelect, sortKey, sortDirection, onSort,
}: TableProps<T>) {
  const allSelected = data.length > 0 && selectedRows.length === data.length
  const someSelected = selectedRows.length > 0 && !allSelected

  const toggleAll = () => onSelect?.(allSelected ? [] : data.map(r => r.id))
  const toggleRow = (id: string) => onSelect?.(selectedRows.includes(id) ? selectedRows.filter(r => r !== id) : [...selectedRows, id])

  return (
    <div className="rounded-[var(--radius-base)] border border-[var(--color-border-muted)] overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[var(--color-bg-surface)] border-b border-[var(--color-border-muted)]">
            {selectable && (
              <th className="w-10 pl-4 py-2.5">
                <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
              </th>
            )}
            {columns.map(col => (
              <th
                key={String(col.key)}
                onClick={() => col.sortable && onSort?.(col.key)}
                className={['px-4 py-2.5 text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide text-left', col.sortable ? 'cursor-pointer hover:text-[var(--color-text-secondary)]' : ''].join(' ')}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDirection === 'asc'
                      ? <ChevronUp size={12} className="text-[var(--color-text-primary)]" />
                      : <ChevronDown size={12} className="text-[var(--color-text-primary)]" />
                  )}
                  {col.sortable && sortKey !== col.key && (
                    <ChevronUp size={12} className="opacity-30" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => {
            const isSelected = selectedRows.includes(row.id)
            return (
              <tr
                key={row.id}
                className={['border-b border-[var(--color-border-muted)] last:border-0 transition-[background] duration-100', isSelected ? 'bg-[var(--color-bg-overlay)]' : 'hover:bg-[var(--color-bg-surface)]'].join(' ')}
              >
                {selectable && (
                  <td className="w-10 pl-4 py-3">
                    <Checkbox checked={isSelected} onChange={() => toggleRow(row.id)} />
                  </td>
                )}
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-3 text-sm text-[var(--color-text-primary)]">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
