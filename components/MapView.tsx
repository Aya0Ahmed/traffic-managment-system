import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Navigation, MapPin, AlertTriangle, TrendingUp, Locate, Map, Car, Wind, Route } from 'lucide-react';
import { Button } from './ui/button';

interface Road {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: 'clear' | 'congested' | 'heavy';
  vehicles: number;
  capacity: number;
  vocs: number;
}

const mockRoads: Road[] = [
  { id: 1, name: 'طريق النصر', lat: 30.0594, lng: 31.3310, status: 'congested', vehicles: 85, capacity: 100, vocs: 78 },
  { id: 2, name: 'طريق الجيش', lat: 30.0717, lng: 31.3426, status: 'clear', vehicles: 45, capacity: 100, vocs: 42 },
  { id: 3, name: 'الدائري', lat: 30.0448, lng: 31.3497, status: 'heavy', vehicles: 120, capacity: 150, vocs: 85 },
  { id: 4, name: 'صلاح سالم', lat: 30.0826, lng: 31.3241, status: 'clear', vehicles: 35, capacity: 120, vocs: 35 },
];

export function MapView() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedRoad, setSelectedRoad] = useState<Road | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLocating(false);
        },
        () => {
          // Use default location (Cairo) if geolocation fails or is denied
          setUserLocation({ lat: 30.0444, lng: 31.2357 });
          setIsLocating(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      // Default location
      setUserLocation({ lat: 30.0444, lng: 31.2357 });
      setIsLocating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'bg-green-500';
      case 'congested': return 'bg-yellow-500';
      case 'heavy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'clear': return 'سالك';
      case 'congested': return 'مزدحم';
      case 'heavy': return 'زحمة شديدة';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="h-full flex flex-col" dir="rtl">
      {/* Map Container */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-100 via-gray-100 to-green-100 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-600 rounded-full"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Roads with glow */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Main roads with shadow */}
            <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#4B5563" strokeWidth="10" opacity="0.15" />
            <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#6B7280" strokeWidth="6" opacity="0.4" filter="url(#glow)" />
            
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#4B5563" strokeWidth="10" opacity="0.15" />
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#6B7280" strokeWidth="6" opacity="0.4" filter="url(#glow)" />
            
            <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="#4B5563" strokeWidth="10" opacity="0.15" />
            <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="#6B7280" strokeWidth="6" opacity="0.4" filter="url(#glow)" />
            
            <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="#4B5563" strokeWidth="10" opacity="0.15" />
            <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="#6B7280" strokeWidth="6" opacity="0.4" filter="url(#glow)" />
            
            <line x1="70%" y1="10%" x2="70%" y2="90%" stroke="#4B5563" strokeWidth="10" opacity="0.15" />
            <line x1="70%" y1="10%" x2="70%" y2="90%" stroke="#6B7280" strokeWidth="6" opacity="0.4" filter="url(#glow)" />
          </svg>
        </div>

        {/* User Location with pulse */}
        {userLocation && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-full border-4 border-white shadow-2xl">
                <Locate className="text-white" size={24} />
              </div>
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl">
                📍 موقعك الحالي
              </Badge>
            </div>
          </div>
        )}

        {/* Road Markers with animations */}
        {mockRoads.map((road, index) => {
          const positions = [
            { top: '25%', left: '40%' },
            { top: '45%', left: '70%' },
            { top: '65%', left: '30%' },
            { top: '35%', left: '60%' },
          ];
          const pos = positions[index];

          return (
            <button
              key={road.id}
              onClick={() => {
                setSelectedRoad(road);
                setShowAlternatives(false);
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all hover:scale-125 active:scale-95"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className="relative group">
                {/* Pulse for congested roads */}
                {road.status !== 'clear' && (
                  <div className={`absolute inset-0 ${getStatusColor(road.status)} rounded-full animate-ping opacity-75`}></div>
                )}
                
                <div className={`${getStatusColor(road.status)} p-3 rounded-full border-4 border-white shadow-2xl relative z-10`}>
                  <MapPin className="text-white" size={20} />
                </div>
                
                {/* Warning badge */}
                {road.status !== 'clear' && (
                  <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 border-2 border-white animate-pulse flex items-center justify-center">
                    <AlertTriangle className="text-white" size={12} />
                  </div>
                )}

                {/* Tooltip on hover */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  <Badge className="bg-gray-900 text-white shadow-xl">
                    {road.name}
                  </Badge>
                </div>
              </div>
            </button>
          );
        })}

        {/* Locate Button */}
        <Button
          onClick={getCurrentLocation}
          disabled={isLocating}
          className="absolute bottom-4 left-4 bg-white text-gray-900 hover:bg-gray-50 shadow-2xl z-30 h-12 w-12"
          size="icon"
        >
          <Locate size={22} className={isLocating ? 'animate-spin' : ''} />
        </Button>

        {/* Map Type Toggle */}
        <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-2 z-30">
          <Button variant="ghost" size="sm" className="text-gray-700 h-8 w-8 p-0">
            <Map size={18} />
          </Button>
        </div>
      </div>

      {/* Selected Road Info Card */}
      {selectedRoad && (
        <div className="absolute bottom-20 left-4 right-4 z-40">
          <Card className="p-5 bg-white shadow-2xl border-t-4 border-blue-600">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`${getStatusColor(selectedRoad.status)} p-3 rounded-xl shadow-lg`}>
                  <Navigation className="text-white" size={22} />
                </div>
                <div>
                  <h3 className="text-gray-900 text-lg">{selectedRoad.name}</h3>
                  <Badge className={`${
                    selectedRoad.status === 'clear' ? 'bg-green-100 text-green-800' :
                    selectedRoad.status === 'congested' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getStatusText(selectedRoad.status)}
                  </Badge>
                </div>
              </div>
              <button
                onClick={() => setSelectedRoad(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center border border-blue-200">
                <Car className="text-blue-600 mx-auto mb-1" size={20} />
                <p className="text-gray-600 text-xs mb-1">المركبات</p>
                <p className="text-gray-900">{selectedRoad.vehicles}/{selectedRoad.capacity}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center border border-purple-200">
                <TrendingUp className="text-purple-600 mx-auto mb-1" size={20} />
                <p className="text-gray-600 text-xs mb-1">الإشغال</p>
                <p className="text-gray-900">{Math.round((selectedRoad.vehicles / selectedRoad.capacity) * 100)}%</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center border border-green-200">
                <Wind className="text-green-600 mx-auto mb-1" size={20} />
                <p className="text-gray-600 text-xs mb-1">التلوث</p>
                <p className="text-gray-900">{selectedRoad.vocs}%</p>
              </div>
            </div>

            {/* Warning Message */}
            {selectedRoad.status !== 'clear' && (
              <div className={`rounded-xl p-3 mb-4 flex items-center gap-3 ${
                selectedRoad.status === 'heavy' 
                  ? 'bg-red-50 border border-red-200 text-red-800'
                  : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
              }`}>
                <AlertTriangle size={20} className="flex-shrink-0" />
                <span className="text-sm">
                  {selectedRoad.status === 'heavy' 
                    ? 'زحمة شديدة! يُنصح بشدة باستخدام طريق بديل'
                    : 'الطريق مزدحم، قد تحتاج لوقت إضافي'
                  }
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-11"
                onClick={() => setShowAlternatives(!showAlternatives)}
              >
                <Route size={18} className="ml-2" />
                طرق بديلة
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 h-11">
                <Navigation size={18} className="ml-2" />
                ابدأ الملاحة
              </Button>
            </div>

            {/* Alternative Routes */}
            {showAlternatives && selectedRoad.status !== 'clear' && (
              <div className="mt-4 space-y-2 pt-4 border-t border-gray-200">
                <p className="text-gray-700 text-sm mb-2">الطرق البديلة المتاحة:</p>
                {[
                  { name: 'الطريق السريع', time: '15 دقيقة', saving: '8 دقائق' },
                  { name: 'الطريق الفرعي', time: '18 دقيقة', saving: '5 دقائق' }
                ].map((alt, i) => (
                  <div key={i} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                          {i + 1}
                        </div>
                        <span className="text-gray-900 text-sm">{alt.name}</span>
                      </div>
                      <div className="text-left">
                        <p className="text-gray-600 text-xs">التوفير</p>
                        <p className="text-green-700 text-sm">−{alt.saving}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Quick Stats Cards */}
      <div className="absolute top-4 right-4 space-y-2 z-30">
        <Card className="p-3 bg-white/95 backdrop-blur-sm shadow-xl border border-green-200">
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-green-100 p-1.5 rounded-lg">
              <TrendingUp className="text-green-600" size={16} />
            </div>
            <span className="text-gray-900">{mockRoads.filter(r => r.status === 'clear').length} طرق سالكة</span>
          </div>
        </Card>
        <Card className="p-3 bg-white/95 backdrop-blur-sm shadow-xl border border-red-200">
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-red-100 p-1.5 rounded-lg">
              <AlertTriangle className="text-red-600" size={16} />
            </div>
            <span className="text-gray-900">{mockRoads.filter(r => r.status !== 'clear').length} طرق مزدحمة</span>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}