var express = require('express');
var router = express.Router();
const multer = require('multer')
const CategoryController = require('../controllers/category')
const userController = require('../controllers/user')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/category')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/', userController.SECURE, upload.single('image'), CategoryController.CreateCategory);

router.post('/multi', upload.array('image', 5), CategoryController.multiImage);

router.get('/:id', CategoryController.FindCategory);

router.get('/', userController.SECURE, CategoryController.FindCategoryes);

router.put('/:id', userController.SECURE, upload.single('image'), CategoryController.UpdateCategory);

router.delete('/:id', userController.SECURE, CategoryController.DeleteCategory);

module.exports = router; 