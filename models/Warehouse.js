// models/Warehouse.js
const mongoose = require('mongoose');

const productList = [
    'Server', 'Noutbuk', 'Desktop Kompüter', 'Monoblok (All-in-One)', 'Mini PC',
    'Tablet', 'Monitor', 'Router', 'Switch', 'Modem', 'Firewall', 'Access Point',
    'IP Telefon', 'Patch Panel', 'Sərt Disk (HDD, SSD)', 'Xarici Sərt Disk (External HDD)',
    'Ana plata (Motherboard)', 'Prosessor (CPU)', 'Operativ yaddaş (RAM)',
    'Videokart (GPU)', 'Qida bloku (PSU)', 'Korpus', 'Soyuducu (CPU Cooler)',
    'Klaviatura', 'Siçan (Mouse)', 'Vebkamera', 'Qulaqlıq (Headset)', 'Mikrofon',
    'Printer', 'Skaner', 'UPS (Fasiləsiz enerji təminatı)', 'Lazer Göstərici',
    'HDMI Kabel', 'VGA Kabel', 'Ethernet Kabel (CAT6, CAT5)', 'USB Kabel (Type-A, Type-C, Micro-USB)',
    'Enerji adapteri', 'Kabel bağlayıcı (Cable Tie)', 'Termopasta'
];

const WarehouseSchema = new mongoose.Schema({
    malinAdi: {
        type: String,
        required: [true, 'Malın adı mütləqdir.'],
        enum: {
            values: productList,
            message: 'Malın adı verilən siyahıda olmalıdır.'
        },
        trim: true
    },
    say: {
        type: Number,
        required: [true, 'Say mütləqdir.'],
        min: [0, 'Say mənfi ola bilməz.']
    },
    qeydler: {
        type: String,
        trim: true
    },
    tarix: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);