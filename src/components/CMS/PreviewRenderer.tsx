// src/components/CMS/PreviewRenderer.tsx
import React, { useMemo } from 'react';
import { SiteConfig, SectionConfig, ProductItem } from '../../types/index';


interface PreviewRendererProps {
  config: SiteConfig;
  activePageId: string;
  viewMode: 'mobile' | 'desktop';
}

export const PreviewRenderer: React.FC<PreviewRendererProps> = ({
  config,
  activePageId,
  viewMode
}) => {
  const generateHTML = useMemo(() => {
    const activePage = config.pages.find((p: { id: string; }) => p.id === activePageId);
    
    if (!activePage) return '<div></div>';

    const css = generateCSS(config);
    const pageHTML = generatePageHTML(activePage, config);

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.siteName}</title>
  <style>${css}</style>
</head>
<body>
  ${pageHTML}
</body>
</html>
    `;
  }, [config, activePageId]);

  return (
    <iframe
      srcDoc={generateHTML}
      className="w-full h-full border-0"
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      title="Site Preview"
    />
  );
};

// Helper: Generate CSS
function generateCSS(config: SiteConfig): string {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      color: #1f2937;
      line-height: 1.6;
    }

    nav {
      position: sticky;
      top: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #e5e7eb;
      z-index: 40;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    nav .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-weight: bold;
      color: #111827;
    }

    nav .logo img {
      height: 2rem;
      width: 2rem;
      object-fit: contain;
    }

    nav .nav-links {
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #4b5563;
    }

    nav .nav-links a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      transition: color 0.3s;
    }

    nav .nav-links a:hover,
    nav .nav-links a.active {
      color: #2563eb;
      font-weight: 600;
    }

    .hero {
      position: relative;
      padding: 3rem 1rem;
      text-align: center;
      background: #1f2937;
      color: white;
      overflow: hidden;
      animation: fadeInZoom 0.7s ease-out;
    }

    .hero.with-bg {
      background-size: cover;
      background-position: center;
    }

    .hero::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      max-width: 56rem;
      margin: 0 auto;
    }

    .hero h1 {
      font-size: 1.875rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.125rem;
      opacity: 0.9;
    }

    .text-section {
      padding: 2rem 1rem;
      max-width: 48rem;
      margin: 0 auto;
      color: #374151;
      white-space: pre-wrap;
      line-height: 1.8;
    }

    .image-section {
      padding: 1.5rem 1rem;
      max-width: 64rem;
      margin: 0 auto;
    }

    .image-section img {
      width: 100%;
      border-radius: 0.75rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: box-shadow 0.3s;
    }

    .image-section img:hover {
      box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    }

    .image-placeholder {
      background: #f3f4f6;
      height: 16rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      font-style: italic;
    }

    .products-section {
      padding: 3rem 1rem;
      background: #f9fafb;
    }

    .products-container {
      max-width: 80rem;
      margin: 0 auto;
    }

    .products-title {
      font-size: 1.875rem;
      font-weight: bold;
      color: #111827;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .products-carousel {
      display: flex;
      gap: 1.5rem;
      overflow-x: auto;
      padding: 0 1rem 2rem;
      scroll-snap-type: x mandatory;
    }

    .product-card {
      flex-shrink: 0;
      width: 16rem;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border: 1px solid #e5e7eb;
      overflow: hidden;
      transition: all 0.3s;
      scroll-snap-align: center;
    }

    .product-card:hover {
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      transform: translateY(-4px);
    }

    .product-image {
      height: 10rem;
      background: #e5e7eb;
      position: relative;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }

    .product-card:hover .product-image img {
      transform: scale(1.05);
    }

    .product-heart {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: rgba(255,255,255,0.8);
      backdrop-filter: blur(10px);
      padding: 0.5rem;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      transition: all 0.3s;
    }

    .product-heart:hover {
      background: #fef2f2;
      color: #ef4444;
    }

    .product-info {
      padding: 1rem;
    }

    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }

    .product-title {
      font-weight: 600;
      color: #111827;
      font-size: 0.875rem;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .product-price {
      font-weight: 600;
      color: #2563eb;
      font-size: 0.875rem;
    }

    .product-description {
      font-size: 0.75rem;
      color: #6b7280;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 2rem;
    }

    .product-button {
      width: 100%;
      background: #111827;
      color: white;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: background 0.3s;
    }

    .product-button:hover {
      background: #2563eb;
    }

    .form-section {
      padding: 2rem 1rem;
      background: white;
    }

    .form-container {
      max-width: 28rem;
      margin: 0 auto;
      background: #f9fafb;
      padding: 1.5rem;
      border-radius: 1rem;
      border: 1px solid #e5e7eb;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-family: inherit;
      transition: border 0.3s, box-shadow 0.3s;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
    }

    .form-textarea {
      min-height: 8rem;
      resize: vertical;
    }

    .form-button {
      width: 100%;
      background: #111827;
      color: white;
      padding: 0.625rem 1rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .form-button:hover {
      background: #374151;
    }

    footer {
      background: #111827;
      color: #9ca3af;
      padding: 2rem 1rem;
      text-align: center;
      font-size: 0.875rem;
      margin-top: auto;
    }

    .crisis-page {
      min-height: 100vh;
      background: #dc2626;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }

    .crisis-icon {
      width: 4rem;
      height: 4rem;
      margin-bottom: 1.5rem;
      animation: bounce 1s infinite;
    }

    .crisis-title {
      font-size: 1.875rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .crisis-message {
      font-size: 1.125rem;
      max-width: 28rem;
      margin: 0 auto;
      opacity: 0.9;
    }

    @keyframes fadeInZoom {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-0.5rem); }
    }

    @media (max-width: 640px) {
      .hero h1 {
        font-size: 1.5rem;
      }
      
      .hero p {
        font-size: 1rem;
      }

      .products-title {
        font-size: 1.5rem;
      }

      .product-card {
        width: 14rem;
      }

      nav .nav-links {
        display: none;
      }
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar {
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
  `;
}

// Helper: Generate Page HTML
function generatePageHTML(page: any, config: SiteConfig): string {
  if (config.crisisMode?.enabled) {
    return `
      <div class="crisis-page">
        <svg class="crisis-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <h1 class="crisis-title">${config.crisisMode.title}</h1>
        <p class="crisis-message">${config.crisisMode.message}</p>
      </div>
    `;
  }

  const navHTML = generateNav(config, page.id);
  const sectionsHTML = page.sections.map((s: SectionConfig) => generateSection(s, config)).join('');
  const footerHTML = generateFooter(config);

  return `${navHTML}${sectionsHTML}${footerHTML}`;
}

// Helper: Generate Navigation
function generateNav(config: SiteConfig, activePageId: string): string {
  const logo = config.logo ? `<img src="${config.logo}" alt="Logo">` : '';
  const navLinks = config.pages
    .filter((p: any) => !p.isHidden)
    .map((p: { id: string; name: any; }) => `<a href="#" class="${p.id === activePageId ? 'active' : ''}">${p.name}</a>`)
    .join('');

  return `
    <nav>
      <div class="logo">${logo}<span>${config.siteName}</span></div>
      <div class="nav-links">${navLinks}</div>
    </nav>
  `;
}

// Helper: Generate Section
function generateSection(section: SectionConfig, config: SiteConfig): string {
  switch (section.type) {
    case 'hero':
      const bgStyle = section.content.bgImage
        ? `style="background-image: url('${section.content.bgImage}'); background-size: cover; background-position: center;"`
        : '';
      return `
        <div class="hero ${section.content.bgImage ? 'with-bg' : ''}" ${bgStyle}>
          <div class="hero-content">
            <h1>${section.content.title}</h1>
            <p>${section.content.subtitle}</p>
          </div>
        </div>
      `;

    case 'text':
      return `<div class="text-section">${section.content.text}</div>`;

    case 'image':
      if (section.content.src) {
        return `
          <div class="image-section">
            <img src="${section.content.src}" alt="Content Image">
          </div>
        `;
      }
      return `<div class="image-section"><div class="image-placeholder">Image Placeholder</div></div>`;

    case 'products':
      const products = section.content.products || [];
      if (products.length === 0) {
        return `
          <div class="products-section">
            <div class="products-container">
              <h3 class="products-title">Nos Produits</h3>
              <p style="text-align: center; color: #9ca3af; font-style: italic;">Aucun produit configuré.</p>
            </div>
          </div>
        `;
      }

      const cardsHTML = products
        .map((prod: ProductItem) => `
          <div class="product-card">
            <div class="product-image">
              ${prod.image ? `<img src="${prod.image}" alt="${prod.title}">` : ''}
              <button class="product-heart" onclick="this.textContent = this.textContent === '❤️' ? '🤍' : '❤️'">🤍</button>
            </div>
            <div class="product-info">
              <div class="product-header">
                <span class="product-title">${prod.title}</span>
                <span class="product-price">${prod.price}</span>
              </div>
              <p class="product-description">${prod.description}</p>
              <button class="product-button">Valider</button>
            </div>
          </div>
        `)
        .join('');

      return `
        <div class="products-section">
          <div class="products-container">
            <h3 class="products-title">Nos Produits</h3>
            <div class="products-carousel">${cardsHTML}</div>
          </div>
        </div>
      `;

    case 'form':
      return `
        <div class="form-section">
          <div class="form-container">
            <form onsubmit="event.preventDefault(); alert('Formulaire soumis');">
              <div class="form-group">
                <label class="form-label">${section.content.emailLabel}</label>
                <input type="email" class="form-input" placeholder="exemple@email.com" required>
              </div>
              <div class="form-group">
                <label class="form-label">${section.content.messageLabel}</label>
                <textarea class="form-textarea" placeholder="Votre message..." required></textarea>
              </div>
              <button type="submit" class="form-button">${section.content.buttonText}</button>
            </form>
          </div>
        </div>
      `;

    default:
      return '';
  }
}

// Helper: Generate Footer
function generateFooter(config: SiteConfig): string {
  const year = new Date().getFullYear();
  return `
    <footer>
      <p>&copy; ${year} ${config.siteName}. Propulsé par NovaWeb.</p>
    </footer>
  `;
}