const express = require("express")
const router = express.Router()
const {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, getAllAdminProducts, getSingleProductByAdmin} = require("../Controllers/productController")
const verifyToken = require("../Middleware/tokenAuth")
const authorizedUsers = require("../Middleware/authorizeRole")

router.post("/create-product", verifyToken, authorizedUsers("admin"), createProduct)
router.get("/all-products", verifyToken, getAllProducts)
router.get("/admin/all-products", verifyToken, authorizedUsers("admin"), getAllAdminProducts)
router.get("/:productId", verifyToken, getSingleProduct)
router.get("/admin/:productId", verifyToken, authorizedUsers("admin"), getSingleProductByAdmin)
router.patch("/update-product/:productId", verifyToken, authorizedUsers("admin"), updateProduct)
router.delete("/delete/:productId", verifyToken, authorizedUsers("admin"), deleteProduct)

module.exports = router