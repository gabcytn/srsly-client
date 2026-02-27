import { type PaginatedSrsProblem, type Problem, type Solution } from "./types";

export const paginatedSrsProblem: PaginatedSrsProblem = {
  content: [
    {
      repetitions: 0,
      lastAttemptAt: "2026-02-13",
      nextAttemptAt: "2026-02-14",
      status: "NEW",
      problem: {
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
    },
    {
      repetitions: 0,
      lastAttemptAt: "2026-02-13",
      nextAttemptAt: "2026-02-14",
      status: "NEW",
      problem: {
        questionFrontendId: 2,
        title: "Add Two Numbers",
        difficulty: "Medium",
        topicTags: [
          {
            name: "Recursion",
          },
          {
            name: "Linked List",
          },
          {
            name: "Math",
          },
        ],
        url: "https://leetcode.com/problems/add-two-numbers/",
      },
    },
    {
      repetitions: 0,
      lastAttemptAt: "2026-02-13",
      nextAttemptAt: "2026-02-27",
      status: "NEW",
      problem: {
        questionFrontendId: 23,
        title: "Find the Lexicographically Largest String From the Box II",
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
    },
  ],
  page: 0,
  size: 10,
  totalElements: 3,
  totalPages: 1,
  numberOfElements: 3,
  sort: [],
};

export const emptySrsProblems: PaginatedSrsProblem = {
  content: [],
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

export const solutionList: Solution[] = [
  {
    id: 103,
    code: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n      Map<Integer, Integer> map = new HashMap<>();\n      for (int i = 0; i < nums.length; i++) {\n          int diff = target - nums[i];\n          if (map.containsKey(diff))\n            return new int[]{ map.get(diff), i};\n        map.put(nums[i], i);\n      }\n      return new int[0];\n    }\n}",
    title: "Optimal Solution",
    aiCritique: null,
    note: "O(n) time, O(1) space. Classic two-pointer technique that avoids the need for precomputed arrays. We maintain running maximums from both ends. Lorem ipsum dolor sit amet adecpitus",
  },
  {
    id: 104,
    code: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n      Map<Integer, Integer> map = new HashMap<>();\n      for (int i = 0; i < nums.length; i++) {\n          int diff = target - nums[i];\n          if (map.containsKey(diff))\n            return new int[]{ map.get(diff), i};\n        map.put(nums[i], i);\n      }\n      return new int[0];\n    }\n}",
    title: "Suboptimal Solution",
    aiCritique: null,
    note: "O(n) time, O(1) space. Classic two-pointer technique that avoids the need for precomputed arrays. We maintain running maximums from both ends. Lorem ipsum dolor sit amet adecpitus",
  },
];
