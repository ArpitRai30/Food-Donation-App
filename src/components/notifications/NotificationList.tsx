import type { AppNotification } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, CheckCircle, Package, Truck } from 'lucide-react';

interface NotificationListProps {
  notifications: AppNotification[];
}

const getIcon = (message: string) => {
  const lowerCaseMessage = message.toLowerCase();
  if (lowerCaseMessage.includes('listed') || lowerCaseMessage.includes('new donation')) {
    return <Package className="h-6 w-6 text-primary" />;
  }
  if (lowerCaseMessage.includes('claimed')) {
    return <Bell className="h-6 w-6 text-yellow-500" />;
  }
  if (lowerCaseMessage.includes('approved')) {
    return <CheckCircle className="h-6 w-6 text-blue-500" />;
  }
  if (lowerCaseMessage.includes('picked up')) {
    return <Truck className="h-6 w-6 text-gray-500" />;
  }
  return <Bell className="h-6 w-6 text-gray-500" />;
};

export default function NotificationList({ notifications }: NotificationListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="space-y-0">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 ${index < notifications.length - 1 ? 'border-b' : ''}`}
            >
              <div className="flex-shrink-0 mt-1">{getIcon(notification.message)}</div>
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-muted-foreground">{notification.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
