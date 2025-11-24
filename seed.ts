import { prisma } from "./lib/prisma";

async function main() {
  const customer1 = await prisma.customer.create({
    data: {
      name: "Maria Svensson",
      email: "maria@example.com",
      phone: "0701234567",
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: "Sven Johansson",
      email: "sven@example.com",
      phone: "0707654321",
    },
  });

  const hotel1 = await prisma.hotel.create({
    data: {
      name: "Stadshotellet",
      address: "Storgatan 1, Stockholm",
    },
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      name: "City Inn",
      address: "Kyrkogatan 5, Göteborg",
    },
  });

  const room1 = await prisma.room.create({
    data: {
      number: "101",
      roomType: "Single",
      price: 995,
      hotelId: hotel1.id,
    },
  });

  const room2 = await prisma.room.create({
    data: {
      number: "102",
      roomType: "Double",
      price: 1495,
      hotelId: hotel1.id,
    },
  });

  const room3 = await prisma.room.create({
    data: {
      number: "201",
      roomType: "Single",
      price: 899,
      hotelId: hotel2.id,
    },
  });

  await prisma.booking.createMany({
    data: [
      {
        customerId: customer1.id,
        roomId: room1.id,
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-04"),
        totalPrice: 2985,
      },
      {
        customerId: customer1.id,
        roomId: room2.id,
        startDate: new Date("2025-08-10"),
        endDate: new Date("2025-08-13"),
        totalPrice: 4485,
      },
      {
        customerId: customer2.id,
        roomId: room3.id,
        startDate: new Date("2025-07-05"),
        endDate: new Date("2025-07-07"),
        totalPrice: 1798,
      },
    ],
  });

  console.log("Seed completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
