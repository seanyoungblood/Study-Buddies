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
    searchAdmin
} = require('../controllers/groupController')
const { protect } = require('../middleware/authMiddleware')



router.route('/registerGroup').post(protect, registerGroup)
router.route('/searchGroup').post(searchGroup)
router.route('/joinGroup').post(protect, joinGroup)
router.route('/:id/leaveGroup').delete(protect, leaveGroup)
router.route('/editGroup').post(editGroup) // NEEDS TO IMPLEMENT put
router.route('/:id/deleteGroup').delete(protect, deleteGroup)
router.route('/editRating').post(editRating) // NEEDS TO IMPLEMENT put
router.route('/:id/searchAdmin').get(protect, searchAdmin)


module.exports = router
