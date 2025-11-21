# Candidate Referral Management System – Backend

A complete backend API built using **Node.js**, **Express.js**, and **MongoDB** for managing candidate referrals, resume uploads, and status tracking.  
This project was created as part of the **Worko Assignment**.

---

## 🚀 Project Overview

The Candidate Referral Management System provides a robust RESTful API that handles:

- Submitting new candidate referrals  
- Uploading resume files securely  
- Managing and updating candidate status  
- Fetching all referred candidates  
- Serving uploaded resume files statically  

This backend is part of a MERN stack environment and uses MongoDB for data storage with Mongoose for schema modeling.

---

## 💻 Tech Stack

| Purpose | Technology |
|---------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| File Uploads | Multer |
| Validation | express-validator |
| Environment Variables | dotenv |
| CORS Support | cors |

---

## ✨ Features

### ✔ Add New Candidate Referral  
Submit candidate details such as name, email, phone, and job title through REST API.

### ✔ Resume Upload (PDF)  
Candidates’ resumes are uploaded via **Multer** and stored in a dedicated `/uploads` directory.

### ✔ Data Validation  
Email and phone number formats are validated using **express-validator**.

### ✔ Fetch All Candidates  
Retrieve all the referred candidates stored in MongoDB.

### ✔ Update Candidate Status  
Change the candidate’s status (e.g., Pending → Reviewed → Hired).

### ✔ Serve Resume Files Statically  
Access uploaded resume PDFs directly via `/uploads/<filename>`.

---

## 🛠️ Local Setup Guide

Follow the steps below to run the project on your machine.

---

### **1. Install Dependencies**

Run in the root directory:

```bash
npm install
