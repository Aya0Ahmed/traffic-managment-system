import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Save, Bell, Gauge, Wind } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [settings, setSettings] = useState({
    vehicleThreshold: 80,
    minVehicleThreshold: 40,
    vocsThreshold: 70,
    autoNotifications: true,
    autoGateControl: true,
    notificationSound: true,
    updateInterval: 15
  });

  const handleSave = () => {
    // Here we would save settings to backend/ESP32
    alert('تم حفظ الإعدادات بنجاح!');
  };

  return (
    <div className="space-y-6">
      {/* Threshold Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Gauge className="text-blue-600" size={24} />
          <div>
            <h2 className="text-gray-900">إعدادات العتبات</h2>
            <p className="text-gray-600 text-sm">تحديد حدود التنبيهات وإغلاق البوابات</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Vehicle Threshold */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>عتبة إغلاق البوابة (عدد المركبات)</Label>
              <span className="text-gray-900">{settings.vehicleThreshold}%</span>
            </div>
            <Slider
              value={[settings.vehicleThreshold]}
              onValueChange={(value) => setSettings({...settings, vehicleThreshold: value[0]})}
              min={50}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-gray-600 text-sm">
              سيتم إغلاق البوابة عندما يصل عدد المركبات إلى {settings.vehicleThreshold}% من السعة القصوى
            </p>
          </div>

          {/* Min Vehicle Threshold */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>عتبة فتح البوابة (عدد المركبات)</Label>
              <span className="text-gray-900">{settings.minVehicleThreshold}%</span>
            </div>
            <Slider
              value={[settings.minVehicleThreshold]}
              onValueChange={(value) => setSettings({...settings, minVehicleThreshold: value[0]})}
              min={20}
              max={60}
              step={5}
              className="w-full"
            />
            <p className="text-gray-600 text-sm">
              سيتم فتح البوابة تلقائياً عندما ينخفض عدد المركبات إلى {settings.minVehicleThreshold}% من السعة
            </p>
          </div>

          {/* VOCs Threshold */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Wind size={16} />
                عتبة تحذير التلوث
              </Label>
              <span className="text-gray-900">{settings.vocsThreshold}%</span>
            </div>
            <Slider
              value={[settings.vocsThreshold]}
              onValueChange={(value) => setSettings({...settings, vocsThreshold: value[0]})}
              min={50}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-gray-600 text-sm">
              سيتم إرسال تحذير عند وصول نسبة التلوث إلى {settings.vocsThreshold}%
            </p>
          </div>

          {/* Update Interval */}
          <div className="space-y-3">
            <Label>معدل التحديث من السنسورات (بالثواني)</Label>
            <Input
              type="number"
              value={settings.updateInterval}
              onChange={(e) => setSettings({...settings, updateInterval: Number(e.target.value)})}
              min={5}
              max={60}
            />
            <p className="text-gray-600 text-sm">
              تحديد عدد الثواني بين كل قراءة من السنسورات
            </p>
          </div>
        </div>
      </Card>

      {/* Automation Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-blue-600" size={24} />
          <div>
            <h2 className="text-gray-900">إعدادات التشغيل التلقائي</h2>
            <p className="text-gray-600 text-sm">تفعيل أو إيقاف الميزات التلقائية</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-900">إرسال الإشعارات تلقائياً</p>
              <p className="text-gray-600 text-sm">
                إرسال تنبيهات للمركبات عند الازدحام
              </p>
            </div>
            <Switch
              checked={settings.autoNotifications}
              onCheckedChange={(checked) => setSettings({...settings, autoNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-900">التحكم التلقائي في البوابات</p>
              <p className="text-gray-600 text-sm">
                فتح وإغلاق البوابات تلقائياً حسب العتبات
              </p>
            </div>
            <Switch
              checked={settings.autoGateControl}
              onCheckedChange={(checked) => setSettings({...settings, autoGateControl: checked})}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-900">صوت الإشعارات</p>
              <p className="text-gray-600 text-sm">
                تشغيل صوت عند استلام إشعار جديد
              </p>
            </div>
            <Switch
              checked={settings.notificationSound}
              onCheckedChange={(checked) => setSettings({...settings, notificationSound: checked})}
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save size={18} />
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
}