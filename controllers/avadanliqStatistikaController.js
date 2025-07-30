// controllers/statistikaController.js
const Komputer = require('../models/Komputer');
const Printer = require('../models/Printer');
const Proyektor = require('../models/Proyektor');
const Monitor = require('../models/Monitor');
const TexnikiGosterici = require('../models/TexnikiGosterici');

// Bütün avadanlıqların ümumi sayını gətir
exports.umumiAvadanliqSaylari = async (req, res) => {
  try {
    // Kompüterlərin sayını 'say' sahəsinin cəmi olaraq hesablayırıq
    const komputerSayiDetal = await Komputer.aggregate([
      { $group: { _id: null, total: { $sum: "$say" } } }
    ]);
    const komputerSayi = komputerSayiDetal.length > 0 ? komputerSayiDetal[0].total : 0;

    const printerSayiDetal = await Printer.aggregate([
      { $group: { _id: null, total: { $sum: "$say" } } }
    ]);
    const printerSayi = printerSayiDetal.length > 0 ? printerSayiDetal[0].total : 0;

    const proyektorSayiDetal = await Proyektor.aggregate([
      { $group: { _id: null, total: { $sum: "$say" } } }
    ]);
    const proyektorSayi = proyektorSayiDetal.length > 0 ? proyektorSayiDetal[0].total : 0;

    const monitorSayiDetal = await Monitor.aggregate([
      { $group: { _id: null, total: { $sum: "$say" } } }
    ]);
    const monitorSayi = monitorSayiDetal.length > 0 ? monitorSayiDetal[0].total : 0;

    res.status(200).json({
      komputerler: {
        umumiSay: komputerSayi, // İndi bu, 'say' sahəsinin cəmi olacaq
        qeydler: "Korpuslar üzrə ümumi kompüter sayı." // Açıqlamanı yenilədik
      },
      printerler: {
        umumiSay: printerSayi,
        qeydler: "Korpuslar üzrə ümumi printer sayı."
      },
      proyektorlar: {
        umumiSay: proyektorSayi,
        qeydler: "Korpuslar üzrə ümumi proyektor sayı."
      },
      monitorlar: {
        umumiSay: monitorSayi,
        qeydler: "Korpuslar üzrə ümumi monitor sayı."
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Texniki göstəricilərin sayını gətir (məsələn, CPU, RAM sayları)
// Bu funksiya dəyişmir, çünki frontend-də bütün parametrlərin cəmini hesablayacağıq.
exports.texnikiGostericiSaylari = async (req, res) => {
  try {
    const texnikiGostericiler = await TexnikiGosterici.find();

    const result = texnikiGostericiler.map(gosterici => ({
      parametrAd: gosterici.parametrAd,
      deyerler: gosterici.parametrinDeyerleri.map(deyer => ({
        deyer: deyer.deyer,
        say: deyer.say
      }))
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bütün avadanlıqların korpuslar üzrə ümumi icmalını gətir
// Bu funksiya dəyişmir, çünki kompüterlər üçün `$sum: 1` yerinə `$sum: "$say"` istifadə edir.
exports.korpuslarUzreAvadanliqIcmali = async (req, res) => {
  try {
    const komputerlerByKorpus = await Komputer.aggregate([
      { $group: { _id: "$korpus", say: { $sum: "$say" } } }, // Kompüterlər üçün 'say' sahəsinin cəmini toplayırıq
      { $project: { korpus: "$_id", say: 1, _id: 0 } }
    ]);

    const printerlerByKorpus = await Printer.aggregate([
      { $group: { _id: "$korpus", say: { $sum: "$say" } } },
      { $project: { korpus: "$_id", say: 1, _id: 0 } }
    ]);

    const proyektorlarByKorpus = await Proyektor.aggregate([
      { $group: { _id: "$korpus", say: { $sum: "$say" } } },
      { $project: { korpus: "$_id", say: 1, _id: 0 } }
    ]);

    const monitorlarByKorpus = await Monitor.aggregate([
      { $group: { _id: "$korpus", say: { $sum: "$say" } } },
      { $project: { korpus: "$_id", say: 1, _id: 0 } }
    ]);

    const allKorpuslar = new Set();
    komputerlerByKorpus.forEach(item => allKorpuslar.add(item.korpus));
    printerlerByKorpus.forEach(item => allKorpuslar.add(item.korpus));
    proyektorlarByKorpus.forEach(item => allKorpuslar.add(item.korpus));
    monitorlarByKorpus.forEach(item => allKorpuslar.add(item.korpus));

    const icmal = Array.from(allKorpuslar).map(korpus => {
      const komputerSay = komputerlerByKorpus.find(item => item.korpus === korpus)?.say || 0;
      const printerSay = printerlerByKorpus.find(item => item.korpus === korpus)?.say || 0;
      const proyektorSay = proyektorlarByKorpus.find(item => item.korpus === korpus)?.say || 0;
      const monitorSay = monitorlarByKorpus.find(item => item.korpus === korpus)?.say || 0;

      return {
        korpus: korpus,
        komputerSayi: komputerSay,
        printerSayi: printerSay,
        proyektorSayi: proyektorSay,
        monitorSayi: monitorSay,
        korpusUzreCemi: komputerSay + printerSay + proyektorSay + monitorSay
      };
    });

    res.status(200).json(icmal);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};