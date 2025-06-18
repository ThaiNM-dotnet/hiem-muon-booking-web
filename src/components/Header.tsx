import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">♡</span>
              </div>
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
                <Button variant="outline" onClick={onLogout} size="sm">
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