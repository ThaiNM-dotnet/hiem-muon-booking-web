
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (user: { name: string; role: 'user' | 'staff' | 'manager' }) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login logic - in real app this would authenticate with backend
    if (email === 'manager@fertilitycare.com') {
      onLogin({ name: 'Manager', role: 'manager' });
      navigate('/dashboard/manager');
    } else if (email === 'staff@fertilitycare.com') {
      onLogin({ name: 'Staff', role: 'staff' });
      navigate('/dashboard/staff');
    } else {
      // For regular users, extract name from email or use default
      const userName = email.includes('@') ? email.split('@')[0] : 'Khách hàng';
      onLogin({ name: userName, role: 'user' });
      navigate('/customer'); // Navigate to customer page instead of user dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2 mb-4 mx-auto hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">♡</span>
            </div>
            <span className="text-xl font-bold">FertilityCare</span>
          </button>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập email và mật khẩu để truy cập hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your-email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-sm">
              <button
                type="button"
                className="text-pink-500 hover:underline"
              >
                Quên mật khẩu?
              </button>
              <div className="mt-4 p-3 bg-pink-50 rounded-lg">
                <div className="text-pink-600 font-medium mb-2">Tài khoản mặc định:</div>
                <div className="text-sm text-pink-600">
                  Manager: manager@fertilitycare.com / @1<br />
                  Staff: staff@fertilitycare.com / @1<br />
                  User: bất kỳ email nào khác / @1
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600">
              Đăng nhập
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Chưa có tài khoản? </span>
            <button
              onClick={() => navigate('/register')}
              className="text-pink-500 hover:underline"
            >
              Đăng ký ngay
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
