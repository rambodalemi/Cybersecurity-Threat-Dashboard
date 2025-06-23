# 🛡️ Cybersecurity Threat Detection Dashboard

A full-stack real-time threat detection and alerting dashboard built with:

* **Next.js 15 App Router**
* **MongoDB** for log and alert storage
* **shadcn/ui** and **Recharts** for a modern responsive UI
* **Zod**, **React Hook Form**, and **Tailwind CSS** for interactive forms
* **Nodemailer (Gmail)** for sending alerts via email

---

## 📦 Features

* 🌐 Real-time threat detection via POST `/api/logs`
* 📧 Sends alerts to configured Gmail accounts using SMTP
* 📊 Dynamic dashboards with chart visualizations (shadcn + Recharts)
* ✅ Admin interface to send test alerts manually
* 🔍 Dashboard includes:

  * Recent Alerts
  * Threat Activity Charts
  * Threat Intelligence
  * Analysis Summary

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cybersecurity-dashboard.git
cd cybersecurity-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env.local`

```env
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_gmail_account@gmail.com
EMAIL_PASS=your_app_password
ALERT_EMAIL=default_recipient@gmail.com
```

> 🔐 You must use an **App Password** for Gmail (not your actual password).
> See: [https://support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)

---

## 🚀 Running the Project

```bash
npm run dev
```

### 🧪 Test the Email System

* Navigate to `/`

* Fill out the form with:

  * **Gmail Address** (receiver)
  * **Subject**
  * **Threat Type** from dropdown (e.g. `sqlmap trying brute force on admin.php`)

* Submit the form

* If the threat matches a detector, the system will send an alert

---

## 📡 API Usage

### POST `/api/logs`

Send system logs or test data to trigger detection:

```json
{
  "ip": "203.0.113.45",
  "message": "sqlmap trying brute force on admin.php",
  "receiver": "admin@example.com",
  "emailSubject": "🚨 Suspicious Activity"
}
```

Response:

```json
{
  "success": true,
  "alerts": [
    {
      "type": "Brute Force",
      "message": "Detected SQLMap brute force against admin.php"
    }
  ]
}
```

---

## 📁 Project Structure

```txt
/app
  /api/logs         → API endpoint to receive and evaluate logs
  /             → Test alert UI form
/components        → UI components (alerts table, chart, etc)
/lib               → Database, notification, detection logic
```

---

## 📌 Roadmap

* [x] Add log ingestion and email alerts
* [x] Admin form to manually trigger threats
* [x] Chart visualization with shadcn chart wrapper
* [ ] Add SMS/Discord alerts (optional)
* [ ] Role-based dashboard views
* [ ] Add log search and filtering

---

## 🙌 Contributions

Feel free to fork this repo and submit PRs. Any feedback or suggestions are welcome!

---

## 🧑‍💻 Author

Developed by [Your Name](https://github.com/your-username)

---

## 🛡️ License

This project is licensed under the MIT License.
