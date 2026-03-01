import { type AiCritique, type PaginatedSrsProblem, type Problem, type Solution } from "./types";

export const paginatedSrsProblem: PaginatedSrsProblem = {
  content: [
    {
      id: 3,
      repetitions: 1,
      lastAttemptAt: "2026-02-24",
      nextAttemptAt: "2026-02-25",
      status: "LEARNING",
      problem: {
        questionFrontendId: 901,
        title: "Online Stock Span",
        difficulty: "Medium",
        topicTags: [
          {
            name: "Data Stream",
          },
          {
            name: "Design",
          },
          {
            name: "Stack",
          },
          {
            name: "Monotonic Stack",
          },
        ],
        url: "https://leetcode.com/problems/online-stock-span/",
      },
    },
    {
      id: 52,
      repetitions: 1,
      lastAttemptAt: "2026-02-24",
      nextAttemptAt: "2026-02-25",
      status: "LEARNING",
      problem: {
        questionFrontendId: 365,
        title: "Water and Jug Problem",
        difficulty: "Medium",
        topicTags: [
          {
            name: "Math",
          },
          {
            name: "Breadth-First Search",
          },
          {
            name: "Depth-First Search",
          },
        ],
        url: "https://leetcode.com/problems/water-and-jug-problem/",
      },
    },
    {
      id: 102,
      repetitions: 0,
      lastAttemptAt: "2026-02-25",
      nextAttemptAt: "2026-02-26",
      status: "NEW",
      problem: {
        questionFrontendId: 69,
        title: "Sqrt(x)",
        difficulty: "Easy",
        topicTags: [
          {
            name: "Binary Search",
          },
          {
            name: "Math",
          },
        ],
        url: "https://leetcode.com/problems/sqrtx/",
      },
    },
  ],
  solvedCount: 1,
  page: 0,
  size: 5,
  totalElements: 4,
  totalPages: 1,
  numberOfElements: 4,
  sort: [
    {
      direction: "ASC",
      property: "nextAttemptAt",
      ignoreCase: false,
      nullHandling: "NATIVE",
      ascending: true,
      descending: false,
    },
  ],
};
export const emptySrsProblems: PaginatedSrsProblem = {
  content: [],
  solvedCount: 0,
  page: 0,
  size: 10,
  totalElements: 0,
  totalPages: 1,
  numberOfElements: 0,
  sort: [],
};

export const problem: Problem = {
  questionFrontendId: 1,
  title: "Two Sum",
  content:
    "<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p> </p>\n<p><strong>Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums &#61; [2,7,11,15], target &#61; 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] &#43; nums[1] &#61;&#61; 9, we return [0, 1].\n</pre>\n\n<p><strong>Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums &#61; [3,2,4], target &#61; 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong>Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums &#61; [3,3], target &#61; 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p> </p>\n<p><strong>Constraints:</strong></p>\n\n<ul><li><code>2 &lt;&#61; nums.length &lt;&#61; 10<sup>4</sup></code></li><li><code>-10<sup>9</sup> &lt;&#61; nums[i] &lt;&#61; 10<sup>9</sup></code></li><li><code>-10<sup>9</sup> &lt;&#61; target &lt;&#61; 10<sup>9</sup></code></li><li><strong>Only one valid answer exists.</strong></li></ul>\n\n<p> </p>\n<strong>Follow-up: </strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code> time complexity?",
  isSolved: true,
  nextReviewAt: "2026-03-01",
  srsId: 2,
  difficulty: "Easy",
  topicTags: [
    {
      name: "Array",
    },
    {
      name: "Hash Table",
    },
  ],
  url: "https://leetcode.com/problems/two-sum/",
};

export const suggestedProblems: Problem[] = [
  {
    questionFrontendId: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topicTags: [
      {
        name: "Hash Table",
      },
      {
        name: "Array",
      },
    ],
    url: "https://leetcode.com/problems/two-sum/",
  },
  {
    questionFrontendId: 901,
    title: "Stock Spans",
    difficulty: "Medium",
    topicTags: [
      {
        name: "Monotonic Stack",
      },
    ],
    url: "https://leetcode.com/problems/two-sum/",
  },
  {
    questionFrontendId: 23,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    topicTags: [
      {
        name: "Linked List",
      },
      {
        name: "Heap",
      },
      {
        name: "Divide & Conquer",
      },
    ],
    url: "https://leetcode.com/problems/merge-k-sorted-lists/",
  },
  {
    questionFrontendId: 23,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    topicTags: [
      {
        name: "Linked List",
      },
      {
        name: "Heap",
      },
      {
        name: "Divide & Conquer",
      },
    ],
    url: "https://leetcode.com/problems/merge-k-sorted-lists/",
  },
];

export const sampleCritique: AiCritique = {
  summary: {
    overallRating: "Excellent",
    verdict: "Accepted",
    confidence: "HIGH",
  },
  correctness: {
    isCorrect: true,
    issues: [],
  },
  complexity: {
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isComplexityOptimal: true,
  },
  readability: {
    namingQuality: "Excellent",
    codeStructure: "Excellent",
    commentsNeeded: false,
  },
  bugs: {
    hasBugs: false,
    riskDetails: ["Lorem ipsum risk details"],
  },
  improvements: {
    suggestedChanges: ["lorem ipsum suggested changes"],
    alternativeApproaches: [
      "Two pointers approach (requires sorting, O(n log n) time, O(1) or O(n) space depending on sorting implementation).",
    ],
  },
};

export const solutionList: Solution[] = [
  {
    id: 103,
    code: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n      Map<Integer, Integer> map = new HashMap<>();\n      for (int i = 0; i < nums.length; i++) {\n          int diff = target - nums[i];\n          if (map.containsKey(diff))\n            return new int[]{ map.get(diff), i};\n        map.put(nums[i], i);\n      }\n      return new int[0];\n    }\n}",
    title: "Optimal Solution",
    aiCritique: sampleCritique,
    note: "O(n) time, O(1) space. Classic two-pointer technique that avoids the need for precomputed arrays. We maintain running maximums from both ends. Lorem ipsum dolor sit amet adecpitus",
  },
  {
    id: 104,
    code: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n      Map<Integer, Integer> map = new HashMap<>();\n      for (int i = 0; i < nums.length; i++) {\n          int diff = target - nums[i];\n          if (map.containsKey(diff))\n            return new int[]{ map.get(diff), i};\n        map.put(nums[i], i);\n      }\n      return new int[0];\n    }\n}",
    title: "Suboptimal Solution",
    aiCritique: null,
    note: null,
  },
];
