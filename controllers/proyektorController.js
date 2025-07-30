// controllers/proyektorController.js
const Proyektor = require('../models/Proyektor');

// Yeni proyektor qeydi əlavə et (və ya mövcud korpusdakı proyektorların sayını artır)
exports.proyektorElaveEt = async (req, res) => {
  try {
    const { korpus, say } = req.body;

    // Eyni korpusda proyektor qeydinin olub-olmadığını yoxla
    let proyektor = await Proyektor.findOne({ korpus });

    if (proyektor) {
      // Əgər tapılarsa, sayını artır
      proyektor.say += say || 1; // Əgər 'say' qeyd edilməyibsə, default olaraq 1 əlavə et
      await proyektor.save();
      res.status(200).json({ message: 'Mövcud korpusdakı proyektorların sayı yeniləndi.', proyektor });
    } else {
      // Tapılmazsa, yeni proyektor qeydi yarat
      const yeniProyektor = new Proyektor(req.body);
      await yeniProyektor.save();
      res.status(201).json(yeniProyektor);
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu korpusda proyektor qeydi artıq mövcuddur. Zəhmət olmasa, mövcud qeydi yeniləyin.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Bütün proyektor qeydlərini gətir
exports.butunProyektorlariGetir = async (req, res) => {
  try {
    const proyektorlar = await Proyektor.find();
    res.status(200).json(proyektorlar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ID-yə görə proyektor qeydini gətir
exports.proyektoruIdIleGetir = async (req, res) => {
  try {
    const proyektor = await Proyektor.findById(req.params.id);
    if (!proyektor) {
      return res.status(404).json({ message: 'Proyektor qeydi tapılmadı.' });
    }
    res.status(200).json(proyektor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Proyektor qeydini yenilə (korpus, say və ya qeydləri dəyiş)
exports.proyektoruYenile = async (req, res) => {
  try {
    const proyektor = await Proyektor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!proyektor) {
      return res.status(404).json({ message: 'Proyektor qeydi tapılmadı.' });
    }
    res.status(200).json(proyektor);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu korpusda proyektor qeydi artıq mövcuddur.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Proyektor qeydini sil
exports.proyektoruSil = async (req, res) => {
  try {
    const proyektor = await Proyektor.findByIdAndDelete(req.params.id);
    if (!proyektor) {
      return res.status(404).json({ message: 'Proyektor qeydi tapılmadı.' });
    }
    res.status(200).json({ message: 'Proyektor qeydi uğurla silindi.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Korpus üzrə proyektor qeydini gətir
exports.korpusUzreProyektoruGetir = async (req, res) => {
  try {
    const { korpus } = req.params;
    const proyektor = await Proyektor.findOne({ korpus: korpus });
    if (!proyektor) {
      return res.status(404).json({ message: `${korpus} korpusunda proyektor qeydi tapılmadı.` });
    }
    res.status(200).json(proyektor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bütün korpuslar üzrə proyektorların ümumi sayını göstər
exports.korpuslarUzreCemSay = async (req, res) => {
  try {
    const result = await Proyektor.aggregate([
      {
        $group: {
          _id: null, // Bütün sənədləri bir qrupda birləşdirir
          toplamProyektorSayi: { $sum: "$say" },
          korpuslarUzreDetal: {
            $push: {
              korpus: "$korpus",
              say: "$say"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          toplamProyektorSayi: 1,
          korpuslarUzreDetal: 1
        }
      }
    ]);
    res.status(200).json(result[0] || { toplamProyektorSayi: 0, korpuslarUzreDetal: [] }); // Əgər heç bir qeyd yoxdursa boş obyekt qaytarır
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};