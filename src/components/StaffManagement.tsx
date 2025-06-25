
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserIcon, EditIcon, Trash2Icon, PlusIcon } from "lucide-react";

const StaffManagement = () => {
  const { toast } = useToast();
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: "BS. Trần Văn Nam",
      email: "tran.van.nam@fertilityclinic.com",
      role: "Bác sĩ chính",
      department: "Sản Phụ khoa",
      phone: "0123456789",
      experience: "8 năm",
      appointmentsToday: 4,
      status: "active"
    },
    {
      id: 2,
      name: "BS. Nguyễn Thị Mai",
      email: "nguyen.thi.mai@fertilityclinic.com",
      role: "Bác sĩ",
      department: "Hiếm muộn",
      phone: "0987654321",
      experience: "12 năm",
      appointmentsToday: 3,
      status: "active"
    },
    {
      id: 3,
      name: "Y tá Phạm Thị Lan",
      email: "pham.thi.lan@fertilityclinic.com",
      role: "Y tá",
      department: "Hỗ trợ",
      phone: "0456789123",
      experience: "6 năm",
      appointmentsToday: 6,
      status: "inactive"
    }
  ]);

  const [editingStaff, setEditingStaff] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    experience: ""
  });

  const toggleStaffStatus = (id: number) => {
    setStaffList(staffList.map(staff => 
      staff.id === id 
        ? { ...staff, status: staff.status === 'active' ? 'inactive' : 'active' }
        : staff
    ));
    
    const staff = staffList.find(s => s.id === id);
    toast({
      title: "Cập nhật trạng thái",
      description: `${staff?.name} đã được ${staff?.status === 'active' ? 'tạm dừng' : 'kích hoạt'}`,
    });
  };

  const deleteStaff = (id: number) => {
    const staff = staffList.find(s => s.id === id);
    setStaffList(staffList.filter(staff => staff.id !== id));
    toast({
      title: "Xóa nhân viên",
      description: `${staff?.name} đã được xóa khỏi hệ thống`,
      variant: "destructive"
    });
  };

  const addStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.role) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    const staff = {
      id: Math.max(...staffList.map(s => s.id)) + 1,
      ...newStaff,
      appointmentsToday: 0,
      status: "active"
    };

    setStaffList([...staffList, staff]);
    setNewStaff({
      name: "",
      email: "",
      role: "",
      department: "",
      phone: "",
      experience: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Thêm nhân viên thành công",
      description: `${staff.name} đã được thêm vào hệ thống`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-5 h-5" />
            <span>Quản lý Nhân viên</span>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <PlusIcon className="w-4 h-4 mr-2" />
                Thêm nhân viên
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm nhân viên mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin để thêm nhân viên mới vào hệ thống
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    placeholder="Nhập email"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Chức vụ *</Label>
                  <Select value={newStaff.role} onValueChange={(value) => setNewStaff({...newStaff, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chức vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bác sĩ chính">Bác sĩ chính</SelectItem>
                      <SelectItem value="Bác sĩ">Bác sĩ</SelectItem>
                      <SelectItem value="Y tá">Y tá</SelectItem>
                      <SelectItem value="Kỹ thuật viên">Kỹ thuật viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Khoa</Label>
                  <Input
                    id="department"
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
                    placeholder="Nhập khoa"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Kinh nghiệm</Label>
                  <Input
                    id="experience"
                    value={newStaff.experience}
                    onChange={(e) => setNewStaff({...newStaff, experience: e.target.value})}
                    placeholder="Ví dụ: 5 năm"
                  />
                </div>
                <Button onClick={addStaff} className="w-full bg-primary hover:bg-primary/90">
                  Thêm nhân viên
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>
          Quản lý nhân viên và phân công công việc
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {staffList.map((staff) => (
            <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-medium">{staff.name}</p>
                  <p className="text-sm text-muted-foreground">{staff.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chức vụ</p>
                  <p className="font-medium">{staff.role}</p>
                  <p className="text-sm text-muted-foreground">{staff.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Liên hệ</p>
                  <p className="font-medium">{staff.phone}</p>
                  <p className="text-sm text-muted-foreground">Kinh nghiệm: {staff.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lịch hôm nay</p>
                  <p className="font-medium">{staff.appointmentsToday} ca</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  className={staff.status === 'active' 
                    ? "bg-green-100 text-green-800 cursor-pointer" 
                    : "bg-red-100 text-red-800 cursor-pointer"
                  }
                  onClick={() => toggleStaffStatus(staff.id)}
                >
                  {staff.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </Badge>
                <Button variant="outline" size="sm">
                  <EditIcon className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => deleteStaff(staff.id)}>
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffManagement;
