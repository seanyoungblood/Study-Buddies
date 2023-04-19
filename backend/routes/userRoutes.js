const express = require('express')
const router = express.Router()
const { registerUser, 
        loginUser, 
        getMe,
        searchUser,
        loadRandUser,
      editUser,
       addClasses,
       deleteUser,
      } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/searchUser', searchUser)
router.get('/loadRandUser', loadRandUser)
router.put('/editUser', editUser)
router.put('/addClasses', addClasses)
router.delete('/deleteUser', deleteUser)


module.exports = router
