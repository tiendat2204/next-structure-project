export const RECORD_PER_PAGE = [5, 10, 20, 25]

export type DataTableConfig = typeof dataTableConfig

export const dataTableConfig = {
  textOperators: [
    { label: 'Chứa', value: 'iLike' as const },
    { label: 'Không chứa', value: 'notILike' as const },
    { label: 'Bằng', value: 'eq' as const },
    { label: 'Không bằng', value: 'ne' as const },
    { label: 'Để trống', value: 'isEmpty' as const },
    { label: 'Không để trống', value: 'isNotEmpty' as const }
  ],
  numericOperators: [
    { label: 'Bằng', value: 'eq' as const },
    { label: 'Không bằng', value: 'ne' as const },
    { label: 'Nhỏ hơn', value: 'lt' as const },
    { label: 'Nhỏ hơn hoặc bằng', value: 'lte' as const },
    { label: 'Lớn hơn', value: 'gt' as const },
    { label: 'Lớn hơn hoặc bằng', value: 'gte' as const },
    { label: 'Trong khoảng', value: 'isBetween' as const },
    { label: 'Để trống', value: 'isEmpty' as const },
    { label: 'Không để trống', value: 'isNotEmpty' as const }
  ],
  dateOperators: [
    { label: 'Bằng', value: 'eq' as const },
    { label: 'Không bằng', value: 'ne' as const },
    { label: 'Trước ngày', value: 'lt' as const },
    { label: 'Sau ngày', value: 'gt' as const },
    { label: 'Trước hoặc bằng', value: 'lte' as const },
    { label: 'Sau hoặc bằng', value: 'gte' as const },
    { label: 'Trong khoảng', value: 'isBetween' as const },
    { label: 'So với hôm nay', value: 'isRelativeToToday' as const },
    { label: 'Để trống', value: 'isEmpty' as const },
    { label: 'Không để trống', value: 'isNotEmpty' as const }
  ],
  selectOperators: [
    { label: 'Bằng', value: 'eq' as const },
    { label: 'Không bằng', value: 'ne' as const },
    { label: 'Để trống', value: 'isEmpty' as const },
    { label: 'Không để trống', value: 'isNotEmpty' as const }
  ],
  multiSelectOperators: [
    { label: 'Chứa bất kỳ', value: 'inArray' as const },
    { label: 'Không chứa', value: 'notInArray' as const },
    { label: 'Để trống', value: 'isEmpty' as const },
    { label: 'Không để trống', value: 'isNotEmpty' as const }
  ],
  booleanOperators: [
    { label: 'Bằng', value: 'eq' as const },
    { label: 'Không bằng', value: 'ne' as const }
  ],
  sortOrders: [
    { label: 'Tăng dần', value: 'asc' as const },
    { label: 'Giảm dần', value: 'desc' as const }
  ],
  filterVariants: [
    'text',
    'number',
    'range',
    'date',
    'dateRange',
    'boolean',
    'select',
    'multiSelect'
  ] as const,
  operators: [
    'iLike',
    'notILike',
    'eq',
    'ne',
    'inArray',
    'notInArray',
    'isEmpty',
    'isNotEmpty',
    'lt',
    'lte',
    'gt',
    'gte',
    'isBetween',
    'isRelativeToToday'
  ] as const,
  joinOperators: ['and', 'or'] as const
}

export const STALE_TIME = 5 * 60 * 1000 // 5 minutes

export const CACHE_TIME = 10 * 60 * 1000 // 10 minutes

export const PAGE_SIZE_NAME = 'pageSize'

export const PAGE_INDEX_NAME = 'pageIndex'

export const FACEHASH_COLOR_CLASSES = [
  'bg-sky-500 dark:bg-sky-600',
  'bg-emerald-500 dark:bg-emerald-600',
  'bg-orange-500 dark:bg-orange-600',
  'bg-rose-500 dark:bg-rose-600',
  'bg-amber-500 dark:bg-amber-600',
  'bg-cyan-500 dark:bg-cyan-600',
  'bg-lime-500 dark:bg-lime-600',
  'bg-teal-500 dark:bg-teal-600'
]

export const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif'
])

export const ALLOWED_VIDEO_MIME_TYPES = new Set([
  'video/mp4',
  'video/webm',
  'video/ogg'
])

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export const MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50 MB
