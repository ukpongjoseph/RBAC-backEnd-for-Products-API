const mongoose = require("mongoose")
const schemaConstructor = mongoose.Schema
const productSchema = new schemaConstructor({
    productName : {
        type: String,
        required : [true, "please provide your product name"]
    },
    category : {
        type : String,
        required : [true, "please provide a category where your product belongs to"],
        enum : ["Men", "Women", "Boys", "Girls"]
    },
    price : {
        type : Number,
        required : [true, "provide a price for your product"]
    },
    quantity : {
        type : Number
    },
    productSeller : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : [true, "please provide seller information"]
    }
}
, {timestamps: true}
)

module.exports = mongoose.model("product", productSchema)