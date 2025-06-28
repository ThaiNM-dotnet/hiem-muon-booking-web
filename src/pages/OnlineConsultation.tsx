
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const OnlineConsultation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [question, setQuestion] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const doctors = [
    { id: 1, name: "BS. Trần Văn Nam", specialty: "Chuyên gia IVF", available: true },
    { id: 2, name: "BS. Nguyễn Thị Mai", specialty: "Tư vấn sinh sản", available: true },
    { id: 3, name: "BS. Lê Minh Hoàng", specialty: "Chuyên gia IUI", available: false }
  ];

  const consultationHistory = [
    {
      id: 1,
      date: "2024-06-10",
      doctor: "BS. Nguyễn Thị Mai",
      question: "Tôi có thể chuẩn bị gì trước khi bắt đầu chu kỳ IVF?",
      status: "answered",
      answer: "Bạn nên duy trì chế độ ăn uống lành mạnh, tập thể dục nhẹ nhàng..."
    },
    {
      id: 2,
      date: "2024-05-25",
      doctor: "BS. Trần Văn Nam",
      question: "Sau khi cấy phôi tôi cần lưu ý những gì?",
      status: "answered",
      answer: "Sau khi cấy phôi, bạn cần nghỉ ngơi đầy đủ và tránh các hoạt động nặng..."
    }
  ];

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !selectedDoctor) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Hãy chọn bác sĩ và nhập câu hỏi của bạn.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Đã gửi câu hỏi!",
      description: "Bác sĩ sẽ trả lời câu hỏi của bạn trong vòng 24h."
    });
    setQuestion("");
    setSelectedDoctor("");
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
          <h1 className="text-3xl font-bold mb-2">Tư vấn trực tuyến</h1>
          <p className="text-muted-foreground">
            Đặt câu hỏi và nhận tư vấn từ các chuyên gia
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form đặt câu hỏi */}
          <Card>
            <CardHeader>
              <CardTitle>Đặt câu hỏi mới</CardTitle>
              <CardDescription>Gửi câu hỏi cho bác sĩ chuyên khoa</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                <div>
                  <Label htmlFor="doctor">Chọn bác sĩ</Label>
                  <div className="space-y-2 mt-2">
                    {doctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`doctor-${doctor.id}`}
                          name="doctor"
                          value={doctor.name}
                          checked={selectedDoctor === doctor.name}
                          onChange={(e) => setSelectedDoctor(e.target.value)}
                          disabled={!doctor.available}
                        />
                        <label 
                          htmlFor={`doctor-${doctor.id}`}
                          className={`flex-1 ${!doctor.available ? 'opacity-50' : ''}`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{doctor.name}</span>
                              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            </div>
                            {doctor.available ? (
                              <Badge className="bg-green-100 text-green-800">Có sẵn</Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">Bận</Badge>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="question">Câu hỏi của bạn</Label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Nhập câu hỏi của bạn tại đây..."
                    className="w-full min-h-[120px] p-3 border rounded-md resize-none"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Gửi câu hỏi
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lịch sử tư vấn */}
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử tư vấn</CardTitle>
              <CardDescription>Các câu hỏi đã được trả lời</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consultationHistory.map((consultation) => (
                  <div key={consultation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{consultation.doctor}</p>
                        <p className="text-xs text-muted-foreground">{consultation.date}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Đã trả lời</Badge>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Câu hỏi:</p>
                      <p className="text-sm text-muted-foreground">{consultation.question}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Trả lời:</p>
                      <p className="text-sm text-muted-foreground">{consultation.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnlineConsultation;
