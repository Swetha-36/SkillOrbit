
import { Link } from "react-router-dom";
import { LoginForm } from "@/components/AuthForms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="mb-8 text-center">
        <Link to="/" className="text-2xl font-bold gradient-heading">
          SkillSprint
        </Link>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Log in to your SkillSprint account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <Link to="/" className="hover:text-skillsprint-600 hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default Login;
