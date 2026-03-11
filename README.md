# 💍 Ring Shop

A full stack web application for selling unique rings that helps **reduce breakups** by connecting couples through meaningful ring purchases, anniversary reminders, and love messages.

---

## 📋 Table of Contents
- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Database Setup](#database-setup)
- [Running the App](#running-the-app)
- [How to Use](#how-to-use)
- [Issues & Solutions](#issues--solutions)
- [API Endpoints](#api-endpoints)

---

## 📖 About the Project

Ring Shop is a service for selling unique rings built as a school project. The main feature of this project is to **reduce breakups in relationships** by:

- Allowing couples to link their accounts together
- Tracking anniversary dates and sending reminders
- Enabling partners to send love messages with ring purchases
- Offering matching rings for couples

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React |
| Backend | Node.js + Express |
| Database | MySQL |
| Authentication | JWT + Bcrypt |
| HTTP Client | Axios |

---

## ✨ Features

- 💍 Browse and buy unique rings
- 👤 User registration and login
- 💑 Couple linking system
- 📅 Anniversary date tracking
- 💌 Love messages with ring purchases
- 🛒 Order management system

---

## 📁 Project Structure

```
ring-shop/
├── backend/
│   ├── routes/
│   │   ├── auth.js        # Login & Register
│   │   ├── rings.js       # Ring products
│   │   ├── couples.js     # Couple linking
│   │   └── orders.js      # Order management
│   ├── db.js              # Database connection
│   ├── index.js           # Main server file
│   ├── .env               # Environment variables (not uploaded)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── RingCard.js
    │   │   └── Footer.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── RingDetail.js
    │   │   └── Couple.js
    │   └── App.js
    └── package.json
```

---

## ✅ Prerequisites

Make sure you have these installed before running the project:

- [Node.js](https://nodejs.org) (v18 or higher)
- [MySQL](https://dev.mysql.com/downloads/) (v8.0)
- [Git](https://git-scm.com)

To verify installations, run:
```bash
node -v
npm -v
mysql -u root -p
```

---

## 🚀 Setup & Installation

### Step 1 — Clone the Repository
```bash
git https://github.com/makaradeu/ring-shop.git
cd ring-shop
```

### Step 2 — Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3 — Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 4 — Create Environment File
Inside the `backend` folder, create a `.env` file:
```bash
cd ../backend
touch .env
```

Add these values to `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ring_shop
JWT_SECRET=mysecretkey123
PORT=5000
```
⚠️ Replace `your_mysql_password` with your actual MySQL password!

---

## 🗄️ Database Setup

### Step 1 — Login to MySQL
```bash
mysql -u root -p
```

### Step 2 — Create Database and Tables
```sql
CREATE DATABASE ring_shop;
USE ring_shop;

-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  partner_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rings Table
CREATE TABLE rings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(10,2),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  ring_id INT,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (ring_id) REFERENCES rings(id)
);

-- Couples Table
CREATE TABLE couples (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT,
  user2_id INT,
  anniversary_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users(id),
  FOREIGN KEY (user2_id) REFERENCES users(id)
);

-- Reminders Table
CREATE TABLE reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  couple_id INT,
  reminder_date DATE,
  message TEXT,
  FOREIGN KEY (couple_id) REFERENCES couples(id)
);
```

### Step 3 — Add Sample Data
```sql
INSERT INTO rings (name, description, price, image_url) VALUES
('Love Forever Ring', 'A beautiful ring symbolizing eternal love', 99.99, 'ring1.jpg'),
('Couple Bond Ring', 'Matching rings for couples', 149.99, 'ring2.jpg'),
('Promise Ring', 'A ring to seal your promise', 79.99, 'ring3.jpg');
```

### Step 4 — Verify Tables
```sql
SHOW TABLES;
```
Expected output:
```
couples
orders
reminders
rings
users
```

---

## ▶️ Running the App

You need **2 Terminal windows** open at the same time.

### Terminal 1 — Start Backend
```bash
cd ring-shop/backend
npx nodemon index.js
```
Expected output:
```
Server running on port 5000 ✅
Connected to MySQL database ✅
```

### Terminal 2 — Start Frontend
```bash
cd ring-shop/frontend
npm start
```
Your browser will automatically open at **http://localhost:3000** 🎉

---

## 📱 How to Use

### 1. Register an Account
- Go to `http://localhost:3000/register`
- Enter your name, email, and password

### 2. Login
- Go to `http://localhost:3000/login`
- Enter your email and password

### 3. Browse Rings
- Go to `http://localhost:3000`
- Click **"View Ring"** on any ring card

### 4. Order a Ring with a Love Message
- Click on any ring
- Write a love message
- Click **"Order Now"**

### 5. Link With Your Partner (💑 Reduce Breakup Feature)
- Go to `http://localhost:3000/couple`
- Enter your partner's User ID
- Enter your anniversary date
- Click **"Link With Partner"**

To find User IDs, run this in MySQL:
```sql
SELECT id, name FROM users;
```

---

## 🐛 Issues & Solutions

### Issue 1 — `zsh: command not found: mysql`
**Cause:** MySQL is installed but Terminal cannot find it.

**Solution:**
```bash
echo 'export PATH="/usr/local/mysql/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

---

### Issue 2 — Frontend showing as submodule on GitHub (arrow icon ➡️)
**Cause:** `create-react-app` automatically creates its own `.git` folder inside the frontend folder.

**Solution:**
```bash
rm -rf frontend/.git
git rm -r --cached frontend
git add .
git commit -m "fix frontend submodule issue"
git push
```

---

### Issue 3 — `No configured push destination`
**Cause:** Git remote origin was not set.

**Solution:**
```bash
git remote add origin https://github.com/yourusername/ring-shop.git
git branch -M main
git push -u origin main
```

---

### Issue 4 — CORS Error in Browser
**Cause:** Backend is not allowing requests from Frontend.

**Solution:** Make sure `cors` is installed and added in `backend/index.js`:
```javascript
const cors = require('cors');
app.use(cors());
```

---

### Issue 5 — Cannot Connect to MySQL Database
**Cause:** Wrong password or database name in `.env` file.

**Solution:** Double check your `.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_correct_password
DB_NAME=ring_shop
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Rings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rings` | Get all rings |
| GET | `/api/rings/:id` | Get single ring |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place an order |
| GET | `/api/orders/:user_id` | Get user orders |

### Couples
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/couples/link` | Link two users as couple |
| GET | `/api/couples/:id` | Get couple info |

---

## 👨‍💻 Author

Built with ❤️ as a school project to help reduce breakups through meaningful ring purchases.