import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UserIcon, FileIcon, TrendingUpIcon } from "lucide-react";

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');

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

  const todayAppointments = [
    {
      id: 1,
      customer: "Nguyễn Thị Lan",
      phone: "0901234567",
      service: "IUI - Thu tinh trong tử cung",
      time: "09:00",
      status: "confirmed",
      statusText: "Đã đặt lịch"
    },
    {
      id: 2,
      customer: "Lê Thị Hoa",
      phone: "0907654321",
      service: "IVF - Thu tinh ống nghiệm",
      time: "14:30",
      status: "completed",
      statusText: "Hoàn thành"
    }
  ];

  const services = [
    {
      id: 1,
      name: "IUI - Thu tinh trong tử cung",
      category: "Cơ bản",
      description: "Phương pháp hỗ trợ sinh sản đơn giản, phù hợp với các trường hợp vô sinh nhẹ.",
      price: "15.000.000 - 25.000.000 VNĐ",
      duration: "2-3 tuần",
      successRate: "15-20%"
    },
    {
      id: 2,
      name: "IVF - Thu tinh ống nghiệm cơ bản",
      category: "Nâng cao",
      description: "Thu tinh ngoài cơ thể với công nghệ tiên tiến, phù hợp với nhiều trường hợp vô sinh.",
      price: "80.000.000 - 120.000.000 VNĐ",
      duration: "4-6 tuần",
      successRate: "40-50%"
    },
    {
      id: 3,
      name: "ICSI - Tiêm tinh trùng vào bào tương trứng",
      category: "Nâng cao",
      description: "Công nghệ IVF kết hợp ICSI, phù hợp với vô sinh nam và trường hợp khó.",
      price: "100.000.000 - 150.000.000 VNĐ",
      duration: "4-6 tuần",
      successRate: "45-55%"
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cơ bản':
        return 'bg-blue-100 text-blue-800';
      case 'Nâng cao':
        return 'bg-purple-100 text-purple-800';
      case 'Cao cấp':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bảng điều khiển Staff</h1>
          <p className="text-muted-foreground">
            Quản lý lịch khám và dịch vụ của hệ thống
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
        <div className="mb-6">
          <div className="flex space-x-1 bg-card p-1 rounded-lg border">
            <Button
              variant={activeTab === 'appointments' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('appointments')}
              className={activeTab === 'appointments' ? 'bg-primary text-primary-foreground' : ''}
            >
              Quản lý Lịch khám
            </Button>
            <Button
              variant={activeTab === 'services' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('services')}
              className={activeTab === 'services' ? 'bg-primary text-primary-foreground' : ''}
            >
              Quản lý Dịch vụ
            </Button>
          </div>
        </div>

        {/* Appointments Management */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Quản lý Lịch khám</span>
                  <Button className="bg-primary hover:bg-primary/90">
                    Thêm lịch khám mới
                  </Button>
                </CardTitle>
                <CardDescription>
                  Quản lý lịch hẹn khám của khách hàng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-lg font-semibold">Danh sách lịch khám</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Tổng quan về tất cả lịch khám trong hệ thống
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Khách hàng</th>
                          <th className="text-left py-2">Bác sĩ</th>
                          <th className="text-left py-2">Dịch vụ</th>
                          <th className="text-left py-2">Ngày giờ</th>
                          <th className="text-left py-2">Trạng thái</th>
                          <th className="text-left py-2">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todayAppointments.map((appointment) => (
                          <tr key={appointment.id} className="border-b">
                            <td className="py-3">
                              <div>
                                <p className="font-medium">{appointment.customer}</p>
                                <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                              </div>
                            </td>
                            <td className="py-3">BS. Trần Văn Nam</td>
                            <td className="py-3">{appointment.service}</td>
                            <td className="py-3">
                              📅 2024-06-15 ⏰ {appointment.time}
                            </td>
                            <td className="py-3">
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.statusText}
                              </Badge>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  ✏️
                                </Button>
                                <Button variant="outline" size="sm">
                                  🗑️
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Services Management */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Quản lý Dịch vụ</span>
                  <Button className="bg-primary hover:bg-primary/90">
                    Thêm dịch vụ mới
                  </Button>
                </CardTitle>
                <CardDescription>
                  Quản lý các dịch vụ hỗ trợ sinh sản
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-1 gap-6">
                  {services.map((service) => (
                    <Card key={service.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">{service.name}</h3>
                              <Badge className={getCategoryColor(service.category)}>
                                {service.category}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{service.description}</p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Giá:</span> {service.price}
                              </div>
                              <div>
                                <span className="font-medium">Thời gian:</span> {service.duration}
                              </div>
                              <div>
                                <span className="font-medium">Tỷ lệ thành công:</span> {service.successRate}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              ✏️
                            </Button>
                            <Button variant="outline" size="sm">
                              🗑️
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;