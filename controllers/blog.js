var BLOG = require('../models/blog')

exports.CreateBlog = async function (req, res, next) {
    try {
        let FORM_DATA = req.body;
        FORM_DATA.image = req.file.filename

        if (!FORM_DATA.image || !FORM_DATA.title || !FORM_DATA.description || !FORM_DATA.user || !FORM_DATA.category) {
            throw new Error("PLEASE ENTER ALL THE FIELDS")
        }

        let INSERTED_DATA = await BLOG.create(FORM_DATA)

        res.status(201).json({
            message: "BLOG ADD SUCESSFULLY",
            Data: INSERTED_DATA
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.findBlog = async function (req, res, next) {
    try {

        let ALL_DATA = await BLOG.findById(req.params.id).populate('category')

        res.status(201).json({
            message: "ONE BLOG GET SUCESSFULLY",
            ALL_DATA
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.findBlogs = async function (req, res, next) {
    try {                                                      
        let ALL_DATA = await BLOG.find().populate(['category', 'user'])
        
        // let ALL_DATA = await BLOG.find({description: {$regex: 'Testing', $options: 'i'}}).populate(['category', 'user'])
        
        // let ALL_DATA = await BLOG.find().populate(['category', 'user']).sort({title: -1})
        // let ALL_DATA = await BLOG.find().populate(['category', 'user']).select('-image')
        // let ALL_DATA = await BLOG.find().populate(['category', 'user']).skip(1).limit(2)

        // let ALL_DATA = await BLOG.aggregate([
        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: 'category',
        //             foreignField: '_id',
        //             as: 'category'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "users",
        //             localField: 'user',
        //             foreignField: '_id',
        //             as: 'user'
        //         }
        //     },
        //     {
        //         $addFields: {
        //             'maths': Math.floor(Math.random() * 100),
        //             'eng': Math.floor(Math.random() * 100),
        //         },
        //     },
        //     {
        //         $addFields: {
        //             'total': {$sum: ["$maths", "$eng"]}
        //         },
        //     },
        //     {
        //         $skip: 2
        //     }
        // ])

        res.status(201).json({
            message: "ALL BLOG GET SUCESSFULLY",
            Data: ALL_DATA
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.UpdateBlog = async function (req, res, next) {
    try {

        let UPDATE_ID = req.params.id;

        let UPDATE_DATA = req.body;

        UPDATE_DATA.image = req.file.filename;

        const data = await BLOG.findByIdAndUpdate(UPDATE_ID, UPDATE_DATA, { new: true })

        res.status(201).json({
            message: "BLOG UPDATED SUCESSFULLY",
            Data: data
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.DeleteBlog = async function (req, res, next) {
    try {

        let DELETE_ID = req.params.id;

        await BLOG.findByIdAndDelete(DELETE_ID);

        res.status(201).json({
            message: "BLOG DELETE SUCESSFULLY"
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}