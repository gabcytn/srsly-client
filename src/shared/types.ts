import type { InjectionKey, Ref } from "vue";

interface Sort {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
  descending: boolean;
}
export interface PaginatedSrsProblem {
  content: ProblemContent[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  sort: Sort[];
}

export interface ReviewProgress {
  unsolved: number;
  solved: number;
}

interface ProblemContent {
  id: number;
  repetitions: number;
  lastAttemptAt: string;
  nextAttemptAt: string;
  status: "NEW" | "LEARNING" | "REVIEWING" | "MASTERED";
  problem: Problem;
}

interface Tag {
  name: string;
}

export interface Problem {
  questionFrontendId: number;
  title: string;
  content?: string | null;
  isSolved?: boolean | null;
  nextReviewAt?: string | null | undefined;
  srsId?: number | null | undefined;
  difficulty: "Easy" | "Medium" | "Hard";
  topicTags: Tag[];
  url: string;
}

// AI RESPONSE TYPES
export interface Bugs {
  hasBugs: boolean;
  riskDetails: string[];
}

export interface Complexity {
  timeComplexity: string;
  spaceComplexity: string;
  isComplexityOptimal: boolean;
}

export interface Correctness {
  isCorrect: boolean;
  issues: string[];
}

interface Improvements {
  suggestedChanges: string[];
  alternativeApproaches: string[];
}

export type Quality = "Poor" | "Fair" | "Good" | "Excellent";

export interface Readability {
  namingQuality: Quality;
  codeStructure: Quality;
  commentsNeeded: boolean;
}

type Verdict = "Accepted" | "ConditionallyAccepted" | "Rejected";

type Rating = "Excellent" | "Good" | "Average" | "Poor";

type Confidence = "LOW" | "MEDIUM" | "HIGH";

export interface Summary {
  overallRating: Rating;
  verdict: Verdict;
  confidence: Confidence;
}

export interface AiCritique {
  summary: Summary;
  correctness: Correctness;
  complexity: Complexity;
  readability: Readability;
  bugs: Bugs;
  improvements: Improvements;
}
export interface Solution {
  id: number;
  title: string;
  code: string;
  aiCritique?: AiCritique | null;
  note: string | null;
}

export type ProblemContext = {
  problem: Ref<Problem | undefined>;
  markAsSolved: () => void;
};

export const ProblemKey: InjectionKey<ProblemContext> = Symbol("ProblemContext");
