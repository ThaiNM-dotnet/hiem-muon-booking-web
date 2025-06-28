
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Lịch hẹn sắp tới",
      message: "Bạn có lịch hẹn với BS. Trần Văn Nam vào 20/6/2024 lúc 9:00",
      time: "2 giờ trước",
      read: false,
      type: "appointment"
    },
    {
      id: 2,
      title: "Kết quả xét nghiệm",
      message: "Kết quả xét nghiệm hormone đã có. Vui lòng xem trong mục kết quả.",
      time: "1 ngày trước",
      read: false,
      type: "result"
    },
    {
      id: 3,
      title: "Thanh toán thành công",
      message: "Thanh toán cho dịch vụ IVF đã được xử lý thành công.",
      time: "3 ngày trước",
      read: true,
      type: "payment"
    },
    {
      id: 4,
      title: "Tư vấn trực tuyến",
      message: "BS. Nguyễn Thị Mai đã trả lời câu hỏi của bạn.",
      time: "1 tuần trước",
      read: true,
      type: "consultation"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return '📅';
      case 'result': return '📋';
      case 'payment': return '💳';
      case 'consultation': return '💬';
      default: return '📢';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Thông báo</DialogTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllAsRead}
                className="text-sm"
              >
                Đánh dấu tất cả đã đọc
              </Button>
            )}
          </div>
          <DialogDescription>
            Bạn có {unreadCount} thông báo chưa đọc
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                !notification.read 
                  ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className={`text-sm font-medium ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1 flex-shrink-0"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationBell;
