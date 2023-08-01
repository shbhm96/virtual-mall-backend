import asyncHandler from "express-async-handler";
import Seller from "../../models/seller/sellerModel.js";
import generateToken from "../../utils/generateToken.js";
import Product from "../../models/seller/productModel.js";

const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message : "Product Removed"})
    }else{
        res.status(404)
        throw new Error("Product Not Found")
    }
    res.json(product)
})


const createProduct = asyncHandler(async(req,res)=>{
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    if(product){
        const createdProduct = await product.save()
        return res.status(201).json(createdProduct)
    }else{
        res.status(403)
        throw new Error("Product Can't be Created")
    }
    
})

const updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      return res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

const getSellerProduct = asyncHandler(async(req,res)=>{
    console.log("seller Id",req.params.id)
    const products = await Product.find({ seller : req.params.id})

    if(products){
        return res.json(products)
    }else{
        res.status(401)
        throw new Error("Seller Does't exist!!")
    }
})

export {deleteProduct,createProduct,updateProduct,getSellerProduct}