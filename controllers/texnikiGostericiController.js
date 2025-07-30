// controllers/texnikiGostericiController.js
const TexnikiGosterici = require('../models/TexnikiGosterici');

// Yeni texniki göstərici parametri əlavə et
// Məsələn: { "parametrAd": "CPU", "parametrinDeyerleri": [{"deyer": "i7-12700", "say": 100}] }
exports.gostericiParametrElaveEt = async (req, res) => {
  try {
    const yeniParametr = new TexnikiGosterici(req.body);
    await yeniParametr.save();
    res.status(201).json(yeniParametr);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu parametr adı artıq mövcuddur.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Bütün texniki göstərici parametrlərini gətir
exports.butunGostericiParametrleriGetir = async (req, res) => {
  try {
    const gostericiler = await TexnikiGosterici.find();
    res.status(200).json(gostericiler);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ID-yə görə texniki göstərici parametrini gətir
exports.gostericiParametriIdIleGetir = async (req, res) => {
  try {
    const parametr = await TexnikiGosterici.findById(req.params.id);
    if (!parametr) {
      return res.status(404).json({ message: 'Texniki göstərici parametri tapılmadı.' });
    }
    res.status(200).json(parametr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Texniki göstərici parametrini yenilə (yeni dəyərlər əlavə etmək və ya mövcudları dəyişmək üçün)
exports.gostericiParametriYenile = async (req, res) => {
  try {
    const { parametrAd, parametrinDeyerleri } = req.body;
    const parametr = await TexnikiGosterici.findById(req.params.id);

    if (!parametr) {
      return res.status(404).json({ message: 'Texniki göstərici parametri tapılmadı.' });
    }

    if (parametrAd) {
      parametr.parametrAd = parametrAd;
    }

    if (parametrinDeyerleri && Array.isArray(parametrinDeyerleri)) {
      parametrinDeyerleri.forEach(newVal => {
        const existingValIndex = parametr.parametrinDeyerleri.findIndex(
          val => val.deyer === newVal.deyer
        );
        if (existingValIndex > -1) {
          parametr.parametrinDeyerleri[existingValIndex].say = newVal.say;
        } else {
          parametr.parametrinDeyerleri.push(newVal);
        }
      });
    }

    await parametr.save();
    res.status(200).json(parametr);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu parametr adı artıq mövcuddur.' });
    }
    res.status(400).json({ message: err.message });
  }
};

// Texniki göstərici parametrindən dəyəri sil
exports.deyeriSil = async (req, res) => {
  try {
    const { id, deyer } = req.params; // ID parametrin ID-si, deyer isə silinəcək dəyərdir

    const parametr = await TexnikiGosterici.findById(id);
    if (!parametr) {
      return res.status(404).json({ message: 'Texniki göstərici parametri tapılmadı.' });
    }

    const initialLength = parametr.parametrinDeyerleri.length;
    parametr.parametrinDeyerleri = parametr.parametrinDeyerleri.filter(item => item.deyer !== deyer);

    if (parametr.parametrinDeyerleri.length === initialLength) {
      return res.status(404).json({ message: `"${deyer}" dəyəri bu parametrdə tapılmadı.` });
    }

    await parametr.save();
    res.status(200).json({ message: `"${deyer}" dəyəri uğurla silindi.`, updatedParametr: parametr });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Texniki göstərici parametrini tamamilə sil (CPU, RAM kimi parametrləri)
exports.gostericiParametriSil = async (req, res) => {
  try {
    const parametr = await TexnikiGosterici.findByIdAndDelete(req.params.id);
    if (!parametr) {
      return res.status(404).json({ message: 'Texniki göstərici parametri tapılmadı.' });
    }
    res.status(200).json({ message: 'Texniki göstərici parametri uğurla silindi.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};