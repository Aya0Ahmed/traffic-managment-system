import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Navigation, Mail, Lock, User, ArrowRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('كلمة المرور غير متطابقة');
      return;
    }
    // Simulate registration
    onRegister();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 flex items-center justify-center p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-4 rounded-2xl inline-block mb-3">
              <Navigation className="text-white" size={40} />
            </div>
            <h2 className="text-gray-900 mb-2">إنشاء حساب جديد</h2>
            <p className="text-gray-600">انضم إلى طريقي الآن</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="name"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <div className="text-sm">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="rounded mt-1" required />
                <span className="text-gray-700">
                  أوافق على{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    الشروط والأحكام
                  </a>{' '}
                  و{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    سياسة الخصوصية
                  </a>
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              إنشاء الحساب
              <ArrowRight className="mr-2" size={18} />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">أو</span>
            </div>
          </div>

          {/* Switch to Login */}
          <div className="text-center">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700"
              >
                سجل دخولك
              </button>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
