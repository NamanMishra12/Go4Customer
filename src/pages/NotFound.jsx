import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>

      <Link to="/login" className="text-blue-600 hover:underline">
        Go to Login
      </Link>
    </div>
  );
}

export default NotFound;