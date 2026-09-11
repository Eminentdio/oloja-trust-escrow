import { AlertTriangle, Home, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto px-4 text-center">
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center py-8">
            <AlertTriangle size={48} className="mx-auto mb-4 text-amber-500" />
            <CardTitle className="text-2xl font-bold text-foreground">
              Page Not Found
            </CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              The page you're looking for doesn't exist.
            </p>
          </CardHeader>
          <CardContent className="py-6">
            <p className="text-muted-foreground mb-4">
              Please check the URL or return to the home page.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Search size={16} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search or enter URL..."
                className="w-full pl-4 pr-10 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </CardContent>
          <CardContent className="flex justify-center pt-4">
            <Button
              asChild
              onClick={() => window.location.href = "/"}
              className="bg-brand-500 hover:bg-brand-600"
            >
              <Home size={20} className="mr-2" />
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;