import api from "@/api";
import type { PaginatedSolvedProblem, Problem } from "@/shared/types";

export const ProblemService = {
  findById: async (id: number) => (await api.get(`/problems/${id}`)) as Problem,
  findSolved: async (params: URLSearchParams) =>
    (await api.get(`/problems/solved?${params.toString()}`)) as PaginatedSolvedProblem,
};
