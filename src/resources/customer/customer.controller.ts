import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    const customer = await prisma.customer.create({
      data: { name, email, phone },
    });
    res.json(customer);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create customer", details: error });
  }
};

export const getCustomers = async (_req: Request, res: Response) => {
  const customers = await prisma.customer.findMany({
    include: { bookings: true },
  });
  res.json(customers);
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updated = await prisma.customer.update({
      where: { id: Number(id) },
      data: { name, email, phone },
    });
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update customer", details: error });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.customer.delete({ where: { id: Number(id) } });
    res.status(200).json(deleted);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete customer", details: error });
  }
};
