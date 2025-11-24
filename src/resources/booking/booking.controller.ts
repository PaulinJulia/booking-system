import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { customerId, roomId, startDate, endDate } = req.body;

    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) return res.status(404).json({ error: "Room not found" });

    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = room.price * nights;

    const booking = await prisma.booking.create({
      data: { customerId, roomId, startDate: start, endDate: end, totalPrice },
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking", details: error });
  }
};

export const getBookings = async (_req: Request, res: Response) => {
  const bookings = await prisma.booking.findMany({
    include: { customer: true, room: { include: { hotel: true } } },
  });
  res.json(bookings);
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { endDate } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const room = await prisma.room.findUnique({
      where: { id: booking.roomId },
    });
    if (!room) return res.status(404).json({ error: "Room not found" });

    const start = new Date(booking.startDate);
    const end = new Date(endDate);
    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = room.price * nights;

    const updatedBooking = await prisma.booking.update({
      where: { id: Number(id) },
      data: { endDate: end, totalPrice },
    });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking", details: error });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.booking.delete({ where: { id: Number(id) } });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking", details: error });
  }
};
