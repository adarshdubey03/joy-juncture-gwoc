# 🌸 Joy Juncture — GWOC Final Project

Joy Juncture is a **design-first, experience-driven web platform** built as part of **Google Winter of Code (GWOC)**.  
The project focuses on *moments, emotions, and shared joy*, rather than traditional transaction-heavy or feature-bloated web applications.

This repository contains the **complete frontend and backend implementation**, built using modern, production-grade technologies.

---

## ✨ Project Philosophy

Most web platforms optimize for:
- clicks  
- conversions  
- speed at the cost of clarity  

Joy Juncture intentionally takes a different path.

> **Joy Juncture is about slowing down the user experience and making interactions feel human.**

Every design and technical decision was guided by:
- Minimalism over clutter  
- Clarity over cleverness  
- Completion over over-engineering  

The result is a calm, thoughtful, and scalable platform that prioritizes **experience first**.

---

## 🚀 Features

- 🔐 **Authentication System**
  - Secure user authentication and session handling
  - Server-side protection for sensitive routes

- 👤 **User Profiles**
  - Personalized user profiles
  - Structured backend models for scalability

- 💰 **Points / Wallet Logic**
  - Backend-driven points system
  - Clean separation between UI and business logic

- 🎨 **Design-First UI**
  - Minimal layouts
  - Consistent spacing, typography, and color usage
  - Reusable and modular components

- 📱 **Fully Responsive**
  - Optimized for mobile, tablet, and desktop
  - Tailwind-powered responsive design

---

## 🧠 Tech Stack

### Frontend
- **Next.js (App Router)** – Routing, SSR, and performance
- **TypeScript** – Type safety and maintainability
- **Tailwind CSS** – Utility-first styling and responsive design
- **Lucide Icons** – Clean and modern iconography

### Backend
- **Next.js Server Actions & API Routes**
- **Prisma ORM** – Type-safe database access
- **PostgreSQL** – Relational database
- **Auth.js / NextAuth** – Authentication and session management

---

## 🗂️ Project Structure

```bash
.
├── app/                # Next.js App Router
├── components/         # Reusable UI components
├── lib/                # Utility functions and DB config
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets
├── styles/             # Global styles
└── README.md

---

## 🧩 Architecture & Code Structure

The project follows **separation of concerns**, ensuring:

- Clean and predictable imports  
- Maintainable and readable codebase  
- Easy scalability as the project grows  

Each layer of the application has a clearly defined responsibility, making the system easier to reason about and extend.

---

## 🛢️ Database Design

The database schema is designed with the following goals:

- Clear relationships between entities  
- Future extensibility without schema rewrites  
- Strong data integrity  

### Key Design Principles

- All relations are explicit and well-defined  
- Business logic stays strictly on the server  
- Prisma ensures end-to-end type safety across the stack  

---

## 🔐 Security Practices

Security is handled with a **server-first mindset**:

- Authentication is managed securely on the server  
- Sensitive logic is never exposed to the client  
- Environment variables are protected using `.env` files  
- Prisma helps prevent unsafe or malformed queries  

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=postgresql://...
AUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000


---

## 🧪 Local Development

### Clone the Repository

```bash
git clone https://github.com/your-username/joy-juncture-gwoc.git
cd joy-juncture-gwoc

npm install

npx prisma migrate dev

npm run dev

---

## 🌱 Learnings from GWOC

This project helped me deeply understand:

- Design-led development  
- Writing less but higher-quality code  
- Balancing UX and engineering decisions  
- Building production-ready full-stack applications  

### Key Takeaway

> **Good software is not about how much you build —  
> it’s about how intentional every decision is.**

---

## 🔮 Future Scope

Possible future enhancements include:

- Advanced personalization  
- Community-based interactions  
- Analytics-driven insights  
- Performance and accessibility improvements  

The foundation is intentionally solid to support growth.

---

## 👨‍💻 Team

- **Adarsh Dubey**  
- **Rohit Prajapat**  
- **Raunak Kumar**  
- **Shree Pastagia**

---

## 📜 License

This project is created as part of **Google Winter of Code (GWOC)**  
and is intended for educational and demonstrational purposes.

---
