
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { EditIcon, Trash2Icon, PlusIcon } from "lucide-react";

const ServiceManagement = () => {
  const { toast } = useToast();
  const [services, setServices] = useState([
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
    },
    {
      id: 4,
      name: "PGT-A - Chẩn đoán di truyền tiền làm tổ",
      category: "Cao cấp",
      description: "IVF kết hợp xét nghiệm di truyền phôi, đảm bảo phôi khỏe mạnh.",
      price: "150.000.000 - 200.000.000 VNĐ",
      duration: "6-8 tuần",
      successRate: "60-70%"
    },
    {
      id: 5,
      name: "Đông lạnh phôi/trứng",
      category: "Hỗ trợ",
      description: "Bảo quản phôi hoặc trứng để sử dụng trong tương lai.",
      price: "5.000.000 - 10.000.000 VNĐ",
      duration: "1 ngày",
      successRate: "90%+"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    successRate: ""
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cơ bản':
        return 'bg-blue-100 text-blue-800';
      case 'Nâng cao':
        return 'bg-purple-100 text-purple-800';
      case 'Cao cấp':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hỗ trợ':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const addService = () => {
    if (!newService.name || !newService.category || !newService.description) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    const service = {
      id: Math.max(...services.map(s => s.id)) + 1,
      ...newService
    };

    setServices([...services, service]);
    setNewService({
      name: "",
      category: "",
      description: "",
      price: "",
      duration: "",
      successRate: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Thêm dịch vụ thành công",
      description: `${service.name} đã được thêm vào hệ thống`,
    });
  };

  const deleteService = (id: number) => {
    const service = services.find(s => s.id === id);
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Xóa dịch vụ",
      description: `${service?.name} đã được xóa khỏi hệ thống`,
      variant: "destructive"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Quản lý Dịch vụ</span>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <PlusIcon className="w-4 h-4 mr-2" />
                Thêm dịch vụ mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm dịch vụ mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin để thêm dịch vụ mới vào hệ thống
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên dịch vụ *</Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    placeholder="Nhập tên dịch vụ"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Danh mục *</Label>
                  <Select value={newService.category} onValueChange={(value) => setNewService({...newService, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cơ bản">Cơ bản</SelectItem>
                      <SelectItem value="Nâng cao">Nâng cao</SelectItem>
                      <SelectItem value="Cao cấp">Cao cấp</SelectItem>
                      <SelectItem value="Hỗ trợ">Hỗ trợ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Mô tả *</Label>
                  <Textarea
                    id="description"
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    placeholder="Nhập mô tả dịch vụ"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Giá</Label>
                    <Input
                      id="price"
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                      placeholder="Ví dụ: 15.000.000 - 25.000.000 VNĐ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Thời gian</Label>
                    <Input
                      id="duration"
                      value={newService.duration}
                      onChange={(e) => setNewService({...newService, duration: e.target.value})}
                      placeholder="Ví dụ: 2-3 tuần"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="successRate">Tỷ lệ thành công</Label>
                  <Input
                    id="successRate"
                    value={newService.successRate}
                    onChange={(e) => setNewService({...newService, successRate: e.target.value})}
                    placeholder="Ví dụ: 15-20%"
                  />
                </div>
                <Button onClick={addService} className="w-full bg-primary hover:bg-primary/90">
                  Thêm dịch vụ
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>
          Quản lý các dịch vụ hỗ trợ sinh sản
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
                      <EditIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteService(service.id)}>
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceManagement;
