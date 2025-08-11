// controllers/statistikaController.js
const Komputer = require('../models/Komputer');
const Printer = require('../models/Printer');
const Proyektor = require('../models/Proyektor');
const Monitor = require('../models/Monitor');
const Monoblok = require('../models/Monoblok');
const IpTelefon = require('../models/IpTelefon');
const TexnikiGosterici = require('../models/TexnikiGosterici');

// Bütün avadanlıqların ümumi sayını gətirən funksiya
exports.umumiAvadanliqSaylari = async (req, res) => {
    try {
        const komputerSayiDetal = await Komputer.aggregate([
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const komputerSayi = komputerSayiDetal.length > 0 ? komputerSayiDetal[0].total : 0;

        // Kompüter kateqoriyaları üzrə sayları hesabla
        const auditoriyaKomputerSayiDetal = await Komputer.aggregate([
            { $match: { kategoriya: 'Auditoriya' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const auditoriyaKomputerSayi = auditoriyaKomputerSayiDetal.length > 0 ? auditoriyaKomputerSayiDetal[0].total : 0;

        const inzibatiKomputerSayiDetal = await Komputer.aggregate([
            { $match: { kategoriya: 'İnzibati' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const inzibatiKomputerSayi = inzibatiKomputerSayiDetal.length > 0 ? inzibatiKomputerSayiDetal[0].total : 0;

        const akademikKomputerSayiDetal = await Komputer.aggregate([
            { $match: { kategoriya: 'Akademik' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const akademikKomputerSayi = akademikKomputerSayiDetal.length > 0 ? akademikKomputerSayiDetal[0].total : 0;
        
        const laboratoriyaKomputerSayiDetal = await Komputer.aggregate([
            { $match: { kategoriya: 'Laboratoriya' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const laboratoriyaKomputerSayi = laboratoriyaKomputerSayiDetal.length > 0 ? laboratoriyaKomputerSayiDetal[0].total : 0;


        const digerKomputerSayiDetal = await Komputer.aggregate([
            { $match: { kategoriya: 'Digər' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const digerKomputerSayi = digerKomputerSayiDetal.length > 0 ? digerKomputerSayiDetal[0].total : 0;

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

        const monoblokSayiDetal = await Monoblok.aggregate([
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const monoblokSayi = monoblokSayiDetal.length > 0 ? monoblokSayiDetal[0].total : 0;

        // Monoblok kateqoriyaları üzrə sayları hesabla
        const auditoriyaMonoblokSayiDetal = await Monoblok.aggregate([
            { $match: { kategoriya: 'Auditoriya' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const auditoriyaMonoblokSayi = auditoriyaMonoblokSayiDetal.length > 0 ? auditoriyaMonoblokSayiDetal[0].total : 0;
        
        const inzibatiMonoblokSayiDetal = await Monoblok.aggregate([
            { $match: { kategoriya: 'İnzibati' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const inzibatiMonoblokSayi = inzibatiMonoblokSayiDetal.length > 0 ? inzibatiMonoblokSayiDetal[0].total : 0;

        const akademikMonoblokSayiDetal = await Monoblok.aggregate([
            { $match: { kategoriya: 'Akademik' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const akademikMonoblokSayi = akademikMonoblokSayiDetal.length > 0 ? akademikMonoblokSayiDetal[0].total : 0;
        
        const laboratoriyaMonoblokSayiDetal = await Monoblok.aggregate([
            { $match: { kategoriya: 'Laboratoriya' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const laboratoriyaMonoblokSayi = laboratoriyaMonoblokSayiDetal.length > 0 ? laboratoriyaMonoblokSayiDetal[0].total : 0;

        const digerMonoblokSayiDetal = await Monoblok.aggregate([
            { $match: { kategoriya: 'Digər' } },
            { $group: { _id: null, total: { $sum: "$say" } } }
        ]);
        const digerMonoblokSayi = digerMonoblokSayiDetal.length > 0 ? digerMonoblokSayiDetal[0].total : 0;


        const ipTelefonSayi = await IpTelefon.countDocuments();

        // Texniki göstəriciləri əlavə et
        const texnikiGostericiler = await TexnikiGosterici.find();
        const texnikiGostericiSaylari = texnikiGostericiler.map(gosterici => ({
            parametrAd: gosterici.parametrAd,
            deyerler: gosterici.parametrinDeyerleri.map(deyer => ({
                deyer: deyer.deyer,
                say: deyer.say
            }))
        }));

        // Texniki göstəricilərin ümumi sayını hesabla
        const umumiTexnikiGostericiSayi = texnikiGostericiler.reduce((total, gosterici) => {
            const sumOfValues = gosterici.parametrinDeyerleri.reduce((subtotal, deyer) => subtotal + deyer.say, 0);
            return total + sumOfValues;
        }, 0);

        res.status(200).json({
            komputerler: {
                umumiSay: komputerSayi,
                auditoriyaSay: auditoriyaKomputerSayi,
                inzibatiSay: inzibatiKomputerSayi,
                akademikSay: akademikKomputerSayi,
                laboratoriyaSay: laboratoriyaKomputerSayi,
                digerSay: digerKomputerSayi,
                qeydler: "Korpuslar üzrə ümumi kompüter sayı."
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
            },
            monobloklar: {
                umumiSay: monoblokSayi,
                auditoriyaSay: auditoriyaMonoblokSayi,
                inzibatiSay: inzibatiMonoblokSayi,
                akademikSay: akademikMonoblokSayi,
                laboratoriyaSay: laboratoriyaMonoblokSayi,
                digerSay: digerMonoblokSayi,
                qeydler: "Korpuslar üzrə ümumi monoblok sayı."
            },
            ipTelefonlar: {
                umumiSay: ipTelefonSayi,
                qeydler: "Ümumi IP telefon sayı."
            },
            texnikiGostericiler: {
                umumiSay: umumiTexnikiGostericiSayi,
                detallar: texnikiGostericiSaylari
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Bu funksiyalar dəyişmir, lakin tam olması üçün daxil edilib
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

exports.korpuslarUzreAvadanliqIcmali = async (req, res) => {
    try {
        const komputerlerByKorpus = await Komputer.aggregate([
            { $group: { _id: "$korpus", say: { $sum: "$say" } } },
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

        const monobloklarByKorpus = await Monoblok.aggregate([
            { $group: { _id: "$korpus", say: { $sum: "$say" } } },
            { $project: { korpus: "$_id", say: 1, _id: 0 } }
        ]);

        const allKorpuslar = new Set();
        komputerlerByKorpus.forEach(item => allKorpuslar.add(item.korpus));
        printerlerByKorpus.forEach(item => allKorpuslar.add(item.korpus));
        proyektorlarByKorpus.forEach(item => allKorpuslar.add(item.korpus));
        monitorlarByKorpus.forEach(item => allKorpuslar.add(item.korpus));
        monobloklarByKorpus.forEach(item => allKorpuslar.add(item.korpus));

        const icmal = Array.from(allKorpuslar).map(korpus => {
            const komputerSay = komputerlerByKorpus.find(item => item.korpus === korpus)?.say || 0;
            const printerSay = printerlerByKorpus.find(item => item.korpus === korpus)?.say || 0;
            const proyektorSay = proyektorlarByKorpus.find(item => item.korpus === korpus)?.say || 0;
            const monitorSay = monitorlarByKorpus.find(item => item.korpus === korpus)?.say || 0;
            const monoblokSay = monobloklarByKorpus.find(item => item.korpus === korpus)?.say || 0;

            return {
                korpus: korpus,
                komputerSayi: komputerSay,
                printerSayi: printerSay,
                proyektorSayi: proyektorSay,
                monitorSayi: monitorSay,
                monoblokSayi: monoblokSay,
                korpusUzreCemi: komputerSay + printerSay + proyektorSay + monitorSay + monoblokSay
            };
        });

        res.status(200).json(icmal);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};