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
router.route('/searchGroup').post(searchGroup)
router.route('/joinGroup').post(protect, joinGroup)
router.route('/leaveGroup').post(protect, leaveGroup)
router.route('/editGroup').post(editGroup) // NEEDS TO IMPLEMENT put
router.route('/:id/deleteGroup').delete(protect, deleteGroup)
router.route('/editRating').post(editRating) // NEEDS TO IMPLEMENT put

module.exports = router
