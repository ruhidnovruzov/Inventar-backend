// controllers/warehouseController.js
const Warehouse = require('../models/Warehouse');
const asyncHandler = require('express-async-handler');

// Bütün anbar məhsullarını əldə etmək
exports.getAllWarehouseItems = asyncHandler(async (req, res) => {
    const items = await Warehouse.find().sort({ malinAdi: 1 });
    res.status(200).json(items);
});

// Yeni anbar məhsulu əlavə etmək
exports.createWarehouseItem = asyncHandler(async (req, res) => {
    const { malinAdi, say, qeydler } = req.body;
    const item = new Warehouse({ malinAdi, say, qeydler });
    await item.save();
    res.status(201).json(item);
});

// Anbar məhsulunu ID-yə görə əldə etmək
exports.getWarehouseItemById = asyncHandler(async (req, res) => {
    const item = await Warehouse.findById(req.params.id);
    if (!item) {
        res.status(404).json({ message: 'Məhsul tapılmadı.' });
    } else {
        res.status(200).json(item);
    }
});

// Anbar məhsulunu yeniləmək
exports.updateWarehouseItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { malinAdi, say, qeydler } = req.body;
    const item = await Warehouse.findByIdAndUpdate(
        id,
        { malinAdi, say, qeydler },
        { new: true, runValidators: true }
    );
    if (!item) {
        res.status(404).json({ message: 'Məhsul tapılmadı.' });
    } else {
        res.status(200).json(item);
    }
});

// Anbar məhsulunu silmək
exports.deleteWarehouseItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await Warehouse.findByIdAndDelete(id);
    if (!item) {
        res.status(404).json({ message: 'Məhsul tapılmadı.' });
    } else {
        res.status(200).json({ message: 'Məhsul uğurla silindi.' });
    }
});