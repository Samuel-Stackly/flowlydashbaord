const express = require("express");
const { register, login, me, logout, guestLogin } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/guest", guestLogin);
router.post("/logout", protect, logout);
router.get("/me", protect, me);

module.exports = router;
