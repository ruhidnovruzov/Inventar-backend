// controllers/komputerController.js
const Komputer = require('../models/Komputer');

// Yeni kompüter əlavə et
exports.komputerElaveEt = async (req, res) => {
  try {
    const yeniKomputer = new Komputer(req.body);
    await yeniKomputer.save();
    res.status(201).json(yeniKomputer);
  } catch (err) {
    // Modelə əlavə olunan 'kategoriya' sahəsi də burada validasiya olunacaq.
    res.status(400).json({ message: err.message });
  }
};

// Bütün kompüterləri gətir
exports.butunKomputerleriGetir = async (req, res) => {
  try {
    // Əgər kateqoriya üzrə filterləmə tələb olunarsa, query parametri əlavə edilə bilər.
    // Məsələn: const { kategoriya } = req.query;
    // const filter = kategoriya ? { kategoriya } : {};
    // const komputerler = await Komputer.find(filter);
    const komputerler = await Komputer.find();
    res.status(200).json(komputerler);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// İD-yə görə kompüteri gətir
exports.komputeriIdIleGetir = async (req, res) => {
  try {
    const komputer = await Komputer.findById(req.params.id);
    if (!komputer) {
      return res.status(404).json({ message: 'Kompüter tapılmadı.' });
    }
    res.status(200).json(komputer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Kompüteri yenilə
exports.komputeriYenile = async (req, res) => {
  try {
    // `runValidators: true` yeni modelə uyğun olaraq 'kategoriya' sahəsinin də doğrulanmasını təmin edəcək.
    const komputer = await Komputer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!komputer) {
      return res.status(404).json({ message: 'Kompüter tapılmadı.' });
    }
    res.status(200).json(komputer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Kompüteri sil
exports.komputeriSil = async (req, res) => {
  try {
    const komputer = await Komputer.findByIdAndDelete(req.params.id);
    if (!komputer) {
      return res.status(404).json({ message: 'Kompüter tapılmadı.' });
    }
    res.status(200).json({ message: 'Kompüter uğurla silindi.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Korpus üzrə kompüterləri gətir və sayını göstər
exports.korpusUzreKomputerleriGetir = async (req, res) => {
  try {
    const { korpus } = req.params;
    const komputerler = await Komputer.find({ korpus: korpus });
    if (komputerler.length === 0) {
      return res.status(404).json({ message: `${korpus} korpusunda kompüter tapılmadı.` });
    }
    res.status(200).json({
      korpus: korpus,
      qeyd_sayi: komputerler.length,
      komputerler_qeydleri: komputerler
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bütün korpuslar üzrə kompüterlərin ümumi sayını göstər
exports.korpuslarUzreCemSay = async (req, res) => {
  try {
    const result = await Komputer.aggregate([
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
