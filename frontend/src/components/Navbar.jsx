import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    // Refresh navbar after logout
    window.location.reload();
  };

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

        {!user ? (
          <>
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
          </>
        ) : (
          <>
            <span
              style={{
                color: "white",
                marginRight: "20px",
                fontWeight: "bold",
              }}
            >
              Welcome, {user.name}
            </span>

            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;