import { ProblemService } from "@/service/ProblemService";
import type { PaginatedSolvedProblem } from "@/shared/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProblemsStore = defineStore("problems", () => {
  const isLoading = ref(false);
  const solvedProblems = ref<PaginatedSolvedProblem>();

  async function getSolved(page: number = 0) {
    isLoading.value = false;
    try {
      const params = new URLSearchParams({ page: String(page) });
      const data = await ProblemService.findSolved(params);
      solvedProblems.value = data;
      console.warn(data);
    } catch {
      // TODO: handle error
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    solvedProblems,
    getSolved,
  };
});
