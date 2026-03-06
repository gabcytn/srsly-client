import { type PaginatedProblem } from "./types";

export const allProblems: PaginatedProblem = {
  content: [
    {
      questionFrontendId: 1,
      title: "Two Sum",
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
    },
    {
      questionFrontendId: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      topicTags: [
        {
          name: "Recursion",
        },
        {
          name: "Math",
        },
        {
          name: "Linked List",
        },
      ],
      url: "https://leetcode.com/problems/add-two-numbers/",
    },
    {
      questionFrontendId: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      topicTags: [
        {
          name: "Hash Table",
        },
        {
          name: "Sliding Window",
        },
        {
          name: "String",
        },
      ],
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    },
    {
      questionFrontendId: 10,
      title: "Regular Expression Matching",
      difficulty: "Hard",
      topicTags: [
        {
          name: "Recursion",
        },
        {
          name: "String",
        },
        {
          name: "Dynamic Programming",
        },
      ],
      url: "https://leetcode.com/problems/regular-expression-matching/",
    },
    {
      questionFrontendId: 23,
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      topicTags: [
        {
          name: "Divide and Conquer",
        },
        {
          name: "Merge Sort",
        },
        {
          name: "Heap (Priority Queue)",
        },
        {
          name: "Linked List",
        },
      ],
      url: "https://leetcode.com/problems/merge-k-sorted-lists/",
    },
    {
      questionFrontendId: 67,
      title: "Add Binary",
      difficulty: "Easy",
      topicTags: [
        {
          name: "Bit Manipulation",
        },
        {
          name: "Math",
        },
        {
          name: "String",
        },
        {
          name: "Simulation",
        },
      ],
      url: "https://leetcode.com/problems/add-binary/",
    },
    {
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
    {
      questionFrontendId: 365,
      title: "Water and Jug Problem",
      difficulty: "Medium",
      topicTags: [
        {
          name: "Depth-First Search",
        },
        {
          name: "Math",
        },
        {
          name: "Breadth-First Search",
        },
      ],
      url: "https://leetcode.com/problems/water-and-jug-problem/",
    },
    {
      questionFrontendId: 424,
      title: "Longest Repeating Character Replacement",
      difficulty: "Medium",
      topicTags: [
        {
          name: "Hash Table",
        },
        {
          name: "Sliding Window",
        },
        {
          name: "String",
        },
      ],
      url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
    },
    {
      questionFrontendId: 901,
      title: "Online Stock Span",
      difficulty: "Medium",
      topicTags: [
        {
          name: "Monotonic Stack",
        },
        {
          name: "Data Stream",
        },
        {
          name: "Stack",
        },
        {
          name: "Design",
        },
      ],
      url: "https://leetcode.com/problems/online-stock-span/",
    },
  ],
  page: 0,
  size: 10,
  totalElements: 11,
  totalPages: 2,
  numberOfElements: 10,
  sort: [
    {
      direction: "ASC",
      property: "frontendId",
      ignoreCase: false,
      nullHandling: "NATIVE",
      ascending: true,
      descending: false,
    },
  ],
};
