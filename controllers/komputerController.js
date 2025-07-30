// controllers/komputerController.js
const Komputer = require('../models/Komputer');

// Yeni kompüter əlavə et
exports.komputerElaveEt = async (req, res) => {
  try {
    const yeniKomputer = new Komputer(req.body);
    await yeniKomputer.save();
    res.status(201).json(yeniKomputer);
  } catch (err) {
    // Seriya nömrəsi yox olduğu üçün 11000 duplicate key error-u ehtimalı azalır.
    // Lakin korpus və say birlikdə unikal olsaydı, yenə də ola bilərdi.
    // Hal-hazırda modeldə yalnız say və korpus olduğu üçün əlavə unikal constrain yoxdur.
    res.status(400).json({ message: err.message });
  }
};

// Bütün kompüterləri gətir
exports.butunKomputerleriGetir = async (req, res) => {
  try {
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
    // `runValidators: true` yeni modelə uyğun olaraq korpus və sayın doğrulanmasını təmin edəcək.
    const komputer = await Komputer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!komputer) {
      return res.status(404).json({ message: 'Kompüter tapılmadı.' });
    }
    res.status(200).json(komputer);
  } catch (err) {
    // Seriya nömrəsi yox olduğu üçün 11000 duplicate key error-u yoxlanılmasına ehtiyac qalmır.
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
// Bu funksiya əvvəlki kimi qalır, çünki korpus üzrə filterləmə aparır.
exports.korpusUzreKomputerleriGetir = async (req, res) => {
  try {
    const { korpus } = req.params;
    // Bütün `korpus` dəyərləri üçün `find` metodu işləyir.
    // Lakin, əgər siz yalnız müəyyən bir korpus üzrə kompüterləri görmək istəyirsinizsə,
    // bu funksiya yerinə yetirilmiş olar.
    // Sadələşdirilmiş modeldə hər sətir tək bir korpusdakı `say`ı təmsil edir.
    const komputerler = await Komputer.find({ korpus: korpus });
    if (komputerler.length === 0) {
      return res.status(404).json({ message: `${korpus} korpusunda kompüter tapılmadı.` });
    }
    // Əvvəlki modeldə hər kompüter ayrı bir obyekt idi, indi isə hər obyekt bir korpusda bir saydır.
    // Ona görə bu endpointin məntiqi dəyişir. Artıq `komputerler.length` ümumi say deyil,
    // həmin korpus üçün olan ayrı-ayrı qeydlərin sayıdır.
    // Əgər siz bir korpus üçün cəmi say istəyirsinizsə, aşağıdakı `korpuslarUzreCemSay`
    // funksiyasından istifadə etməli və nəticəni filterləməlisiniz.
    // Bu endpoint dəyişən modelə uyğun deyil, lakin saxlanılır.
    res.status(200).json({
      korpus: korpus,
      qeyd_sayi: komputerler.length, // Bu, həmin korpusda neçə ayrı qeyd olduğunu göstərir
      komputerler_qeydleri: komputerler // Həmin korpusun qeydlərini göstərir
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
          say: { $sum: "$say" } // Hər korpus üçün 'say' sahəsini toplayırıq
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