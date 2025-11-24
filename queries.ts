import { prisma } from "./lib/prisma";

async function bookingsForCustomer(customerId: number) {
  console.log("Bokningar för kund id:", customerId);
  const res = await prisma.booking.findMany({
    where: { customerId },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      totalPrice: true,
      room: {
        select: {
          number: true,
          roomType: true,
          hotel: { select: { id: true, name: true, address: true } },
        },
      },
    },
  });
  console.log(JSON.stringify(res, null, 2));
}

async function roomsForHotel(hotelId: number) {
  console.log("Rum för hotell id:", hotelId);
  const res = await prisma.room.findMany({
    where: { hotelId },
    select: { id: true, number: true, roomType: true, price: true },
  });
  console.log(JSON.stringify(res, null, 2));
}

async function fullBookingInfo() {
  console.log("Bokningsinformation");
  const res = await prisma.booking.findMany({
    select: {
      id: true,
      startDate: true,
      endDate: true,
      totalPrice: true,
      customer: { select: { id: true, name: true, email: true } },
      room: {
        select: {
          id: true,
          number: true,
          roomType: true,
          price: true,
          hotel: { select: { id: true, name: true, address: true } },
        },
      },
    },
  });
  console.log(JSON.stringify(res, null, 2));
}

async function main() {
  try {
    await bookingsForCustomer(1);
    await roomsForHotel(1);
    await fullBookingInfo();
  } catch (error) {
    console.error("Fel när queries körs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
