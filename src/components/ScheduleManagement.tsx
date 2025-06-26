
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PencilIcon, TrashIcon } from "lucide-react";

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      doctor: "BS. Nguyễn Văn An",
      date: "15/6/2024",
      time: "08:00 - 12:00",
      patients: "3/10",
      status: "available"
    },
    {
      id: 2,
      doctor: "BS. Trần Thị Bình",
      date: "15/6/2024",
      time: "13:00 - 17:00",
      patients: "5/8",
      status: "available"
    },
    {
      id: 3,
      doctor: "BS. Lê Minh Cường",
      date: "16/6/2024",
      time: "08:00 - 12:00",
      patients: "0/10",
      status: "unavailable"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchedules = schedules.filter(schedule =>
    schedule.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.date.includes(searchTerm)
  );

  const toggleStatus = (id: number) => {
    setSchedules(schedules.map(schedule =>
      schedule.id === id
        ? { ...schedule, status: schedule.status === 'available' ? 'unavailable' : 'available' }
        : schedule
    ));
  };

  const deleteSchedule = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa lịch làm việc này?")) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'available' ? (
      <Badge className="bg-green-100 text-green-800">Có sẵn</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Không có sẵn</Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch làm việc bác sĩ ({schedules.length})</CardTitle>
        <CardDescription>
          Quản lý lịch làm việc của các bác sĩ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Tìm kiếm theo tên bác sĩ hoặc ngày..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bác sĩ</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Giờ làm việc</TableHead>
                <TableHead>Bệnh nhân</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.doctor}</TableCell>
                  <TableCell>{schedule.date}</TableCell>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>{schedule.patients}</TableCell>
                  <TableCell>
                    <button onClick={() => toggleStatus(schedule.id)}>
                      {getStatusBadge(schedule.status)}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteSchedule(schedule.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
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
  );
};

export default ScheduleManagement;
