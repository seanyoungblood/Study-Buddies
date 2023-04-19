const express = require('express')
const router = express.Router()
const { registerUser, 
        loginUser, 
        getMe,
        searchUser,
        loadRandUser,
      editUser,
      } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/searchUser', searchUser)
router.get('/loadRandUser', loadRandUser)
router.put('/editUser', editUser)


module.exports = router
