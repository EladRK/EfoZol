var express		 = require("express");
var router       = express.Router();

router.get("/api/external/branches", require("./api/external/getBranches.js").do);
router.get("/api/external/products/:name", require("./api/external/getProduct.js").do);
router.get("/api/external/products", require("./api/external/getProducts.js").do);

module.exports.routes = router;