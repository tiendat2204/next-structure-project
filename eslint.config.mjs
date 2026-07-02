import neostandard, { plugins } from 'neostandard'
import tseslint from 'typescript-eslint'

export default [
  // Cấu hình TypeScript ESLint recommended - bao gồm các rules cơ bản cho TypeScript
  ...tseslint.configs.recommended,

  // Cấu hình neostandard với TypeScript support và tự động ignore files từ .gitignore
  ...neostandard({
    ts: true, // Bật hỗ trợ TypeScript
    ignores: [
      // Build outputs
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',

      // Dependencies
      'node_modules/**',

      // Config files
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      'next-env.d.ts',

      // Cache và temp files
      '.turbo/**',
      '.vercel/**',
      '.cache/**',

      // Public assets (nếu không muốn lint)
      'public/**',

      // Generated files
      'src/components/ui/**', // Shadcn UI components

      // Copied components (different code style)
      'src/components/data-table/**',
      'src/components/sidebar/**',

      // Environment files
      '.env*',

      // Git
      '.git/**'
    ] // Tự động ignore các files/folders trong .gitignore
  }),

  {
    plugins: {
      // Plugin stylistic cho các rules về code formatting
      '@stylistic': plugins['@stylistic']
    },
    rules: {
      // Không cho phép dấu phẩy ở cuối (trailing comma)
      // Ví dụ: { a: 1, b: 2 } ✓ | { a: 1, b: 2, } ✗
      'comma-dangle': ['error', 'never'],

      // Tắt rule no-unused-vars của ESLint vì dùng version TypeScript bên dưới
      'no-unused-vars': 'off',

      // Cảnh báo khi có biến được khai báo nhưng không sử dụng (TypeScript version)
      // Ví dụ: const unused = 123 ⚠️
      '@typescript-eslint/no-unused-vars': 'warn',

      // Bắt buộc có khoảng trắng sau dấu ":" trong type annotation
      // Ví dụ: const name: string ✓ | const name:string ✗
      '@stylistic/type-annotation-spacing': 'error',

      // Bắt buộc có khoảng trắng trong object curly braces
      // Ví dụ: { a: 1 } ✓ | {a: 1} ✗
      '@stylistic/object-curly-spacing': ['error', 'always'],

      // Quy định cách viết delimiter trong type/interface
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none', // Không dùng dấu ; hoặc , ở cuối mỗi property (nhiều dòng)
            requireLast: true  // Ví dụ: interface User { name: string \n age: number } ✓
          },
          singleline: {
            delimiter: 'comma', // Dùng dấu phẩy khi viết 1 dòng
            requireLast: false  // Ví dụ: interface User { name: string, age: number } ✓
          }
        }
      ],

      // Bắt buộc có dòng trống trước các declarations quan trọng
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*', // Bất kỳ statement nào
          next: ['enum', 'interface', 'type', 'function', 'export'] // Phải có dòng trống trước enum, interface, type, function, export
        },
        {
          blankLine: 'always',
          prev: 'import', // Sau các import statements
          next: 'const'   // Phải có dòng trống trước khai báo const
        }
        // Ví dụ:
        // import React from 'react'
        // [dòng trống bắt buộc]
        // const App = () => { ... }
      ]
    }
  }
]
