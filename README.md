# ProjectHub - Project Selling Website

A modern, full-stack web application for selling digital projects, built with Next.js 14, TypeScript, and SQLite.

## ✨ Features

### Public Pages
- **Home Page**: Hero section with animated stats, category filters, and project grid
- **Project Details**: Full project information with purchase card and related projects
- **About Us**: Team, values, and company statistics
- **Contact Us**: Contact form with validation and submission

### Admin Panel
- **Dashboard**: Statistics overview, recent projects, and unread messages
- **Project Management**: Add, edit, and delete projects with full CRUD operations
- **Messages**: View, read, and manage contact form submissions
- **Site Settings**: Customize hero text, about content, and contact information

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

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

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

- **Project**: Store project listings with title, description, price, category, etc.
- **ContactMessage**: Store contact form submissions
- **SiteSetting**: Store customizable site content (key-value pairs)
- **Admin**: Store admin user credentials

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
