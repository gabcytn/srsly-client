import api from "@/api";
import type { PaginatedReviewProblem, ReviewProgress } from "@/shared/types";

export const ReviewService = {
  getProgressData: async () => (await api.get("/problems/review/progress")) as ReviewProgress,
  getProblemsToReviewToday: async (params: URLSearchParams) =>
    (await api.get(`/problems/review?${params.toString()}`)) as PaginatedReviewProblem,
  submitInitialNonReviewableProblem: async (id: number, body: any) =>
    await api.post(`/problems/${id}/solve/initial`, body),
  submitInitialReviewableProblem: async (id: number, body: any) =>
    await api.post(`/problems/${id}/review/initial`, body),
  submitProblemReview: async (id: number, grade: number) =>
    await api.post(`/problems/review/${id}`, { grade }),
};
