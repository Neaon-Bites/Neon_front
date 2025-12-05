import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Chargement...',
  fullScreen = true,
}) => {
  const baseClasses = 'flex flex-col items-center justify-center gap-4';
  const containerClasses = fullScreen
    ? `${baseClasses} min-h-screen bg-gradient-to-br from-slate-50 to-slate-100`
    : `${baseClasses} p-8`;

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
      </div>

      {message && (
        <div className="text-center">
          <p className="text-slate-700 font-medium">{message}</p>
          <p className="text-slate-500 text-sm mt-1">
            Cela peut prendre quelques secondes...
          </p>
        </div>
      )}
    </div>
  );
};
