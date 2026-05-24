import { questions, type Question } from "./questions";

export type ExamSet = {
  id: number;
  title: string;
  description: string;
  reportedDate: string;
  questionIds: number[];
};

// Each set uses question IDs from questions.ts
// Distributions roughly match the real exam: ~3 Values/UK, ~9 History, ~6 Society, ~6 Government
export const examSets: ExamSet[] = [
  {
    id: 1,
    title: "Reported Exam #1",
    description: "Submitted by a candidate who sat their test in London.",
    reportedDate: "May 2024",
    questionIds: [1, 3, 6, 8, 12, 16, 18, 21, 24, 27, 30, 33, 36, 39, 40, 41, 44, 48, 52, 57, 61, 65, 69, 74],
  },
  {
    id: 2,
    title: "Reported Exam #2",
    description: "Reported by a candidate from Manchester.",
    reportedDate: "June 2024",
    questionIds: [2, 4, 7, 9, 11, 17, 20, 23, 26, 29, 32, 35, 38, 81, 82, 43, 46, 50, 54, 59, 62, 66, 71, 76],
  },
  {
    id: 3,
    title: "Reported Exam #3",
    description: "Submitted by a candidate from Birmingham.",
    reportedDate: "July 2024",
    questionIds: [1, 5, 8, 10, 14, 19, 22, 25, 28, 31, 34, 37, 85, 89, 92, 42, 47, 51, 56, 60, 64, 68, 73, 78],
  },
  {
    id: 4,
    title: "Reported Exam #4",
    description: "Reported by a candidate who tested in Edinburgh.",
    reportedDate: "August 2024",
    questionIds: [2, 5, 6, 9, 15, 90, 16, 23, 27, 32, 37, 82, 89, 95, 98, 45, 53, 57, 83, 86, 63, 67, 72, 77],
  },
  {
    id: 5,
    title: "Reported Exam #5",
    description: "Submitted by a candidate from Bristol.",
    reportedDate: "September 2024",
    questionIds: [3, 4, 7, 11, 13, 18, 22, 26, 30, 35, 38, 85, 92, 95, 102, 49, 52, 58, 88, 91, 65, 70, 75, 80],
  },
  {
    id: 6,
    title: "Reported Exam #6",
    description: "Reported by a candidate who sat in Leeds.",
    reportedDate: "October 2024",
    questionIds: [1, 4, 8, 12, 15, 99, 16, 20, 25, 29, 33, 39, 81, 98, 103, 44, 48, 55, 94, 100, 62, 66, 71, 79],
  },
  {
    id: 7,
    title: "Reported Exam #7",
    description: "Submitted by a candidate from Cardiff.",
    reportedDate: "November 2024",
    questionIds: [2, 3, 6, 10, 14, 90, 17, 21, 24, 28, 34, 36, 40, 103, 82, 42, 46, 51, 59, 97, 63, 68, 74, 84],
  },
  {
    id: 8,
    title: "Reported Exam #8",
    description: "Reported by a candidate from Glasgow.",
    reportedDate: "December 2024",
    questionIds: [1, 3, 5, 7, 13, 99, 19, 23, 27, 31, 35, 82, 89, 95, 103, 43, 50, 54, 60, 104, 61, 67, 73, 87],
  },
  {
    id: 9,
    title: "Reported Exam #9",
    description: "Submitted by a candidate from Sheffield.",
    reportedDate: "January 2025",
    questionIds: [2, 4, 8, 11, 15, 99, 18, 22, 26, 29, 32, 37, 40, 98, 103, 41, 45, 52, 56, 86, 64, 69, 76, 93],
  },
  {
    id: 10,
    title: "Reported Exam #10",
    description: "Reported by a candidate who tested in Liverpool.",
    reportedDate: "February 2025",
    questionIds: [1, 2, 5, 6, 9, 12, 20, 25, 30, 33, 40, 81, 85, 92, 102, 47, 53, 57, 83, 91, 65, 70, 75, 101],
  },
];

export function getExamQuestions(examId: number): Question[] {
  const set = examSets.find((e) => e.id === examId);
  if (!set) return [];
  const byId = new Map(questions.map((q) => [q.id, q]));
  return set.questionIds.map((id) => byId.get(id)).filter(Boolean) as Question[];
}
