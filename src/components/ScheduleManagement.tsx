import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getAllSchedules, createSchedule, updateSchedule, deleteSchedule } from "@/api/scheduleService";

const ScheduleManagement = () => {
  const { toast } = useToast();
  
  const [schedules, setSchedules] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    getAllSchedules().then(res => setSchedules(res.data));
  }, []);

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

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa lịch làm việc này?")) {
      await deleteSchedule(id);
      setSchedules(schedules.filter(s => s.id !== id));
    }
  };

  const handleEdit = (schedule: any) => {
    setEditingSchedule({ ...schedule });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingSchedule) return;
    await updateSchedule(editingSchedule.id, editingSchedule);
    setSchedules(schedules.map(s => s.id === editingSchedule.id ? editingSchedule : s));
    
    toast({
      title: "Cập nhật thành công!",
      description: "Lịch làm việc đã được cập nhật."
    });
    
    setIsEditDialogOpen(false);
    setEditingSchedule(null);
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(schedule)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(schedule.id)}
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

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chỉnh sửa lịch làm việc</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin lịch làm việc của bác sĩ
              </DialogDescription>
            </DialogHeader>
            {editingSchedule && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-doctor">Bác sĩ</Label>
                  <Input
                    id="edit-doctor"
                    value={editingSchedule.doctor}
                    onChange={(e) => setEditingSchedule({...editingSchedule, doctor: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-date">Ngày</Label>
                  <Input
                    id="edit-date"
                    value={editingSchedule.date}
                    onChange={(e) => setEditingSchedule({...editingSchedule, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-time">Giờ làm việc</Label>
                  <Input
                    id="edit-time"
                    value={editingSchedule.time}
                    onChange={(e) => setEditingSchedule({...editingSchedule, time: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-patients">Số bệnh nhân</Label>
                  <Input
                    id="edit-patients"
                    value={editingSchedule.patients}
                    onChange={(e) => setEditingSchedule({...editingSchedule, patients: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ScheduleManagement;
