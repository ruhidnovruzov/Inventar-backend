// routes/printerRoutes.js
const express = require('express');
const router = express.Router();
const printerController = require = require('../controllers/printerController');

// CREATE - Yeni printer əlavə et (və ya mövcud korpusdakı printerlərin sayını artır)
router.post('/', printerController.printerElaveEt);

// READ - Bütün printer qeydlərini gətir
router.get('/', printerController.butunPrinterleriGetir);

// READ - ID-yə görə printer qeydini gətir
router.get('/:id', printerController.printeriIdIleGetir);

// UPDATE - Printer qeydini yenilə
router.put('/:id', printerController.printeriYenile);

// DELETE - Printer qeydini sil
router.delete('/:id', printerController.printeriSil);

// Korpus üzrə printer qeydini gətir (bu dəfə birbaşa korpus adı ilə)
router.get('/korpus/:korpus', printerController.korpusUzrePrinteriGetir);

// Bütün korpuslar üzrə printerlərin ümumi sayını göstər
router.get('/statistika/cem-say', printerController.korpuslarUzreCemSay);

module.exports = router;