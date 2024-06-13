var CATEGORY = require('../models/category')

exports.CreateCategory = async function (req, res, next) {

    try {

        let FORM_DATA = req.body;

        let ONE_FILE = req.file.filename;
        console.log(ONE_FILE);
        
        FORM_DATA.image = ONE_FILE;

        if (!FORM_DATA.name || !FORM_DATA.image) {
            throw new Error("PLESE ENTER ALL THE FIELDS")
        }

        let INSERTED_DATA = await CATEGORY.create(FORM_DATA);

        res.status(201).json({
            message: "CATEEGORY ADD SUCESSFULLY",
            Data: INSERTED_DATA
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }              

}

exports.multiImage = async function (req, res, next) {

    try {

        let FORM_DATA = req.body;

        req.body.image = req.files.map(el => el.filename)
        
        console.log(req.body);

        res.status(201).json({
            message: "CATEEGORIES ADD SUCESSFULLY",
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.FindCategory = async function (req, res, next) {
    try {

        let ALL_DATA = await CATEGORY.findById(req.params.id)

        res.status(201).json({
            message: "ONE CATEGORY GET SUCESSFULLY",
            Data: ALL_DATA
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.FindCategoryes = async function (req, res, next) {
    try {
        let ALL_DATA = await CATEGORY.find()

        res.status(201).json({
            message: "ALL CATEGORY GET SUCESSFULLY",
            Data: ALL_DATA
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.UpdateCategory = async function (req, res, next) {
    try {

        let UPDATE_ID = req.params.id;

        let UPDATE_DATA = req.body;

        if (req.file && req.file.filename) {
            UPDATE_DATA.image = req.file.filename;
        }

        const data = await CATEGORY.findByIdAndUpdate(UPDATE_ID, UPDATE_DATA, { new: true })

        res.status(201).json({
            message: "CATEGORY UPDATED SUCESSFULLY",
            Data: data
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.DeleteCategory = async function (req, res, next) {

    try {

        let DELETE_ID = req.params.id;

        await CATEGORY.findByIdAndDelete(DELETE_ID);

        res.status(201).json({
            message: "CATEGORY DELETE SUCESSFULLY"
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

