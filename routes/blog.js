var express = require('express');
var router = express.Router();
const multer = require('multer')
const blogController = require('../controllers/blog')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/blog')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('image'), blogController.CreateBlog);

router.get('/:id', blogController.findBlog);

router.get('/', blogController.findBlogs);

router.put('/:id', upload.single('image'), blogController.UpdateBlog);

router.delete('/:id', blogController.DeleteBlog);

module.exports = router; 