# 🚀 LinkHeadGen - Free LinkedIn Headline Generator

<p align="center">
  <img src="https://img.shields.io/badge/Astro-v5.1.0-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/TypeScript-v5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />
</p>

---

## 🌟 Project Overview
**LinkHeadGen.com** is a premium, dedicated, and offline-first LinkedIn Headline Generator website designed to help professionals, job seekers, students, freelancers, founders, executives, recruiters, and creators generate high-converting, recruiter-friendly LinkedIn headlines instantly.

The application runs entirely in the user's browser, utilizing smart pattern-matching formulas, copywriting frameworks, and dynamic synonym expansion to produce 20 highly relevant ideas per click—**completely free and without any server-side database storage or API dependency**.

🔗 **Live Website**: [https://linkheadgen.com](https://linkheadgen.com)

---

## ✨ Key Features
- **💡 8 Copywriting Frameworks**: Generates balanced, authoritative, and data-driven headlines based on proven templates (e.g., Job Title + Skills, "I Help X Achieve Y", Founder Branding, and Authority positioning).
- **📱 Mobile-First Responsive Design**: Optimized layout tested on screens from `320px` to `768px` and desktop, featuring a collapsible hamburger navigation menu.
- **🌙 Dark Mode Support**: Sleek, high-contrast dark theme accessible via a toggle in the top-right corner on all device sizes.
- **🔒 Privacy-Focused & Offline-First**: All configurations, generation history, and favorited headlines are stored locally on the user's browser using `localStorage`. No personal data ever leaves the device.
- **⚡ Performance & Core Web Vitals**: Built with zero heavy JavaScript frameworks (Vanilla TypeScript compile-to-JS) for lightweight bundles (~25kB) and instant load times.
- **📋 Copy Utilities**: Single-headline one-click copying and a "Copy All" button with feedback toast notifications.
- **📏 Character Counter**: Active character tracking for every headline to prevent truncation (under the LinkedIn 220-character limit).
- **⌨️ Keyboard Shortcuts**: Support for `Ctrl + Enter` to generate new headlines and `Esc` to reset/clear form inputs.

---

## 📸 Screenshots
<p align="center">
  <i>(Placeholder for application screenshots)</i>
  <br />
  <img src="https://via.placeholder.com/800x450/0b0f19/ffffff?text=LinkHeadGen+App+Mockup" alt="LinkHeadGen Mockup" width="600" />
</p>

---

## 🛠️ Tech Stack
- **Framework**: [Astro](https://astro.build/) (Static-First Architecture)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS3
- **Hosting/Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

---

## 📂 Project Structure
```
LinkHeadGen.com/
├── public/
│   ├── favicon.svg           # Brand logo vector
│   └── robots.txt            # Search engine crawlers configuration
├── src/
│   ├── layouts/
│   │   └── Layout.astro      # Primary HTML layout template (SEO & schemas)
│   ├── pages/
│   │   ├── 404.astro         # Custom 404 page
│   │   ├── 500.astro         # Custom 500 page
│   │   ├── about.astro       # Brand story & values page
│   │   ├── contact.astro     # Contact & feedback form page
│   │   ├── disclaimer.astro  # Legal affiliation disclaimers
│   │   ├── index.astro       # Main landing page & 2,000+ words SEO guide
│   │   ├── privacy.astro     # Cookie-free privacy policies
│   │   └── terms.astro       # Service terms & conditions
│   ├── scripts/
│   │   └── app.ts            # Client-side interactive controller
│   ├── styles/
│   │   └── global.css        # Vanilla CSS Design System variables & responsive styles
│   ├── utils/
│   │   ├── engine.ts         # Headline generation algorithm
│   │   ├── examples.ts       # Structured examples database (11 roles)
│   │   ├── faqs.ts           # Central FAQs database (15 detailed items)
│   │   └── formulas.ts       # Copywriting formulas library
│   └── env.d.ts              # TS declarations
├── astro.config.mjs          # Sitemap integration config
├── package.json              # Build scripts and dependencies
└── tsconfig.json             # TypeScript settings
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have **Node.js** (LTS recommended) and **npm** installed on your system.

### 📥 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/LinkHeadGen.git
   cd LinkHeadGen
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### 💻 Local Development
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser to preview the site.

### 🏗️ Build
Compile a production-ready, fully optimized static website:
```bash
npm run build
```
This builds the site into the `dist/` directory, outputting clean, pre-rendered static HTML files, sitemaps, and minified scripts.

### 🔍 Preview Build
Preview the compiled static bundle locally:
```bash
npm run preview
```

---

## ☁️ Deployment (Cloudflare Pages)

LinkHeadGen is optimized to run as a static site on **Cloudflare Pages**.

### Continuous Deployment via Git
1. Log in to your Cloudflare Dashboard and navigate to **Workers & Pages**.
2. Select **Create application** -> **Pages** -> **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Framework Preset**: `Astro`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
4. Click **Save and Deploy**. Cloudflare will automatically build and publish your updates on every branch push.

---

## 📈 SEO Features
- **Meta Optimization**: Customized semantic titles, descriptions, canonical URLs, and OpenGraph/Twitter cards for all pages.
- **Dynamic Sitemap**: Automatically generated using `@astrojs/sitemap` integration on every build (excludes error pages and serialization matches SEO priority criteria).
- **Search Engine Schema**: Injects pre-compiled JSON-LD schemas:
  - `WebApplication` (Aggregate ratings and platform requirements)
  - `BreadcrumbList` (Site navigation paths)
  - `FAQPage` (Promotes FAQ rich snippets directly in Google/Bing SERPs)
- **Deep-Dive Content**: Pre-loaded with a 2,000+ words SEO-optimized article on LinkedIn profile branding.

---

## 🤝 Contributing
Contributions are welcome! If you'd like to improve the formulas, add examples, or refine the layout:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author
**Ramu Rajbhar**
- **Role**: Founder of LinkHeadGen
- **Website**: [https://linkheadgen.com](https://linkheadgen.com)
- **LinkedIn**: [Ramu Rajbhar](https://www.linkedin.com/in/ramurajbhar)
