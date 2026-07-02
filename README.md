# Next.js Structure Project

Template Next.js để clone về dùng mỗi khi cần. Bao gồm UI components, data-table, sidebar layout sẵn sàng sử dụng.

## Tech Stack

| Package | Version |
|---|---|
| Next.js | 16.2.10 |
| React | 19.2.7 |
| TypeScript | 6.0.3 |
| Tailwind CSS | 4.3.2 |
| ESLint | 9.39.4 (neostandard + @stylistic) |

### Core Libraries

- **UI**: Radix UI, class-variance-authority, clsx, tailwind-merge, lucide-react
- **Data Table**: @tanstack/react-table, nuqs, zod, nanoid
- **State**: zustand, immer
- **Animation**: motion
- **Drag & Drop**: @dnd-kit
- **Date**: date-fns, react-day-picker
- **Command Palette**: cmdk

## Cài đặt

```sh
pnpm install
```

## Scripts

```sh
pnpm dev          # Dev server với Turbopack
pnpm build        # ESLint + production build
pnpm start        # Chạy production server
pnpm lint         # ESLint check
```

## Cấu trúc thư mục

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/hello/route.ts
├── components/
│   ├── ui/                 # Shadcn UI components (button, input, table, select...)
│   ├── data-table/         # DataTable components (filter, sort, pagination, toolbar)
│   └── sidebar/            # Sidebar layout (provider, toggle, admin-sidebar, main-sidebar)
├── hooks/                  # Custom hooks (use-data-table, use-sidebar, use-mobile...)
├── lib/                    # Utilities (cn, parsers, data-table helpers, format...)
├── types/                  # TypeScript types (data-table)
├── config/                 # App config (data-table operators, variants)
└── constants/              # Constants (RECORD_PER_PAGE, dataTableConfig)
```

## Hướng dẫn sử dụng

### DataTable

```tsx
import { DataTable } from '@/components/data-table/data-table'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { useDataTable } from '@/hooks/use-data-table'

// Define columns với meta cho filter/sort
const columns = [
  {
    accessorKey: 'name',
    header: 'Tên',
    meta: { label: 'Tên', variant: 'text' }
  },
  // ...
]

function MyPage() {
  const { table } = useDataTable({
    columns,
    pageCount: 10,
    initialState: { sorting: [{ id: 'name', desc: false }] }
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  )
}
```

### Sidebar Layout

```tsx
import { SidebarProvider } from '@/components/sidebar/sidebar-provider'
import { AdminSidebar } from '@/components/sidebar/admin-sidebar'
import { SidebarInset } from '@/components/sidebar/sidebar-inset'

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
```

## Notes

- ESLint config: `eslint.config.mjs` (flat config với neostandard + @stylistic)
- PostCSS config: `postcss.config.mjs` (Tailwind CSS v4)
- Proxy: Next.js 16 dùng `proxy.ts` thay vì `middleware.ts`
