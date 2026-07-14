import type { InjectionKey, Ref } from "vue";

export interface UserDetails {
  email: string;
  isVerified: boolean;
}

export interface JwtResponse {
  token: string;
  expiresAt: number;
}

export interface AuthResponse extends UserDetails {
  jwtResponse: JwtResponse;
}

interface Sort {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
  descending: boolean;
}

interface Paginated {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  sort: Sort[];
}

export type InitialReviewBody = {
  repetitions: number;
  lastReviewedAt?: string;
  confidence?: string;
  solution?: Solution;
};

export interface PaginatedReviewProblem extends Paginated {
  content: ReviewProblem[];
}

export interface ProblemSearchQuery {
  page?: number;
  difficulty?: string;
  title?: string;
}

interface SolvedProblem {
  problem: ProblemSummary;
  reviewDetails?: ReviewDetail;
  solvedAt: string; // 'YYYY-MM-DD'
}

export interface PaginatedSolvedProblem extends Paginated {
  content: SolvedProblem[];
}

export interface ReviewProgress {
  unsolved: number;
  solved: number;
}

type ReviewProblemStatus = "NEW" | "LEARNING" | "REVIEWING" | "MASTERED";

export interface ReviewProblem {
  id: number;
  lastAttemptAt: string;
  nextAttemptAt: string;
  status: ReviewProblemStatus;
  problem: Problem;
}

interface Tag {
  name: string;
}

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface Problem {
  questionFrontendId: number;
  title: string;
  difficulty: Difficulty;
  topicTags: Tag[];
  url: string;
  content?: string;
  isSolved: boolean;
  reviewDetail?: ReviewDetail;
}

export interface ProblemSummary {
  questionFrontendId: number;
  title: string;
  difficulty: Difficulty;
  topicTags: Tag[];
  url: string;
}

export interface ProblemDetail {
  questionFrontendId: number;
  title: string;
  difficulty: Difficulty;
  topicTags: Tag[];
  url: string;
  content?: string;
  isSolved: boolean;
  reviewDetail?: ReviewDetail;
}

interface ReviewDetail {
  reviewProblemId: number;
  lastAttemptAt: string; // 'YYYY-MM-DD'
  nextAttemptAt: string; // 'YYYY-MM-DD'
  status: ReviewProblemStatus;
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
