// routes/ipTelefonRoutes.js
const express = require('express');
const {
  ipTelefonElaveEt,
  butunIpTelefonlariGetir,
  ipTelefonuIdIleGetir,
  ipTelefonuYenile,
  ipTelefonuSil,
  umumiIpTelefonSayi
} = require('../controllers/ipTelefonController');
const router = express.Router();

// CRUD marşrutları
router.post('/', ipTelefonElaveEt);
router.get('/', butunIpTelefonlariGetir);
router.get('/:id', ipTelefonuIdIleGetir);
router.put('/:id', ipTelefonuYenile);
router.delete('/:id', ipTelefonuSil);

// Əlavə marşrutlar
router.get('/count/total', umumiIpTelefonSayi); // Ümumi say üçün endpoint

module.exports = router;
