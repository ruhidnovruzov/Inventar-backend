// routes/monitorRoutes.js
const express = require('express');
const router = express.Router();
const monitorController = require('../controllers/monitorController');

// CREATE - Yeni monitor qeydi əlavə et (və ya mövcud korpusdakı monitorların sayını artır)
router.post('/', monitorController.monitorElaveEt);

// READ - Bütün monitor qeydlərini gətir
router.get('/', monitorController.butunMonitorlariGetir);

// READ - ID-yə görə monitor qeydini gətir
router.get('/:id', monitorController.monitoruIdIleGetir);

// UPDATE - Monitor qeydini yenilə
router.put('/:id', monitorController.monitoruYenile);

// DELETE - Monitor qeydini sil
router.delete('/:id', monitorController.monitoruSil);

// Korpus üzrə monitor qeydini gətir
router.get('/korpus/:korpus', monitorController.korpusUzreMonitoruGetir);

// Bütün korpuslar üzrə monitorların ümumi sayını göstər
router.get('/statistika/cem-say', monitorController.korpuslarUzreCemSay);

module.exports = router;