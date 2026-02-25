export interface PaginatedSrsProblem {
  content: ProblemContent[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  sort: string[];
}

interface ProblemContent {
  repetitions: 0;
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
  difficulty: "Easy" | "Medium" | "Hard";
  topicTags: Tag[];
  url: string;
}
