const express = require('express')
const router = express.Router()
const shoppingController = require('./Controllers/shoppingController')

router.get('/', shoppingController.home)
router.post('/checkItem', shoppingController.checkItem)
router.post('/addItem', shoppingController.addItem)
router.post('/delItem', shoppingController.delItem)

module.exports = router;	