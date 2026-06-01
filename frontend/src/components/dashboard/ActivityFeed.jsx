import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ActivityFeed() {
  const [activities, setActivities] =
    useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    try {
      const [
        productsRes,
        customersRes,
        ordersRes,
      ] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/customers`),
        fetch(`${API_URL}/orders`),
      ]);

      const products =
        await productsRes.json();

      const customers =
        await customersRes.json();

      const orders =
        await ordersRes.json();

      const recentActivities = [];

      products
        .slice(-2)
        .forEach((product) => {
          recentActivities.push(
            `Product Added: ${product.name}`
          );
        });

      customers
        .slice(-2)
        .forEach((customer) => {
          recentActivities.push(
            `Customer Created: ${customer.full_name}`
          );
        });

      orders
        .slice(-2)
        .forEach((order) => {
          recentActivities.push(
            `Order #${order.id} Created`
          );
        });

      setActivities(
        recentActivities.reverse()
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card">
      <h3>Recent Activity</h3>

      {activities.length === 0 ? (
        <p>No activity found</p>
      ) : (
        activities.map(
          (item, index) => (
            <div
              key={index}
              className="activity-item"
            >
              • {item}
            </div>
          )
        )
      )}
    </div>
  );
}
