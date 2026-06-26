import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const userId = user.id || user._id;

      const response = await API.get(
        `/api/orders/user/${userId}`
      );

      setOrders(response.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/api/orders/${id}`);

    setOrders(
      orders.filter((order) => order._id !== id)
    );

    alert("Order deleted successfully");

  } catch (error) {
    console.log(error);
    alert("Failed to delete order");
  }
};

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders 📦</h1>

      {orders.length === 0 ? (
        <div className="empty-message">
          No orders found.
        </div>
      ) : (
        <div className="order-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID</h3>

              <p>{order._id}</p>

              <p>
                <strong>Restaurant:</strong>
                {" "}
                {order.restaurantName}             
              </p>

              <p>
                <strong>Total:</strong>
                {" "}
                Rs. {order.totalAmount}
              </p>

              <p className="status">
                Status: {order.status}
              </p>

              <p>
                <strong>Created:</strong>
                {" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <button
                  className="delete-btn"
                  onClick={() => deleteOrder(order._id)}
              >
                  Delete Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;