# Moneo - Investment & Portfolio Tracker 💰📈  
**Track your investments, manage your portfolio, and monitor real-time stock market trends.**  

## 🔹 About the Project  
Moneo is a **full-stack investment tracker** built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It enables users to track their financial assets, including **stocks, mutual funds, crypto, bonds**.  

With a **clean dashboard, historical analytics, and real-time price updates**, Moneo helps investors make informed decisions and manage their wealth efficiently.  

## 🚀 Key Features  
✅ **User Authentication & Profile Management** – Secure login, user preferences, and currency selection.  
✅ **Portfolio Management** – Add, edit, and remove assets easily.  
✅ **Real-Time Market Data** – Fetch live stock & crypto prices via Alpha Vantage API.  
✅ **Historical Stock Trends** – Analyze past performance with interactive charts.  
✅ **Scalable & Secure** – JWT authentication, cloud-based database, and API caching for efficiency.  

## 📌 Tech Stack  
- **Frontend:** React.js (Hooks, Redux, TailwindCSS)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Authentication:** JWT (JSON Web Tokens)  
- **External APIs:** FINNHUB  
- **Deployment:**  Vercel   

## 🔄 Development Approach (Agile)  
Moneo follows an **Agile development** methodology, ensuring iterative updates and continuous improvements. The roadmap includes multiple releases:  

**🟢 MVP Release:** Basic portfolio tracking and real-time stock price.  
**🔵 Future Updates:** Advanced insights, tax reporting, broker API integrations, and multi-currency support.  

## 🛠 Installation & Setup  
### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/your-username/moneo.git
cd moneo
````

### **2️⃣ Install Dependencies
```bash
npm install
cd client && npm install
```

### **3️⃣ Configure Environment Variables
Create a .env file and set up your API keys and database connection:
```bash
MONGO_URI=your-mongodb-uri
FINNHUB_API_KEY=your-api-key
JWT_SECRET=your-secret-key
```
### **4️⃣ Run the Application
```bash
# Run backend server
npm run server


# Run frontend
cd client && npm start
```
