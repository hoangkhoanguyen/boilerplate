Next Boilerplate

**Đây là cấu trúc thư mục được đề xuất dành cho ứng dụng fullstack (cả admin và website) để đảm bảo dự án có khả năng mở rộng, dễ bảo trì và tuân theo các thông lệ tốt nhất.**

```
/my-next-app
├── .env.local                  # Biến môi trường (không commit lên git)
├── .eslintrc.json              # Cấu hình ESLint
├── .gitignore                  # Các file và thư mục bỏ qua bởi Git
├── next.config.mjs             # Cấu hình Next.js
├── package.json                # Quản lý dependencies và scripts
├── postcss.config.js           # Cấu hình PostCSS (thường dùng với Tailwind CSS)
├── tailwind.config.ts          # Cấu hình Tailwind CSS
├── tsconfig.json               # Cấu hình TypeScript
│
└── src/                        # Thư mục chính chứa mã nguồn của ứng dụng
    │
    ├── actions/                # Chứa các Server Actions, được phân tách theo vai trò
    │   ├── admin/              # Actions chỉ được gọi từ giao diện Admin
    │   └── web/                # Actions được gọi từ giao diện Website người dùng
    │
    ├── app/                    # App Router: Chứa các route, page, layout, api
    │   ├── (admin)/              # GROUP 1: Mọi thứ dành cho Admin
    │   │   └── admin/            # Tạo ra URL segment /admin
    │   │       ├── (auth)/       # Group cho các trang xác thực của Admin
    │   │       │   └── ...
    │   │       └── (dashboard)/  # Group cho các trang cần bảo vệ của Admin
    │   │           └── ...
    │   │
    │   ├── (web)/                # GROUP 2: Mọi thứ dành cho Website người dùng
    │   │   └── ...
    │   │
    │   ├── api/                  # API routes có thể dùng chung
    │   └── layout.tsx            # Layout gốc của toàn bộ ứng dụng (rất tối giản)
    │
    ├── components/             # Chứa các React components tái sử dụng
    │   ├── admin/              # Components dành riêng cho trang Admin
    │   │   ├── ui/             # Bộ UI kit dành riêng cho Admin
    │   │   ├── shared/         # Components dùng chung trong các trang Admin
    │   │   └── features/       # Components tính năng của Admin, Context riêng của feature
    │   └── web/                # Components dành riêng cho Website người dùng
    │       ├── ui/             # Bộ UI kit dành riêng cho Website
    │       ├── shared/         # Components dùng chung trong các trang Website
    │       └── features/       # Components tính năng của Website, Context riêng của feature
    │
    ├── lib/                    # Configs cho thư viện bên thứ 3 và các hàm tiện ích
    │   ├── api/                # Module chứa các helpers cho API
    │   │   ├── middleware.ts   # Chứa các wrapper/middleware (withError, withAuth,...)
    │   │   ├── response.ts     # Chứa các hàm định dạng response (success, error,...)
    │   │   ├── validation.ts   # Chứa các hàm validate dùng Zod cho API
    │   │   └── index.ts        # Re-export các helpers để import gọn hơn
    │   ├── auth.ts             # Chứa logic xác thực (hash password, token,...)
    │   ├── axios.ts            # Cấu hình instance của Axios
    │   ├── cookies.ts          # Module quản lý cookie (set, get, clear)
    │   ├── date.ts             # Ví dụ về module xử lý ngày giờ
    │   ├── drizzle.ts          # Cấu hình kết nối Drizzle ORM
    │   ├── env.ts              # Xác thực và cung cấp biến môi trường an toàn (type-safe)
    │   └── utils.ts            # Các hàm tiện ích chung, nhỏ lẻ (cn, formatCurrency,...)
    │
    ├── constants/              # Chứa các hằng số công khai, không nhạy cảm của ứng dụng
    │   ├── admin/              # Hằng số chỉ dành cho Admin
    │   ├── web/                # Hằng số chỉ dành cho Website
    │   ├── index.ts
    │   └── site.ts             # Chứa các hằng số dùng chung
    │
    ├── providers/              # Chứa các providers DÙNG CHUNG cho cả Admin và Web
    │   ├── QueryClientProvider.tsx # Wrapper cho TanStack Query
    │   └── ThemeProvider.tsx       # Provider cho việc thay đổi theme (dark/light mode)
    │
    ├── hooks/                  # Chứa các custom hooks
    │   ├── common/             # Dành cho các hook dùng chung
    │   ├── admin/              # Hooks chỉ dành cho Admin
    │   │   ├── api/            # Lớp gọi API dành riêng cho Admin
    │   │   ├── ui/             # Các tiện ích UI dành riêng cho Admin
    │   │   └── features/       # Hook nghiệp vụ đặc thù của Admin
    │   └── web/                # Hooks chỉ dành cho Website
    │       ├── api/            # Lớp gọi API dành riêng cho Web
    │       ├── ui/             # Các tiện ích UI dành riêng cho Web
    │       └── features/       # Hook nghiệp vụ đặc thù của Web
    │
    ├── db/                     # Chứa schema và các file liên quan đến database
    │   └── ...
    │
    ├── services/               # Lớp truy cập dữ liệu (Data Access Layer)
    │   └── ...
    │
    ├── stores/                 # Chứa các store quản lý state global (ví dụ: Zustand)
    │   └── ...
    │
    └── types/                  # Chứa các định nghĩa type, interface
        └── ...

```
