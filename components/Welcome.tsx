import { Button } from './ui/button';
import { ArrowRight, Navigation, MapPin, Bell, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-white rounded-3xl p-8 mb-6 inline-block shadow-2xl"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-green-600 p-6 rounded-2xl">
                <Navigation className="text-white" size={64} />
              </div>
            </div>
          </motion.div>

          {/* App Name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white text-4xl mb-3"
          >
            طريقي
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-blue-100 text-lg"
          >
            نظام ذكي لإدارة حركة المرور
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 mb-8"
        >
          {[
            { icon: MapPin, text: 'خرائط تفاعلية في الوقت الفعلي' },
            { icon: Bell, text: 'تنبيهات فورية للازدحام' },
            { icon: Zap, text: 'طرق بديلة أسرع وأذكى' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="bg-white/20 p-3 rounded-xl">
                <feature.icon className="text-white" size={24} />
              </div>
              <span className="text-white">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={onGetStarted}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 h-14 text-lg shadow-xl"
          >
            ابدأ الآن
            <ArrowRight className="mr-2" size={20} />
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-blue-100 text-center mt-6 text-sm"
        >
          وفر وقتك واختر أفضل طريق لوجهتك
        </motion.p>
      </div>
    </div>
  );
}
