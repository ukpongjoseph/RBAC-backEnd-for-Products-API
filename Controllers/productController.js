const Product = require("../Models/Products")
const customError = require("../Utils/customError")


const createProduct = async (req, res, next) => {
    try {
        const {userId} = req.user
        const {productName, category, price, quantity} = req.body
        req.body.productSeller = userId
        if(!userId){
            throw new customError("Access Denied", 403)
        }
        if(!productName || !category || !price){
            throw new customError("Provide the necessary Product details", 400)
        }
        const product = await Product.create(req.body)
        res.status(201).json({success : true, product}) 
    } catch (error) {
        next(error)
    }
}

// Accessible to all(user and admin)
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort("-createdAt")
        res.status(200).json({success : true, products})
    } catch (error) {
        next(error)
    }
}

// In cases where there are more than one admin in the system, each admin is able to get all their created products(products specific to each admin) 
const getAllAdminProducts = async (req, res, next) => {
    try {
        const {userId} = req.user
        if(!userId){
            throw new customError("Access Denied", 403)
        }
        const products = await Product.find({productSeller : userId}).sort({createdAt : -1}).populate("productSeller", "userName")
        res.status(200).json({success : true, msg : "Here are your products", products})
    } catch (error) {
        next(error)
    }
}


// In cases where there are more than one admin in the system, each admin is able to get a specific product they created(products specific to each admin)
const getSingleProductByAdmin = async (req, res, next) => {
    try {
        const {userId} = req.user
        const {productId} = req.params
        if(!userId){
            throw new customError("Access Denied", 403)
        }
        const product = await Product.findOne({_id : productId, productSeller : userId}).populate("productSeller", "userName")
        if(!product){
            throw new customError("Product not found", 404)
        }
        res.status(200).json({success : true, msg : "Here is your product", product})
    } catch (error) {
        next(error)
    }
}

const getSingleProduct = async (req, res, next) => {
    try {
        const {productId} = req.params
        const product = await Product.findById({_id : productId})
        if(!product){
            throw new customError("Product not found", 404)
        }
        res.status(200).json({success : true, product})
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const {productId} = req.params
        const product = await Product.findOneAndUpdate(
            {_id : productId},
            req.body,
            {new : true},
            {runValidators : true}
        )
        if(!product){
            throw new customError("Product not found", 404)
        }
        res.status(200).json({success : true, msg : "Update Successful", product})
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const {userId} = req.user
        const {productId} = req.params
        const product = await Product.findById(productId)
        const requestingUser = userId.toString()
        const productOwnerId = product.productSeller.toString()
        if(!product){
            throw new customError("Product not found", 404)
        }
        // This condition ensures that only the product owner can delete their product from the system
        if(productOwnerId !== requestingUser){
            throw new customError("Access Denied, can't delete another admin's product", 403)
        }
        await Product.findByIdAndDelete(productId)
        res.status(200).json({success : true, msg : "Product deleted successfully"})
    } catch (error) {
        next(error)
    }
}


module.exports = {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, getAllAdminProducts, getSingleProductByAdmin}