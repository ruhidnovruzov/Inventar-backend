// routes/proyektorRoutes.js
const express = require('express');
const router = express.Router();
const proyektorController = require('../controllers/proyektorController');

// CREATE - Yeni proyektor qeydi əlavə et (və ya mövcud korpusdakı proyektorların sayını artır)
router.post('/', proyektorController.proyektorElaveEt);

// READ - Bütün proyektor qeydlərini gətir
router.get('/', proyektorController.butunProyektorlariGetir);

// READ - ID-yə görə proyektor qeydini gətir
router.get('/:id', proyektorController.proyektoruIdIleGetir);

// UPDATE - Proyektor qeydini yenilə
router.put('/:id', proyektorController.proyektoruYenile);

// DELETE - Proyektor qeydini sil
router.delete('/:id', proyektorController.proyektoruSil);

// Korpus üzrə proyektor qeydini gətir
router.get('/korpus/:korpus', proyektorController.korpusUzreProyektoruGetir);

// Bütün korpuslar üzrə proyektorların ümumi sayını göstər
router.get('/statistika/cem-say', proyektorController.korpuslarUzreCemSay);

module.exports = router;