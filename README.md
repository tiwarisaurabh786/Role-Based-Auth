#  Event Management System - Full Stack

**Student** और **Admin** dashboard के साथ complete event platform.

## ✨ Features
✅ Student: Events browse + register  
✅ Admin: Create/Edit/Delete events
✅ Real-time seat counter
✅ Search + Filters (category, seats, date)
✅ Mobile responsive design

## Setup 

### Database (PostgreSQL)
```bash
psql -U postgres -d event_management -f schema.sql

### Backend
cd backend
mvn spring-boot:run
Backend: http://localhost:8080

### Frontend
cd frontend  
npm install && npm start
Frontend: http://localhost:3000

### Test Users
first register and then login to my portal...

Student: tiwarisoravvka@gmail.com
Admin: admin@events.com / admin123

