// controllers/ipTelefonController.js
const IpTelefon = require('../models/IpTelefon');

// Yeni IP telefon əlavə et
exports.ipTelefonElaveEt = async (req, res) => {
  try {
    const yeniIpTelefon = new IpTelefon(req.body);
    await yeniIpTelefon.save();
    res.status(201).json(yeniIpTelefon);
  } catch (err) {
    if (err.code === 11000) { // Duplicate key error (telefon nömrəsi unikal olmalıdır)
      return res.status(400).json({ message: 'Bu telefon nömrəsi artıq mövcuddur.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Bütün IP telefonları gətir
exports.butunIpTelefonlariGetir = async (req, res) => {
  try {
    const ipTelefonlar = await IpTelefon.find();
    res.status(200).json(ipTelefonlar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ID-yə görə IP telefonu gətir
exports.ipTelefonuIdIleGetir = async (req, res) => {
  try {
    const ipTelefon = await IpTelefon.findById(req.params.id);
    if (!ipTelefon) {
      return res.status(404).json({ message: 'IP telefon tapılmadı.' });
    }
    res.status(200).json(ipTelefon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// IP telefonu yenilə
exports.ipTelefonuYenile = async (req, res) => {
  try {
    const ipTelefon = await IpTelefon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ipTelefon) {
      return res.status(404).json({ message: 'IP telefon tapılmadı.' });
    }
    res.status(200).json(ipTelefon);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu telefon nömrəsi artıq başqa bir qeyddə mövcuddur.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// IP telefonu sil
exports.ipTelefonuSil = async (req, res) => {
  try {
    const ipTelefon = await IpTelefon.findByIdAndDelete(req.params.id);
    if (!ipTelefon) {
      return res.status(404).json({ message: 'IP telefon tapılmadı.' });
    }
    res.status(200).json({ message: 'IP telefon uğurla silindi.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ümumi IP telefon sayını gətir
exports.umumiIpTelefonSayi = async (req, res) => {
  try {
    const totalCount = await IpTelefon.countDocuments();
    res.status(200).json({ count: totalCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
