const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }
    
   
    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
    });
  });
};
exports.getProduct = (req, res)=>{
    return res.json(req.product);
}
exports.photo = (req, res, next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}
exports.removeProduct = (req,res)=>{
    const product = req.product;
    product.remove((err, product)=>{
        if(err){
            return res.status(400).json({
                errors: "FAILED to delete product from DB"
            })
        }
        res.json({
            message : `${product.name} is deleted SUCCESSFULLY`
        })
    })
};
exports.updateProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      let product = req.product;
      product = _.extend(product, fields)
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "updating product in DB is failed"
          });
        }
        res.json(product);
      });
    });
}
exports.getAllProduct = (req, res)=>{
    let limit = req.query.limit ? parseInt(feq.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .sort([[sortBy , "asc"]])
    .limit(limit)
    .populate("category")
    .exec((err, products)=>{
        if (err) {
            res.status(400).json({
              error: "NO product found"
            });
        }
        res.json(products);
    })
}
exports.getAllUniqueCategories = (req,res)=>{
  Product.distinct("category", {}, (err, category)=>{
    if (err) {
      res.status(400).json({
        error: "Bulk operation FAILED"
      });
    }
    res.json(category);
  })
}

exports.updatedStock = (req, res, next)=>{
  let myOperations = req.body.order.products.map(prod=>{
    return { 
      updateOne: {
        filter: {_id: prod._id},
        update: {$inc: {stock: -prod.count,sold: +prod.count}}
      }
    }
  })
  Product.bulkWrite(myOperations, {}, (err, products)=>{
    if (err) {
      res.status(400).json({
        error: "Bulk operation FAILED"
      });
    }
    next();
  });
}

