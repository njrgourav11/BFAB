# BFAB - Best Food For All Breeds

A modern, production-ready e-commerce platform for premium pet food products built with Next.js 16 and TypeScript. Features comprehensive dark mode/light mode support, responsive design, and adherence to SOLID principles.

## Overview

BFAB is a full-featured pet food e-commerce platform designed for pet owners seeking high-quality nutritional products for their pets. The application provides an intuitive shopping experience with detailed product information, feeding guidance, and comprehensive customer support resources.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with React 19
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Carousels**: [Swiper](https://swiperjs.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Linting**: [ESLint](https://eslint.org)

## Features

### Pages & Functionality

- **Home** (`/`) - Landing page with featured products and promotions
- **Shop** (`/shop-now`) - Product catalog and browsing
- **About Us** (`/about-us`) - Company information and values
- **Feeding Guide** (`/feeding-guide`) - Nutritional guidance and portion calculator
- **Paw Blog** (`/paw-blog`) - Pet care articles and resources
- **BFAB Cares** (`/bfab-cares`) - Community initiatives and sustainability
- **Ultimate Saver Packs** (`/ultimate-saver-packs`) - Bulk purchase options
- **Cart** (`/cart`) - Shopping cart management
- **Contact Us** (`/contact-us`) - Customer support and inquiries
- **Authentication** - User login and registration

### Design & UX

- **Dark Mode Support** - Seamless light/dark theme switching across all pages
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Accessibility** - WCAG compliance with semantic HTML
- **Smooth Animations** - Powered by Framer Motion for enhanced UX
- **Interactive Components** - Form validation, carousels, and dynamic content

### Code Quality

- **SOLID Principles** - Clean, maintainable architecture
- **Type Safety** - Full TypeScript coverage
- **Consistent Patterns** - Unified component and styling conventions
- **Production Ready** - Fully tested and compiled without errors

## Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or your preferred package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bfab
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser. The page auto-updates as you edit files.

### Build

Create an optimized production build:
```bash
npm run build
```

### Production

Start the production server:
```bash
npm start
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

```
bfab/
├── app/                      # Next.js app router directory
│   ├── components/           # Reusable React components
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with theme provider
│   ├── globals.css           # Global styles
│   ├── about-us/             # About page
│   ├── cart/                 # Shopping cart page
│   ├── contact-us/           # Contact page
│   ├── feeding-guide/        # Feeding guide with calculator
│   ├── login/                # User login page
│   ├── register/             # User registration page
│   ├── paw-blog/             # Blog listing and articles
│   ├── shop-now/             # Product catalog
│   ├── bfab-cares/           # Community initiatives
│   └── ultimate-saver-packs/ # Bundle deals page
├── public/                   # Static assets
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.ts            # Next.js configuration
├── eslint.config.mjs         # ESLint configuration
└── README.md                 # This file
```

## Theme & Styling

### Dark Mode Implementation

The application features comprehensive dark mode support using Tailwind CSS's `dark:` prefix. Theming is applied consistently across all pages:

- **Backgrounds**: `dark:bg-black`, `dark:bg-gray-900`, `dark:bg-gray-800`
- **Text**: `dark:text-white`, `dark:text-gray-300`, `dark:text-gray-400`
- **Borders**: `dark:border-gray-700`, `dark:border-gray-600`
- **Gradients**: All gradients include dark variants (e.g., `dark:from-blue-800`)

### Color Consistency

- Primary containers use white/black backgrounds
- Sections alternate between base color and slightly darker shades
- All interactive elements include hover states for both themes
- Smooth transitions: `transition-colors duration-300`

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com), the platform created by the Next.js team:

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy on every push

For other hosting options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Code Splitting**: Automatic per-route bundle splitting
- **Image Optimization**: Next.js Image component for responsive images
- **Font Optimization**: Web font loading optimization with `next/font`
- **Lazy Loading**: Components and images load on-demand

## Contributing

When contributing to this project:

1. Follow the established code style and patterns
2. Ensure all pages support both light and dark modes
3. Maintain TypeScript strict mode compliance
4. Run `npm run lint` before committing
5. Test changes in both themes

## License

[Add your license information here]

## Contact & Support

For support, please visit the [Contact Us](http://localhost:3000/contact-us) page or use the inquiries form.

## Acknowledgments

Built with Next.js, React, TypeScript, and Tailwind CSS. Special thanks to all open-source contributors and the frameworks used in this project.

---

**Note**: This is a production-ready application. All pages have been tested and verified for full dark mode support, accessibility compliance, and cross-browser compatibility.
