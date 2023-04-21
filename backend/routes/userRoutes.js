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
router.post('/editUser', editUser) // NEEDS TO IMPLEMENT put
// router.route('/:id').put(protect, updateClass).delete(protect, deleteClass)
// router.post('/addClasses', addClasses)
router.route('/addClasses').post(protect, addClasses)
// router.route('/addClasses/:id').put(protect, addClasses)
// router.delete('/:id', protect, deleteUser)
router.route('/:id/deleteUser').delete(protect, deleteUser)


module.exports = router
