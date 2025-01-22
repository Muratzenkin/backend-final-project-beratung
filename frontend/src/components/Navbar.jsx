import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-400">
      <div className="container mx-auto flex justify-between p-8">
        <h1 className="text-lg font-bold">Consultant Management</h1>
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/register" className="mr-4">
            Register
          </Link>
          <Link to="/login" className="mr-4">
            Login
          </Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
