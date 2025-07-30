// routes/komputerRoutes.js
const express = require('express');
const router = express.Router();
const komputerController = require('../controllers/komputerController');

// CREATE - Yeni kompüter əlavə et
router.post('/', komputerController.komputerElaveEt);

// READ - Bütün kompüterləri gətir
router.get('/', komputerController.butunKomputerleriGetir);

// READ - İD-yə görə kompüteri gətir
router.get('/:id', komputerController.komputeriIdIleGetir);

// UPDATE - Kompüteri yenilə
router.put('/:id', komputerController.komputeriYenile);

// DELETE - Kompüteri sil
router.delete('/:id', komputerController.komputeriSil);

// Korpus üzrə kompüterləri gətir və sayını göstər
router.get('/korpus/:korpus', komputerController.korpusUzreKomputerleriGetir);

// Bütün korpuslar üzrə kompüterlərin sayını göstər
router.get('/statistika/korpuslar', komputerController.korpuslarUzreCemSay);

module.exports = router;