# CreditSea Backend

This is a **Node.js + Express** backend service for **CreditSea**, a loan management and user account handling system.  
It provides APIs for user authentication, profile management, and loan applications.

---

##  Features

- User Authentication (Login, Account Creation, OTP-based verification)
- JWT-based Authorization
- Update User Profile
- Apply for Loan
- Loan Status Management
- MongoDB for persistent data storage
- Twilio SMS Service for OTP
- Firebase Cloud Messaging (FCM) Integration (via Service Account)

---

## Tech Stack

- **Node.js** (Runtime)
- **Express.js** (Web Framework)
- **MongoDB** (Database)
- **JWT** (Authentication)
- **Twilio** (SMS/OTP Service)
- **Firebase Admin SDK** (Push Notifications)

---

##  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/creditsea-backend.git
cd creditsea-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root and add the following:

```env
PORT=4000
MONGODB_CONNECTION_URL=mongodb://localhost:27017/creditsea
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_SERVICE_SID=your_twilio_service_sid
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=100d
PROJECT_ID=your_firebase_project_id
CLIENT_EMAIL=your_firebase_client_email
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
```

### 4. Run the Server
```bash
npm run dev
```

Server will start at:  
 `http://localhost:4000`

---

##  API Documentation

### **User APIs**

#### 1. Login
```http
POST /api/user/login
```
**Body**
```json
{
  "mobileNumber": "9876543210",
  "password": "mypassword",
  "fcmToken": "optional"
}
```

---

#### 2. Create Account
```http
POST /api/user/createAccount
```
**Body**
```json
{
  "mobileNumber": "9876543210",
  "password": "mypassword",
  "fcmToken": "optional"
}
```

---

#### 3. Request OTP
```http
POST /api/user/requestOtp
```
**Body**
```json
{
  "mobileNumber": "9876543210"
}
```

---

#### 4. Verify OTP
```http
POST /api/user/verifyOtp
```
**Body**
```json
{
  "mobileNumber": "9876543210",
  "userEnteredOtp": "123456"
}
```

---

#### 5. Update User Details (Protected)
```http
POST /api/user/update
Authorization: <JWT_TOKEN>
```
**Body (any combination of these fields)**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "gender": "MALE",
  "dateOfBirth": "19900101",
  "maritalStatus": "MARRIED",
  "email": "john@example.com",
  "panNumber": "ABCD1234"
}
```

---

### **Loan APIs**

#### 1. Apply for Loan ( Protected)
```http
POST /api/loan/apply
Authorization: <JWT_TOKEN>
```
**Body**
```json
{
  "purposeOfLoan": "Personal Loan",
  "principalAmount": 500000,
  "tenure": 24
}
```

---

#### 2. Get Loan Details by ID
```http
GET /api/loan/:id
```
- Example: `/api/loan/64ffddc88e...`

---

#### 3. Update Loan Status
```http
POST /api/loan/:id/update
```
**Body**
```json
{
  "status": "Application under Review"
}
```
 Allowed values:  
- `Application Submitted`  
- `Application under Review`  
- `E-KYC`  
- `E-Nach`  
- `E-Sign`  
- `Disbursement`

---

## Scripts

- `npm run dev` → Start development server with Nodemon  

---


