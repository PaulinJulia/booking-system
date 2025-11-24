import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { hotelId, number, roomType, price } = req.body;
    const room = await prisma.room.create({
      data: { hotelId, number, roomType, price },
    });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: "Failed to create room", details: error });
  }
};

export const getRooms = async (_req: Request, res: Response) => {
  const rooms = await prisma.room.findMany({
    include: { bookings: true, hotel: true },
  });
  res.json(rooms);
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { number, roomType, price } = req.body;
    const updated = await prisma.room.update({
      where: { id: Number(id) },
      data: { number, roomType, price },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update room", details: error });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.room.delete({ where: { id: Number(id) } });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete room", details: error });
  }
};
