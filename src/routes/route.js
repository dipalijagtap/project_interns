const express = require("express")
const CollegeController = require("../controllers/collegeController")
const router = express.Router()
const InternController = require("../Controllers/InternController")



router.post("/colleges", CollegeController.createCollege)
router.post("/intern",InternController.createIntern)
router.get("/getcollegedetails",CollegeController.collegeDetails)


module.exports = router