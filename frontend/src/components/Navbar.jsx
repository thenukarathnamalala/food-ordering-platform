import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1f2937",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white" }}>🍔 Food Platform</h2>

      <div>
        <Link
          to="/"
          style={{ color: "white", marginRight: "20px" }}
        >
          Restaurants
        </Link>

        <Link
          to="/orders"
          style={{ color: "white", marginRight: "20px" }}
        >
          Orders
        </Link>

        <Link
          to="/login"
          style={{ color: "white", marginRight: "20px" }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{ color: "white" }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;