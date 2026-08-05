# Vishal Realty Consultancy — Official Website

> **Live Website:** [vishal-realty-ivory.vercel.app](https://vishal-realty-ivory.vercel.app)

A modern, fully responsive real estate landing page for **Vishal Realty Consultancy** — Chennai's trusted real estate brand offering rental, buying & selling, joint venture development, and property management services.

---

## 🏢 About the Business

| Field | Details |
|---|---|
| **Company** | Vishal Realty Consultancy |
| **Founder** | Kishore Kumar Vigneswaran |
| **Designation** | Founder & Director |
| **Phone / WhatsApp** | +91 63839 77798 |
| **Email** | kishore@vishalrealtychennai.com |
| **Address** | Kamaraj Avenue, 2nd Street, Adyar, Chennai - 600 020 |
| **Areas Served** | Adyar, OMR, ECR, Besant Nagar, Thiruvanmiyur |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Shadcn/UI + Radix UI |
| **Icons** | Lucide React |
| **Animations** | Motion (Framer Motion) |
| **Forms** | React Hook Form |
| **Package Manager** | pnpm (recommended) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
vishal-realty/
│
├── index.html                          # Entry HTML + SEO meta tags + Schema markup
├── vite.config.ts                      # Vite configuration
├── package.json                        # Dependencies and scripts
├── tsconfig.json                       # TypeScript configuration
├── postcss.config.mjs                  # PostCSS configuration
│
├── public/
│   └── properties/                     # Property listing images
│       ├── property-1.jpg              # 3 BHK Apartment — Adyar
│       ├── property-2.jpg              # 2 BHK Flat — Besant Nagar
│       ├── property-3.jpg              # Commercial Office — OMR
│       ├── property-4.jpg              # Residential Plot — ECR
│       ├── property-5.jpg              # 4 BHK Villa — Thiruvanmiyur
│       ├── property-6.jpg              # 1 BHK Studio — OMR
│       └── README.md                   # Guide on adding new property images
│
├── src/
│   ├── main.tsx                        # React app entry point
│   ├── vite-env.d.ts
│   │
│   ├── assets/
│   │   ├── logo.png                    # Full VR + Vishal Realty logo
│   │   ├── logo-symbol.png             # VR monogram only
│   │   └── founder.jpg                 # Kishore Kumar Vigneswaran photo
│   │
│   ├── data/
│   │   ├── properties.json             # All property listings data
│   │   └── README.md                   # Guide on adding new properties
│   │
│   ├── styles/
│   │   ├── index.css                   # Global styles + smooth scroll
│   │   ├── theme.css                   # Brand CSS variables
│   │   ├── tailwind.css                # Tailwind imports
│   │   └── fonts.css                   # Plus Jakarta Sans + DM Sans
│   │
│   └── app/
│       ├── App.tsx                     # Main layout — assembles all sections
│       │
│       └── components/
│           ├── navbar.tsx              # Sticky navbar with mobile menu
│           ├── hero.tsx                # Full-screen hero with CTA buttons
│           ├── category-tags.tsx       # Property type strip (Land/Residential/Commercial/Industrial)
│           ├── services.tsx            # 5 core services with sub-services
│           ├── properties.tsx          # Property listings with filter bar
│           ├── property-card.tsx       # Reusable property card component
│           ├── founder.tsx             # Founder section with bio and core pillars
│           ├── vision-mission.tsx      # Vision, Mission and Core Values
│           ├── why-choose-us.tsx       # 6 reason cards — why choose Vishal Realty
│           ├── areas.tsx               # 5 Chennai localities served
│           ├── stats-bar.tsx           # Key stats strip
│           ├── testimonials.tsx        # Client testimonials
│           ├── faq.tsx                 # 14 FAQs in accordion style
│           ├── contact.tsx             # Contact form + Google Maps
│           ├── consultation.tsx        # Free consultation booking form
│           ├── newsletter.tsx          # Email newsletter signup
│           ├── footer.tsx              # 4-column footer with social links
│           ├── chatbot.tsx             # Rule-based AI chatbot widget
│           │
│           ├── figma/
│           │   └── ImageWithFallback.tsx   # Image component with fallback
│           │
│           └── ui/                     # Full Shadcn/Radix UI component library
│               ├── button.tsx
│               ├── card.tsx
│               ├── input.tsx
│               ├── form.tsx
│               ├── accordion.tsx
│               ├── select.tsx
│               └── ... (40+ components)
│
└── guidelines/
    └── Guidelines.md                   # Design guidelines and brand rules
```

---

## 🎨 Brand Colors

| Role | Color | Hex |
|---|---|---|
| Primary / Navbar / Footer | Dark Navy | `#1A2B5F` |
| Accent / CTAs / Highlights | Cyan Blue | `#00AEEF` |
| Micro Accent / Icons | Golden Yellow | `#F5A623` |
| Section Backgrounds | Light Gray | `#F4F6F9` |
| Body Text | Dark Gray | `#2D2D2D` |
| Base | White | `#FFFFFF` |
| WhatsApp Button | WhatsApp Green | `#25D366` |

---

## 🖼 Page Sections (in order)

| # | Section | File | Description |
|---|---|---|---|
| 1 | **Navbar** | `navbar.tsx` | Sticky, mobile responsive with hamburger menu |
| 2 | **Hero** | `hero.tsx` | Full-screen with Chennai background, 2 CTA buttons |
| 3 | **Category Tags** | `category-tags.tsx` | Land, Residential, Commercial, Industrial pills |
| 4 | **Services** | `services.tsx` | 5 services with sub-services and property type badges |
| 5 | **Properties** | `properties.tsx` | Live listings with filter bar — data from JSON |
| 6 | **Founder** | `founder.tsx` | Kishore's bio, quote and 4 core pillars |
| 7 | **Vision & Mission** | `vision-mission.tsx` | Vision, Mission and 5 core values |
| 8 | **Why Choose Us** | `why-choose-us.tsx` | 6 reason cards with icons |
| 9 | **Testimonials** | `testimonials.tsx` | Client reviews |
| 10 | **Contact** | `contact.tsx` | Google Maps + contact form |
| 11 | **Footer** | `footer.tsx` | Links, services, contact info, social icons |
| 12 | **Chatbot** | `chatbot.tsx` | Floating rule-based chatbot (bottom-left) |
| — | **WhatsApp Button** | `App.tsx` | Fixed floating button (bottom-right) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- pnpm (recommended) or npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/vishal-realty.git

# 2. Navigate into the project
cd vishal-realty

# 3. Install dependencies
pnpm install
# or
npm install

# 4. Start the development server
pnpm dev
# or
npm run dev

# 5. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
pnpm build
# or
npm run build
```

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

---

## 📱 Run on Mobile (Same WiFi)

```bash
# 1. Find your Mac's IP address
ipconfig getifaddr en0

# 2. Open on phone browser
http://YOUR_IP_ADDRESS:5173
```

Make sure `vite.config.ts` has `host: true` under server options.

---

## 🏠 Adding a New Property Listing

1. Add the property photo to `/public/properties/` folder
   - Name it: `property-7.jpg`, `property-8.jpg` etc.
   - Recommended size: 800×600px, JPG format

2. Open `src/data/properties.json` and add a new entry:

```json
{
  "id": 7,
  "title": "Your Property Title",
  "type": "Apartment",
  "status": "For Sale",
  "locality": "Adyar",
  "address": "Full address here",
  "price": "₹XX Lakhs",
  "priceValue": 0000000,
  "area": "1,000 sq.ft",
  "bhk": "2 BHK",
  "floor": "1st Floor",
  "totalFloors": "4 Floors",
  "parking": true,
  "furnished": "Semi-Furnished",
  "facing": "East Facing",
  "image": "/properties/property-7.jpg",
  "featured": false,
  "postedDate": "2026-06-01",
  "description": "Property description here.",
  "highlights": ["Feature 1", "Feature 2", "Feature 3"]
}
```

3. Save the file
4. Push to GitHub → Vercel auto-deploys ✅

**Property Types:** `Apartment` / `Villa` / `Plot` / `Commercial`
**Status Options:** `For Sale` / `For Rent` / `For Lease`
**Localities:** `Adyar` / `OMR` / `ECR` / `Besant Nagar` / `Thiruvanmiyur`

---

## 🤖 Chatbot

The website includes a **rule-based chatbot** (no API cost, no backend) that handles:

- 🏠 Property search by type and locality
- 🛠 Service information
- 📍 Areas served
- ❓ FAQ answers (buying, renting, investment)
- 📞 WhatsApp handoff to Kishore

All flows are defined in `src/app/components/chatbot.tsx` inside the `flows` object. To update any answer, simply edit the text in that file.

---

## 🌐 Deployment

The project is deployed on **Vercel** with auto-deploy on every GitHub push.

**Auto-deploy workflow:**
```
Code change → Save → git add . → git commit → git push → Vercel deploys in ~2 mins
```

**Manual deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 📞 Contact & Support

| Field | Details |
|---|---|
| **Developer** | Kishore Kumar Vigneswaran |
| **WhatsApp** | +91 63839 77798 |
| **Email** | kishore@vishalrealtychennai.com |
| **Live Site** | [vishal-realty-ivory.vercel.app](https://vishal-realty-ivory.vercel.app) |

---

## 📋 Git Workflow

```bash
# Check what changed
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub
git push
```

**Commit message examples:**
- `Add new property listing — 2BHK Adyar`
- `Update contact details`
- `Fix mobile navbar issue`
- `Add new FAQ question`

---

## 🗺 Roadmap

| Feature | Status |
|---|---|
| Landing page with all sections | ✅ Done |
| Property listings with filters | ✅ Done |
| Rule-based chatbot | ✅ Done |
| WhatsApp integration | ✅ Done |
| Contact & consultation form | ✅ Done |
| Google Maps embed | ✅ Done |
| Local SEO schema markup | ✅ Done |

---

*Confidential — Vishal Realty Consultancy © 2026. All rights reserved.*
