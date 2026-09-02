# 🎓 Class Portfolio & Digital Diary

<div align="center">

### 🌐 A Modern Digital Home for Class Memories, Stories & Student Portfolios

**Class Portfolio & Digital Diary** is an interactive web application designed to transform a class archive into a modern digital experience. It combines student profiles, memories, projects, a chronological timeline, class stories, and an interactive guestbook in one responsive platform.

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-Routing-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-Icons-F56565?style=for-the-badge)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Why This Project](#-why-this-project)
- [Core Features](#-core-features)
- [Interactive Experience](#-interactive-experience)
- [Tech Stack](#-tech-stack)
- [Advantages](#-advantages)
- [Limitations](#-limitations)
- [System Architecture](#-system-architecture)
- [Database Design](#-database-design)
- [Storage Design](#-storage-design)
- [Project Structure](#-project-structure)
- [Required Tools](#-required-tools)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Supabase Configuration](#-supabase-configuration)
- [Database SQL](#-database-sql)
- [Realtime Configuration](#-realtime-configuration)
- [Storage Configuration](#-storage-configuration)
- [Running the Project](#-running-the-project)
- [Production Build](#-production-build)
- [Deployment to Vercel](#-deployment-to-vercel)
- [Security](#-security)
- [Performance](#-performance)
- [Development Workflow](#-development-workflow)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧭 Overview

This project is a **class digital archive and portfolio platform** built for documenting an entire class journey.

Instead of keeping class photos, projects, stories, and memories scattered across social media, cloud folders, and chat applications, this application organizes them into a single interactive website.

### Main concept

```text
                    🎓 CLASS DIGITAL HOME
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
     👥 Members          📸 Gallery          ⏳ Timeline
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
     🚀 Projects        📖 Stories          💌 Messages
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                       🔐 Admin Panel
                            │
                     ⚡ Supabase Backend
```

The interface focuses on **visual storytelling, smooth transitions, responsive layouts, realtime updates, and maintainable architecture**.

---

# ✨ Core Features

## 👥 1. Members — Meet Our Family

A dedicated directory for every member of the class.

### Features

- Student profile cards
- Formal and informal photos
- Interactive 3D flip card
- Name and class information
- Short biography
- Social media links
- Responsive grid
- Hover and motion interactions
- Admin CRUD management

### Example interaction

```text
              FRONT
        ┌─────────────────┐
        │                 │
        │     PHOTO       │
        │                 │
        │   Student Name  │
        └─────────────────┘
                 ↓
            Hover / Tap
                 ↓
              BACK
        ┌─────────────────┐
        │ About Student   │
        │                 │
        │ Instagram       │
        │ GitHub          │
        │ LinkedIn        │
        └─────────────────┘
```

---

## 📸 2. Gallery — Class Memories

A visual archive for class photos and videos.

### Features

- Masonry-style image layout
- High-resolution image support
- Video support
- Responsive media cards
- Lightbox / media preview
- Lazy loading
- Metadata
- Realtime content updates
- Supabase Storage integration

Recommended media categories:

```text
📚 Academic
🎉 Events
🏆 Achievements
🚌 Trips
🎓 Graduation
😂 Random Moments
❤️ Memories
```

---

## ⏳ 3. Timeline Book — Our Journey

A chronological representation of important class events.

### Example

```text
2023
 │
 ├── 🎓 First Meeting
 │
 ├── 📚 First Semester
 │
 └── 🎉 First Class Event
       │
2024   │
 │     ├── 🏆 Competition
 │     ├── 🚌 Class Trip
 │     └── 📸 Photo Session
       │
2025   │
       ├── 🚀 Final Project
       └── 🎓 Graduation
```

The timeline can use a book-style interface with:

- Page transitions
- Scroll-based animations
- Event cards
- Photos
- Descriptions
- Dates
- Realtime updates

---

## 🚀 4. Projects — Class Portfolio

A portfolio section for:

- Final assignments
- Group projects
- Research
- Design projects
- Programming projects
- Engineering projects
- Creative work

Each project can contain:

```text
Title
Description
Thumbnail
Gallery
Technology
Team Members
GitHub URL
Demo URL
Created Date
```

---

## 📖 5. Stories — Class Diary

A digital diary for long-form class stories.

### Features

- Chapter-based stories
- Page-turning UI
- Up to 10,000 characters per chapter
- Author information
- Created date
- Cover image
- Realtime updates
- Admin CRUD

Example:

```text
┌─────────────────────────────────────────┐
│              CLASS DIARY                 │
│                                         │
│              Chapter 01                 │
│                                         │
│        "The Beginning of Everything"    │
│                                         │
│  We didn't know at the time that...     │
│                                         │
│                     ← 1 / 10 →          │
└─────────────────────────────────────────┘
```

---

## 💌 6. Messages — Interactive Guestbook

A realtime message wall where visitors can leave messages.

### Realtime flow

```text
Visitor A
   │
   │ Submit message
   ↓
Supabase PostgreSQL
   │
   │ Realtime event
   ↓
Supabase Realtime
   │
   ├───────────────┐
   ↓               ↓
Browser A       Browser B
   │               │
   └───────┬───────┘
           ↓
      Message appears
      without refresh
```

Potential features:

- Guest name
- Message
- Timestamp
- Optional avatar
- Realtime updates
- Moderation
- Admin delete
- Character limit
- Anti-spam controls

---

# 🔐 7. Admin Panel

The admin dashboard manages the application's content.

### CRUD modules

| Module | Create | Read | Update | Delete |
|---|:---:|:---:|:---:|:---:|
| Classes | ✅ | ✅ | ✅ | ✅ |
| Members | ✅ | ✅ | ✅ | ✅ |
| Gallery | ✅ | ✅ | ✅ | ✅ |
| Timeline | ✅ | ✅ | ✅ | ✅ |
| Projects | ✅ | ✅ | ✅ | ✅ |
| Stories | ✅ | ✅ | ✅ | ✅ |
| Messages | ❌ | ✅ | ❌ | ✅ |

### Admin capabilities

- Dashboard statistics
- Member management
- Media upload
- Project management
- Timeline management
- Story management
- Message moderation
- Delete media
- Update content
- Manage published content

---

# 🎬 Interactive Experience

The project is designed to feel more like a **digital memory book** than a conventional CRUD website.

Recommended animation principles:

```text
Page Load
   ↓
Fade + Slide
   ↓
Content Reveal
   ↓
Hover Interaction
   ↓
Scroll Animation
   ↓
Page Transition
   ↓
Realtime Content Update
```

### Animation library

**Framer Motion** is used for:

- Entrance animations
- Exit animations
- Page transitions
- Hover effects
- Card transforms
- Modal transitions
- Scroll animations
- Staggered lists
- Layout animations

Animation should remain subtle enough that usability and performance are not sacrificed.

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | UI component architecture |
| Vite | Development server and build tool |
| JavaScript / JSX | Application logic and UI |
| Tailwind CSS | Utility-first styling |
| Framer Motion | UI animation |
| React Router DOM | Client-side routing |
| Lucide React | Icon system |

## Backend

| Technology | Purpose |
|---|---|
| Supabase | Backend platform |
| PostgreSQL | Relational database |
| Supabase Auth | Authentication |
| Supabase Realtime | Live database events |
| Supabase Storage | Images and videos |

## Deployment

| Technology | Purpose |
|---|---|
| Git | Version control |
| GitHub | Source-code hosting |
| Vercel | Frontend deployment |

---

# 📊 Advantages

## ✅ 1. React

**Advantages**

- Component-based architecture
- Large ecosystem
- Easy UI reuse
- Suitable for interactive interfaces
- Strong support for animation libraries

**Trade-offs**

- Requires JavaScript knowledge
- SPA architecture requires correct routing configuration
- Large applications need good component organization

---

## ✅ 2. Vite

**Advantages**

- Fast development server
- Fast Hot Module Replacement
- Simple configuration
- Efficient production build

**Trade-offs**

- Requires additional backend services for database functionality
- Project configuration is still required for production

---

## ✅ 3. Tailwind CSS

**Advantages**

- Rapid UI development
- Consistent utility classes
- Responsive design support
- Easy design-system implementation

**Trade-offs**

- JSX can contain many utility classes
- Requires familiarity with utility-first CSS

---

## ✅ 4. Supabase

**Advantages**

- PostgreSQL database
- Authentication
- Storage
- Realtime
- Row Level Security
- REST API generated from database schema

**Trade-offs**

- Requires careful security configuration
- Storage policies must be configured correctly
- Poor database/index design can affect performance
- Realtime should only be enabled where necessary

---

## ✅ 5. Vercel

**Advantages**

- Simple Git integration
- Automatic deployments
- CDN-based delivery
- Preview deployments
- Easy environment-variable configuration

**Trade-offs**

- Production architecture still depends on the backend
- Usage limits depend on the selected plan

---

# 🏗️ System Architecture

```text
┌───────────────────────────────────────────────┐
│                   USER                        │
│             Desktop / Mobile                 │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│                  VERCEL                       │
│            React + Vite Frontend              │
└──────────────────────┬────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
     PostgreSQL     Storage       Auth
          │            │            │
          └────────────┼────────────┘
                       ▼
                 SUPABASE
                       │
                       ▼
                 Realtime Events
```

---

# 🗄️ Database Design

Recommended core tables:

```text
classes
members
gallery
timeline
projects
stories
messages
```

## `classes`

Stores class-level information.

Suggested fields:

```text
id
name
description
school
major
generation
cover_image
created_at
updated_at
```

## `members`

Stores student information.

Suggested fields:

```text
id
class_id
name
nickname
bio
formal_photo
informal_photo
instagram_url
github_url
linkedin_url
created_at
updated_at
```

## `gallery`

Stores gallery metadata.

Suggested fields:

```text
id
class_id
title
description
media_url
media_type
thumbnail_url
event_date
created_at
updated_at
```

`media_type` can be:

```text
image
video
```

## `timeline`

Stores historical events.

Suggested fields:

```text
id
class_id
title
description
event_date
image_url
created_at
updated_at
```

## `projects`

Stores class projects.

Suggested fields:

```text
id
class_id
title
description
thumbnail_url
demo_url
github_url
technologies
created_at
updated_at
```

## `stories`

Stores diary chapters.

Suggested fields:

```text
id
class_id
title
content
chapter_number
cover_image
author_name
published
created_at
updated_at
```

## `messages`

Stores guestbook messages.

Suggested fields:

```text
id
class_id
name
message
avatar_url
approved
created_at
```

> **Important:** The exact SQL schema should be adapted to the application's actual code. The field list above is the recommended logical model, not a claim that every field already exists in the current source code.

---

# 🗂️ Storage Design

Recommended Supabase Storage buckets:

```text
timeline-images/
project-images/
gallery-images/
member-photos/
story-images/
```

Suggested organization:

```text
member-photos/
├── member-id-001/
│   ├── formal.webp
│   └── informal.webp
│
├── member-id-002/
│   ├── formal.webp
│   └── informal.webp
│
└── ...

gallery-images/
├── 2024/
├── 2025/
└── 2026/

project-images/
├── project-001/
└── project-002/
```

---

# 📁 Project Structure

A recommended scalable structure:

```text
class-portfolio/
│
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   └── assets/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageTransition.jsx
│   │   │
│   │   ├── members/
│   │   │   ├── MemberCard.jsx
│   │   │   └── MemberGrid.jsx
│   │   │
│   │   ├── gallery/
│   │   │   ├── GalleryGrid.jsx
│   │   │   ├── MediaCard.jsx
│   │   │   └── Lightbox.jsx
│   │   │
│   │   ├── timeline/
│   │   │   ├── Timeline.jsx
│   │   │   └── TimelineCard.jsx
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx
│   │   │   └── ProjectGrid.jsx
│   │   │
│   │   ├── stories/
│   │   │   ├── Book.jsx
│   │   │   └── Chapter.jsx
│   │   │
│   │   └── messages/
│   │       ├── MessageWall.jsx
│   │       └── MessageForm.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Members.jsx
│   │   ├── Gallery.jsx
│   │   ├── Timeline.jsx
│   │   ├── Projects.jsx
│   │   ├── Stories.jsx
│   │   ├── Messages.jsx
│   │   ├── Login.jsx
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       ├── MembersAdmin.jsx
│   │       ├── GalleryAdmin.jsx
│   │       ├── TimelineAdmin.jsx
│   │       ├── ProjectsAdmin.jsx
│   │       ├── StoriesAdmin.jsx
│   │       └── MessagesAdmin.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useRealtime.js
│   │   └── useMediaQuery.js
│   │
│   ├── lib/
│   │   ├── supabase.js
│   │   └── constants.js
│   │
│   ├── services/
│   │   ├── members.service.js
│   │   ├── gallery.service.js
│   │   ├── timeline.service.js
│   │   ├── projects.service.js
│   │   ├── stories.service.js
│   │   └── messages.service.js
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── supabase/
│   ├── migrations/
│   └── seed.sql
│
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

> Structure above is a recommended architecture. If your current repository uses different filenames, keep the real source structure and adapt this documentation accordingly.

---

# 💻 Required Tools

Before development, install these tools.

## 1. Node.js

Node.js is required to run the React/Vite development environment and npm.

Download:

https://nodejs.org/

Verify:

```bash
node --version
npm --version
```

Recommended: use a current **LTS** release.

---

## 2. Git

Git is required for version control.

Download:

https://git-scm.com/

Verify:

```bash
git --version
```

---

## 3. Visual Studio Code

Recommended editor:

https://code.visualstudio.com/

Recommended extensions:

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- GitLens
- Error Lens
- Auto Rename Tag
- ES7+ React/Redux/React-Native Snippets

---

## 4. GitHub Account

Required if the source code will be hosted on GitHub.

https://github.com/

Used for:

- Repository hosting
- Version control
- Collaboration
- Vercel deployment integration

---

## 5. Supabase Account

Required for:

- PostgreSQL
- Authentication
- Realtime
- Storage

https://supabase.com/

---

## 6. Vercel Account

Recommended for deployment.

https://vercel.com/

---

# 📋 Prerequisites

Make sure the following are available:

```text
☑ Node.js
☑ npm
☑ Git
☑ VS Code
☑ GitHub account
☑ Supabase project
☑ Vercel account
```

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/class-portfolio.git
cd class-portfolio
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Install Core Packages

If the project has not installed the required dependencies yet:

```bash
npm install react react-dom
npm install react-router-dom
npm install @supabase/supabase-js
npm install framer-motion
npm install lucide-react
```

For Tailwind CSS, use the installation method appropriate to the Tailwind CSS major version used by the project. Do not mix Tailwind v3 configuration with Tailwind v4 configuration.

---

# 🔑 Environment Variables

Create:

```text
.env
```

Example:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

> Use the public client-side Supabase key intended for browser applications. Never expose a Supabase service-role key in a Vite frontend.

Create `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Important

Never commit:

```text
.env
```

to GitHub.

Add it to `.gitignore`:

```gitignore
node_modules/
dist/
.env
.env.local
.env.*.local
```

---

# 🗄️ Supabase Setup

## 1. Create Project

Open:

https://supabase.com/

Create a new project.

Record:

```text
Project URL
Public client key
```

Do not expose:

```text
service_role key
```

in frontend code.

---

# 🧱 Database Setup

Create the core tables:

```text
classes
members
gallery
timeline
projects
stories
messages
```

A production implementation should also consider:

```text
created_at
updated_at
class_id
published / approved flags
foreign keys
indexes
constraints
```

---

# ⚡ Realtime Setup

For tables that require live updates, enable Supabase Realtime according to the current Supabase dashboard configuration.

Recommended realtime candidates:

```text
messages
stories
timeline
projects
members
gallery
```

Do not enable realtime indiscriminately for every table. Only subscribe where the UI actually needs live changes.

### Example realtime concept

```javascript
const channel = supabase
  .channel('messages-realtime')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'messages'
    },
    (payload) => {
      console.log(payload);
    }
  )
  .subscribe();
```

Always clean up subscriptions when React components unmount.

---

# 🗃️ Storage Buckets

Create buckets according to the media architecture:

```text
timeline-images
project-images
gallery-images
member-photos
story-images
```

For every bucket, configure:

- Upload policy
- Read policy
- Update policy
- Delete policy

Do not make every bucket public by default.

If private media is required, use authenticated access and signed URLs instead.

---

# 🔐 Row Level Security

For production, enable **Row Level Security (RLS)** on database tables.

General principle:

```text
Public User
    │
    ├── READ published content
    │
    └── CREATE guestbook message
             │
             ▼
        Moderation

Admin
    │
    ├── CREATE
    ├── READ
    ├── UPDATE
    └── DELETE
```

Never rely only on hidden admin routes in React for authorization.

Client-side route protection is not a security boundary.

Authorization must be enforced by Supabase policies.

---

# 🧪 Development

Start the local server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

Depending on the Vite configuration, the port can differ.

---

# 📦 Production Build

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The generated production files are normally placed in:

```text
dist/
```

---

# 🌐 Deployment to Vercel

## 1. Push to GitHub

```bash
git add .
git commit -m "feat: build class portfolio"
git push origin main
```

## 2. Import Project into Vercel

Open:

https://vercel.com/

Then:

```text
New Project
   ↓
Import Git Repository
   ↓
Select class-portfolio
   ↓
Configure Environment Variables
   ↓
Deploy
```

Add:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

---

# 🔀 SPA Routing

Because React Router uses client-side routing, direct navigation to routes such as:

```text
/members
/gallery
/timeline
/projects
/stories
/messages
/admin
```

must be handled correctly by the deployment platform.

For Vercel, a common configuration is:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Use this only when it matches the project's deployment architecture.

---

# 🔒 Security Checklist

Before production:

```text
☐ .env is not committed
☐ Service-role key is never exposed to browser
☐ RLS is enabled
☐ Admin policies are restricted
☐ Storage policies are configured
☐ File upload validation exists
☐ File size limits exist
☐ Guestbook spam protection exists
☐ User-generated content is validated
☐ Admin authentication is enabled
☐ Database indexes are reviewed
☐ Realtime subscriptions are cleaned up
```

---

# ⚡ Performance Checklist

For a media-heavy class portfolio:

### Images

Prefer:

```text
WebP
AVIF
```

when supported by the media pipeline.

Use:

- Responsive images
- Lazy loading
- Appropriate image dimensions
- Thumbnails for galleries
- Compression before upload

### Videos

Avoid loading every video immediately.

Prefer:

```text
poster image
lazy loading
compressed video
reasonable resolution
```

### React

Use:

```text
component reuse
memoization when justified
pagination
virtualization for very large lists
code splitting
route-level lazy loading
```

Do not optimize prematurely. Measure first.

---

# 🧩 Recommended UI Sections

A polished home page can follow this structure:

```text
┌─────────────────────────────────────────────┐
│ NAVBAR                                      │
├─────────────────────────────────────────────┤
│                                             │
│             HERO EXPERIENCE                 │
│      Class Name / Generation                │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             OUR STORY                       │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             MEMBERS                         │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             TIMELINE                        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             GALLERY                         │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             PROJECTS                        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             CLASS DIARY                     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             GUESTBOOK                       │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│             FOOTER                          │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 🎨 Design Direction

Recommended visual direction:

```text
Style       : Modern Editorial
Mood        : Nostalgic + Premium
Layout      : Spacious
Typography  : Clean + Elegant
Animation   : Smooth + Purposeful
Cards       : Soft / Glass / Editorial
Media       : Large visual focus
Responsive  : Mobile-first
```

Suggested design principles:

- Strong typography hierarchy
- Large photography
- Generous whitespace
- Subtle gradients
- Smooth transitions
- Consistent border radius
- Consistent spacing scale
- Accessible contrast
- Minimal visual noise

---

# 🧠 Recommended UX Principles

The website should not feel like an administration system.

The public interface should prioritize:

```text
Emotion
   ↓
Story
   ↓
Visual Memory
   ↓
Interaction
   ↓
Information
```

The admin interface should prioritize:

```text
Clarity
   ↓
Speed
   ↓
Data Management
   ↓
Validation
   ↓
Security
```

---

# 🧪 Testing Checklist

Before release:

## Functional

```text
☐ Home loads
☐ Navigation works
☐ Members load
☐ Gallery loads
☐ Videos play
☐ Timeline works
☐ Projects load
☐ Stories work
☐ Guestbook submission works
☐ Realtime messages work
☐ Admin login works
☐ CRUD operations work
☐ Media upload works
☐ Media deletion works
```

## Responsive

Test:

```text
☐ Mobile
☐ Tablet
☐ Laptop
☐ Desktop
```

## Browser

Test at minimum:

```text
☐ Chrome
☐ Edge
☐ Firefox
☐ Safari
```

---

# 🐛 Troubleshooting

## `npm` is not recognized

Check Node.js:

```bash
node --version
npm --version
```

If unavailable, install Node.js and restart the terminal.

---

## Supabase connection error

Check:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Then restart:

```bash
npm run dev
```

Environment variables are loaded when the development server starts.

---

## Images do not appear

Check:

```text
☐ Bucket exists
☐ Storage policy exists
☐ URL is correct
☐ File exists
☐ Bucket visibility matches application logic
```

---

## Realtime does not update

Check:

```text
☐ Realtime is enabled
☐ Correct table is subscribed
☐ Subscription channel is active
☐ RLS allows the required operation
☐ React subscription cleanup is implemented correctly
```

---

## Refreshing a route returns 404

Check the Vercel SPA rewrite configuration and confirm that the deployment is serving `index.html` for client-side routes.

---

# 🧰 Useful Commands

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

Git status:

```bash
git status
```

Commit:

```bash
git add .
git commit -m "your message"
```

Push:

```bash
git push origin main
```

---

# 🌱 Development Workflow

Recommended workflow:

```text
1. Plan feature
       ↓
2. Design UI
       ↓
3. Define database model
       ↓
4. Build reusable components
       ↓
5. Connect Supabase
       ↓
6. Add validation
       ↓
7. Add animations
       ↓
8. Test responsive layout
       ↓
9. Run production build
       ↓
10. Deploy
```

---

# 🗺️ Roadmap

## Phase 1 — Foundation

- [x] React + Vite
- [x] Tailwind CSS
- [x] Supabase integration
- [x] Basic routing
- [x] Responsive layout

## Phase 2 — Public Experience

- [ ] Hero section
- [ ] Members
- [ ] Gallery
- [ ] Timeline
- [ ] Projects
- [ ] Stories
- [ ] Guestbook

## Phase 3 — Realtime

- [ ] Realtime messages
- [ ] Realtime stories
- [ ] Realtime gallery
- [ ] Realtime timeline

## Phase 4 — Admin

- [ ] Authentication
- [ ] Dashboard
- [ ] CRUD
- [ ] Media management
- [ ] Moderation
- [ ] Storage management

## Phase 5 — Production

- [ ] RLS audit
- [ ] Storage policy audit
- [ ] Performance optimization
- [ ] Accessibility review
- [ ] SEO
- [ ] Analytics
- [ ] Production deployment

---

# 🔮 Future Improvements

Possible future features:

```text
🎵 Background music with user-controlled playback
🌙 Dark / light mode
🔎 Global search
🏷️ Gallery categories
📅 Event calendar
❤️ Reactions
💬 Story comments
🔔 Notifications
📱 PWA support
🌍 Multi-language support
📊 Admin analytics
📥 Export class archive
🖨️ Printable memory book
🤖 AI-assisted story organization
```

These features should be added only when they provide measurable value and do not unnecessarily increase application complexity.

---

# 📐 Architecture Principles

This project follows several important principles:

### Separation of concerns

```text
UI
 ↓
Components
 ↓
Pages
 ↓
Services
 ↓
Supabase
```

### Reusable components

Avoid duplicating:

```text
buttons
modals
cards
loading states
forms
media viewers
```

### Centralized backend access

Keep Supabase interaction inside service/helper layers where practical.

Example:

```text
services/
├── members.service.js
├── gallery.service.js
├── projects.service.js
└── messages.service.js
```

This keeps UI components easier to maintain.

---

# 🧾 Project Information

| Category | Technology |
|---|---|
| Language | JavaScript / JSX |
| UI Framework | React |
| Build Tool | Vite |
| CSS | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Routing | React Router DOM |
| Database | PostgreSQL |
| Backend Platform | Supabase |
| Realtime | Supabase Realtime |
| Storage | Supabase Storage |
| Authentication | Supabase Auth |
| Version Control | Git |
| Repository | GitHub |
| Deployment | Vercel |

---

# 🤝 Contributing

Contributions are welcome.

Recommended process:

```bash
git clone https://github.com/your-username/class-portfolio.git

git checkout -b feature/new-feature

npm install

npm run dev
```

After development:

```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

Then open a Pull Request on GitHub.

---

# 📜 License

This project is intended to be distributed under the **MIT License**.

If the repository contains a `LICENSE` file, make sure its contents match the license stated here.

---

# ⭐ Acknowledgements

Built with:

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide
- React Router
- Supabase
- PostgreSQL
- Vercel

---

<div align="center">

## 🎓 Built to Preserve the Journey

**A class is not only a list of names.**

**It is a collection of people, projects, places, stories, mistakes, achievements, and memories.**

This project turns those moments into a digital archive that can be revisited.

<br/>

### 📸 Capture the Moment · 📖 Tell the Story · 🚀 Preserve the Journey

<br/>

**Made with React + Supabase**

</div>
