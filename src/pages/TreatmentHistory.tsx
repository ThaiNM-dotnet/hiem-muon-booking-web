
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const TreatmentHistory = () => {
  const navigate = useNavigate();

  const treatments = [
    {
      id: 1,
      date: "2024-06-15",
      treatment: "IVF - Thu tinh ống nghiệm",
      doctor: "BS. Trần Văn Nam",
      result: "Thành công",
      notes: "Quá trình diễn ra suôn sẻ, theo dõi tiếp",
      status: "completed"
    },
    {
      id: 2,
      date: "2024-05-28",
      treatment: "IUI - Thu tinh trong tử cung",
      doctor: "BS. Lê Minh Hoàng",
      result: "Không thành công",
      notes: "Cần điều chỉnh phương pháp điều trị",
      status: "completed"
    },
    {
      id: 3,
      date: "2024-05-10", 
      treatment: "Tư vấn và khám sàng lọc",
      doctor: "BS. Nguyễn Thị Mai",
      result: "Hoàn thành",
      notes: "Đã xác định phương pháp điều trị phù hợp",
      status: "completed"
    },
    {
      id: 4,
      date: "2024-07-01",
      treatment: "IVF - Chu kỳ 2",
      doctor: "BS. Trần Văn Nam", 
      result: "Đang theo dõi",
      notes: "Đã cấy phôi, chờ kết quả",
      status: "in-progress"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">Đang điều trị</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Khác</Badge>;
    }
  };

  const getResultBadge = (result: string) => {
    if (result === "Thành công") {
      return <Badge className="bg-green-100 text-green-800">{result}</Badge>;
    } else if (result === "Không thành công") {
      return <Badge className="bg-red-100 text-red-800">{result}</Badge>;
    } else if (result === "Đang theo dõi") {
      return <Badge className="bg-yellow-100 text-yellow-800">{result}</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800">{result}</Badge>;
  };

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard/user')}
            className="mb-4"
          >
            ← Quay lại Dashboard
          </Button>
          <h1 className="text-3xl font-bold mb-2">Lịch sử điều trị</h1>
          <p className="text-muted-foreground">
            Xem lại lịch sử các liệu trình điều trị của bạn
          </p>
        </div>

        <div className="space-y-6">
          {treatments.map((treatment) => (
            <Card key={treatment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{treatment.treatment}</CardTitle>
                    <CardDescription>
                      {treatment.doctor} • {treatment.date}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    {getStatusBadge(treatment.status)}
                    {getResultBadge(treatment.result)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm text-muted-foreground">Ghi chú:</span>
                    <p className="text-sm mt-1">{treatment.notes}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentHistory;
