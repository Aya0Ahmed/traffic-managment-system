import { Card } from './ui/card';
import { useState } from 'react';
import { Navigation, MapPin, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from './ui/badge';

// Mock data for alternative routes
const roadDetails = {
  1: {
    name: 'طريق النصر الرئيسي',
    status: 'congested',
    alternatives: [
      { name: 'طريق الثورة', distance: '5.2 كم', time: '12 دقيقة', savings: '8 دقائق' },
      { name: 'طريق رمسيس', distance: '6.1 كم', time: '15 دقيقة', savings: '5 دقائق' },
    ],
    history: [
      { time: '10:00', vehicles: 65, vocs: 65 },
      { time: '10:15', vehicles: 72, vocs: 70 },
      { time: '10:30', vehicles: 80, vocs: 75 },
      { time: '10:45', vehicles: 85, vocs: 78 },
    ]
  },
  2: {
    name: 'طريق الجيش',
    status: 'clear',
    alternatives: [],
    history: [
      { time: '10:00', vehicles: 40, vocs: 38 },
      { time: '10:15', vehicles: 42, vocs: 40 },
      { time: '10:30', vehicles: 44, vocs: 41 },
      { time: '10:45', vehicles: 45, vocs: 42 },
    ]
  },
  3: {
    name: 'الطريق الدائري',
    status: 'congested',
    alternatives: [
      { name: 'طريق السويس الجديد', distance: '8.5 كم', time: '18 دقيقة', savings: '12 دقيقة' },
      { name: 'طريق القطامية', distance: '7.8 كم', time: '16 دقيقة', savings: '14 دقائق' },
    ],
    history: [
      { time: '10:00', vehicles: 100, vocs: 75 },
      { time: '10:15', vehicles: 110, vocs: 80 },
      { time: '10:30', vehicles: 115, vocs: 82 },
      { time: '10:45', vehicles: 120, vocs: 85 },
    ]
  },
  4: {
    name: 'طريق صلاح سالم',
    status: 'clear',
    alternatives: [],
    history: [
      { time: '10:00', vehicles: 38, vocs: 35 },
      { time: '10:15', vehicles: 36, vocs: 34 },
      { time: '10:30', vehicles: 35, vocs: 35 },
      { time: '10:45', vehicles: 35, vocs: 35 },
    ]
  }
};

export function RoadMonitor() {
  const [selectedRoad, setSelectedRoad] = useState<number | null>(1);
  const details = selectedRoad ? roadDetails[selectedRoad as keyof typeof roadDetails] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Roads List */}
      <Card className="p-6 lg:col-span-1">
        <h2 className="text-gray-900 mb-4">اختر طريق</h2>
        <div className="space-y-2">
          {Object.entries(roadDetails).map(([id, road]) => (
            <button
              key={id}
              onClick={() => setSelectedRoad(Number(id))}
              className={`w-full text-right p-4 rounded-lg border transition-all ${
                selectedRoad === Number(id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">{road.name}</span>
                <Badge
                  variant={road.status === 'congested' ? 'destructive' : 'default'}
                  className={road.status === 'clear' ? 'bg-green-600' : ''}
                >
                  {road.status === 'congested' ? 'مزدحم' : 'سالك'}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin size={14} />
                <span>عرض التفاصيل</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Road Details */}
      <div className="lg:col-span-2 space-y-6">
        {details && (
          <>
            {/* Map Placeholder */}
            <Card className="p-6">
              <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={20} />
                موقع الطريق
              </h2>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                {/* Simple map illustration */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" className="text-gray-400">
                    <line x1="20%" y1="30%" x2="80%" y2="30%" stroke="currentColor" strokeWidth="3" />
                    <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="currentColor" strokeWidth="3" />
                    <line x1="20%" y1="70%" x2="80%" y2="70%" stroke="currentColor" strokeWidth="3" />
                    <line x1="40%" y1="20%" x2="40%" y2="80%" stroke="currentColor" strokeWidth="2" />
                    <line x1="60%" y1="20%" x2="60%" y2="80%" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <MapPin size={48} className="text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-700">{details.name}</p>
                </div>
              </div>
            </Card>

            {/* Alternative Routes */}
            {details.alternatives.length > 0 && (
              <Card className="p-6">
                <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Navigation size={20} />
                  الطرق البديلة المقترحة
                </h2>
                <div className="space-y-3">
                  {details.alternatives.map((alt, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                            {index + 1}
                          </div>
                          <span className="text-gray-900">{alt.name}</span>
                        </div>
                        <Badge className="bg-green-600">موصى به</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mr-8 text-sm">
                        <div>
                          <p className="text-gray-600">المسافة</p>
                          <p className="text-gray-900">{alt.distance}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">الوقت المتوقع</p>
                          <p className="text-gray-900">{alt.time}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">توفير الوقت</p>
                          <p className="text-green-700 flex items-center gap-1">
                            <TrendingDown size={14} />
                            {alt.savings}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                  <AlertCircle size={16} className="inline ml-2" />
                  يتم إرسال هذه الاقتراحات تلقائياً للمركبات المتجهة لهذا الطريق
                </div>
              </Card>
            )}

            {/* Traffic History */}
            <Card className="p-6">
              <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                تاريخ حركة المرور (آخر ساعة)
              </h2>
              <div className="space-y-3">
                {details.history.map((record, index) => {
                  const trend = index > 0 
                    ? record.vehicles > details.history[index - 1].vehicles 
                      ? 'up' 
                      : record.vehicles < details.history[index - 1].vehicles 
                      ? 'down' 
                      : 'same'
                    : 'same';
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-700 min-w-[60px]">{record.time}</span>
                        <div className="flex items-center gap-2">
                          {trend === 'up' && <TrendingUp size={16} className="text-red-600" />}
                          {trend === 'down' && <TrendingDown size={16} className="text-green-600" />}
                          <span className="text-gray-900">{record.vehicles} مركبة</span>
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm">
                        تلوث: {record.vocs}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
