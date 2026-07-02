import type { Column, Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableSliderFilter } from './data-table-slider-filter'
import { DataTableDateFilter } from './data-table-date-filter'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>
  createButton?: React.ReactNode
}

export function DataTableToolbar<TData> ({
  table,
  children,
  createButton,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  )

  const onReset = React.useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <div
      role='toolbar'
      aria-orientation='horizontal'
      className={cn(
        'flex w-full items-start justify-between gap-2 ',
        className
      )}
      {...props}
    >
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        {columns.map((column) => (
          <DataTableToolbarFilter key={column.id} column={column} />
        ))}
        {createButton}

        {isFiltered && (
          <Button
            aria-label='Reset filters'
            variant='outline'
            className='border-dashed'
            onClick={onReset}
          >
            <X className='size-4.5' />
            Đặt lại
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2'>
        <DataTableViewOptions table={table} />
        {children}
      </div>
    </div>
  )
}

interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>
}

function DataTableToolbarFilter<TData> ({
  column
}: DataTableToolbarFilterProps<TData>) {
  // eslint-disable-next-line no-lone-blocks
  {
    const columnMeta = column.columnDef.meta

    const onFilterRender = React.useCallback(() => {
      if (!columnMeta?.variant) return null

      switch (columnMeta.variant) {
        case 'text':
          return (
            <Input
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className='h-9 w-40 lg:w-56 bg-card'
            />
          )

        case 'number':
          return (
            <div className='relative'>
              <Input
                type='number'
                inputMode='numeric'
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ''}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className={cn('h-9 w-[120px]', columnMeta.unit && 'pr-8')}
              />
              {columnMeta.unit && (
                <span className='absolute top-0 right-0 bottom-0 flex items-center rounded-r-none bg-accent px-2 text-muted-foreground text-sm'>
                  {columnMeta.unit}
                </span>
              )}
            </div>
          )

        case 'range':
          return (
            <DataTableSliderFilter
              column={column}
              title={columnMeta.label ?? column.id}
            />
          )

        case 'date':
        case 'dateRange':
          return (
            <DataTableDateFilter
              column={column}
              title={columnMeta.label ?? column.id}
              multiple={columnMeta.variant === 'dateRange'}
            />
          )

        case 'select':
        case 'multiSelect':
          return (
            <DataTableFacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === 'multiSelect'}
            />
          )

        default:
          return null
      }
    }, [column, columnMeta])

    return onFilterRender()
  }
}
