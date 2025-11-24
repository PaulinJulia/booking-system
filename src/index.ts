import express from "express";
import customerRoutes from "./resources/customer/customer.routes";
import hotelRoutes from "./resources/hotel/hotel.routes";
import roomRoutes from "./resources/room/room.routes";
import bookingRoutes from "./resources/booking/booking.routes";

const app = express();
app.use(express.json());

// Routes
app.use("/customers", customerRoutes);
app.use("/hotels", hotelRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
