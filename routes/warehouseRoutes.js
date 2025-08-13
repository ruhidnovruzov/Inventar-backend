// routes/warehouseRoutes.js
const express = require('express');
const {
    getAllWarehouseItems,
    createWarehouseItem,
    getWarehouseItemById,
    updateWarehouseItem,
    deleteWarehouseItem
} = require('../controllers/warehouseController');

const router = express.Router();

router.route('/')
    .get(getAllWarehouseItems)
    .post(createWarehouseItem);

router.route('/:id')
    .get(getWarehouseItemById)
    .put(updateWarehouseItem)
    .delete(deleteWarehouseItem);

module.exports = router;