import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UserIcon, FileIcon, TrendingUpIcon } from "lucide-react";

const ManagerDashboard = () => {
  const stats = [
    {
      title: "Lịch khám hôm nay",
      value: "8",
      icon: <CalendarIcon className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      title: "Tổng số dịch vụ",
      value: "6",
      icon: <FileIcon className="w-6 h-6" />,
      color: "text-green-500"
    },
    {
      title: "Lịch chờ xử lý",
      value: "12",
      icon: <CalendarIcon className="w-6 h-6" />,
      color: "text-orange-500"
    },
    {
      title: "Hoàn thành hôm nay",
      value: "5",
      icon: <TrendingUpIcon className="w-6 h-6" />,
      color: "text-purple-500"
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      customer: "Nguyễn Thị Lan",
      phone: "0901234567",
      doctor: "BS. Trần Văn Nam",
      service: "IUI - Thu tinh trong tử cung",
      date: "2024-06-15",
      time: "09:00",
      status: "confirmed",
      statusText: "Đã đặt lịch"
    },
    {
      id: 2,
      customer: "Lê Thị Hoa",
      phone: "0907654321",
      doctor: "BS. Nguyễn Thị Mai",
      service: "IVF - Thu tinh ống nghiệm",
      date: "2024-06-16",
      time: "14:30",
      status: "completed",
      statusText: "Hoàn thành"
    }
  ];

  const staffList = [
    {
      id: 1,
      name: "BS. Trần Văn Nam",
      role: "Bác sĩ chính",
      department: "Sản Phụ khoa",
      appointmentsToday: 4,
      status: "active"
    },
    {
      id: 2,
      name: "BS. Nguyễn Thị Mai",
      role: "Bác sĩ",
      department: "Hiếm muộn",
      appointmentsToday: 3,
      status: "active"
    },
    {
      id: 3,
      name: "Y tá Phạm Thị Lan",
      role: "Y tá",
      department: "Hỗ trợ",
      appointmentsToday: 6,
      status: "active"
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
          <h1 className="text-3xl font-bold mb-2">Bảng điều khiển Manager</h1>
          <p className="text-muted-foreground">
            Quản lý tổng thể hệ thống và theo dõi hiệu suất
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Staff Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5" />
                <span>Quản lý Staff</span>
              </CardTitle>
              <CardDescription>
                Quản lý nhân viên và phân công công việc
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffList.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {staff.role} • {staff.department}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Lịch hôm nay: {staff.appointmentsToday}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">
                        Hoạt động
                      </Badge>
                      <Button variant="outline" size="sm">
                        Quản lý
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Thêm nhân viên mới
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Management */}
          <Card>
            <CardHeader>
              <CardTitle>Quản lý hệ thống</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                📊 Báo cáo doanh thu
              </Button>
              <Button variant="outline" className="w-full justify-start">
                👥 Quản lý khách hàng
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🏥 Quản lý dịch vụ
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📅 Quản lý lịch hẹn
              </Button>
              <Button variant="outline" className="w-full justify-start">
                ⚙️ Cài đặt hệ thống
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📈 Thống kê và báo cáo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Appointments */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Lịch hẹn gần đây</CardTitle>
            <CardDescription>
              Theo dõi và quản lý các lịch hẹn trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="font-medium">{appointment.customer}</p>
                      <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bác sĩ</p>
                      <p className="font-medium">{appointment.doctor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dịch vụ</p>
                      <p className="font-medium">{appointment.service}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Thời gian</p>
                      <p className="font-medium">{appointment.date} {appointment.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.statusText}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Chi tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">
                Xem tất cả lịch hẹn
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                Tạo lịch hẹn mới
              </Button>
              <Button variant="outline">
                Xuất báo cáo
              </Button>
              <Button variant="outline">
                Backup dữ liệu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;