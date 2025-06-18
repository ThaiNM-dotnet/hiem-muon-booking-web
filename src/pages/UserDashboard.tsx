import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const userInfo = {
    name: "Nguyễn Thị Lan",
    email: "lan.nguyen@email.com",
    phone: "0901234567",
    memberSince: "2024-01-15"
  };

  const appointments = [
    {
      id: 1,
      date: "2024-06-20",
      time: "09:00",
      doctor: "BS. Trần Văn Nam",
      service: "IVF - Thu tinh ống nghiệm",
      status: "confirmed",
      statusText: "Đã xác nhận"
    },
    {
      id: 2,
      date: "2024-06-15",
      time: "14:30",
      doctor: "BS. Nguyễn Thị Mai",
      service: "Tư vấn và khám sàng lọc",
      status: "completed",
      statusText: "Hoàn thành"
    },
    {
      id: 3,
      date: "2024-05-28",
      time: "10:00",
      doctor: "BS. Lê Minh Hoàng",
      service: "IUI - Thu tinh trong tử cung",
      status: "completed",
      statusText: "Hoàn thành"
    }
  ];

  const testResults = [
    {
      id: 1,
      date: "2024-06-10",
      type: "Xét nghiệm hormone",
      result: "Bình thường",
      doctor: "BS. Nguyễn Thị Mai"
    },
    {
      id: 2,
      date: "2024-05-25",
      type: "Siêu âm buồng trứng",
      result: "Tốt",
      doctor: "BS. Trần Văn Nam"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Khách hàng</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin cá nhân và lịch hẹn của bạn
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Họ và tên</p>
                <p className="font-medium">{userInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{userInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số điện thoại</p>
                <p className="font-medium">{userInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Khách hàng từ</p>
                <p className="font-medium">15/01/2024</p>
              </div>
              <Button variant="outline" className="w-full">
                Cập nhật thông tin
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => navigate('/booking')}
              >
                Đặt lịch hẹn mới
              </Button>
              <Button variant="outline" className="w-full">
                Xem kết quả xét nghiệm
              </Button>
              <Button variant="outline" className="w-full">
                Lịch sử điều trị
              </Button>
              <Button variant="outline" className="w-full">
                Tư vấn trực tuyến
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tổng lịch hẹn</span>
                <span className="text-2xl font-bold text-primary">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Lịch sắp tới</span>
                <span className="text-2xl font-bold text-blue-500">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Kết quả xét nghiệm</span>
                <span className="text-2xl font-bold text-green-500">5</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Lịch hẹn của tôi</CardTitle>
            <CardDescription>Danh sách các lịch hẹn gần đây và sắp tới</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{appointment.service}</span>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.statusText}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor} • {appointment.date} • {appointment.time}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {appointment.status === 'confirmed' && (
                      <>
                        <Button variant="outline" size="sm">
                          Đổi lịch
                        </Button>
                        <Button variant="outline" size="sm">
                          Hủy
                        </Button>
                      </>
                    )}
                    {appointment.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        Xem kết quả
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Kết quả xét nghiệm gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{result.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {result.doctor} • {result.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-green-100 text-green-800">
                      {result.result}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;