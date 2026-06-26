import api from "@/api";
import type { PaginatedReviewProblem, ReviewProgress } from "@/shared/types";

export const ReviewService = {
  getProgressData: async () => (await api.get("/problems/review/progress")) as ReviewProgress,
  getProblemsToReviewToday: async (params: URLSearchParams) =>
    (await api.get(`/problems/review?${params.toString()}`)) as PaginatedReviewProblem,
  submitReview: async (id: number, body: any) =>
    await api.post(`/problems/${id}/solve/initial`, body),
};
