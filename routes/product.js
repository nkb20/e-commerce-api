var express = require('express');
var router = express.Router();
const { handleTokenAuthentication } = require("../middleware/jwt_authentication")
const { handleAddProduct, handleUpdateProduct, handleDeleteProduct, handleGetAllProduct, handleGetProductById } = require("../controller/product-controller")


//public routes
router.get('/product/', handleGetAllProduct)
router.get('/product/:productId', handleGetProductById)


// middleware
router.use('/product', handleTokenAuthentication)

//private routes
router.post('/product', handleAddProduct)

router.route('/product/:productId')
    .put(handleUpdateProduct)
    .delete(handleDeleteProduct)




module.exports = router;
