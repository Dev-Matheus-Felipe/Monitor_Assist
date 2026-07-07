import { Prisma } from "@prisma/client";

export type MonitorWithSlots = Prisma.MonitorGetPayload<{
  include: {
    slots: true
  };
}>;

export type MonitorWithAll = Prisma.MonitorGetPayload<{
  include: {
    slots: true;
    user: true;
    appointments: true
  };
}>;

export type MonitorModal = Prisma.MonitorGetPayload<{
  include: {
    appointments: true;
    user: true
  };
}>;