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
  {
    id: 11,
    title: "Reported Exam #11",
    description: "Submitted by a candidate from Nottingham.",
    reportedDate: "March 2025",
    questionIds: [106, 112, 118, 124, 132, 138, 144, 152, 158, 164, 172, 178, 184, 192, 198, 204, 212, 218, 226, 232, 238, 246, 252, 258],
  },
  {
    id: 12,
    title: "Reported Exam #12",
    description: "Reported by a candidate from Leicester.",
    reportedDate: "March 2025",
    questionIds: [107, 113, 119, 127, 133, 139, 147, 153, 159, 163, 169, 177, 183, 189, 197, 203, 209, 217, 223, 229, 237, 243, 249, 257],
  },
  {
    id: 13,
    title: "Reported Exam #13",
    description: "Submitted by a candidate from Southampton.",
    reportedDate: "April 2025",
    questionIds: [110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340],
  },
  {
    id: 14,
    title: "Reported Exam #14",
    description: "Reported by a candidate from Newcastle.",
    reportedDate: "April 2025",
    questionIds: [111, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335],
  },
  {
    id: 15,
    title: "Reported Exam #15",
    description: "Submitted by a candidate from Portsmouth.",
    reportedDate: "April 2025",
    questionIds: [348, 358, 368, 378, 388, 398, 408, 418, 428, 438, 448, 458, 468, 478, 488, 498, 508, 518, 528, 538, 548, 558, 568, 578],
  },
  {
    id: 16,
    title: "Reported Exam #16",
    description: "Reported by a candidate from Reading.",
    reportedDate: "April 2025",
    questionIds: [349, 359, 369, 379, 389, 399, 409, 419, 429, 439, 449, 459, 469, 479, 489, 499, 509, 519, 529, 539, 549, 559, 569, 579],
  },
  {
    id: 17,
    title: "Reported Exam #17",
    description: "Submitted by a candidate from Coventry.",
    reportedDate: "May 2025",
    questionIds: [580, 590, 600, 610, 620, 630, 641, 651, 661, 671, 681, 691, 701, 711, 721, 731, 741, 751, 761, 771, 781, 791, 801, 811],
  },
  {
    id: 18,
    title: "Reported Exam #18",
    description: "Reported by a candidate from Brighton.",
    reportedDate: "May 2025",
    questionIds: [583, 593, 603, 613, 623, 635, 645, 653, 663, 673, 683, 693, 703, 713, 723, 733, 743, 753, 763, 773, 783, 793, 803, 813],
  },
  {
    id: 19,
    title: "Reported Exam #19",
    description: "Submitted by a candidate from Oxford.",
    reportedDate: "May 2025",
    questionIds: [352, 362, 372, 382, 392, 402, 412, 422, 432, 818, 819, 822, 826, 829, 832, 836, 839, 843, 845, 846, 847, 848, 849, 850],
  },
  {
    id: 20,
    title: "Reported Exam #20",
    description: "Reported by a candidate from Cambridge.",
    reportedDate: "May 2025",
    questionIds: [353, 363, 373, 383, 393, 403, 413, 423, 433, 443, 453, 463, 473, 483, 493, 816, 820, 823, 827, 830, 833, 837, 840, 841],
  },
];

export function getExamQuestions(examId: number): Question[] {
  const set = examSets.find((e) => e.id === examId);
  if (!set) return [];
  const byId = new Map(questions.map((q) => [q.id, q]));
  return set.questionIds.map((id) => byId.get(id)).filter(Boolean) as Question[];
}
