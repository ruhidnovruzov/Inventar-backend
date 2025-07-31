// routes/monoblokRoutes.js
const express = require('express');
const {
  monoblokElaveEt,
  butunMonobloklariGetir,
  monoblokuIdIleGetir,
  monoblokuYenile,
  monoblokuSil,
  korpusUzreMonobloklariGetir,
  korpuslarUzreCemSay
} = require('../controllers/monoblokController');
const router = express.Router();

// CRUD marşrutları
router.post('/', monoblokElaveEt);
router.get('/', butunMonobloklariGetir);
router.get('/:id', monoblokuIdIleGetir);
router.put('/:id', monoblokuYenile);
router.delete('/:id', monoblokuSil);

// Əlavə marşrutlar
router.get('/korpus/:korpus', korpusUzreMonobloklariGetir);
router.get('/cem-say/korpuslar', korpuslarUzreCemSay); // Ümumi say üçün endpoint

module.exports = router;
