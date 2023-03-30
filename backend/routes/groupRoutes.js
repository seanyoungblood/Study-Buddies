const express = require('express')
const router = express.Router()
const {
    registerGroup,
    searchGroup
} = require('../controllers/groupController')
const { protect } = require('../middleware/authMiddleware')



router.route('/registerGroup').post(protect, registerGroup)
router.route('/searchGroup').get(searchGroup)

module.exports = router