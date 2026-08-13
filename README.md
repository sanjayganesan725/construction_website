<div align="center">

# 🏗️ REACH Construction

### Building Excellence, Delivering Dreams

A premium, modern construction company website built with **HTML**, **CSS**, and **JavaScript**.  
Backend powered by **Vercel Serverless Functions** + **Supabase**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/reach-construction)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)
[![Made with HTML](https://img.shields.io/badge/Made%20with-HTML%2FCSS%2FJS-blue.svg)]()

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌙 **Dark Premium Theme** | Rich dark backgrounds with gold accent gradients |
| 📱 **Fully Responsive** | Mobile-first design — looks great on all devices |
| 🎭 **Scroll Animations** | Intersection Observer powered fade-in reveals |
| 🔢 **Animated Counters** | Stats count up when scrolled into view |
| 🍔 **Mobile Menu** | Smooth hamburger menu with overlay |
| 🏗️ **Project Gallery** | Filterable portfolio with category tabs |
| ⭐ **Testimonials** | Client review cards with star ratings |
| 📬 **Contact Form** | Full form with Supabase backend storage |
| 🔔 **Toast Notifications** | Success/error popups for form submissions |
| 💎 **Glassmorphism** | Frosted glass navbar effect on scroll |
| ⏰ **DB Keep-Alive** | Auto-pings Supabase every 12hrs to prevent sleep |

---

## 🖼️ Preview

### Hero Section
> Full-screen hero with animated headline, CTA buttons, and stats bar

### Services
> 6 service cards with icons, hover effects, and gold accent animations

### Projects
> Filterable gallery — All / Residential / Commercial / Renovation / Industrial

### Contact
> Professional form with validation, connected to Supabase database

---

## 🛠️ Tech Stack

```
Frontend:   HTML5 + Vanilla CSS + Vanilla JavaScript
Backend:    Vercel Serverless Functions (Node.js)
Database:   Supabase (PostgreSQL)
Icons:      Lucide Icons (CDN)
Fonts:      Google Fonts (Inter + Playfair Display)
Hosting:    Vercel
```

**No frameworks. No build tools. No TypeScript. Pure simplicity.**

---

## 📂 Project Structure

```
reach-construction/
├── index.html          # Single-page website (all sections)
├── css/
│   └── style.css       # Complete design system & responsive styles
├── js/
│   └── main.js         # Navigation, animations, form, filters
├── api/
│   ├── contact.js      # POST /api/contact — saves form data
│   ├── db-client.js    # Supabase client initialization
│   └── db-wake.js      # GET /api/db-wake — keeps DB alive
├── vercel.json         # Vercel config + cron job
├── package.json        # Supabase dependency
├── .env.example        # Environment variable template
└── .gitignore          # Excludes .env, node_modules, etc.
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)
- [Supabase](https://supabase.com/) account (free tier)
- [Vercel](https://vercel.com/) account (free tier)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/reach-construction.git
cd reach-construction
```

### 2. Set up Supabase

Create a new project on [supabase.com](https://supabase.com), then run this SQL in the **SQL Editor**:

```sql
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT TO anon WITH CHECK (true);
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run locally

Simply open `index.html` in your browser — no build step needed!

For the API to work locally, use [Vercel CLI](https://vercel.com/cli):

```bash
npm i -g vercel
vercel dev
```

### 5. Deploy to Vercel

```bash
vercel --prod
```

Or connect your GitHub repo in the [Vercel Dashboard](https://vercel.com/dashboard) for automatic deployments on every push.

> **Important:** Add your environment variables (`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`) in the Vercel Dashboard under **Settings → Environment Variables**.

---

## ⏰ Supabase Keep-Alive

Supabase free tier pauses databases after **7 days of inactivity**. This project includes an automatic keep-alive system:

- **Endpoint:** `GET /api/db-wake`
- **Cron Schedule:** Every 12 hours (`0 */12 * * *`)
- **What it does:** Sends a lightweight `SELECT` query to keep the database active

This is configured in `vercel.json` and runs automatically after deployment — **no extra setup needed**.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background Primary | `#0a0a0f` |
| Background Secondary | `#111118` |
| Gold Primary | `#d4a853` |
| Gold Light | `#f0c75e` |
| Text Primary | `#f5f5f7` |
| Text Secondary | `#a1a1aa` |
| Heading Font | Playfair Display |
| Body Font | Inter |

---

## 📄 API Endpoints

### `POST /api/contact`

Saves a contact form submission to Supabase.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "subject": "Residential Construction",
  "message": "I'd like to discuss a new home project."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully."
}
```

### `GET /api/db-wake`

Health check endpoint that pings Supabase to prevent database sleep.

**Response:**
```json
{
  "success": true,
  "message": "Database is awake!",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 📝 License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ and ☕**

[⬆ Back to Top](#-reach-construction)

</div>
