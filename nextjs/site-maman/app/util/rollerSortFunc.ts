import { Roller } from "@prisma/client";

export default function rollerSortFunc(r1: Roller, r2: Roller) {
  if (r1.student < r2.student) return -1;
  else if (r1.student > r2.student) return 1;
  else return 0;
}
