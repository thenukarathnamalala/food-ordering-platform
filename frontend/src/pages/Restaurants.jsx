import { useEffect, useState } from "react";
import API from "../services/api";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await API.get("/api/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.log("Error fetching restaurants:", error);
    }
  };

  return (
    <div className="restaurant-container">
      <h1 className="restaurant-title">Available Restaurants 🍔</h1>

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant-card">
            <h3>{restaurant.name}</h3>

            <p>
              <strong>📍 Address:</strong> {restaurant.address}
            </p>

            <p>
              <strong>🍽 Cuisine:</strong> {restaurant.cuisine}
            </p>

            <p className="rating">
              ⭐ Rating: {restaurant.rating}
            </p>

            <button className="order-btn">
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;