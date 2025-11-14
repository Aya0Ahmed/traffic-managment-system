import { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { MapView } from './components/MapView';
import { Dashboard } from './components/Dashboard';
import { RoadMonitor } from './components/RoadMonitor';
import { Notifications } from './components/Notifications';
import { Settings } from './components/Settings';
import { Map, LayoutDashboard, Activity, Bell, Settings as SettingsIcon, Navigation } from 'lucide-react';

type Screen = 'welcome' | 'login' | 'register' | 'app';
type Tab = 'map' | 'dashboard' | 'monitor' | 'notifications' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [activeTab, setActiveTab] = useState<Tab>('map');
  const [notificationCount] = useState(3);

  // تسجيل Service Worker للـ PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('✅ Service Worker مسجل بنجاح:', registration.scope);
          })
          .catch((error) => {
            console.log('❌ فشل تسجيل Service Worker:', error);
          });
      });
    }
  }, []);

  // Screen handlers
  const handleGetStarted = () => setCurrentScreen('login');
  const handleLogin = () => setCurrentScreen('app');
  const handleRegister = () => setCurrentScreen('app');
  const handleSwitchToRegister = () => setCurrentScreen('register');
  const handleSwitchToLogin = () => setCurrentScreen('login');

  // Render welcome/auth screens
  if (currentScreen === 'welcome') {
    return <Welcome onGetStarted={handleGetStarted} />;
  }

  if (currentScreen === 'login') {
    return <Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />;
  }

  if (currentScreen === 'register') {
    return <Register onRegister={handleRegister} onSwitchToLogin={handleSwitchToLogin} />;
  }

  // Main app with bottom navigation
  return (
    <div className="h-screen flex flex-col bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 shadow-lg flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Navigation size={24} />
          </div>
          <div>
            <h1 className="text-white text-xl">طريقي</h1>
            <p className="text-white/90 text-sm">نظام إدارة حركة المرور الذكي</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {activeTab === 'map' && <MapView />}
        {activeTab === 'dashboard' && (
          <div className="p-4 pb-20">
            <Dashboard />
          </div>
        )}
        {activeTab === 'monitor' && (
          <div className="p-4 pb-20">
            <RoadMonitor />
          </div>
        )}
        {activeTab === 'notifications' && (
          <div className="p-4 pb-20">
            <Notifications />
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="p-4 pb-20">
            <Settings />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 shadow-2xl flex-shrink-0">
        <div className="grid grid-cols-5 h-16">
          {/* Map */}
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === 'map'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`relative ${activeTab === 'map' ? 'scale-110' : ''} transition-transform`}>
              <Map size={24} />
              {activeTab === 'map' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </div>
            <span className="text-xs">الخريطة</span>
          </button>

          {/* Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === 'dashboard'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`relative ${activeTab === 'dashboard' ? 'scale-110' : ''} transition-transform`}>
              <LayoutDashboard size={24} />
              {activeTab === 'dashboard' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </div>
            <span className="text-xs">لوحة التحكم</span>
          </button>

          {/* Monitor */}
          <button
            onClick={() => setActiveTab('monitor')}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === 'monitor'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`relative ${activeTab === 'monitor' ? 'scale-110' : ''} transition-transform`}>
              <Activity size={24} />
              {activeTab === 'monitor' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </div>
            <span className="text-xs">المراقبة</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center justify-center gap-1 transition-all relative ${
              activeTab === 'notifications'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`relative ${activeTab === 'notifications' ? 'scale-110' : ''} transition-transform`}>
              <Bell size={24} />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </div>
            <span className="text-xs">الإشعارات</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === 'settings'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`relative ${activeTab === 'settings' ? 'scale-110' : ''} transition-transform`}>
              <SettingsIcon size={24} />
              {activeTab === 'settings' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </div>
            <span className="text-xs">الإعدادات</span>
          </button>
        </div>
      </nav>
    </div>
  );
}