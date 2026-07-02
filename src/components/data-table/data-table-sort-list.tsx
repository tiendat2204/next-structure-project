import type { ColumnSort, SortDirection, Table } from '@tanstack/react-table'
import {
  ArrowDownUp,
  ChevronsUpDown,
  GripVertical,
  Trash2
} from 'lucide-react'
import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay
} from '@/components/ui/sortable'
import { dataTableConfig } from '@/constants/config'
import { cn } from '@/lib/utils'

const OPEN_MENU_SHORTCUT = ''
const REMOVE_SORT_SHORTCUTS = ['backspace', 'delete']

interface DataTableSortListProps<TData>
  extends React.ComponentProps<typeof PopoverContent> {
  table: Table<TData>
  maxSorts?: number
}

export function DataTableSortList<TData> ({
  table,
  maxSorts = 1,
  ...props
}: DataTableSortListProps<TData>) {
  const id = React.useId()
  const labelId = React.useId()
  const descriptionId = React.useId()
  const [open, setOpen] = React.useState(false)
  const addButtonRef = React.useRef<HTMLButtonElement>(null)

  const sorting = table.getState().sorting
  const onSortingChange = table.setSorting

  const { columnLabels, columns } = React.useMemo(() => {
    const labels = new Map<string, string>()
    const sortingIds = new Set(sorting.map((s) => s.id))
    const availableColumns: { id: string, label: string }[] = []

    for (const column of table.getAllColumns()) {
      if (!column.getCanSort()) continue

      const label = column.columnDef.meta?.label ?? column.id

      labels.set(column.id, label)

      if (!sortingIds.has(column.id)) {
        availableColumns.push({ id: column.id, label })
      }
    }

    return {
      columnLabels: labels,
      columns: availableColumns
    }
  }, [sorting, table])

  const onSortAdd = React.useCallback(() => {
    const firstColumn = columns[0]

    if (!firstColumn) return

    onSortingChange((prevSorting) => {
      if (maxSorts === 1) {
        return [{ id: firstColumn.id, desc: false }]
      }
      return [...prevSorting, { id: firstColumn.id, desc: false }]
    })
  }, [columns, onSortingChange, maxSorts])

  const onSortUpdate = React.useCallback(
    (sortId: string, updates: Partial<ColumnSort>) => {
      onSortingChange((prevSorting) => {
        if (!prevSorting) return prevSorting
        return prevSorting.map((sort) =>
          sort.id === sortId ? { ...sort, ...updates } : sort
        )
      })
    },
    [onSortingChange]
  )

  const onSortRemove = React.useCallback(
    (sortId: string) => {
      onSortingChange((prevSorting) =>
        prevSorting.filter((item) => item.id !== sortId)
      )
    },
    [onSortingChange]
  )

  const onSortingReset = React.useCallback(
    () => onSortingChange(table.initialState.sorting),
    [onSortingChange, table.initialState.sorting]
  )

  React.useEffect(() => {
    function onKeyDown (event: KeyboardEvent) {
      if (
        event.target instanceof HTMLInputElement
        || event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (
        event.key.toLowerCase() === OPEN_MENU_SHORTCUT
        && !event.ctrlKey
        && !event.metaKey
        && !event.shiftKey
      ) {
        event.preventDefault()
        setOpen(true)
      }

      if (
        event.key.toLowerCase() === OPEN_MENU_SHORTCUT
        && event.shiftKey
        && sorting.length > 0
      ) {
        event.preventDefault()
        onSortingReset()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [sorting.length, onSortingReset])

  const onTriggerKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (
        REMOVE_SORT_SHORTCUTS.includes(event.key.toLowerCase())
        && sorting.length > 0
      ) {
        event.preventDefault()
        onSortingReset()
      }
    },
    [sorting.length, onSortingReset]
  )

  return (
    <Sortable
      value={sorting}
      onValueChange={onSortingChange}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getItemValue={(item: any) => item.id}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' onKeyDown={onTriggerKeyDown}>
            <ArrowDownUp className='size-3' />
            Sắp xếp
            {sorting.length > 0 && (
              <Badge
                variant='secondary'
                className='h-[18.24px]  rounded-none px-[5.12px] font-mono font-normal text-[10.4px]'
              >
                {sorting.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          className='flex w-full max-w-[var(--radix-popover-content-available-width)] origin-[var(--radix-popover-content-transform-origin)] flex-col gap-3.5 p-4 sm:min-w-[380px]'
          {...props}
        >
          <div className='flex flex-col gap-1'>
            <h4 id={labelId} className='font-medium leading-none'>
              {sorting.length > 0 ? 'Sắp xếp theo' : 'Chưa áp dụng sắp xếp'}
            </h4>
            <p
              id={descriptionId}
              className={cn(
                'text-muted-foreground text-sm',
                sorting.length > 0 && 'sr-only'
              )}
            >
              {sorting.length > 0
                ? 'Chỉnh sửa sắp xếp để tổ chức các hàng của bạn.'
                : 'Thêm sắp xếp để tổ chức các hàng của bạn.'}
            </p>
          </div>
          {sorting.length > 0 && (
            <SortableContent asChild>
              <ul className='flex max-h-[300px] flex-col gap-2 overflow-y-auto p-1'>
                {sorting.map((sort) => (
                  <DataTableSortItem
                    key={sort.id}
                    sort={sort}
                    sortItemId={`${id}-sort-${sort.id}`}
                    columns={columns}
                    columnLabels={columnLabels}
                    onSortUpdate={onSortUpdate}
                    onSortRemove={onSortRemove}
                    showDragHandle={maxSorts > 1}
                  />
                ))}
              </ul>
            </SortableContent>
          )}
          <div className='flex w-full items-center gap-2'>
            <Button
              ref={addButtonRef}
              onClick={onSortAdd}
              disabled={columns.length === 0 || (maxSorts === 1 && sorting.length >= 1)}
            >
              {maxSorts === 1 ? 'Chọn sắp xếp' : 'Thêm sắp xếp'}
            </Button>
            {sorting.length > 0 && (
              <Button
                variant='outline'
                onClick={onSortingReset}
              >
                Đặt lại sắp xếp
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <SortableOverlay>
        <div className='flex items-center gap-2'>
          <div className='h-9 w-[180px] rounded-none bg-primary/10' />
          <div className='h-9 w-24 rounded-none bg-primary/10' />
          <div className='size-8 shrink-0 rounded-none bg-primary/10' />
          <div className='size-8 shrink-0 rounded-none bg-primary/10' />
        </div>
      </SortableOverlay>
    </Sortable>
  )
}

interface DataTableSortItemProps {
  sort: ColumnSort
  sortItemId: string
  columns: { id: string, label: string }[]
  columnLabels: Map<string, string>
  onSortUpdate: (sortId: string, updates: Partial<ColumnSort>) => void
  onSortRemove: (sortId: string) => void
  showDragHandle?: boolean
}

function DataTableSortItem ({
  sort,
  sortItemId,
  columns,
  columnLabels,
  onSortUpdate,
  onSortRemove,
  showDragHandle = true
}: DataTableSortItemProps) {
  const fieldListboxId = `${sortItemId}-field-listbox`
  const fieldTriggerId = `${sortItemId}-field-trigger`
  const directionListboxId = `${sortItemId}-direction-listbox`

  const [showFieldSelector, setShowFieldSelector] = React.useState(false)
  const [showDirectionSelector, setShowDirectionSelector] = React.useState(false)

  const onItemKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (
        event.target instanceof HTMLInputElement
        || event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (showFieldSelector || showDirectionSelector) {
        return
      }

      if (REMOVE_SORT_SHORTCUTS.includes(event.key.toLowerCase())) {
        event.preventDefault()
        onSortRemove(sort.id)
      }
    },
    [sort.id, showFieldSelector, showDirectionSelector, onSortRemove]
  )

  return (
    <SortableItem value={sort.id} asChild>
      <li
        id={sortItemId}
        tabIndex={-1}
        className='flex items-center gap-2'
        onKeyDown={onItemKeyDown}
      >
        <Popover open={showFieldSelector} onOpenChange={setShowFieldSelector}>
          <PopoverTrigger asChild>
            <Button
              id={fieldTriggerId}
              aria-controls={fieldListboxId}
              variant='outline'
              className='w-44 justify-between  font-normal'
            >
              <span className='truncate'>{columnLabels.get(sort.id)}</span>
              <ChevronsUpDown className='opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={fieldListboxId}
            className='w-[var(--radix-popover-trigger-width)] origin-[var(--radix-popover-content-transform-origin)] p-0'
          >
            <Command>
              <CommandInput placeholder='Tìm kiếm trường...' />
              <CommandList>
                <CommandEmpty>Không tìm thấy trường nào.</CommandEmpty>
                <CommandGroup>
                  {columns.map((column) => (
                    <CommandItem
                      key={column.id}
                      value={column.id}
                      onSelect={(value) => onSortUpdate(sort.id, { id: value })}
                    >
                      <span className='truncate'>{column.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Select
          open={showDirectionSelector}
          onOpenChange={setShowDirectionSelector}
          value={sort.desc ? 'desc' : 'asc'}
          onValueChange={(value: SortDirection) =>
            onSortUpdate(sort.id, { desc: value === 'desc' })}
        >
          <SelectTrigger
            aria-controls={directionListboxId}
            className='h-9 w-30 [&[data-size]]:h-9'
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            id={directionListboxId}
            className='min-w-[var(--radix-select-trigger-width)] origin-[var(--radix-select-content-transform-origin)]'
          >
            {dataTableConfig.sortOrders.map((order) => (
              <SelectItem key={order.value} value={order.value}>
                {order.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          aria-controls={sortItemId}
          variant='outline'
          className=' shrink-0 '
          onClick={() => onSortRemove(sort.id)}
        >
          <Trash2 />
        </Button>
        {showDragHandle && (
          <SortableItemHandle asChild>
            <Button
              variant='outline'
              className=' shrink-0 '
            >
              <GripVertical />
            </Button>
          </SortableItemHandle>
        )}
      </li>
    </SortableItem>
  )
}
