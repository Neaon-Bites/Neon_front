import React from 'react';

// import { useCMS } from '../../hooks/useCMS';
import { useCMS } from '../../hooks/useCMS';

import { UserDashboard } from './UserDashboard';

// import { LoadingSpinner } from './components/UI/LoadingSpinner';
import { LoadingSpinner } from '../UI';
import { ErrorBoundary } from '../UI';
export const CmsContainer: React.FC = () => {
  const { config, loading, error, updateConfig, publishSite, exportSite } = useCMS();

  if (loading) {
    return <LoadingSpinner message="Chargement de votre CMS..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!config) {
    return null;
  }

  return (
    <ErrorBoundary>
      <UserDashboard
        config={config}
        onConfigChange={updateConfig}
        onPublish={publishSite}
        onExport={exportSite}
      />
    </ErrorBoundary>
  );
};