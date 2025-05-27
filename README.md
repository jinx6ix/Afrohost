# Multi-Site Dashboard Frontend

A modern React/Next.js frontend application for the Multi-Site Dashboard system, providing a comprehensive admin interface for managing multiple websites.

## 🚀 Features

- **Modern UI**: Built with Next.js 14, React 18, and Tailwind CSS
- **Authentication**: JWT-based authentication with role-based access control
- **Responsive Design**: Mobile-first responsive design
- **Real-time Updates**: Live data updates and notifications
- **Type Safety**: Full TypeScript implementation
- **Component Library**: Custom UI components built on Radix UI
- **State Management**: Context API for global state management
- **API Integration**: Axios-based API client with interceptors

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd multisite-dashboard-frontend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Multi-Site Dashboard` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` |

## 📁 Project Structure

\`\`\`
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── login/             # Authentication pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── AdminSidebar.tsx  # Admin navigation
│   └── AdminHeader.tsx   # Admin header
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── hooks/                # Custom hooks
│   └── useToast.ts       # Toast notifications
├── lib/                  # Utility libraries
│   ├── api.ts            # API client
│   ├── auth.ts           # Auth utilities
│   └── utils.ts          # General utilities
└── types/                # TypeScript type definitions
\`\`\`

## 🔐 Authentication

The application uses JWT-based authentication with the following features:

- **Login/Logout**: Secure authentication flow
- **Token Management**: Automatic token refresh and storage
- **Role-based Access**: Different permissions for admin, moderator, and user roles
- **Protected Routes**: Route-level protection based on user permissions

### User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access to all features |
| **Moderator** | Manage tasks, pages, view analytics |
| **User** | Read-only access, view analytics |

## 📱 Pages & Features

### Dashboard (`/admin`)
- Overview statistics and metrics
- Recent activity feed
- Quick action buttons
- Real-time data updates

### User Management (`/admin/users`)
- User CRUD operations
- Role assignment
- User search and filtering
- Bulk operations

### Task Management (`/admin/tasks`)
- Task creation and assignment
- Status tracking and updates
- Priority management
- Due date tracking
- Tag-based organization

### Page Management (`/admin/pages`)
- Content creation and editing
- SEO meta tag management
- Publishing workflow
- Site-specific organization

### Analytics (`/admin/analytics`)
- Dashboard metrics
- Site-specific analytics
- Performance charts
- User activity tracking

## 🎨 UI Components

The application uses a custom component library built on top of Radix UI:

- **Button**: Various button styles and sizes
- **Input**: Form input components
- **Dialog**: Modal dialogs
- **Select**: Dropdown selectors
- **Toast**: Notification system
- **Card**: Content containers
- **Badge**: Status indicators
- **Avatar**: User profile images

## 🔄 API Integration

The frontend communicates with the backend through a centralized API client:

\`\`\`typescript
// Example API usage
import { usersAPI } from '@/lib/api'

const users = await usersAPI.getUsers({
  page: 1,
  limit: 10,
  search: 'john'
})
\`\`\`

### API Features

- **Automatic Authentication**: JWT tokens automatically attached
- **Error Handling**: Global error handling and user feedback
- **Request/Response Interceptors**: Automatic token refresh
- **Type Safety**: Full TypeScript support

## 🚀 Deployment

### Using Docker

1. **Build the Docker image**
   \`\`\`bash
   docker build -t multisite-frontend .
   \`\`\`

2. **Run the container**
   \`\`\`bash
   docker run -p 3000:3000 multisite-frontend
   \`\`\`

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start the production server**
   \`\`\`bash
   npm start
   \`\`\`

### Vercel Deployment

The application is optimized for Vercel deployment:

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety and better developer experience
- **Prettier**: Code formatting (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
