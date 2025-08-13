// server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const komputerRoutes = require('./routes/komputerRoutes');
const texnikiGostericiRoutes = require('./routes/texnikiGostericiRoutes');
const printerRoutes = require('./routes/printerRoutes');
const proyektorRoutes = require('./routes/proyektorRoutes');
const monitorRoutes = require('./routes/monitorRoutes');
const avadanliqStatistikaRoutes = require('./routes/avadanliqStatistikaRoutes'); // YENİ
const monoblokRoutes = require('./routes/monoblokRoutes.js'); // Yeni: Monoblok route
const IpTelefonRoutes = require('./routes/ipTelefonRoutes'); // Yeni: IP Telefon route
const warehouseRoutes = require('./routes/warehouseRoutes');


 

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(cors()); // CORS-u aktivləşdir
app.use(express.json());

// Routes
app.use('/api/komputerler', komputerRoutes);
app.use('/api/texniki-gostericiler', texnikiGostericiRoutes);
app.use('/api/printerler', printerRoutes);
app.use('/api/proyektorlar', proyektorRoutes);
app.use('/api/monitorlar', monitorRoutes);
app.use('/api/monobloklar', monoblokRoutes); // Yeni: Monoblok route
app.use('/api/statistika', avadanliqStatistikaRoutes); // YENİ
app.use('/api/ip-telefonlar', IpTelefonRoutes); // Yeni: IP Telefon route
app.use('/api/anbar', warehouseRoutes); // Anbar məhsulları üçün route
// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
// Admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// MongoDB bağlantısı
mongoose.connect(DB_URI)
  .then(() => {
    console.log('MongoDB-yə uğurla qoşuldu!');
    app.listen(PORT, () => {
      console.log(`Server http://localhost:${PORT} ünvanında işləyir`);
    });
  })
  .catch(err => {
    console.error('MongoDB qoşulma xətası:', err);
  });