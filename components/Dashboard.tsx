import { Card } from './ui/card';
import { AlertTriangle, Car, Wind, CheckCircle, XCircle } from 'lucide-react';
import { Progress } from './ui/progress';

// Mock data - سيتم استبدالها ببيانات حقيقية من ESP32
const roads = [
  {
    id: 1,
    name: 'طريق النصر الرئيسي',
    capacity: 100,
    currentVehicles: 85,
    vocs: 78,
    gateStatus: 'closed',
    location: 'القاهرة - مدينة نصر'
  },
  {
    id: 2,
    name: 'طريق الجيش',
    capacity: 100,
    currentVehicles: 45,
    vocs: 42,
    gateStatus: 'open',
    location: 'القاهرة - العباسية'
  },
  {
    id: 3,
    name: 'الطريق الدائري',
    capacity: 150,
    currentVehicles: 120,
    vocs: 85,
    gateStatus: 'closed',
    location: 'القاهرة - التجمع الخامس'
  },
  {
    id: 4,
    name: 'طريق صلاح سالم',
    capacity: 120,
    currentVehicles: 35,
    vocs: 35,
    gateStatus: 'open',
    location: 'القاهرة - مصر الجديدة'
  }
];

export function Dashboard() {
  const totalRoads = roads.length;
  const closedGates = roads.filter(r => r.gateStatus === 'closed').length;
  const openGates = roads.filter(r => r.gateStatus === 'open').length;
  const avgOccupancy = Math.round(
    roads.reduce((acc, r) => acc + (r.currentVehicles / r.capacity) * 100, 0) / totalRoads
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm">إجمالي الطرق</p>
              <p className="text-blue-900 mt-1">{totalRoads}</p>
            </div>
            <div className="bg-blue-600 p-3 rounded-lg">
              <Car className="text-white" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 text-sm">بوابات مغلقة</p>
              <p className="text-red-900 mt-1">{closedGates}</p>
            </div>
            <div className="bg-red-600 p-3 rounded-lg">
              <XCircle className="text-white" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 text-sm">بوابات مفتوحة</p>
              <p className="text-green-900 mt-1">{openGates}</p>
            </div>
            <div className="bg-green-600 p-3 rounded-lg">
              <CheckCircle className="text-white" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-700 text-sm">متوسط الإشغال</p>
              <p className="text-yellow-900 mt-1">{avgOccupancy}%</p>
            </div>
            <div className="bg-yellow-600 p-3 rounded-lg">
              <AlertTriangle className="text-white" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Roads List */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">حالة الطرق الحالية</h2>
        <div className="space-y-4">
          {roads.map((road) => {
            const occupancyPercent = (road.currentVehicles / road.capacity) * 100;
            const isHigh = occupancyPercent >= 80;
            const isMedium = occupancyPercent >= 60 && occupancyPercent < 80;

            return (
              <div
                key={road.id}
                className={`p-4 rounded-lg border-r-4 ${
                  isHigh
                    ? 'bg-red-50 border-red-500'
                    : isMedium
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-green-50 border-green-500'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900">{road.name}</h3>
                    <p className="text-gray-600 text-sm">{road.location}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                      road.gateStatus === 'open'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {road.gateStatus === 'open' ? (
                      <>
                        <CheckCircle size={16} />
                        مفتوحة
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        مغلقة
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700 text-sm flex items-center gap-2">
                        <Car size={16} />
                        عدد المركبات
                      </span>
                      <span className="text-gray-900">
                        {road.currentVehicles} / {road.capacity}
                      </span>
                    </div>
                    <Progress
                      value={occupancyPercent}
                      className={`h-2 ${
                        isHigh
                          ? '[&>div]:bg-red-600'
                          : isMedium
                          ? '[&>div]:bg-yellow-600'
                          : '[&>div]:bg-green-600'
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700 text-sm flex items-center gap-2">
                        <Wind size={16} />
                        نسبة التلوث
                      </span>
                      <span className="text-gray-900">{road.vocs}%</span>
                    </div>
                    <Progress
                      value={road.vocs}
                      className={`h-2 ${
                        road.vocs >= 70
                          ? '[&>div]:bg-red-600'
                          : road.vocs >= 50
                          ? '[&>div]:bg-yellow-600'
                          : '[&>div]:bg-green-600'
                      }`}
                    />
                  </div>
                </div>

                {isHigh && (
                  <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-sm text-red-800">
                    <AlertTriangle size={16} className="inline ml-2" />
                    تحذير: الطريق شبه ممتلئ - يتم إرسال إشعارات للمركبات القادمة
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
