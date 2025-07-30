// routes/texnikiGostericiRoutes.js
const express = require('express');
const router = express.Router();
const texnikiGostericiController = require('../controllers/texnikiGostericiController');

// CREATE - Yeni texniki göstərici parametri əlavə et (məsələn, CPU, RAM)
router.post('/', texnikiGostericiController.gostericiParametrElaveEt);

// READ - Bütün texniki göstərici parametrlərini gətir
router.get('/', texnikiGostericiController.butunGostericiParametrleriGetir);

// READ - ID-yə görə texniki göstərici parametrini gətir
router.get('/:id', texnikiGostericiController.gostericiParametriIdIleGetir);

// UPDATE - Texniki göstərici parametrini yenilə və ya yeni dəyərlər əlavə et
router.put('/:id', texnikiGostericiController.gostericiParametriYenile);

// DELETE - Texniki göstərici parametrindən müəyyən dəyəri sil
router.delete('/:id/deyer/:deyer', texnikiGostericiController.deyeriSil);

// DELETE - Texniki göstərici parametrini tamamilə sil
router.delete('/:id', texnikiGostericiController.gostericiParametriSil);

module.exports = router;