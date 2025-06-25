
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UserIcon, FileIcon, TrendingUpIcon } from "lucide-react";
import ServiceManagement from "@/components/ServiceManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const StaffDashboard = () => {
  const { toast } = useToast();
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

  const [appointments, setAppointments] = useState([
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
  ]);

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

  const updateAppointmentStatus = (id: number, newStatus: string, newStatusText: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id 
        ? { ...apt, status: newStatus, statusText: newStatusText }
        : apt
    ));
    
    const appointment = appointments.find(apt => apt.id === id);
    toast({
      title: "Cập nhật trạng thái",
      description: `Lịch hẹn của ${appointment?.customer} đã được cập nhật`,
    });
  };

  const deleteAppointment = (id: number) => {
    const appointment = appointments.find(apt => apt.id === id);
    setAppointments(appointments.filter(apt => apt.id !== id));
    toast({
      title: "Xóa lịch hẹn",
      description: `Lịch hẹn của ${appointment?.customer} đã được xóa`,
      variant: "destructive"
    });
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appointments">Quản lý Lịch khám</TabsTrigger>
            <TabsTrigger value="services">Quản lý Dịch vụ</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
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
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Bác sĩ</TableHead>
                        <TableHead>Dịch vụ</TableHead>
                        <TableHead>Ngày giờ</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{appointment.customer}</p>
                              <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.doctor}</TableCell>
                          <TableCell>{appointment.service}</TableCell>
                          <TableCell>
                            📅 {appointment.date} ⏰ {appointment.time}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={`${getStatusColor(appointment.status)} cursor-pointer`}
                              onClick={() => {
                                if (appointment.status === 'confirmed') {
                                  updateAppointmentStatus(appointment.id, 'completed', 'Hoàn thành');
                                } else if (appointment.status === 'completed') {
                                  updateAppointmentStatus(appointment.id, 'confirmed', 'Đã đặt lịch');
                                }
                              }}
                            >
                              {appointment.statusText}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                ✏️
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => deleteAppointment(appointment.id)}
                              >
                                🗑️
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <ServiceManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;
