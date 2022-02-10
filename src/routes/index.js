const express = require("express");
const {
  getAllPetData,
  getPetDataById,
  getPetDataByStatus,
} = require("../controller/getPetData");
const { addPetData } = require("../controller/addPetData");
const { updatePetData } = require("../controller/updatePetData");
const { deletePetData } = require("../controller/deletePetData");

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

module.exports = router;
