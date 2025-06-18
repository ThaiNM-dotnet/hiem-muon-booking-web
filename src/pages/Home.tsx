import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: "♡",
      title: "IUI - Thu tinh trong tử cung",
      description: "Phương pháp hỗ trợ sinh sản đơn giản, phù hợp với các trường hợp vô sinh nhẹ.",
      buttonText: "Đăng ký dịch vụ",
      color: "text-pink-500"
    },
    {
      icon: "⚕",
      title: "IVF - Thu tinh ống nghiệm cơ bản",
      description: "Công nghệ tiên tiến nhất hiện tại, phù hợp với nhiều trường hợp vô sinh.",
      buttonText: "Đăng ký dịch vụ",
      color: "text-blue-500"
    },
    {
      icon: "🔬",
      title: "Tư vấn chuyên sâu",
      description: "Dịch vụ tư vấn toàn diện về tình trạng sinh sản và kế hoạch điều trị.",
      buttonText: "Đăng ký dịch vụ",
      color: "text-green-500"
    }
  ];

  const whyChooseUs = [
    {
      icon: "👨‍⚕️",
      title: "Đội ngũ chuyên gia",
      description: "Bác sĩ và chuyên gia hàng đầu về sinh sản tại Việt Nam với nhiều năm kinh nghiệm."
    },
    {
      icon: "🏥",
      title: "Công nghệ hiện đại",
      description: "Trang thiết bị y tế hiện đại nhất, đảm bảo chất lượng điều trị tốt nhất."
    },
    {
      icon: "💰",
      title: "Tỷ lệ thành công cao",
      description: "Tỷ lệ thành công cao trong các phương pháp điều trị hiếm muộn."
    },
    {
      icon: "♡",
      title: "Chăm sóc tận tình",
      description: "Chăm sóc tận tình và hỗ trợ tâm lý trong suốt quá trình điều trị."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Chăm sóc sức khỏe sinh sản
            <br />
            <span className="text-primary">Với tình yêu thương</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Chúng tôi đồng hành cùng bạn trên hành trình mang thai hạnh phúc. Đến với chúng tôi để nhận được sự chăm sóc tận tận tâm từ đội ngũ chuyên gia hàng đầu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/booking')}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-3"
            >
              Tư vấn ngay
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dịch vụ điều trị hiếm muộn</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`text-4xl mb-4 ${service.color}`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => navigate('/booking')}
                  >
                    {service.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tại sao chọn chúng tôi?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bắt đầu hành trình của bạn ngay hôm nay
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Hãy để chúng tôi đồng hành với bạn trên hành trình đến với hạnh phúc làm cha mẹ.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/booking')}
            className="text-lg px-8 py-3"
          >
            Đăng ký tư vấn ngay
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;