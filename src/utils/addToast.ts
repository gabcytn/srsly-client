import { type ToastServiceMethods } from "primevue";

export default function (
  toast: ToastServiceMethods,
  severity: string,
  summary: string,
  detail: string | undefined,
  life: number | undefined,
) {
  toast.add({
    severity,
    summary,
    detail,
    life,
  });
}
