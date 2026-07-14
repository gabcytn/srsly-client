import z from "zod";
import isInFuture from "@/utils/is-in-future";

const resolver = z
  .object({
    repetitions: z
      .number("This field is required.")
      .min(0, "This field requires a non-negative integer"),
    confidence: z
      .object({ name: z.string(), value: z.string() }, "Confidence is requireds.")
      .nullable(),
    lastReviewedAt: z
      .preprocess(
        (val) => {
          if (val === "" || val === null) {
            return null;
          }

          return new Date(String(val));
        },
        z.union([
          z.date(),
          z.null().refine((val) => val !== null, { message: "Date is required." }),
        ]),
      )
      .nullable(),
    isForReview: z.boolean(),
    includeSolution: z.boolean(),
    title: z.string().min(1, "Title is required.").nullable(),
    code: z.string().min(1, "Code is required.").nullable(),
    note: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.repetitions === 0) {
      data.confidence = null;
      data.lastReviewedAt = null;
    }

    if (data.repetitions > 0 && !data.confidence) {
      ctx.addIssue({
        code: "custom",
        message: "Confidence is required.",
        path: ["confidence"],
      });
    }

    if (data.repetitions > 0 && !data.lastReviewedAt) {
      ctx.addIssue({
        code: "custom",
        message: "Review date is required.",
        path: ["lastReviewedAt"],
      });
    }

    if (data.lastReviewedAt && isInFuture(data.lastReviewedAt)) {
      ctx.addIssue({
        code: "custom",
        message: "Review date cannot be from the future.",
        path: ["lastReviewedAt"],
      });
    }

    if (!data.includeSolution) {
      data.title = null;
      data.code = null;
      data.note = null;
      return;
    }

    if (!data.title) {
      ctx.addIssue({
        code: "custom",
        message: "Solution title is required.",
        path: ["title"],
      });
    }

    if (!data.code) {
      ctx.addIssue({
        code: "custom",
        message: "Solution code is required.",
        path: ["code"],
      });
    }
  });

export default resolver;
