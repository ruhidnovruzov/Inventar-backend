// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const IpTelefon = require('./models/IpTelefon'); // Yeni IpTelefon modelini import edin
const {phoneData} = require('./data/phoneData'); // Yeni: Telefon məlumatlarını daxil edin

dotenv.config(); // .env faylını yükləyin

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB-yə uğurla qoşuldu.');

    // Mövcud IP telefon məlumatlarını silin (təkrarlanmanın qarşısını almaq üçün)
    await IpTelefon.deleteMany({});
    console.log('Mövcud IP telefon məlumatları silindi.');

    // Yeni məlumatları daxil edin
    await IpTelefon.insertMany(phoneData);
    console.log('IP telefon məlumatları uğurla daxil edildi.');

  } catch (error) {
    console.error('Məlumatların daxil edilməsi zamanı xəta:', error);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB qoşulması bağlandı.');
  }
}

seedDatabase();
