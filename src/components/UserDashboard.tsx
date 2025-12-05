import React, { useState, useEffect } from 'react';
import { 
  Rocket, Settings, Layout, Plus, Trash2, 
  Image as ImageIcon, Type, ShoppingBag, Eye,
  Smartphone, Monitor, AlertTriangle, Menu, Upload,
  Heart, Send, X, PlusCircle, Check, List, Edit3,
  Save, Globe
} from 'lucide-react';
import { Page } from '../types';

// --- Dashboard Types ---
type PageType = 'home' | 'about' | 'contact' | 'custom' | 'crisis';
type SectionType = 'hero' | 'text' | 'image' | 'products' | 'form';
interface DashboardProps {
  onNavigate: (page: Page) => void;
}
interface ProductItem {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string | null;
}

interface SectionConfig {
  id: string;
  type: SectionType;
  content: any; // Flexible content structure
}

interface PageConfig {
  id: string;
  name: string;
  type: PageType;
  sections: SectionConfig[];
  isHidden?: boolean;
}

interface SiteConfig {
  siteName: string;
  logo: string | null;
  pages: PageConfig[];
  crisisMode: {
    enabled: boolean;
    title: string;
    message: string;
  };
}

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

// --- Initial State ---
const INITIAL_CONFIG: SiteConfig = {
  siteName: "Mon Site Web",
  logo: null,
  crisisMode: {
    enabled: false,
    title: "Maintenance",
    message: "Notre site est momentanément indisponible pour maintenance. Nous revenons très vite."
  },
  pages: [
    { 
      id: 'home', 
      name: 'Accueil', 
      type: 'home', 
      sections: [
        { 
            id: 'h-hero', 
            type: 'hero', 
            content: { 
                title: "Bienvenue sur notre site", 
                subtitle: "Découvrez nos services uniques",
                bgImage: null 
            } 
        },
        {
            id: 'h-body',
            type: 'text',
            content: { text: "Ceci est le contenu principal de votre page d'accueil. Vous pouvez le modifier." }
        }
      ] 
    },
    { 
      id: 'about', 
      name: 'À Propos', 
      type: 'about', 
      sections: [{ id: 'a-text', type: 'text', content: { text: "Notre histoire commence ici..." } }] 
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      type: 'contact', 
      sections: [
        { id: 'c-text', type: 'text', content: { text: "N'hésitez pas à nous laisser un message." } },
        { id: 'c-form', type: 'form', content: { emailLabel: "Votre Email", messageLabel: "Votre Message", buttonText: "Envoyer" } }
      ] 
    },
  ]
};

const UserDashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [activePageId, setActivePageId] = useState<string>('home');
  // Default to mobile view as requested
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('mobile');
  const [showCrisisSettings, setShowCrisisSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Mobile Dashboard Navigation State
  const [mobileTab, setMobileTab] = useState<'menu' | 'editor' | 'preview'>('preview');

  // --- Handlers ---

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setConfig(prev => ({ ...prev, logo: url }));
    }
  };

  const handleSaveSite = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
        setIsSaving(false);
        alert("Site validé et publié avec succès !");
    }, 1500);
  };

  const handleAddPage = () => {
    const newId = `page-${Date.now()}`;
    const newPage: PageConfig = {
      id: newId,
      name: 'Nouvelle Page',
      type: 'custom',
      sections: []
    };
    setConfig(prev => ({ ...prev, pages: [...prev.pages, newPage] }));
    setActivePageId(newId);
    setShowCrisisSettings(false);
    // Switch to editor on mobile when adding page
    setMobileTab('editor');
  };

  const handleRemovePage = (id: string) => {
    setConfig(prev => ({ ...prev, pages: prev.pages.filter(p => p.id !== id) }));
    if (activePageId === id) setActivePageId('home');
  };

  const handleUpdatePageName = (id: string, newName: string) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === id ? { ...p, name: newName } : p)
    }));
  };

  const handleAddSection = (pageId: string, type: SectionType) => {
    let content: any = {};
    if (type === 'products') content = { products: [] };
    else if (type === 'form') content = { emailLabel: "Email", messageLabel: "Message", buttonText: "Envoyer" };
    else content = { text: 'Nouveau contenu', src: null };

    const newSection: SectionConfig = {
      id: `sec-${Date.now()}`,
      type,
      content
    };
    
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.map(p => {
        if (p.id !== pageId) return p;
        return { ...p, sections: [...p.sections, newSection] };
      })
    }));
  };

  const updateSectionContent = (pageId: string, sectionId: string, newContent: any) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.map(p => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          sections: p.sections.map(s => s.id === sectionId ? { ...s, content: { ...s.content, ...newContent } } : s)
        };
      })
    }));
  };

  // --- Product Handlers ---
  const handleAddProduct = (pageId: string, sectionId: string) => {
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      title: "Nouveau Produit",
      price: "0.00 €",
      description: "Description du produit",
      image: null
    };
    
    // Find current products
    const page = config.pages.find(p => p.id === pageId);
    const section = page?.sections.find(s => s.id === sectionId);
    const currentProducts = section?.content.products || [];

    updateSectionContent(pageId, sectionId, { products: [...currentProducts, newProduct] });
  };

  const handleUpdateProduct = (pageId: string, sectionId: string, productId: string, field: keyof ProductItem, value: any) => {
    const page = config.pages.find(p => p.id === pageId);
    const section = page?.sections.find(s => s.id === sectionId);
    if (!section) return;

    const updatedProducts = section.content.products.map((p: ProductItem) => 
      p.id === productId ? { ...p, [field]: value } : p
    );
    updateSectionContent(pageId, sectionId, { products: updatedProducts });
  };

  const handleRemoveProduct = (pageId: string, sectionId: string, productId: string) => {
    const page = config.pages.find(p => p.id === pageId);
    const section = page?.sections.find(s => s.id === sectionId);
    if (!section) return;

    const updatedProducts = section.content.products.filter((p: ProductItem) => p.id !== productId);
    updateSectionContent(pageId, sectionId, { products: updatedProducts });
  };

  // --- Render Helpers ---

  const activePage = config.pages.find(p => p.id === activePageId);

  return (
    <div className="flex flex-col pt-17 lg:flex-row h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* --- Sidebar (Navigation & Config) --- */}
      <div className={`${mobileTab === 'menu' ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 bg-white border-r border-slate-200 flex-col flex-shrink-0 z-20 shadow-xl h-full lg:h-auto absolute lg:relative`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <div className="bg-primary-600 p-1.5 rounded-lg">
                <Settings className="w-4 h-4 text-white" />
            </div>
            CMS Site
          </div>
          <button onClick={() => onNavigate('home')} className="text-xs text-slate-500 hover:text-red-500">
            Déconnexion
          </button>
        </div>

        {/* Global Settings */}
        <div className="p-4 border-b border-slate-100 space-y-4">
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Identité du site</label>
                <input 
                    type="text" 
                    value={config.siteName}
                    onChange={(e) => setConfig({...config, siteName: e.target.value})}
                    className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Nom du site"
                />
            </div>
            <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Logo</label>
                 <div className="flex items-center gap-3">
                    {config.logo ? (
                        <img src={config.logo} className="w-10 h-10 object-contain border rounded" alt="Logo" />
                    ) : (
                        <div className="w-10 h-10 bg-slate-100 rounded border border-dashed border-slate-300 flex items-center justify-center text-slate-400">?</div>
                    )}
                    <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 transition-colors">
                        Upload
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </label>
                 </div>
            </div>
            <button 
                onClick={() => { setShowCrisisSettings(true); setActivePageId(''); if(window.innerWidth < 1024) setMobileTab('editor'); }}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${config.crisisMode.enabled ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
                <AlertTriangle size={16} />
                Gestion Crise
            </button>
        </div>

        {/* Pages List */}
        <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pages ({config.pages.length})</span>
                <button onClick={handleAddPage} className="text-primary-600 hover:bg-primary-50 p-1 rounded transition-colors">
                    <Plus size={16} />
                </button>
            </div>
            
            <div className="space-y-2">
                {config.pages.map(page => (
                    <div 
                        key={page.id}
                        onClick={() => { setActivePageId(page.id); setShowCrisisSettings(false); if(window.innerWidth < 1024) setMobileTab('editor'); }}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer border transition-all ${activePageId === page.id ? 'bg-primary-50 border-primary-200 text-primary-900' : 'bg-white border-transparent hover:bg-slate-50 text-slate-600'}`}
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <Layout size={16} className={activePageId === page.id ? 'text-primary-500' : 'text-slate-400'} />
                            <span className="text-sm font-medium truncate">{page.name}</span>
                        </div>
                        {page.type === 'custom' && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleRemovePage(page.id); }}
                                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* --- Middle: Editor Panel --- */}
      <div className={`${mobileTab === 'editor' ? 'flex' : 'hidden'} lg:flex w-full lg:w-96 bg-slate-50 border-r border-slate-200 flex-col overflow-y-auto z-10 shadow-lg h-full lg:h-auto absolute lg:relative`}>
        <div className="p-6 pb-24 lg:pb-6">
            {showCrisisSettings ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="text-red-500" /> Mode Crise
                    </h2>
                    <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                        <label className="flex items-center gap-3 cursor-pointer mb-4">
                            <div 
                                onClick={() => setConfig({...config, crisisMode: {...config.crisisMode, enabled: !config.crisisMode.enabled}})}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${config.crisisMode.enabled ? 'bg-red-500' : 'bg-slate-300'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.crisisMode.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                            <span className="text-sm font-medium text-slate-700">Activer la page de crise</span>
                        </label>
                        <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded">
                            L'activation de ce mode remplace toutes les pages de votre site par le message ci-dessous. Utile pour les maintenances urgentes.
                        </p>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Titre de la page</label>
                                <input 
                                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 outline-none"
                                    value={config.crisisMode.title}
                                    onChange={(e) => setConfig({...config, crisisMode: {...config.crisisMode, title: e.target.value}})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Message aux visiteurs</label>
                                <textarea 
                                    className="w-full border rounded-md px-3 py-2 text-sm h-32 focus:ring-2 focus:ring-red-200 outline-none"
                                    value={config.crisisMode.message}
                                    onChange={(e) => setConfig({...config, crisisMode: {...config.crisisMode, message: e.target.value}})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : activePage ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                     <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configuration</label>
                        <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium">{activePage.type}</span>
                     </div>
                     <div>
                        <input 
                            type="text" 
                            value={activePage.name}
                            onChange={(e) => handleUpdatePageName(activePage.id, e.target.value)}
                            className="w-full text-lg font-bold bg-transparent border-b border-slate-300 focus:border-primary-500 outline-none px-1 py-1 text-slate-800"
                            placeholder="Nom de la page"
                        />
                     </div>

                     {/* Custom Sections Builder */}
                     <div>
                        <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-slate-700">Sections ({activePage.sections.length})</span>
                            <div className="flex gap-1">
                                <button title="Texte" onClick={() => handleAddSection(activePage.id, 'text')} className="p-2 bg-white border hover:bg-slate-50 rounded text-slate-600"><Type size={16} /></button>
                                <button title="Image" onClick={() => handleAddSection(activePage.id, 'image')} className="p-2 bg-white border hover:bg-slate-50 rounded text-slate-600"><ImageIcon size={16} /></button>
                                <button title="Produits" onClick={() => handleAddSection(activePage.id, 'products')} className="p-2 bg-white border hover:bg-slate-50 rounded text-slate-600"><ShoppingBag size={16} /></button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {activePage.sections.map((section, index) => (
                                <div key={section.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group">
                                    <div className="absolute top-2 right-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-xs font-bold text-slate-300 uppercase">{section.type}</span>
                                    </div>

                                    {/* Hero Editor */}
                                    {section.type === 'hero' && (
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2"><Layout size={14}/> Hero Header</h4>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500">Titre Principal</label>
                                                <input 
                                                    className="w-full border rounded px-2 py-1.5 text-sm mt-1"
                                                    value={section.content.title}
                                                    onChange={(e) => updateSectionContent(activePage.id, section.id, { title: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500">Sous-titre</label>
                                                <input 
                                                    className="w-full border rounded px-2 py-1.5 text-sm mt-1"
                                                    value={section.content.subtitle}
                                                    onChange={(e) => updateSectionContent(activePage.id, section.id, { subtitle: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500">Image de fond</label>
                                                <input type="file" className="block w-full text-xs text-slate-500 mt-1 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" 
                                                    onChange={(e) => {
                                                        if(e.target.files?.[0]) updateSectionContent(activePage.id, section.id, { bgImage: URL.createObjectURL(e.target.files[0]) })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Text Editor */}
                                    {section.type === 'text' && (
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2"><Type size={14}/> Bloc Texte</h4>
                                            <textarea 
                                                className="w-full border rounded px-2 py-2 text-sm h-24"
                                                value={section.content.text}
                                                onChange={(e) => updateSectionContent(activePage.id, section.id, { text: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    {/* Image Editor */}
                                    {section.type === 'image' && (
                                        <div>
                                             <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2"><ImageIcon size={14}/> Image Unique</h4>
                                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors">
                                                 <input type="file" className="hidden" id={`upload-${section.id}`} 
                                                    onChange={(e) => {
                                                        if(e.target.files?.[0]) updateSectionContent(activePage.id, section.id, { src: URL.createObjectURL(e.target.files[0]) })
                                                    }}
                                                 />
                                                 <label htmlFor={`upload-${section.id}`} className="cursor-pointer flex flex-col items-center">
                                                    {section.content.src ? (
                                                        <img src={section.content.src} className="h-20 object-cover rounded mb-2" alt="Preview"/>
                                                    ) : (
                                                        <Upload className="text-slate-400 mb-1" size={20} />
                                                    )}
                                                    <span className="text-xs text-primary-600 font-medium">Choisir un fichier</span>
                                                 </label>
                                            </div>
                                        </div>
                                    )}

                                    {/* Product Carousel Editor */}
                                    {section.type === 'products' && (
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <ShoppingBag size={14} className="text-primary-600"/>
                                                    <span className="text-sm font-bold text-slate-700">Produits ({section.content.products?.length || 0})</span>
                                                </div>
                                                <button 
                                                    onClick={() => handleAddProduct(activePage.id, section.id)}
                                                    className="text-xs flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-1 rounded hover:bg-primary-100"
                                                >
                                                    <PlusCircle size={12} /> Ajouter
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-4 mt-2">
                                                {section.content.products?.map((product: ProductItem) => (
                                                    <div key={product.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 relative">
                                                        <button 
                                                            onClick={() => handleRemoveProduct(activePage.id, section.id, product.id)}
                                                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                                                        >
                                                            <X size={14}/>
                                                        </button>
                                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                                            <input 
                                                                className="text-xs border rounded p-1" placeholder="Nom"
                                                                value={product.title}
                                                                onChange={(e) => handleUpdateProduct(activePage.id, section.id, product.id, 'title', e.target.value)}
                                                            />
                                                            <input 
                                                                className="text-xs border rounded p-1" placeholder="Prix"
                                                                value={product.price}
                                                                onChange={(e) => handleUpdateProduct(activePage.id, section.id, product.id, 'price', e.target.value)}
                                                            />
                                                        </div>
                                                        <textarea 
                                                            className="w-full text-xs border rounded p-1 mb-2 h-12" placeholder="Description"
                                                            value={product.description}
                                                            onChange={(e) => handleUpdateProduct(activePage.id, section.id, product.id, 'description', e.target.value)}
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <label className="cursor-pointer bg-white border border-slate-300 px-2 py-1 rounded text-xs hover:bg-slate-50 flex-1 text-center truncate">
                                                                {product.image ? 'Changer Image' : 'Ajouter Image'}
                                                                <input type="file" className="hidden" accept="image/*"
                                                                    onChange={(e) => {
                                                                        if(e.target.files?.[0]) handleUpdateProduct(activePage.id, section.id, product.id, 'image', URL.createObjectURL(e.target.files[0]));
                                                                    }}
                                                                />
                                                            </label>
                                                            {product.image && <img src={product.image} className="w-8 h-8 rounded object-cover border" alt="preview" />}
                                                        </div>
                                                    </div>
                                                ))}
                                                {(!section.content.products || section.content.products.length === 0) && (
                                                    <p className="text-xs text-slate-400 italic text-center py-2">Aucun produit. Ajoutez-en un !</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Form Editor */}
                                    {section.type === 'form' && (
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2"><Send size={14}/> Formulaire Contact</h4>
                                            <p className="text-xs text-slate-500 mb-2">Configurez les labels de votre formulaire.</p>
                                            <div className="space-y-2">
                                                <input 
                                                    className="w-full border rounded px-2 py-1.5 text-sm"
                                                    value={section.content.emailLabel} placeholder="Label Email"
                                                    onChange={(e) => updateSectionContent(activePage.id, section.id, { emailLabel: e.target.value })}
                                                />
                                                <input 
                                                    className="w-full border rounded px-2 py-1.5 text-sm"
                                                    value={section.content.messageLabel} placeholder="Label Message"
                                                    onChange={(e) => updateSectionContent(activePage.id, section.id, { messageLabel: e.target.value })}
                                                />
                                                <input 
                                                    className="w-full border rounded px-2 py-1.5 text-sm font-semibold"
                                                    value={section.content.buttonText} placeholder="Texte Bouton"
                                                    onChange={(e) => updateSectionContent(activePage.id, section.id, { buttonText: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                     </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <p>Sélectionnez une page pour l'éditer</p>
                </div>
            )}
        </div>
      </div>

      {/* --- Right: Live Preview --- */}
      <div className={`${mobileTab === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 bg-slate-200 flex-col relative overflow-hidden z-0 h-full`}>
        {/* Toolbar */}
        <div className="bg-white border-b border-slate-200 p-2 flex items-center justify-between gap-4 shadow-sm z-10 shrink-0">
             {/* View Mode Toggle */}
             <div className="flex bg-slate-100 rounded-lg p-1">
                <button 
                    onClick={() => setViewMode('desktop')}
                    className={`p-1.5 px-3 rounded-md flex items-center gap-2 transition-all text-xs font-medium ${viewMode === 'desktop' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Monitor size={16} /> <span className="hidden sm:inline">Bureau</span>
                </button>
                <button 
                    onClick={() => setViewMode('mobile')}
                    className={`p-1.5 px-3 rounded-md flex items-center gap-2 transition-all text-xs font-medium ${viewMode === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Smartphone size={16} /> <span className="hidden sm:inline">Mobile</span>
                </button>
             </div>

             {/* Live Indicator & Validate Button */}
             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="hidden md:inline font-medium">Aperçu en direct</span>
                 </div>

                 {/* IMPORTANT: Validate Button (Black) */}
                 <button 
                    onClick={handleSaveSite}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-wait"
                 >
                    {isSaving ? (
                        <>Sauvegarde...</>
                    ) : (
                        <>
                            <Check size={16} strokeWidth={3} />
                            Valider
                        </>
                    )}
                 </button>
             </div>
        </div>

        {/* Device Frame */}
        <div className="flex-1 overflow-hidden p-2 sm:p-8 flex justify-center items-start">
             <div 
                className={`bg-white shadow-2xl transition-all duration-500 ease-in-out relative overflow-hidden flex flex-col ${viewMode === 'mobile' ? 'w-[320px] sm:w-[375px] h-[600px] sm:h-[812px] rounded-[2rem] sm:rounded-[3rem] border-8 border-slate-800' : 'w-full max-w-5xl h-[95%] rounded-lg border border-slate-300'}`}
             >
                {/* Internal Browser Bar for Desktop */}
                {viewMode === 'desktop' && (
                    <div className="bg-slate-100 border-b border-slate-200 p-2 flex items-center gap-2 flex-shrink-0">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-md h-6 mx-4 px-3 flex items-center text-xs text-slate-400 truncate">
                            https://{config.siteName.toLowerCase().replace(/\s+/g, '-')}.starConnect.app/{activePageId !== 'home' ? activePageId : ''}
                        </div>
                    </div>
                )}
                
                {/* Mobile Notch */}
                {viewMode === 'mobile' && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-6 bg-slate-800 rounded-b-xl z-50"></div>
                )}

                {/* --- Site Content Render --- */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative bg-white">
                    {config.crisisMode.enabled ? (
                        <div className="min-h-full bg-red-600 text-white flex flex-col items-center justify-center p-8 text-center">
                            <AlertTriangle size={64} className="mb-6 animate-bounce" />
                            <h1 className="text-3xl font-bold mb-4">{config.crisisMode.title}</h1>
                            <p className="text-xl max-w-md mx-auto opacity-90">{config.crisisMode.message}</p>
                        </div>
                    ) : (
                        <>
                            {/* Generated Navbar */}
                            <nav className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 z-40 px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePageId('home')}>
                                    {config.logo ? <img src={config.logo} className="h-8 w-8 object-contain" /> : <div className="h-8 w-8 bg-primary-600 rounded"></div>}
                                    <span className="font-bold text-slate-900 truncate max-w-[120px]">{config.siteName}</span>
                                </div>
                                <div className="hidden sm:flex gap-4 text-sm font-medium text-slate-600">
                                    {config.pages.filter(p => !p.isHidden).map(p => (
                                        <button 
                                            key={p.id} 
                                            onClick={() => setActivePageId(p.id)}
                                            className={`cursor-pointer hover:text-primary-600 transition-colors ${activePageId === p.id ? 'text-primary-600 font-bold' : ''}`}
                                        >
                                            {p.name}
                                        </button>
                                    ))}
                                </div>
                                <Menu className="sm:hidden text-slate-600" size={20} />
                            </nav>

                            {/* Generated Page Content */}
                            {activePage && (
                                <div className="min-h-[500px]">
                                    {activePage.sections.map(section => (
                                        <div key={section.id}>
                                            {/* Hero Section */}
                                            {section.type === 'hero' && (
                                                <div 
                                                    className="relative py-12 sm:py-20 px-4 sm:px-6 text-center bg-slate-900 text-white overflow-hidden"
                                                    style={{ 
                                                        backgroundImage: section.content.bgImage ? `url(${section.content.bgImage})` : undefined,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}
                                                >
                                                    {section.content.bgImage && <div className="absolute inset-0 bg-black/50"></div>}
                                                    <div className="relative z-10 animate-in fade-in zoom-in duration-700">
                                                        <h1 className="text-3xl md:text-5xl font-bold mb-4">{section.content.title}</h1>
                                                        <p className="text-lg sm:text-xl opacity-90">{section.content.subtitle}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Text Section */}
                                            {section.type === 'text' && (
                                                <div className="py-8 sm:py-12 px-4 sm:px-6 max-w-3xl mx-auto text-slate-700 leading-relaxed whitespace-pre-wrap">
                                                    {section.content.text}
                                                </div>
                                            )}

                                            {/* Image Section */}
                                            {section.type === 'image' && (
                                                <div className="py-6 sm:py-8 px-4 sm:px-6 max-w-4xl mx-auto">
                                                    {section.content.src ? (
                                                        <img src={section.content.src} className="w-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow" alt="User content" />
                                                    ) : (
                                                        <div className="bg-slate-100 h-64 rounded-xl flex items-center justify-center text-slate-400 italic">
                                                            Image Placeholder
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Product Carousel Section */}
                                            {section.type === 'products' && (
                                                <div className="py-12 bg-slate-50">
                                                    <div className="px-4 sm:px-6 max-w-6xl mx-auto">
                                                        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Nos Produits</h3>
                                                        {(!section.content.products || section.content.products.length === 0) ? (
                                                             <div className="text-center text-slate-400 italic">Aucun produit configuré.</div>
                                                        ) : (
                                                            <div className="flex overflow-x-auto gap-6 pb-8 px-2 sm:px-4 no-scrollbar snap-x">
                                                                {section.content.products.map((prod: ProductItem) => (
                                                                    <div key={prod.id} className="flex-shrink-0 w-60 sm:w-64 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden snap-center hover:shadow-xl transition-all duration-300 group">
                                                                        <div className="h-40 bg-slate-200 relative overflow-hidden">
                                                                            {prod.image ? (
                                                                                <img src={prod.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={prod.title} />
                                                                            ) : (
                                                                                <div className="flex items-center justify-center h-full text-slate-400"><ShoppingBag opacity={0.5}/></div>
                                                                            )}
                                                                            <button className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors shadow-sm group/heart">
                                                                                <Heart size={16} className="group-active/heart:fill-red-500 group-active/heart:text-red-500 transition-all"/>
                                                                            </button>
                                                                        </div>
                                                                        <div className="p-4">
                                                                            <div className="flex justify-between items-start mb-2">
                                                                                <h4 className="font-bold text-slate-900 text-sm line-clamp-1" title={prod.title}>{prod.title}</h4>
                                                                                <span className="font-bold text-primary-600 text-sm">{prod.price}</span>
                                                                            </div>
                                                                            <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8">{prod.description}</p>
                                                                            <button className="w-full bg-slate-900 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-primary-600 transition-colors">
                                                                                Valider
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Form Section */}
                                            {section.type === 'form' && (
                                                <div className="py-8 sm:py-12 px-4 sm:px-6 bg-white">
                                                    <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                                                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-slate-700 mb-1">{section.content.emailLabel}</label>
                                                                <input type="email" className="w-full rounded-lg border-slate-200 focus:ring-primary-500 focus:border-primary-500 p-2 text-sm" placeholder="exemple@email.com" />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-slate-700 mb-1">{section.content.messageLabel}</label>
                                                                <textarea className="w-full rounded-lg border-slate-200 focus:ring-primary-500 focus:border-primary-500 p-2 text-sm h-32" placeholder="Votre message..." />
                                                            </div>
                                                            <button className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-bold shadow-lg hover:bg-slate-800 transition-all">
                                                                {section.content.buttonText}
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Generated Footer */}
                            <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center text-sm mt-auto">
                                <p>&copy; {new Date().getFullYear()} {config.siteName}. Propulsé par NovaWeb.</p>
                            </footer>
                        </>
                    )}
                </div>
             </div>
        </div>
      </div>

      {/* --- Mobile Bottom Nav (Visible only on small screens) --- */}
      <div className="lg:hidden bg-white border-t border-slate-200 flex justify-around p-3 z-50 safe-area-bottom">
        <button 
            onClick={() => setMobileTab('menu')}
            className={`flex flex-col items-center gap-1 text-xs font-medium ${mobileTab === 'menu' ? 'text-primary-600' : 'text-slate-400'}`}
        >
            <List size={20} />
            Menu
        </button>
        <button 
            onClick={() => setMobileTab('editor')}
            className={`flex flex-col items-center gap-1 text-xs font-medium ${mobileTab === 'editor' ? 'text-primary-600' : 'text-slate-400'}`}
        >
            <Edit3 size={20} />
            Éditer
        </button>
        <button 
            onClick={() => setMobileTab('preview')}
            className={`flex flex-col items-center gap-1 text-xs font-medium ${mobileTab === 'preview' ? 'text-primary-600' : 'text-slate-400'}`}
        >
            <Eye size={20} />
            Aperçu
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;