const express = require('express')
const router = express.Router()
const {getClass,
       setClass,
       updateClass,
       deleteClass,} = require('../controllers/classController')

const { protect } = require('../middleware/authMiddleware')

//router.use(protect)


router.route('/').get(protect, getClass).post(protect, setClass)
router.route('/:id').put(protect, updateClass).delete(protect, deleteClass)

/*
router.use(protect).route('/').get(getClass).post(setClass)
router.use(protect).route('/:id').put(updateClass).delete(deleteClass)
*/


/*
CODE ABOVE SAVES SOME LINES OF CODE AND DOES THE SAME THING

router.get('/', getUser)

router.post('/', setUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)
*/


module.exports = router
