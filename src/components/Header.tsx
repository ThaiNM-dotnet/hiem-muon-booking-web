
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  user?: {
    name: string;
    role: 'user' | 'staff' | 'manager';
  };
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    toast({
      title: "Tạm biệt!",
      description: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Hẹn gặp lại!",
    });
    navigate('/');
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/9dcd7ec6-25c5-4e02-98e1-0b9eee7bf214.png" 
                alt="FertilityCare" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-foreground">FertilityCare</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => navigate('/booking')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/booking') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Booking
            </button>
            <button
              onClick={() => navigate('/services')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/services') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dịch vụ
            </button>
            <span className="text-sm font-medium text-muted-foreground">Về chúng tôi</span>
            <span className="text-sm font-medium text-muted-foreground">Liên hệ</span>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (user.role === 'manager') {
                      navigate('/dashboard/manager');
                    } else if (user.role === 'staff') {
                      navigate('/dashboard/staff');
                    } else {
                      navigate('/dashboard/user');
                    }
                  }}
                  className="text-sm"
                >
                  Dashboard
                </Button>
                <span className="text-sm text-muted-foreground">Xin chào, {user.name}</span>
                <Button variant="outline" onClick={handleLogout} size="sm">
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  size="sm"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  Đăng ký ngay
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
