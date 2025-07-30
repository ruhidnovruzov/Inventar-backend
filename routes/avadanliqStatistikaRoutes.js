// routes/avadanliqStatistikaRoutes.js
const express = require('express');
const router = express.Router();
const avadanliqStatistikaController = require('../controllers/avadanliqStatistikaController');

// Bütün avadanlıqların ümumi sayını gətir
router.get('/umumi-saylar', avadanliqStatistikaController.umumiAvadanliqSaylari);

// Texniki göstəricilərin sayını gətir (məsələn, CPU, RAM sayları)
router.get('/texniki-gostericiler', avadanliqStatistikaController.texnikiGostericiSaylari);

// Bütün avadanlıqların korpuslar üzrə ümumi icmalını gətir
router.get('/korpus-icmali', avadanliqStatistikaController.korpuslarUzreAvadanliqIcmali);

module.exports = router;