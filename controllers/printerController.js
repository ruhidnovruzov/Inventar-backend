// controllers/printerController.js
const Printer = require('../models/Printer');

// Yeni printer əlavə et (və ya mövcud korpusdakı printerlərin sayını artır)
exports.printerElaveEt = async (req, res) => {
  try {
    const { korpus, say } = req.body;

    // Eyni korpusda printerin olub-olmadığını yoxla
    let printer = await Printer.findOne({ korpus });

    if (printer) {
      // Əgər tapılarsa, sayını artır
      printer.say += say || 1; // Əgər 'say' qeyd edilməyibsə, default olaraq 1 əlavə et
      await printer.save();
      res.status(200).json({ message: 'Mövcud korpusdakı printerlərin sayı yeniləndi.', printer });
    } else {
      // Tapılmazsa, yeni printer qeydi yarat
      const yeniPrinter = new Printer(req.body);
      await yeniPrinter.save();
      res.status(201).json(yeniPrinter);
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu korpusda printer qeydi artıq mövcuddur. Zəhmət olmasa, mövcud qeydi yeniləyin.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Bütün printer qeydlərini gətir
exports.butunPrinterleriGetir = async (req, res) => {
  try {
    const printerler = await Printer.find();
    res.status(200).json(printerler);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ID-yə görə printer qeydini gətir
exports.printeriIdIleGetir = async (req, res) => {
  try {
    const printer = await Printer.findById(req.params.id);
    if (!printer) {
      return res.status(404).json({ message: 'Printer qeydi tapılmadı.' });
    }
    res.status(200).json(printer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Printer qeydini yenilə (korpus, say və ya qeydləri dəyiş)
exports.printeriYenile = async (req, res) => {
  try {
    const printer = await Printer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!printer) {
      return res.status(404).json({ message: 'Printer qeydi tapılmadı.' });
    }
    res.status(200).json(printer);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu korpusda printer qeydi artıq mövcuddur.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Printer qeydini sil
exports.printeriSil = async (req, res) => {
  try {
    const printer = await Printer.findByIdAndDelete(req.params.id);
    if (!printer) {
      return res.status(404).json({ message: 'Printer qeydi tapılmadı.' });
    }
    res.status(200).json({ message: 'Printer qeydi uğurla silindi.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Korpus üzrə printer qeydini gətir
exports.korpusUzrePrinteriGetir = async (req, res) => {
  try {
    const { korpus } = req.params;
    const printer = await Printer.findOne({ korpus: korpus });
    if (!printer) {
      return res.status(404).json({ message: `${korpus} korpusunda printer qeydi tapılmadı.` });
    }
    res.status(200).json(printer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bütün korpuslar üzrə printerlərin ümumi sayını göstər
exports.korpuslarUzreCemSay = async (req, res) => {
  try {
    const result = await Printer.aggregate([
      {
        $group: {
          _id: null, // Bütün sənədləri bir qrupda birləşdirir
          toplamPrinterSayi: { $sum: "$say" },
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
          toplamPrinterSayi: 1,
          korpuslarUzreDetal: 1
        }
      }
    ]);
    res.status(200).json(result[0] || { toplamPrinterSayi: 0, korpuslarUzreDetal: [] }); // Əgər heç bir qeyd yoxdursa boş obyekt qaytarır
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};