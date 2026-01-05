# ProjectHub - Project Selling Website

A modern, full-stack web application for selling digital projects, built with Next.js 14, TypeScript, and SQLite.

## ✨ Features

### Public Pages
- **Home Page**: Hero section with animated stats, category filters, and project grid
- **Project Details**: Full project information with purchase card and related projects
- **About Us**: Team, values, and company statistics
- **Contact Us**: Contact form with validation and submission
- **Custom Project Request**: Comprehensive form for requesting custom development projects with email notifications

### Admin & User Panel
- **Multi-user Support**: Both Admin and regular Users can have access
- **Personal Dashboard**: Users see only their own projects, earnings, and stats
- **Admin Overview**: Single admin oversees all users, projects, and global earnings
- **Project Management**: Add, edit, and delete projects with ownership checks
- **Messages**: Admin can view and manage contact form submissions
- **Site Settings**: Admin can customize hero text, about content, and contact info

### Design
- 🌙 Premium dark theme with purple/blue gradients
- ✨ Glassmorphism effects and smooth animations
- 📱 Fully responsive design
- 🎨 Modern typography with Inter font

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: CSS Modules with custom design system
- **Authentication**: Cookie-based session management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/database?sslmode=disable"
   
   # Email Configuration (Mailtrap for testing)
   SMTP_HOST=sandbox.smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your-mailtrap-username
   SMTP_PASS=your-mailtrap-password
   ADMIN_EMAIL=admin@example.com
   ```

   **To set up Mailtrap (for email testing)**:
   - Sign up at [mailtrap.io](https://mailtrap.io)
   - Create an inbox
   - Copy SMTP credentials from inbox settings
   - Update `SMTP_USER` and `SMTP_PASS` in `.env`

3. **Set up the database**:
   ```bash
   npx prisma db push
   ```

4. **Seed with sample data**:
   ```bash

### Email Features
- Contact form submissions send email notifications to admin
- Custom project requests send detailed email with all requirements
- Emails are caught in Mailtrap during development (no real emails sent)
- For production, replace Mailtrap settings with real SMTP (Gmail, SendGrid, etc.)
   npm run db:seed
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

6. **Open in browser**:
   - Public site: http://localhost:3000
   - Custom Project Request: http://localhost:3000/custom-project
   - Admin/User Dashboard: http://localhost:3000/admin

### Access Control
- **Admin**: Full access to all data and site settings.
- **Users**: Can upload projects and track their own earnings.

### Default Credentials
- **Admin**: `admin` / `admin123`
- **Sample User**: `user1` / `admin123`

## 📁 Project Structure

```
project/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seedcustom-project/ # Custom project request page
│   │   ├── projects/[id]/ # Project detail page
│   │   ├── admin/         # Admin panel pages
│   │   └── api/           # API routes
│   ├── components/        # Reusable components
│   ├── lib/               # Utilities and database client
│   └── middleware.ts      # Route protection & auth
├── .env                   # Environment variables
│   │   ├── contact/       # Contact page
│   │   ├── projects/[id]/ # Project detail page
│   │   ├── admin/         # Admin panel pages
│   │   └── api/           # API routes
│   ├── components/        # Reusable components
│   └── lib/               # Utilities and database client
├── package.json
└── README.md
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

## 📊 Database Schema

- **User**: System users with either ADMIN or USER roles
- Middleware protects admin routes from unauthorized access
- Automatic redirect to login for unauthenticated users
- Email credentials stored securely in environment variablesner)
- **Sale**: Records of project purchases for earnings tracking
- **ContactMessage**: Contact form submissions
- **SiteSetting**: Customizable site content settings

## 🔒 Security Notes

- Admin authentication uses bcrypt for password hashing
- Session management via HTTP-only cookies
- API routes should be protected with middleware for production

## 🎨 Customization

### Adding New Categories
Edit the categories array in:
- `src/app/admin/projects/new/page.tsx`
- `src/app/admin/projects/[id]/page.tsx`

### Changing Colors
Modify CSS custom properties in `src/app/globals.css`:
```css
:root {
  --color-accent-primary: #8b5cf6;
  --color-accent-secondary: #6366f1;
  /* ... */
}
```

## � Deploying to Vercel

1. **Set up a PostgreSQL database**:
   - Create a PostgreSQL database (e.g., [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Neon](https://neon.tech), or [Supabase](https://supabase.com))
   - Get the connection string

2. **Configure environment variables in Vercel**:
   - Go to your Vercel project settings
   - Add all environment variables from your `.env` file
   - Update `DATABASE_URL` with your PostgreSQL connection string

3. **Deploy and set up database**:
   - Push your code to GitHub/GitLab
   - Connect the repository to Vercel
   - After first deployment, run database setup:
     ```bash
     # From your local terminal with Vercel CLI
     vercel env pull  # Pull env variables
     npx prisma db push  # Push schema to production DB
     npm run db:seed  # Seed with sample data (optional)
     ```
   - Alternatively, add a build script in `package.json` to auto-run migrations

4. **Important Notes**:
   - SQLite is not supported on Vercel (use PostgreSQL)
   - Database must be set up before the app fully functions
   - Email credentials (SMTP) should be configured for contact forms to work

## �📝 License

This project is for educational/demonstration purposes.

---

