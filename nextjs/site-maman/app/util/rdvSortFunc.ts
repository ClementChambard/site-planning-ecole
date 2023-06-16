export default function rdvSortFunc(
  rdv1: { id: string; student: string; hour: number; minute: number },
  rdv2: { id: string; student: string; hour: number; minute: number }
) {
  if (rdv1.hour === rdv2.hour) {
    return rdv1.minute - rdv2.minute;
  }
  return rdv1.hour - rdv2.hour;
}
