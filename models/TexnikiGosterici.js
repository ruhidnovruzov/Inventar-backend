// models/TexnikiGosterici.js
const mongoose = require('mongoose');

const texnikiGostericiSchema = new mongoose.Schema({
  parametrAd: { // Məsələn, "CPU", "RAM", "Model"
    type: String,
    required: true,
    trim: true,
    unique: true // Hər parametr adı unikal olmalıdır
  },
  parametrinDeyerleri: [ // Hər parametrin birdən çox dəyəri ola bilər (məsələn, "i7-12700", "i5-13400")
    {
      deyer: { // Məsələn, "i7-12700", "16GB", "SSD 512GB"
        type: String,
        required: true,
        trim: true
      },
      say: { // Həmin dəyərdən neçə ədəd var
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  elaveTarixi: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TexnikiGosterici', texnikiGostericiSchema);