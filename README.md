# ProjectHub - Project Selling Website

A modern, full-stack web application for selling digital projects, built with Next.js 14, TypeScript, and SQLite.

## ✨ Features

### Public Pages
- **Home Page**: Hero section with animated stats, category filters, and project grid
- **Project Details**: Full project information with purchase card and related projects
- **About Us**: Team, values, and company statistics
- **Contact Us**: Contact form with validation and submission

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

2. **Set up the database**:
   ```bash
   npx prisma db push
   ```

3. **Seed with sample data**:
   ```bash
   npm run db:seed
   ```

```
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   - Public site: http://localhost:3000
   - Admin/User Dashboard: http://localhost:3000/admin (Hidden from public header)

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
│   └── seed.ts            # Sample data seeder
├── src/
│   ├── app/
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
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
- **Project**: Project listings linked to a specific `User` (owner)
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

## 📝 License

This project is for educational/demonstration purposes.

---

Built with ❤️ using Next.js
