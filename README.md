# Roha Hospital Management System

A full-stack hospital management web application with role-based access for patients and admins.

## Overview

Roha Hospital Management System provides:

- Public hospital website (home, departments, doctors, blog, contact, appointment booking)
- Patient portal (dashboard, profile, appointment management)
- Admin portal (analytics dashboard, CRUD for departments/doctors/appointments/blog)
- Secure authentication using JWT access + refresh tokens

## Tech Stack

### Frontend (`client`)

- Next.js (App Router)
- Tailwind CSS
- React Hook Form + Zod
- TanStack Query
- Axios with interceptors

### Backend (`server`)

- Express.js
- MongoDB + Mongoose
- JWT (access + refresh)
- Role-based authorization
- Helmet + rate limiting
- Cloudinary service scaffold
- Nodemailer service scaffold

## Project Structure

```text
client/   # Next.js frontend
server/   # Express backend API
```

## Key Features

- Role-aware navigation and layouts
- Admin-only protected CRUD routes
- Patient-only protected routes
- Refresh-token based session restoration
- Responsive public pages with rich content sections
- Dynamic detail pages compatible with Next.js 16 params behavior

## Local Setup

1. Clone repository
2. Install dependencies:

```bash
cd client && npm install
cd ../server && npm install
```

3. Create env files:

- Copy -> `client/.env.local`
- Copy ->  `server/.env`

4. Seed admin user:

```bash
cd server
npm run seed:admin
```

5. Run development servers:

```bash
# terminal 1
cd server
npm run dev

# terminal 2
cd client
npm run dev
```

6. Open app:

- Frontend: `http://localhost:3000`
- API: `http://localhost:5000`

## Scripts

### Client

- `npm run dev`
- `npm run build`
- `npm run lint`

### Server

- `npm run dev`
- `npm run start`
- `npm run seed:admin`

## Notes

- Admin CRUD endpoints require an authenticated user with `admin` role.
- Patient endpoints require an authenticated user with `patient` role.
- SMTP is optional unless you enable forgot-password email delivery.
- Cloudinary integration is scaffolded and can be enabled via env keys.

