import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const createHotel = async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    const hotel = await prisma.hotel.create({ data: { name, address } });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to create hotel", details: error });
  }
};

export const getHotels = async (_req: Request, res: Response) => {
  const hotels = await prisma.hotel.findMany({ include: { rooms: true } });
  res.json(hotels);
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    const updated = await prisma.hotel.update({
      where: { id: Number(id) },
      data: { name, address },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hotel", details: error });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.hotel.delete({ where: { id: Number(id) } });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel", details: error });
  }
};
