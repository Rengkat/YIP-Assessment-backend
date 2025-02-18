const Customer = require("../model/customerModel");
const StatusCodes = require("http-status-codes");
const CustomError = require("../errors");
const addCustomer = async (req, res, next) => {
  try {
    const { name, address, contact, latitude, longitude } = req.body;
    if (!name) {
    }
    const customer = new Customer({
      name,
      address,
      contact,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
    await customer.save();
    res.status(StatusCodes.CREATED).json({ message: "Customer added ", success: true });
  } catch (err) {
    next(err);
  }
};

// Get all customers
const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(StatusCodes.OK).json(customers);
  } catch (err) {
    next(err);
  }
};
//update customer
const updateCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const { name, address, contact } = req.body;
    const customer = await Customer.findById(customerId);
    if (!user) {
      throw new CustomError.NotFoundError("User not found");
    }
    user.name = name;
    user.address = address;
    user.contact = contact;
    await user.save();
    res.status(StatusCodes.OK).json({ message: "Customer information updated", success: true });
  } catch (err) {
    next(err);
  }
};
//delete customer
const deleteCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!user) {
      throw new CustomError.NotFoundError("User not found");
    }
    res.status(StatusCodes.OK).json({ message: "Customer deleted", success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { addCustomer, getAllCustomers, updateCustomer, deleteCustomer };
