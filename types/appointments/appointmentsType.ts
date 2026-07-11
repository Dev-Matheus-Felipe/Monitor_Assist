import { Prisma } from "@prisma/client";

export type AppointmentType = Prisma.AppointmentGetPayload<{
  include: {
    student: {
      select: {
        name: true,
      }
    },
    monitor: {
      include: {
        user: true
      }
    }
  }
}>;