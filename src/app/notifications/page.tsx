import NotificationList from '@/components/notifications/NotificationList';
import { notifications } from '@/lib/data';

export default function NotificationsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Notifications
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Stay up-to-date with your donation activities.
        </p>
      </div>
      <NotificationList notifications={notifications} />
    </div>
  );
}
