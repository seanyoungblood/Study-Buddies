const express = require('express')
const router = express.Router()
const {
    registerGroup,
    searchGroup,
    joinGroup,
    leaveGroup,
    editGroup,
    deleteGroup,
    editRating,
} = require('../controllers/groupController')
const { protect } = require('../middleware/authMiddleware')



router.route('/registerGroup').post(protect, registerGroup)
router.route('/searchGroup').get(searchGroup)
router.route('/joinGroup').post(protect, joinGroup)
router.route('/leaveGroup').post(protect, leaveGroup)
router.route('/editGroup').post(editGroup) // NEEDS TO IMPLEMENT put
router.route('/deleteGroup').delete(deleteGroup)
router.route('/editRating').post(editRating) // NEEDS TO IMPLEMENT put

module.exports = router
