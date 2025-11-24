import { Router } from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "./booking.controller";

const router = Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
