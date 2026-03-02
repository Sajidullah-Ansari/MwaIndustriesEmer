# MWA Industries Website - Product Requirements Document

## Original Problem Statement
Build a premium, modern, and trust-building company website for **MWA Industries**, a metal fabrication and heavy engineering company based in Raipur, Chhattisgarh. The primary goal is to attract industrial clients, build strong credibility, and generate leads.

## Target Audience
- Industrial facility managers seeking fabrication services
- Project managers at power plants, steel plants, chemical plants
- Procurement teams from oil & gas, petrochemical industries
- Engineering consultants looking for fabrication partners

## Core Requirements

### Pages Implemented
- Home (landing page with hero, trust signals, services overview, featured projects)
- About Us (company story, 35+ years legacy narrative)
- Services/Capabilities (12 services with detailed descriptions)
- Industries We Serve
- Projects/Portfolio (8 featured projects)
- Quality & Safety
- Contact Us (with form)
- Request a Quote (RFQ form with file upload)
- Blog (with dynamic article pages)
- Admin Panel (view contact/RFQ submissions)

### Key Features
- High-conversion homepage with clear CTAs
- Detailed services with industry-relevant images
- Advanced Contact and RFQ forms with file upload
- Backend form storage in MongoDB
- Admin panel to view submissions
- Light/Dark theme toggle with proper background changes
- Mobile-responsive design
- Smooth animations with Framer Motion

## Branding
- **Logo**: Gold MWA Industries logo at `/images/mwa-logo.png`
- **Tagline**: "Excellence is our foundation. Trust is our legacy."
- **Color Palette**: 
  - Dark mode: Dark industrial theme (neutral-900/950) with gold accents (amber-400/500)
  - Light mode: Light gray backgrounds with dark text and gold accents
- **Location**: Plot No. 78, Industrial Area, Bartori (Tilda), District Raipur (C.G.), India

## Tech Stack
- **Frontend**: React with TailwindCSS, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Styling**: CSS variables for theming, Tailwind utility classes

## What's Been Implemented

### December 2025 - Session 3
- [x] Fixed light mode to properly change background colors (was using hardcoded colors)
- [x] Updated CSS variables for better light mode contrast (--text-secondary: 64 64 64)
- [x] Removed all "new firm" mentions from company narrative
- [x] Fixed plot number from "77" to "78" in address
- [x] Updated Navbar and Footer to use CSS variables for theme support
- [x] Updated Home, About, and Services pages for proper theme switching

### December 2025 - Session 2
- [x] New gold MWA Industries logo integration (navbar, hero, footer)
- [x] Updated all 12 service images with relevant industrial photos
- [x] Updated all 8 project images with relevant industrial photos
- [x] Testing: 100% backend API pass rate, all frontend features verified

### Previously Completed
- [x] Full website scaffolding (Next.js frontend + FastAPI backend)
- [x] All 10 pages implemented
- [x] Backend API endpoints for contact/RFQ forms
- [x] MongoDB integration for form submissions
- [x] Premium dark industrial theme
- [x] Framer Motion animations
- [x] Light/Dark mode toggle with localStorage persistence
- [x] Mobile-responsive design
- [x] Sticky WhatsApp and Call buttons
- [x] Company story with "35+ years experience" narrative

## API Endpoints
- `GET /api/` - Health check
- `POST /api/contact` - Submit contact form
- `POST /api/rfq` - Submit RFQ form
- `GET /api/admin/contacts` - Get all contact submissions
- `GET /api/admin/rfqs` - Get all RFQ submissions
- `PATCH /api/admin/contacts/{id}/status` - Update contact status
- `PATCH /api/admin/rfqs/{id}/status` - Update RFQ status

## Database Schema
- **contacts**: `{id, name, company_name, email, phone, requirement_type, message, file_name, file_data, created_at, status}`
- **rfqs**: `{id, name, company_name, email, phone, product_service, material_type, quantity, delivery_location, timeline, notes, file_name, file_data, created_at, status}`

## Upcoming Tasks (P1)
1. **LocalBusiness Schema Markup** - Add SEO schema to contact page
2. **Project Detail Pages** - Create dynamic `/projects/[slug]` routes

## Future/Backlog Tasks (P2)
1. "Download Company Profile" button placeholder
2. Admin panel enhancements (editing, notes)
3. Google Analytics integration
4. Social media meta tags optimization

## Files Reference
- `/app/frontend/src/data/company.js` - Company info and logo path
- `/app/frontend/src/data/services.js` - Services with image URLs
- `/app/frontend/src/data/projects.js` - Projects with image URLs
- `/app/frontend/src/components/layout/Navbar.jsx` - Navigation with logo and theme toggle
- `/app/frontend/src/components/layout/Footer.jsx` - Footer with logo
- `/app/frontend/src/pages/Home.jsx` - Homepage
- `/app/frontend/src/pages/Services.jsx` - Services page
- `/app/frontend/src/pages/About.jsx` - About page
- `/app/frontend/src/index.css` - CSS with theme variables
- `/app/backend/server.py` - All API endpoints

## Test Reports
- `/app/test_reports/iteration_3.json` - Latest test results (100% pass)
