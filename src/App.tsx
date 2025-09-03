import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/AuthForm';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { MaterialsList } from './components/MaterialsList';
import { PostMaterial } from './components/PostMaterial';
import { StudyTimer } from './components/StudyTimer';
import { UserProfile } from './components/UserProfile';
import { MaterialDetail } from './components/MaterialDetail';
import { Ranking } from './components/Ranking';
import { Community } from './components/Community';
import { mockMaterials } from './mockData';
import { Material } from './types';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const handleMaterialClick = (material: Material) => {
    setSelectedMaterial(material);
    setCurrentPage('material-detail');
  };

  const handleStudySessionComplete = (duration: number, subject: string) => {
    console.log(`Study session completed: ${duration} minutes of ${subject}`);
    // Here you would save the study session to the database
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'materials':
        return <MaterialsList materials={mockMaterials} onMaterialClick={handleMaterialClick} />;
      case 'post':
        return <PostMaterial />;
      case 'timer':
        return (
          <div className="max-w-2xl mx-auto">
            <StudyTimer onSessionComplete={handleStudySessionComplete} />
          </div>
        );
      case 'ranking':
        return <Ranking />;
      case 'community':
        return <Community />;
      case 'profile':
        return <UserProfile />;
      case 'material-detail':
        return selectedMaterial ? (
          <MaterialDetail 
            material={selectedMaterial} 
            onBack={() => setCurrentPage('materials')} 
          />
        ) : null;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="p-4 md:p-6 lg:p-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;