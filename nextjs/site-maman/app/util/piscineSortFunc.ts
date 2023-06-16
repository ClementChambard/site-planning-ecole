import { Piscine } from "@prisma/client";

export default function piscineSortFunc(p1: Piscine, p2: Piscine) {
  if (p1.date < p2.date) return -1;
  else if (p2.date < p1.date) return 1;
  else return 0;
}
