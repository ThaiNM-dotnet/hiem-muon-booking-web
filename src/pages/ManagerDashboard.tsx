
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UserIcon, FileIcon, TrendingUpIcon } from "lucide-react";
import StaffManagement from "@/components/StaffManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Tổng số bác sĩ",
      value: "12",
      icon: <UserIcon className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      title: "Tổng số khách hàng",
      value: "156",
      icon: <UserIcon className="w-6 h-6" />,
      color: "text-green-500"
    },
    {
      title: "Khách hàng mới tháng này",
      value: "23",
      icon: <CalendarIcon className="w-6 h-6" />,
      color: "text-orange-500"
    },
    {
      title: "Lịch hẹn hoạt động",
      value: "45",
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
          <h1 className="text-3xl font-bold mb-2">Bảng điều khiển quản lý</h1>
          <p className="text-muted-foreground">
            Quản lý tổng thể khách hàng và lịch làm việc của hệ thống
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

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="staff">Quản lý Bác sĩ</TabsTrigger> 
            <TabsTrigger value="customers">Quản lý Khách hàng</TabsTrigger>
            <TabsTrigger value="appointments">Lịch làm việc</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Management */}
            <Card>
              <CardHeader>
                <CardTitle>Quản lý hệ thống</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  📊 Báo cáo doanh thu
                </Button>
                <Button variant="outline" className="justify-start">
                  🏥 Quản lý dịch vụ
                </Button>
                <Button variant="outline" className="justify-start">
                  ⚙️ Cài đặt hệ thống
                </Button>
                <Button variant="outline" className="justify-start">
                  📈 Thống kê và báo cáo
                </Button>
              </CardContent>
            </Card>

            {/* Recent Appointments */}
            <Card>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <StaffManagement />
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý Khách hàng</CardTitle>
                <CardDescription>Quản lý thông tin và lịch sử khách hàng</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Chức năng quản lý khách hàng đang được phát triển...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Lịch làm việc</CardTitle>
                <CardDescription>Quản lý lịch hẹn và phân công công việc</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Chức năng quản lý lịch làm việc đang được phát triển...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;
