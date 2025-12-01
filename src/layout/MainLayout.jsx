export default function MainLayout({ children }) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-cyan-500 p-4">
          <h1 className="font-bold text-cyan-400">NeonWorks</h1>
        </header>
  
        <main className="p-6 flex justify-center">
          {children}
        </main>
      </div>
    );
  }
