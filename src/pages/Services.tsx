
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const serviceCategories = [
    { id: 'all', label: 'Tất cả (6)' },
    { id: 'basic', label: 'Cơ bản (1)' },
    { id: 'advanced', label: 'Nâng cao (2)' },
    { id: 'premium', label: 'Cao cấp (1)' },
    { id: 'support', label: 'Hỗ trợ (2)' }
  ];

  const services = [
    {
      id: 1,
      category: 'basic',
      title: 'IUI - Thu tinh trong tử cung',
      description: 'Phương pháp hỗ trợ sinh sản đơn giản, phù hợp với các trường hợp vô sinh nhẹ.',
      duration: '2-3 tuần',
      successRate: '15-20%',
      features: [
        'Theo dõi rụng trứng',
        'Xử lý tinh trùng',
        'Thu tinh trong tử cung',
        'Theo dõi sau thủ thuật'
      ],
      priceRange: '15.000.000 - 25.000.000',
      currency: 'VNĐ',
      badge: 'Cơ bản',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      category: 'advanced',
      title: 'IVF - Thu tinh ống nghiệm cơ bản',
      description: 'Thu tinh ngoài cơ thể với công nghệ tiên tiến, phù hợp với nhiều trường hợp vô sinh.',
      duration: '4-6 tuần',
      successRate: '40-50%',
      features: [
        'Kích thích buồng trứng',
        'Lấy trứng',
        'Thu tinh trong phòng thí nghiệm',
        'Nuôi cấy phôi',
        'Chuyển phôi vào tử cung'
      ],
      priceRange: '80.000.000 - 120.000.000',
      currency: 'VNĐ',
      badge: 'Nâng cao',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 3,
      category: 'advanced',
      title: 'ICSI - Tiêm tinh trùng vào bào tương trứng',
      description: 'Công nghệ IVF kết hợp ICSI, phù hợp với vô sinh nam và trường hợp khó.',
      duration: '4-6 tuần',
      successRate: '45-55%',
      features: [
        'Tất cả quy trình IVF',
        'Tiêm tinh trùng trực tiếp',
        'Tăng tỷ lệ thu tinh',
        'Phù hợp vô sinh nam'
      ],
      priceRange: '100.000.000 - 150.000.000',
      currency: 'VNĐ',
      badge: 'Nâng cao',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 4,
      category: 'premium',
      title: 'PGT-A - Chẩn đoán di truyền tiền làm tổ',
      description: 'IVF kết hợp xét nghiệm di truyền phôi, đảm bảo phôi khỏe mạnh.',
      duration: '6-8 tuần',
      successRate: '60-70%',
      features: [
        'Tất cả quy trình IVF/ICSI',
        'Sinh thiết phôi',
        'Xét nghiệm di truyền',
        'Chọn phôi khỏe mạnh',
        'Tỷ lệ thành công cao'
      ],
      priceRange: 'Thương lượng',
      currency: '',
      badge: 'Cao cấp',
      badgeColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 5,
      category: 'support',
      title: 'Đông lạnh phôi/trứng',
      description: 'Bảo quản phôi hoặc trứng để sử dụng trong tương lai.',
      duration: '1 ngày',
      successRate: '90%+',
      features: [
        'Công nghệ đông lạnh hiện đại',
        'Bảo quản dài hạn',
        'Tỷ lệ sống cao',
        'Linh hoạt thời gian'
      ],
      priceRange: '5.000.000 - 10.000.000',
      currency: 'VNĐ',
      badge: 'Hỗ trợ',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      id: 6,
      category: 'support',
      title: 'Tư vấn và khám sàng lọc',
      description: 'Khám và tư vấn toàn diện về tình trạng sinh sản.',
      duration: '1-2 giờ',
      successRate: '100%',
      features: [
        'Khám tổng quát',
        'Xét nghiệm cơ bản',
        'Tư vấn chuyên sâu',
        'Lập kế hoạch điều trị'
      ],
      priceRange: '500.000 - 2.000.000',
      currency: 'VNĐ',
      badge: 'Hỗ trợ',
      badgeColor: 'bg-green-100 text-green-800'
    }
  ];

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Dịch vụ & Bảng giá</h1>
          <p className="text-muted-foreground text-lg">
            Tổng quan về các dịch vụ hỗ trợ sinh sản tại FertilityCare
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {serviceCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              className={activeFilter === category.id ? "bg-primary hover:bg-primary/90" : ""}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={service.badgeColor}>
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span>⏱️</span>
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>⭐</span>
                    <span>{service.successRate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Quy trình bao gồm:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {service.priceRange}
                    </p>
                    {service.currency && (
                      <p className="text-sm text-muted-foreground">{service.currency}</p>
                    )}
                  </div>
                  <Button
                    onClick={() => navigate('/booking')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Đăng ký tư vấn
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Không có dịch vụ nào trong danh mục này.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">
                Cần tư vấn thêm về dịch vụ?
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Đội ngũ chuyên gia của chúng tôi sẽ tư vấn miễn phí để giúp bạn chọn được phương pháp điều trị phù hợp nhất.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/booking')}
                className="text-lg px-8 py-3"
              >
                Đặt lịch tư vấn miễn phí
              </Button>
              <div className="mt-4">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  Gọi ngay: 1900-1234
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
