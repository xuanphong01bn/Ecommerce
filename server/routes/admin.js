const express = require("express");

const router = express.Router();
import { authCheck, adminCheck } from "../middlewares/auth.js";

import {
  updateStatus,
  getAllOrderAdmin,
  sendEmailAdmin,
  checkFileExist,
  orderByDay,
  revenue,
} from "../controllers/admin";

router.post(
  "/admin/order-status/:orderId",
  authCheck,
  adminCheck,
  updateStatus
);

router.get("/admin/order", authCheck, adminCheck, getAllOrderAdmin);
router.post("/admin/email/send", authCheck, adminCheck, sendEmailAdmin);
router.post("/admin/checkFile", authCheck, adminCheck, checkFileExist);
router.post("/admin/order-by-day", authCheck, adminCheck, orderByDay);
router.post("/admin/revenue", authCheck, adminCheck, revenue);

module.exports = router;
