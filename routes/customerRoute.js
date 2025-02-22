const express = require("express");
const {
  addCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controller/customerController");
const router = express.Router();
router.route("/").post(addCustomer).get(getAllCustomers);
router.route("/:customerId").patch(updateCustomer).delete(deleteCustomer);
module.exports = router;
