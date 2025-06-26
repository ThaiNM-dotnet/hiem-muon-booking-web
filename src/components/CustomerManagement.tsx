
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PencilIcon, TrashIcon } from "lucide-react";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Nguyễn Thị Mai",
      email: "nguyen.thi.mai@email.com",
      phone: "0123456789",
      age: 28,
      address: "Hà Nội",
      registrationDate: "15/1/2024",
      status: "active"
    },
    {
      id: 2,
      name: "Trần Văn Nam",
      email: "tran.van.nam@email.com",
      phone: "0987654321",
      age: 32,
      address: "TP. Hồ Chí Minh",
      registrationDate: "20/2/2024",
      status: "active"
    },
    {
      id: 3,
      name: "Lê Thị Hoa",
      email: "le.thi.hoa@email.com",
      phone: "0456789123",
      age: 26,
      address: "Đà Nẵng",
      registrationDate: "10/3/2024",
      status: "inactive"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const toggleStatus = (id: number) => {
    setCustomers(customers.map(customer =>
      customer.id === id
        ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' }
        : customer
    ));
  };

  const deleteCustomer = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Không hoạt động</Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách khách hàng ({customers.length})</CardTitle>
        <CardDescription>
          Quản lý thông tin các khách hàng trong hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Tuổi</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.age}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.registrationDate}</TableCell>
                  <TableCell>
                    <button onClick={() => toggleStatus(customer.id)}>
                      {getStatusBadge(customer.status)}
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
                        onClick={() => deleteCustomer(customer.id)}
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

export default CustomerManagement;
