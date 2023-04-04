const express = require('express')
const router = express.Router()
const { registerUser, 
        loginUser, 
        getMe,
        searchUser,
        loadRandUser, } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/searchUser', searchUser)
router.get('/loadRandUser', loadRandUser)


module.exports = router