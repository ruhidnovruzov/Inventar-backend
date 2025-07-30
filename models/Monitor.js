// models/Monitor.js
const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
  korpus: { // Monitorun yerləşdiyi korpus (bina, otaq, mərtəbə və s.)
    type: String,
    required: true,
    trim: true,
    unique: true // Hər korpusda yalnız bir "monitor növü" qeydi olacaq
  },
  say: { // Həmin korpusda neçə ədəd monitor var (ümumi say)
    type: Number,
    required: true,
    min: 0
  },
  qeydler: {
    type: String,
    trim: true,
    default: ''
  },
  elaveTarixi: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Monitor', monitorSchema);