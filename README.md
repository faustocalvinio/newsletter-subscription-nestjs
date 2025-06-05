# 📰 Newsletter Subscription API

A NestJS-based API for managing newsletter subscriptions. Subscribers are stored in a PostgreSQL database, and emails are sent weekly using a cron job powered by `@nestjs/schedule` and `Nodemailer`.

---

## 🚀 Tech Stack

- **Backend Framework:** NestJS
- **Database:** PostgreSQL (via TypeORM or Prisma)
- **Email:** Nodemailer
- **Scheduling:** @nestjs/schedule (Cron jobs)
- **Environment Management:** @nestjs/config

---

## 📌 Features

- 📬 Add and manage newsletter subscribers
- 📦 Store subscriber data in PostgreSQL
- 🕒 Weekly cron job to send newsletter emails
- 🧾 Email sending via Nodemailer
- ✅ Input validation and error handling with class-validator

---

## 📁 API Endpoints

### 🔹 Subscriptions
- `POST /subscribe` — Add a new subscriber
- `GET /subscribers` — Get a list of all subscribers *(admin only or optional)*

> All subscriber emails will receive a newsletter once a week automatically.

---

## 🧪 Getting Started

### 📦 Prerequisites

- Node.js ≥ 16.x
- PostgreSQL database

### 🔧 Installation

```bash
git clone https://github.com/yourusername/newsletter-api.git
cd newsletter-api
npm install
