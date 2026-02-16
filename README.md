# 📝 Dashboard Notes

A premium collaborative dashboard note management system built with modern frontend architecture and modular design.

---

## 🚀 Overview

**Dashboard Notes** is a fully client-side collaborative note management system featuring rich text editing, multi-user simulation, public/private visibility controls, and export functionality — all without requiring a backend.

Designed with scalability and clean architecture in mind.

---

## ✨ Features

- 🔐 Multi-user login (email-based simulation)
- 🗂 Private and Public notes
- 🌍 Public notes permission control:
  - View-only
  - Editable by everyone
- ✏️ Create / Edit / Delete notes
- 🖋 Rich Text Editor (Tiptap)
- 📄 TXT export
- 🖨 Simple PDF export (print-based)
- 🌗 Dark / Light theme toggle
- 🧩 Fully modular component structure
- 💾 LocalStorage-based persistence
- 🚫 No backend required

---

## 🏗 Tech Stack

| Technology      | Version |
|-----------------|----------|
| Next.js         | 15.x (App Router) |
| React           | 19.x |
| TypeScript      | ^5 |
| Tailwind CSS    | 3.4.1 |
| PostCSS         | ^8 |
| Tiptap          | Latest |
| UUID            | Latest |

---

## 📦 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/amareshwar3/dashboard-notes.git
cd dashboard-notes
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🛠 Manual Setup (From Scratch)

### Create Project

```bash
npx create-next-app@latest dashboard-notes
```

Select:

- ✅ TypeScript  
- ✅ App Router  
- ✅ Tailwind  
- ✅ ESLint  
- ❌ No `src` directory  
- ❌ No Turbopack  

---

### Install Required Packages

```bash
npm install uuid react-icons

npm install @tiptap/react @tiptap/starter-kit
npm install @tiptap/extension-heading
npm install @tiptap/extension-list
npm install @tiptap/extension-bullet-list
npm install @tiptap/extension-highlight
npm install @tiptap/extension-color
npm install @tiptap/extension-text-align
npm install @tiptap/extension-image
npm install @tiptap/extension-task-list
npm install @tiptap/extension-task-item
npm install @tiptap/extension-placeholder
npm install @tiptap/extension-text-style
npm install @tiptap/extension-focus
npm install @tiptap/extension-superscript
npm install @tiptap/extension-subscript
```

---

## 🎨 Tailwind Configuration

`tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

---

## 📂 Project Structure

```
app/
  dashboard/
    notes/
components/
  notes/
context/
lib/
```

- Modular architecture
- Reusable UI components
- Clear separation of concerns
- Enterprise-ready scalability

---

## 🔐 Authentication

### Current Implementation

- Email-based mock login
- Stored in localStorage
- Multi-user simulation
- Session-based context management
