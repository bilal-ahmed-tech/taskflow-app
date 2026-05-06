# 📋 TaskFlow

A modern project and task management application built with Next.js, TypeScript, and Prisma, featuring intelligent task organization, real-time collaboration, secure authentication, and persistent data storage.

🔗 **Live Demo:** [taskflow-app-gray.vercel.app](https://taskflow-app-gray.vercel.app/)

---

## ✨ Features

### 📁 Project Management

- Create multiple projects for better organization
- Add descriptions to projects
- View all projects in a clean dashboard
- Delete projects with confirmation
- Project-level task grouping
- Real-time project listing with status
- Empty state handling for new users

### 📝 Intelligent Task Management

- Create tasks within projects with title and description
- Set task priority levels (Low, Medium, High)
- Define task status (TODO, In Progress, Done)
- Assign due dates to tasks with date picker
- Edit existing tasks with full capability
- Delete tasks with confirmation and undo option
- Task sorting by priority and due date
- Mark tasks as complete with one click
- Overdue task highlighting

### 🔍 Advanced Search & Filtering

- Full-text search across all tasks by title and description
- Filter tasks by project
- Filter tasks by status (TODO, In Progress, Done)
- Filter tasks by priority level
- Real-time search results with instant updates
- Combine multiple filters for advanced queries
- Clear all filters with one click
- Visual indicators for active filters

### 📊 Dashboard & Analytics

- Task statistics overview on dashboard
- Task count indicators (total, todo, in-progress, done)
- Progress tracking visualization
- Status distribution charts
- Priority distribution display
- Project completion percentage
- Quick action buttons for common tasks
- Summary cards for key metrics

### ✅ Task Status Management

- TODO status for new tasks
- IN_PROGRESS for tasks being worked on
- DONE status for completed tasks
- Visual status badges with color coding
- Bulk status updates
- Status history tracking
- Quick status toggle buttons

### 🎯 Priority Levels

- **Low** - Not urgent, nice to have
- **Medium** - Standard priority
- **High** - Important, should be done soon
- Color-coded priority badges
- Priority-based task sorting
- Visual priority indicators in list view

### ⏰ Due Date Management

- Set and edit due dates for tasks
- Calendar date picker interface
- Due date reminders
- Overdue task highlighting in red
- Upcoming task alerts
- Due date sorting
- Day counter showing time until due date

### 👤 User Authentication

- Secure user registration and login
- Email-based account system
- Password encryption with bcryptjs
- Session management with NextAuth
- Protected routes for authenticated users
- User profile management
- Persistent user sessions

### 💾 Data Persistence

- Automatic data save using Prisma ORM
- PostgreSQL database with Neon serverless
- Data persists across browser sessions
- No data loss on refresh
- Real-time database synchronization
- Efficient database queries

### 🌐 Navigation & Routing

- Home page (/) - dashboard with projects
- Projects page (/projects) - all projects listing
- Project detail page (/projects/[id]) - project tasks
- Tasks page (/tasks) - all user tasks
- Settings page (/settings) - user preferences
- Auth pages (/login, /register) - authentication
- Protected routes requiring login
- 404 page for invalid routes

### 📱 Responsive Design

- Mobile-first approach with Tailwind CSS v4
- 1-column layout on mobile devices
- 2-column grid on tablets
- 3-column grid on desktop
- Responsive navigation with hamburger menu
- Touch-friendly button sizing
- Responsive font sizing
- Flexible card and list layouts
- Optimized spacing for all screen sizes

### ⚡ Performance & Optimization

- Server-side rendering with Next.js
- Optimized database queries with Prisma
- Lazy loading of components
- Efficient state management
- Minimized re-renders
- Image optimization
- Code splitting for better performance
- Caching strategies

### 🛡️ Error Handling & Validation

- Form validation on task creation/editing
- Required field validation
- Error messages for invalid inputs
- Graceful error handling for database operations
- Try-catch blocks on async operations
- User-friendly error notifications
- Validation for date inputs

### ♿ Accessibility

- Semantic HTML elements (main, nav, button, section)
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly task descriptions
- Focus management in forms
- Color contrast compliance
- Accessible form inputs and labels

---

## 🛠️ Built With

- **Next.js 16.2.4** — React framework with App Router and SSR
- **React 19.2.4** — UI library with hooks
- **TypeScript 5** — Type-safe development
- **Tailwind CSS 4** — Utility-first CSS for responsive design
- **Prisma 7.8.0** — Modern ORM for database management
- **PostgreSQL** — Relational database (via Neon serverless)
- **NextAuth.js 5** — Authentication solution
- **bcryptjs** — Password hashing and encryption
- **Lucide React** — Icon library
- **Sonner** — Toast notifications

---

## 📁 Project Structure

<details>
<summary><strong>Click to expand</strong></summary>

```plaintext
task-manager/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (app)/
│   │   ├── page.tsx (Dashboard)
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── tasks/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── projects/
│   │   └── tasks/
│   ├── layout.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectList.tsx
│   │   ├── ProjectForm.tsx
│   │   └── ProjectDetail.tsx
│   ├── tasks/
│   │   ├── TaskCard.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskFilter.tsx
│   │   ├── TaskSearch.tsx
│   │   └── TaskStats.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Loading.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── Badge.tsx
│   └── auth/
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
├── lib/
│   ├── actions.ts
│   ├── prisma.ts (Prisma Client)
│   ├── auth.ts
│   ├── validation.ts
│   ├── types.ts
│   └── constants.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   ├── images/
│   └── icons/
├── auth.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

</details>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- PostgreSQL database or Neon account
- NextAuth configuration

### Installation

```bash
# Clone the repository
git clone https://github.com/bilal-ahmed-tech/taskflow-app

# Navigate to the project folder
cd taskflow-app

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env.local

# Set up the database
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for production

```bash
npm run build
npm start
```

---

## 🔧 Available Scripts

- `npm run dev` — Start Next.js development server with hot reload
- `npm run build` — Build production bundle with optimization
- `npm start` — Start production server
- `npm run lint` — Run ESLint for code quality
- `npx prisma migrate dev` — Create and run database migrations
- `npx prisma studio` — Open Prisma Studio for database visualization
- `npm run postinstall` — Generate Prisma client

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root with:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow

# NextAuth
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# OAuth (Optional)
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
```

---

## 📸 Screenshots

### Dashboard — Overview & Quick Stats

See all your projects and recent tasks at a glance
<img src="screenshots/Dashboard.png" width="100%" alt="Dashboard with projects overview" />
<br/><br/>

### Projects Page — Manage All Projects

Create, view, and manage all your projects in one place
<img src="screenshots/Projects.png" width="100%" alt="Projects listing page" />
<br/><br/>

### Task Management — View and Update 

View all tasks, update status, and track progress
<img src="screenshots/Tasks.png" width="100%" alt="Task creation and management" />
<br/><br/>

### Task Form — Create New Task

Add new tasks with priority, due date, and description
<img src="screenshots/TaskForm.png" width="100%" alt="Task detail view" />

---

## 🧠 Key Concepts & Architecture

- **Type-Safe Database Access** - Prisma provides strongly-typed database queries
- **Server-Side Rendering** - Next.js App Router for optimal performance
- **Secure Authentication** - NextAuth.js with session management
- **Responsive UI** - Tailwind CSS for consistent design across devices
- **RESTful API Routes** - Next.js API routes for backend operations
- **Real-time Updates** - React hooks for instant UI synchronization
- **Error Boundaries** - Graceful error handling throughout the app
- **Database Migrations** - Prisma migrations for schema versioning

---

## 📝 License

MIT License

_Built as a full-featured project management application showcasing Next.js, TypeScript, Prisma, and NextAuth.js._
