import { Router } from "express";
import {
  createHotel,
  getHotels,
  updateHotel,
  deleteHotel,
} from "./hotel.controller";

const router = Router();

router.post("/", createHotel);
router.get("/", getHotels);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
