// src/components/CMS/UserDashboard.tsx
import React, { useState } from 'react';
import {
  Rocket,
  Settings,
  Layout,
  Plus,
  Trash2,
  Image as ImageIcon,
  Type,
  ShoppingBag,
  Eye,
  Smartphone,
  Monitor,
  AlertTriangle,
  Upload,
  Send,
  X,
  PlusCircle,
  Check,
  List,
  Edit3,
} from 'lucide-react';
import { SiteConfig, PageConfig, SectionConfig, SectionType, ProductItem } from '../../types/index';
import { PreviewRenderer } from './PreviewRenderer';

interface UserDashboardProps {
  config: SiteConfig;
  onConfigChange: (config: SiteConfig) => void;
  onPublish: () => Promise<any>;
  onExport: () => Promise<void>;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  config,
  onConfigChange,
  onPublish,
  onExport,
}) => {
  const [activePageId, setActivePageId] = useState<string>('home');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('mobile');
  const [showCrisisSettings, setShowCrisisSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [mobileTab, setMobileTab] = useState<'menu' | 'editor' | 'preview'>('preview');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // --- Handlers ---

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        onConfigChange({ ...config, logo: url });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveSite = async () => {
    try {
      setIsSaving(true);
      await onPublish();
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur publication:', error);
      alert('Erreur lors de la publication');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPage = () => {
    const newId = `page-${Date.now()}`;
    const newPage: PageConfig = {
      id: newId,
      name: 'Nouvelle Page',
      type: 'custom',
      sections: [],
    };
    onConfigChange({
      ...config,
      pages: [...config.pages, newPage],
    });
    setActivePageId(newId);
    if (window.innerWidth < 1024) setMobileTab('editor');
  };

  const handleRemovePage = (id: string) => {
    if (config.pages.length <= 1) {
      alert('Vous devez avoir au moins une page');
      return;
    }
    onConfigChange({
      ...config,
      pages: config.pages.filter(p => p.id !== id),
    });
    if (activePageId === id) setActivePageId(config.pages[0]?.id || 'home');
  };

  const handleUpdatePageName = (id: string, newName: string) => {
    onConfigChange({
      ...config,
      pages: config.pages.map(p => (p.id === id ? { ...p, name: newName } : p)),
    });
  };

  const handleAddSection = (pageId: string, type: SectionType) => {
    let content: any = {};
    if (type === 'hero') {
      content = { title: 'Titre', subtitle: 'Sous-titre', bgImage: null };
    } else if (type === 'text') {
      content = { text: 'Nouveau texte' };
    } else if (type === 'image') {
      content = { src: null };
    } else if (type === 'products') {
      content = { products: [] };
    } else if (type === 'form') {
      content = { emailLabel: 'Email', messageLabel: 'Message', buttonText: 'Envoyer' };
    }

    const newSection: SectionConfig = {
      id: `sec-${Date.now()}`,
      type,
      content,
    };

    onConfigChange({
      ...config,
      pages: config.pages.map(p => {
        if (p.id !== pageId) return p;
        return { ...p, sections: [...p.sections, newSection] };
      }),
    });
  };

  const handleRemoveSection = (pageId: string, sectionId: string) => {
    onConfigChange({
      ...config,
      pages: config.pages.map(p => {
        if (p.id !== pageId) return p;
        return { ...p, sections: p.sections.filter(s => s.id !== sectionId) };
      }),
    });
  };

  const updateSectionContent = (pageId: string, sectionId: string, newContent: any) => {
    onConfigChange({
      ...config,
      pages: config.pages.map(p => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          sections: p.sections.map(s =>
            s.id === sectionId ? { ...s, content: { ...s.content, ...newContent } } : s
          ),
        };
      }),
    });
  };

  const handleAddProduct = (pageId: string, sectionId: string) => {
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      title: 'Nouveau Produit',
      price: '0.00 €',
      description: 'Description',
      image: null,
    };
    const page = config.pages.find(p => p.id === pageId);
    const section = page?.sections.find(s => s.id === sectionId);
    const products = section?.content.products || [];
    updateSectionContent(pageId, sectionId, { products: [...products, newProduct] });
  };

  const handleUpdateProduct = (
    pageId: string,
    sectionId: string,
    productId: string,
    field: keyof ProductItem,
    value: any
  ) => {
    const page = config.pages.find(p => p.id === pageId);
    const section = page?.sections.find(s => s.id === sectionId);
    if (!section) return;
    const updated = section.content.products.map((p: ProductItem) =>
      p.id === productId ? { ...p, [field]: value } : p
    );
    updateSectionContent(pageId, sectionId, { products: updated });
  };

  const handleRemoveProduct = (pageId: string, sectionId: string, productId: string) => {
    const page = config.pages.find(p => p.id === pageId);
    const section = page?.sections.find(s => s.id === sectionId);
    if (!section) return;
    const updated = section.content.products.filter((p: ProductItem) => p.id !== productId);
    updateSectionContent(pageId, sectionId, { products: updated });
  };

  const handleFileUpload = (callback: (url: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        callback(url);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const activePage = config.pages.find(p => p.id === activePageId);

  return (
    <div className="flex flex-col pt-17 lg:flex-row h-screen bg-slate-100 overflow-hidden font-sans">
      {/* --- Sidebar --- */}
      <div className={`${mobileTab === 'menu' ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 bg-white border-r border-slate-200 flex-col flex-shrink-0 z-20 shadow-xl h-full lg:h-auto absolute lg:relative`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Settings className="w-4 h-4 text-white" />
            </div>
            CMS Site
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 border-b border-slate-100 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
              Nom du site
            </label>
            <input
              type="text"
              value={config.siteName}
              onChange={(e) => onConfigChange({ ...config, siteName: e.target.value })}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
              Slogan
            </label>
            <input
              type="text"
              value={config.tagline || ''}
              onChange={(e) => onConfigChange({ ...config, tagline: e.target.value })}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Votre slogan..."
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
              Logo
            </label>
            <div className="flex items-center gap-3">
              {config.logo && <img src={config.logo} className="w-10 h-10 object-contain border rounded" alt="Logo" />}
              <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded text-xs font-medium border transition-colors">
                Upload
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
              </label>
            </div>
          </div>

          <button
            onClick={() => {
              setShowCrisisSettings(true);
              if (window.innerWidth < 1024) setMobileTab('editor');
            }}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
              config.crisisMode?.enabled
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-slate-50 text-slate-600 border border-slate-200'
            }`}
          >
            <AlertTriangle size={16} />
            Mode Crise
          </button>
        </div>

        {/* Pages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Pages ({config.pages.length})</span>
            <button onClick={handleAddPage} className="text-blue-600 hover:bg-blue-50 p-1 rounded">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {config.pages.map(page => (
              <div
                key={page.id}
                onClick={() => {
                  setActivePageId(page.id);
                  setShowCrisisSettings(false);
                  if (window.innerWidth < 1024) setMobileTab('editor');
                }}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer border transition-all ${
                  activePageId === page.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layout size={16} className={activePageId === page.id ? 'text-blue-500' : 'text-slate-400'} />
                  <span className="text-sm font-medium truncate">{page.name}</span>
                </div>
                {page.type === 'custom' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePage(page.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Editor --- */}
      <div className={`${mobileTab === 'editor' ? 'flex' : 'hidden'} lg:flex w-full lg:w-96 bg-slate-50 border-r border-slate-200 flex-col overflow-y-auto z-10 shadow-lg h-full lg:h-auto absolute lg:relative`}>
        <div className="p-6 pb-24 lg:pb-6">
          {showCrisisSettings ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="text-red-500" /> Mode Crise
              </h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() =>
                    onConfigChange({
                      ...config,
                      crisisMode: { 
                        ...config.crisisMode, 
                        enabled: !config.crisisMode?.enabled,
                        title: config.crisisMode?.title || '',
                        message: config.crisisMode?.message || ''
                      },
                    })
                  }
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    config.crisisMode?.enabled ? 'bg-red-500' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${config.crisisMode?.enabled ? 'translate-x-6' : ''}`}></div>
                </div>
                <span className="text-sm font-medium">Activer</span>
              </label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                value={config.crisisMode?.title || ''}
                onChange={(e) =>
                  onConfigChange({
                    ...config,
                    crisisMode: { 
                      enabled: config.crisisMode?.enabled || false,
                      title: e.target.value,
                      message: config.crisisMode?.message || ''
                    },
                  })
                }
                placeholder="Titre"
              />
              <textarea
                className="w-full border rounded px-3 py-2 text-sm h-24"
                value={config.crisisMode?.message || ''}
                onChange={(e) =>
                  onConfigChange({
                    ...config,
                    crisisMode: { 
                      enabled: config.crisisMode?.enabled || false,
                      title: config.crisisMode?.title || '',
                      message: e.target.value
                    },
                  })
                }
                placeholder="Message"
              />
            </div>
          ) : activePage ? (
            <div className="space-y-6">
              <input
                type="text"
                value={activePage.name}
                onChange={(e) => handleUpdatePageName(activePage.id, e.target.value)}
                className="w-full text-lg font-bold border-b border-slate-300 focus:border-blue-500 outline-none px-1 py-1"
              />

              <div>
                <div className="flex gap-1 mb-4 flex-wrap">
                  {(['hero', 'text', 'image', 'products', 'form'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => handleAddSection(activePage.id, type)}
                      className="p-2 bg-white border hover:bg-slate-50 rounded text-slate-600"
                      title={type}
                    >
                      {type === 'text' && <Type size={16} />}
                      {type === 'image' && <ImageIcon size={16} />}
                      {type === 'products' && <ShoppingBag size={16} />}
                      {type === 'hero' && <Rocket size={16} />}
                      {type === 'form' && <Send size={16} />}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {activePage.sections.map(section => (
                    <SectionEditor
                      key={section.id}
                      section={section}
                      pageId={activePage.id}
                      onRemove={() => handleRemoveSection(activePage.id, section.id)}
                      onUpdateContent={(content) =>
                        updateSectionContent(activePage.id, section.id, content)
                      }
                      onAddProduct={() => handleAddProduct(activePage.id, section.id)}
                      onUpdateProduct={(productId, field, value) =>
                        handleUpdateProduct(activePage.id, section.id, productId, field, value)
                      }
                      onRemoveProduct={(productId) =>
                        handleRemoveProduct(activePage.id, section.id, productId)
                      }
                      onFileUpload={handleFileUpload}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* --- Preview --- */}
      <div className={`${mobileTab === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 bg-slate-200 flex-col relative overflow-hidden h-full`}>
        {/* Toolbar */}
        <div className="bg-white border-b border-slate-200 p-2 flex items-center justify-between gap-4 shadow-sm shrink-0">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 px-3 rounded text-xs font-medium transition-all ${
                viewMode === 'desktop'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              <Monitor size={16} className="inline mr-1" /> Bureau
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 px-3 rounded text-xs font-medium transition-all ${
                viewMode === 'mobile'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              <Smartphone size={16} className="inline mr-1" /> Mobile
            </button>
          </div>

          <button
            onClick={handleSaveSite}
            disabled={isSaving}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm font-bold hover:bg-slate-800 disabled:opacity-70"
          >
            {isSaving ? 'Sauvegarde...' : publishSuccess ? <><Check size={16} />Publié!</> : <><Check size={16} />Valider</>}
          </button>
        </div>

        {/* Device */}
        <div className="flex-1 overflow-hidden p-2 sm:p-8 flex justify-center items-start">
          <div
            className={`bg-white shadow-2xl transition-all relative overflow-hidden flex flex-col ${
              viewMode === 'mobile'
                ? 'w-[320px] sm:w-[375px] h-[600px] sm:h-[812px] rounded-[2rem] border-8 border-slate-800'
                : 'w-full max-w-5xl h-[95%] rounded-lg border border-slate-300'
            }`}
          >
            {viewMode === 'desktop' && (
              <div className="bg-slate-100 border-b border-slate-200 p-2 flex items-center gap-2 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-white rounded h-6 px-3 flex items-center text-xs text-slate-400 truncate">
                  {config.siteName}
                </div>
              </div>
            )}

            {viewMode === 'mobile' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-xl z-50"></div>
            )}

            <div className="flex-1 overflow-y-auto">
              <PreviewRenderer config={config} activePageId={activePageId} viewMode={viewMode} />
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Nav --- */}
      <div className="lg:hidden bg-white border-t border-slate-200 flex justify-around p-3 z-50">
        <button
          onClick={() => setMobileTab('menu')}
          className={`flex flex-col items-center gap-1 text-xs font-medium ${
            mobileTab === 'menu' ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          <List size={20} />
          Menu
        </button>
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex flex-col items-center gap-1 text-xs font-medium ${
            mobileTab === 'editor' ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          <Edit3 size={20} />
          Éditer
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex flex-col items-center gap-1 text-xs font-medium ${
            mobileTab === 'preview' ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          <Eye size={20} />
          Aperçu
        </button>
      </div>
    </div>
  );
};

// --- Sub Component ---
interface SectionEditorProps {
  section: SectionConfig;
  pageId: string;
  onRemove: () => void;
  onUpdateContent: (content: any) => void;
  onAddProduct: () => void;
  onUpdateProduct: (productId: string, field: keyof ProductItem, value: any) => void;
  onRemoveProduct: (productId: string) => void;
  onFileUpload: (callback: (url: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  onRemove,
  onUpdateContent,
  onAddProduct,
  onUpdateProduct,
  onRemoveProduct,
  onFileUpload,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold">{section.type}</span>
        <button onClick={onRemove} className="text-slate-400 hover:text-red-500">
          <X size={16} />
        </button>
      </div>

      {section.type === 'hero' && (
        <div className="space-y-2">
          <input
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="Titre"
            value={section.content.title}
            onChange={(e) => onUpdateContent({ title: e.target.value })}
          />
          <input
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="Sous-titre"
            value={section.content.subtitle}
            onChange={(e) => onUpdateContent({ subtitle: e.target.value })}
          />
          <label className="block text-xs cursor-pointer">
            Image de fond
            <input type="file" className="hidden" accept="image/*" onChange={onFileUpload((url) => onUpdateContent({ bgImage: url }))} />
          </label>
        </div>
      )}

      {section.type === 'text' && (
        <textarea
          className="w-full border rounded px-2 py-2 text-sm h-20"
          value={section.content.text}
          onChange={(e) => onUpdateContent({ text: e.target.value })}
        />
      )}

      {section.type === 'image' && (
        <label className="block border-2 border-dashed rounded p-4 text-center cursor-pointer hover:bg-slate-50">
          {section.content.src && <img src={section.content.src} className="h-20 object-cover rounded mx-auto mb-2" alt="Preview" />}
          <Upload className="text-slate-400 mb-1 mx-auto" size={20} />
          <span className="text-xs text-blue-600">Choisir une image</span>
          <input type="file" className="hidden" accept="image/*" onChange={onFileUpload((url) => onUpdateContent({ src: url }))} />
        </label>
      )}

      {section.type === 'products' && (
        <div>
          <button
            onClick={onAddProduct}
            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded mb-2 flex items-center gap-1"
          >
            <PlusCircle size={12} /> Produit
          </button>
          <div className="space-y-2">
            {section.content.products?.map((prod: ProductItem) => (
              <div key={prod.id} className="bg-slate-50 p-2 rounded text-xs border relative">
                <button
                  onClick={() => onRemoveProduct(prod.id)}
                  className="absolute top-1 right-1 text-red-500"
                >
                  <X size={12} />
                </button>
                <input
                  className="w-full border rounded px-1 py-0.5 text-xs mb-1"
                  placeholder="Titre"
                  value={prod.title}
                  onChange={(e) => onUpdateProduct(prod.id, 'title', e.target.value)}
                />
                <input
                  className="w-full border rounded px-1 py-0.5 text-xs mb-1"
                  placeholder="Prix"
                  value={prod.price}
                  onChange={(e) => onUpdateProduct(prod.id, 'price', e.target.value)}
                />
                <textarea
                  className="w-full border rounded px-1 py-0.5 text-xs h-10"
                  placeholder="Description"
                  value={prod.description}
                  onChange={(e) => onUpdateProduct(prod.id, 'description', e.target.value)}
                />
                <label className="block text-center cursor-pointer border rounded px-1 py-0.5 bg-white">
                  {prod.image ? 'Changer' : 'Ajouter'} Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onFileUpload((url) => onUpdateProduct(prod.id, 'image', url))}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {section.type === 'form' && (
        <div className="space-y-2">
          <input
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="Label Email"
            value={section.content.emailLabel}
            onChange={(e) => onUpdateContent({ emailLabel: e.target.value })}
          />
          <input
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="Label Message"
            value={section.content.messageLabel}
            onChange={(e) => onUpdateContent({ messageLabel: e.target.value })}
          />
          <input
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="Texte Bouton"
            value={section.content.buttonText}
            onChange={(e) => onUpdateContent({ buttonText: e.target.value })}
          />
        </div>
      )}
    </div>
  );
};