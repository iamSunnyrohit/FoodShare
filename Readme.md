<div align="center">

# 🍲 FoodShare

### Hyperlocal Real-Time Food Rescue & Redistribution Network

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https.opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.0-61dafb.svg)](https://reactjs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--Time-010101.svg)](https://socket.io/)
[![Status](https://img.shields.io/badge/Status-In%20Development-orange.svg)]()

<p align="center">
  <b>Bridging surplus food donors, nearby receivers, and last-mile volunteers in real time.</b>
</p>

[Key Features](#-key-features) • [Platform Architecture](#-platform-architecture) • [Target Metrics](#-target-metrics--impact) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Overview](#-api-overview)

</div>

---

## 📌 Problem & Solution

**The Problem:** Restaurants, grocery stores, and households discard tons of edible surplus food daily while local shelters and low-income families experience food insecurity. Existing efforts fail primarily due to a lack of **real-time coordination**—knowing what food is available, where it is, and ensuring fast delivery before it spoils.

**The Solution:** **FoodShare** is a three-sided hyperlocal marketplace operating within a strict radius (default **5 km**). It coordinates:
1. **Donors:** Quickly list surplus edible food with short expiration windows.
2. **Receivers:** Browse live local listings and claim food instantaneously.
3. **Volunteers:** Pick up claimed food and perform last-mile delivery to keep food fresh.

---

## ⚡ Key Features

* **📍 Hyperlocal Discovery (Geo-Radius):** Spatial filtering ensures receivers and volunteers only see listings within a **5 km** radius, optimizing transport times.
* **⚡ Real-Time Status Synchronization:** Powered by WebSockets/Socket.io; state updates (Posted ➔ Claimed ➔ In Transit ➔ Delivered) broadcast across all clients within **< 2 seconds**.
* **🔐 Strict Role-Based Access Control (RBAC):** Distinct dashboards and capabilities tailored for Donors, Receivers, and Volunteers.
* **📊 Live Impact Analytics:** Automatic calculating and rendering of real-time metrics:
  $$\text{Meals Saved} = \frac{\text{Delivered Weight (kg)}}{0.4\text{ kg/meal}}$$
  $$\text{CO}_2\text{e Avoided} = \text{Delivered Weight (kg)} \times 2.5\text{ kg CO}_2\text{e/kg}$$
* **⏳ Automated Expiration Handling:** Unclaimed listings automatically expire and leave the nearby feed to maintain quality and safety standards.

---

## 👥 User Roles & Workflow

```
 +------------------+           +--------------------+           +---------------------+
 |   DONOR          |           |   RECEIVER         |           |   VOLUNTEER         |
 | (Restaurant/Grocer)|         | (Shelter/NGO)      |           | (Individual/Rider)  |
 +--------+---------+           +---------+----------+           +----------+----------+
          |                               |                                 |
          | 1. Posts Surplus Food         |                                 |
          +------------------------------>|                                 |
          |                               | 2. Claims Listing               |
          |                               +-------------------------------->|
          |                                                                 | 3. Accepts Pickup
          |                                                                 | 4. Delivers Food
          |<------------------------------<---------------------------------+
          |                      5. Impact Updated (Live)                   |
```

| Role | Core Purpose | Key Actions |
| :--- | :--- | :--- |
| **Donor** | Give away surplus food quickly | Create listings, set pickup windows, track impact, cancel unclaimed posts |
| **Receiver** | Locate and secure edible food | Browse nearby feed ($< 5\text{ km}$), claim food, monitor incoming deliveries |
| **Volunteer** | Provide last-mile delivery | View claimed pickups, accept transit tasks, confirm final delivery |

---

## 🎯 Target Metrics & Impact

| Metric Goal | Operational Target | Status / Benchmark |
| :--- | :--- | :--- |
| **Fulfillment Rate** | $\ge 70\%$ of listings reaching *Delivered* | Active Target |
| **Claim Speed** | Median time to claim: **$< 20$ mins** | Operational |
| **Delivery Speed** | Median claim-to-delivery time: **$< 90$ mins** | Operational |
| **Volunteer Efficiency** | $\ge 60\%$ pickups claimed within **30 mins** | Target |
| **Database Latency** | Nearby geo-query response **$< 300$ ms** @ $100\text{k}$ items | System Benchmark |

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Context API / Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB / PostgreSQL (with Geospatial Indexing)
- **Real-Time:** Socket.io / WebSockets
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18.0.0 or higher)
* npm or yarn
* Database instance (MongoDB or PostgreSQL with spatial extensions)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamSunnyrohit/FoodShare.git
   cd FoodShare
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret_key
   DEFAULT_RADIUS_KM=5
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

4. **Running Locally**
   
   Start the Backend Server:
   ```bash
   # From /backend
   npm run dev
   ```

   Start the Frontend Client:
   ```bash
   # From /client
   npm start
   ```

---

## 📡 Core API Endpoints (v1)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user with designated role |
| `POST` | `/api/auth/login` | Public | Authenticate and obtain JWT token |
| `GET` | `/api/listings/nearby` | Authenticated | Get active unexpired food listings within radius |
| `POST` | `/api/listings` | Donor | Create a new food surplus listing |
| `PATCH` | `/api/listings/:id/claim` | Receiver | Claim an available food listing |
| `PATCH` | `/api/listings/:id/accept` | Volunteer | Accept a claimed listing for delivery |
| `PATCH` | `/api/listings/:id/deliver`| Volunteer | Mark an in-transit listing as delivered |
| `GET` | `/api/analytics/impact` | Authenticated | Retrieve live aggregate metrics (Meals, $\text{CO}_2\text{e}$) |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.