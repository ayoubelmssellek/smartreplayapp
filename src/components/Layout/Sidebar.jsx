import React from 'react';
import { 
  Users, 
  CreditCard, 
  UserCheck, 
  Dumbbell,
  Calendar,
  Receipt,
  BarChart3,
  Bell,
  Settings,
  Home
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: Home },
  { id: 'members', label: 'الأعضاء', icon: Users },
  { id: 'subscriptions', label: 'الاشتراكات', icon: CreditCard },
  { id: 'checkin', label: 'تسجيل الحضور', icon: UserCheck },
  { id: 'coaches', label: 'المدربين', icon: Dumbbell },
  { id: 'classes', label: 'الحصص', icon: Calendar },
  { id: 'payments', label: 'المدفوعات', icon: Receipt },
  { id: 'reports', label: 'التقارير', icon: BarChart3 },
  { id: 'notifications', label: 'التنبيهات', icon: Bell },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-64 bg-white shadow-lg border-l border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Dumbbell className="text-white" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">FitClub Pro</h2>
            <p className="text-sm text-gray-500">نظام إدارة الجيم</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}