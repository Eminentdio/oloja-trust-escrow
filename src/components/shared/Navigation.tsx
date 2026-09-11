import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, User, Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { UserRole } from "@/lib/mockData";

interface NavigationProps {
  role: UserRole | null;
  onLogout: () => void;
}

export const Navigation = ({ role, onLogout }: NavigationProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavItems = () => {
    switch (role) {
      case "buyer":
        return [
          { label: "Home", icon: Home, path: "/buyer" },
          { label: "My Orders", icon: User, path: "/buyer/orders" },
        ];
      case "seller":
        return [
          { label: "Home", icon: Home, path: "/seller" },
          { label: "Orders", icon: User, path: "/seller/orders" },
        ];
      case "agent":
        return [
          { label: "Dashboard", icon: Shield, path: "/agent" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Shield className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">TrustEscrow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="ml-2"
            >
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 justify-start"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};