const express = require("express");
const { addPetData } = require("../controller/addPetData");
const { updatePetData } = require("../controller/updatePetData");
const { deletePetData } = require("../controller/deletePetData");
const { getStoreOrder } = require("../controller/getStoreOrder");
const { addStoreOrder } = require("../controller/addStoreOrder");
const { deleteStoreOrder } = require("../controller/deleteStoreOrder");
const {
  getAllPetData,
  getPetDataById,
  getPetDataByStatus,
} = require("../controller/getPetData");
const {
  updateOrderComplete,
  updateOrderDelivered,
} = require("../controller/updateStoreOrder");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Pet Store API Server.",
  });
});

// get pet data
router.get("/pet", getAllPetData);
router.get("/pet/findByStatus", getPetDataByStatus);
router.get("/pet/:id", getPetDataById);

// add new pet data
router.post("/pet", addPetData);

// update exiting pet data
router.put("/pet", updatePetData);

// delete exiting pet data
router.delete("/pet/:id", deletePetData);

// find purchase order by id
router.get("/store/order/:id", getStoreOrder);

// place an order for pet
router.post("/store/order", addStoreOrder);

// update status purchase order
router.put("/store/order/approve", updateOrderComplete);
router.put("/store/order/deliver", updateOrderDelivered);

// delete purchase order by id
router.delete("/store/order/:id", deleteStoreOrder)

module.exports = router;
