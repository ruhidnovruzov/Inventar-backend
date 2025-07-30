// controllers/monitorController.js
const Monitor = require('../models/Monitor');

// Yeni monitor qeydi əlavə et (və ya mövcud korpusdakı monitorların sayını artır)
exports.monitorElaveEt = async (req, res) => {
  try {
    const { korpus, say } = req.body;

    // Eyni korpusda monitor qeydinin olub-olmadığını yoxla
    let monitor = await Monitor.findOne({ korpus });

    if (monitor) {
      // Əgər tapılarsa, sayını artır
      monitor.say += say || 1; // Əgər 'say' qeyd edilməyibsə, default olaraq 1 əlavə et
      await monitor.save();
      res.status(200).json({ message: 'Mövcud korpusdakı monitorların sayı yeniləndi.', monitor });
    } else {
      // Tapılmazsa, yeni monitor qeydi yarat
      const yeniMonitor = new Monitor(req.body);
      await yeniMonitor.save();
      res.status(201).json(yeniMonitor);
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu korpusda monitor qeydi artıq mövcuddur. Zəhmət olmasa, mövcud qeydi yeniləyin.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Bütün monitor qeydlərini gətir
exports.butunMonitorlariGetir = async (req, res) => {
  try {
    const monitorlar = await Monitor.find();
    res.status(200).json(monitorlar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ID-yə görə monitor qeydini gətir
exports.monitoruIdIleGetir = async (req, res) => {
  try {
    const monitor = await Monitor.findById(req.params.id);
    if (!monitor) {
      return res.status(404).json({ message: 'Monitor qeydi tapılmadı.' });
    }
    res.status(200).json(monitor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Monitor qeydini yenilə (korpus, say və ya qeydləri dəyiş)
exports.monitoruYenile = async (req, res) => {
  try {
    const monitor = await Monitor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!monitor) {
      return res.status(404).json({ message: 'Monitor qeydi tapılmadı.' });
    }
    res.status(200).json(monitor);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu korpusda monitor qeydi artıq mövcuddur.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Monitor qeydini sil
exports.monitoruSil = async (req, res) => {
  try {
    const monitor = await Monitor.findByIdAndDelete(req.params.id);
    if (!monitor) {
      return res.status(404).json({ message: 'Monitor qeydi tapılmadı.' });
    }
    res.status(200).json({ message: 'Monitor qeydi uğurla silindi.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Korpus üzrə monitor qeydini gətir
exports.korpusUzreMonitoruGetir = async (req, res) => {
  try {
    const { korpus } = req.params;
    const monitor = await Monitor.findOne({ korpus: korpus });
    if (!monitor) {
      return res.status(404).json({ message: `${korpus} korpusunda monitor qeydi tapılmadı.` });
    }
    res.status(200).json(monitor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bütün korpuslar üzrə monitorların ümumi sayını göstər
exports.korpuslarUzreCemSay = async (req, res) => {
  try {
    const result = await Monitor.aggregate([
      {
        $group: {
          _id: null, // Bütün sənədləri bir qrupda birləşdirir
          toplamMonitorSayi: { $sum: "$say" },
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
          toplamMonitorSayi: 1,
          korpuslarUzreDetal: 1
        }
      }
    ]);
    res.status(200).json(result[0] || { toplamMonitorSayi: 0, korpuslarUzreDetal: [] }); // Əgər heç bir qeyd yoxdursa boş obyekt qaytarır
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};