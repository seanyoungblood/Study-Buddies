const express = require('express')
const router = express.Router()
const {
    registerGroup,
    searchGroup,
    joinGroup,
    leaveGroup,
} = require('../controllers/groupController')
const { protect } = require('../middleware/authMiddleware')



router.route('/registerGroup').post(protect, registerGroup)
router.route('/searchGroup').get(searchGroup)
router.route('/joinGroup').post(protect, joinGroup)
router.route('/leaveGroup').post(protect, leaveGroup)

module.exports = router