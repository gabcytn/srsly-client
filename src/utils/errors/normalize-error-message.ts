import { AxiosError } from "axios";

export default function (e: unknown) {
  if (e instanceof AxiosError) {
    return e.response?.data.detail
  }

  if (e instanceof Error) {
    return e.message
  }

  return "Unknown error occured."
}
