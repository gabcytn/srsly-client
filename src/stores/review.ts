import api from "@/api";
import { ReviewService } from "@/service/ReviewService";
import type {
  InitialReviewBody,
  PaginatedReviewProblem,
  ProblemSearchQuery,
  ReviewProgress,
} from "@/shared/types";
import { defineStore } from "pinia";
import { useToast } from "primevue";
import { computed, ref } from "vue";

export const useReviewStore = defineStore("review", () => {
  const toast = useToast();
  const isLoading = ref(false);
  const problems = ref<PaginatedReviewProblem>();
  const progress = ref<ReviewProgress>({
    solved: 0,
    unsolved: 0,
  });

  const problemsSolvedToday = computed(() => progress.value.solved);
  const problemsToSolveToday = computed(() => progress.value.solved + progress.value.unsolved);

  async function initializeDashboard() {
    isLoading.value = true;
    try {
      await Promise.all([loadReviewProblems(), loadReviewProgress()]);
    } catch (e: unknown) {
      toast.add({
        severity: "error",
        summary: "Something went wrong.",
        detail: e instanceof Error ? e.message : "Unknown error occured",
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  }

  async function loadReviewProblems(query: ProblemSearchQuery = {}) {
    const params = new URLSearchParams({
      page: String(query.page ?? 0),
      difficulty: query.difficulty ?? "all",
    });

    if (query.title?.trim()) {
      params.set("title", query.title);
    }

    const data = await ReviewService.getProblemsToReviewToday(params);
    problems.value = data;
  }

  async function loadReviewProgress() {
    const data = await ReviewService.getProgressData();
    progress.value = data;
  }

  function incrementProgress() {
    const solved = progress.value.solved + 1;
    const unsolved = progress.value.unsolved - 1;
    progress.value = { solved, unsolved };
  }

  async function submitProblemReview(problemId: number, values: any) {
    if (!problemId || Number.isNaN(problemId)) {
      throw new Error("Invalid param id");
    }

    const confidences = ["LOW", "MEDIUM", "HIGH"] as const;
    const body: InitialReviewBody = {
      repetitions: values.repetitions,

      ...(values.repetitions > 0 && {
        lastReviewedAt: new Date(values.lastReviewedAt).toLocaleDateString("en-CA"),
        confidence: confidences[values.confidence - 1],
      }),

      ...(values.title &&
        values.code && {
          solution: {
            title: values.title,
            code: values.code,
            note: values.note,
          },
        }),
    };
    await ReviewService.submitReviewableProblem(problemId, body);
  }

  return {
    isLoading,
    problems,
    progress,
    problemsSolvedToday,
    problemsToSolveToday,
    initializeDashboard,
    loadReviewProblems,
    incrementProgress,
    submitProblemReview,
  };
});
