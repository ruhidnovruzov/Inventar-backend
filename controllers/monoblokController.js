// controllers/monoblokController.js
const Monoblok = require('../models/Monoblok');

// Yeni monoblok əlavə et
exports.monoblokElaveEt = async (req, res) => {
  try {
    const yeniMonoblok = new Monoblok(req.body);
    await yeniMonoblok.save();
    res.status(201).json(yeniMonoblok);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Bütün monoblokları gətir
exports.butunMonobloklariGetir = async (req, res) => {
  try {
    const monobloklar = await Monoblok.find();
    res.status(200).json(monobloklar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// İD-yə görə monobloku gətir
exports.monoblokuIdIleGetir = async (req, res) => {
  try {
    const monoblok = await Monoblok.findById(req.params.id);
    if (!monoblok) {
      return res.status(404).json({ message: 'Monoblok tapılmadı.' });
    }
    res.status(200).json(monoblok);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Monobloku yenilə
exports.monoblokuYenile = async (req, res) => {
  try {
    const monoblok = await Monoblok.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!monoblok) {
      return res.status(404).json({ message: 'Monoblok tapılmadı.' });
    }
    res.status(200).json(monoblok);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Monobloku sil
exports.monoblokuSil = async (req, res) => {
  try {
    const monoblok = await Monoblok.findByIdAndDelete(req.params.id);
    if (!monoblok) {
      return res.status(404).json({ message: 'Monoblok tapılmadı.' });
    }
    res.status(200).json({ message: 'Monoblok uğurla silindi.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Korpus üzrə monoblokları gətir və sayını göstər
exports.korpusUzreMonobloklariGetir = async (req, res) => {
  try {
    const { korpus } = req.params;
    const monobloklar = await Monoblok.find({ korpus: korpus });
    if (monobloklar.length === 0) {
      return res.status(404).json({ message: `${korpus} korpusunda monoblok tapılmadı.` });
    }
    res.status(200).json({
      korpus: korpus,
      qeyd_sayi: monobloklar.length,
      monobloklar_qeydleri: monobloklar
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bütün korpuslar üzrə monoblokların ümumi sayını göstər
exports.korpuslarUzreCemSay = async (req, res) => {
  try {
    const result = await Monoblok.aggregate([
      {
        $group: {
          _id: "$korpus",
          say: { $sum: "$say" }
        }
      },
      {
        $project: {
          korpus: "$_id",
          say: 1,
          _id: 0
        }
      }
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
