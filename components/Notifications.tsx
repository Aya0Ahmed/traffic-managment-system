import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, CheckCircle, Info, XCircle, Clock } from 'lucide-react';

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'warning',
    title: 'تحذير: طريق النصر الرئيسي',
    message: 'عدد المركبات وصل إلى 85/100 - تم إغلاق البوابة وإرسال تنبيهات للمركبات القادمة',
    time: 'منذ 5 دقائق',
    road: 'طريق النصر الرئيسي',
    read: false
  },
  {
    id: 2,
    type: 'success',
    title: 'فتح بوابة: طريق صلاح سالم',
    message: 'انخفض عدد المركبات إلى 35/120 - تم فتح البوابة تلقائياً',
    time: 'منذ 12 دقيقة',
    road: 'طريق صلاح سالم',
    read: false
  },
  {
    id: 3,
    type: 'critical',
    title: 'تنبيه حرج: الطريق الدائري',
    message: 'نسبة التلوث وصلت إلى 85% مع ازدحام شديد (120/150 مركبة)',
    time: 'منذ 18 دقيقة',
    road: 'الطريق الدائري',
    read: true
  },
  {
    id: 4,
    type: 'info',
    title: 'معلومة: تحسن حركة المرور',
    message: 'طريق الجيش يعمل بشكل جيد - 45% فقط من الطاقة الاستيعابية',
    time: 'منذ 25 دقيقة',
    road: 'طريق الجيش',
    read: true
  },
  {
    id: 5,
    type: 'warning',
    title: 'تحذير: ارتفاع نسبة التلوث',
    message: 'نسبة التلوث في طريق النصر وصلت إلى 78%',
    time: 'منذ 30 دقيقة',
    road: 'طريق النصر الرئيسي',
    read: true
  },
  {
    id: 6,
    type: 'success',
    title: 'نجاح: تحويل حركة المرور',
    message: 'تم تحويل 25 مركبة بنجاح إلى الطرق البديلة',
    time: 'منذ 35 دقيقة',
    road: 'طريق النصر الرئيسي',
    read: true
  }
];

export function Notifications() {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'success':
        return <CheckCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          badge: 'bg-red-600'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-600'
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          badge: 'bg-green-600'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          badge: 'bg-blue-600'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">الإشعارات والتنبيهات</h2>
            <p className="text-gray-600 text-sm">تتبع جميع الأحداث والتنبيهات في الوقت الفعلي</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-red-600 text-white">
              {unreadCount} جديد
            </Badge>
          )}
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const styles = getTypeStyles(notification.type);
          
          return (
            <Card
              key={notification.id}
              className={`p-5 border-r-4 ${styles.bg} ${styles.border} ${
                !notification.read ? 'shadow-md' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`${styles.icon} flex-shrink-0 mt-1`}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-gray-900">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {notification.time}
                    </span>
                    <span className="text-gray-400">•</span>
                    <Badge variant="outline" className="text-xs">
                      {notification.road}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stats */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">إحصائيات الإشعارات</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-red-100 text-red-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              {notifications.filter(n => n.type === 'critical').length}
            </div>
            <p className="text-gray-700 text-sm">حرجة</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              {notifications.filter(n => n.type === 'warning').length}
            </div>
            <p className="text-gray-700 text-sm">تحذيرات</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              {notifications.filter(n => n.type === 'success').length}
            </div>
            <p className="text-gray-700 text-sm">نجاح</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              {notifications.filter(n => n.type === 'info').length}
            </div>
            <p className="text-gray-700 text-sm">معلومات</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
