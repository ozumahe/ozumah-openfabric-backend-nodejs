import express from "express";
const router = express.Router();

import {
  authenticateUser,
  authenticatePermission,
} from "../middleware/authentication";

import {
  createProduct,
  // getAllproducts,
  // getSingleProduct,
  // updateProduct,
  // deleteProduct,
  // uploadImage,
} from "../controllers/productController";

router
  .route("/")
  .post([authenticateUser, authenticatePermission("admin")], createProduct);
// .get(getAllproducts);

// router
//   .route("/:id")
//   .get(getSingleProduct)
//   .patch([authenticateUser, authenticatePermission("admin")], updateProduct)
//   .delete([authenticateUser, authenticatePermission("admin")], deleteProduct);

export default router;
