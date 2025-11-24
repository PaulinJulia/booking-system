import { prisma } from "./lib/prisma";

async function main() {
  const customer = await prisma.customer.create({
    data: { name: "Test Kund", email: `test${Date.now()}@example.com` }, // unik email
  });
  const hotel = await prisma.hotel.create({
    data: { name: "Testhotell", address: "Testgatan 1" },
  });
  const room = await prisma.room.create({
    data: { hotelId: hotel.id, number: "101", roomType: "Single", price: 999 },
  });
  const booking = await prisma.booking.create({
    data: {
      customerId: customer.id,
      roomId: room.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      totalPrice: room.price * 2,
    },
  });
  console.log({ customer, hotel, room, booking });

  const singleBooking = await prisma.booking.findUnique({
    where: { id: booking.id },
    include: { customer: true, room: { include: { hotel: true } } },
  });
  console.log(singleBooking);

  const updatedBooking = await prisma.booking.update({
    where: { id: booking.id },
    data: { totalPrice: 1234 },
  });
  console.log(updatedBooking);

  await prisma.booking.delete({ where: { id: booking.id } });
  await prisma.room.delete({ where: { id: room.id } });
  await prisma.hotel.delete({ where: { id: hotel.id } });
  await prisma.customer.delete({ where: { id: customer.id } });
  console.log("All deleted.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
