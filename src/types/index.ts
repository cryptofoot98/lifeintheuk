export type { Question } from "@/data/questions";

export type TestMode = "timed" | "untimed" | "study";

export type TestAttempt = {
  id: string;
  user_id: string;
  test_number: number;
  chapter_filter: number | null;
  mode: TestMode;
  score: number;
  total_questions: number;
  time_taken_seconds: number;
  completed_at: string;
  created_at: string;
};

export type QuestionResponse = {
  id: string;
  attempt_id: string;
  question_id: number;
  selected_answers: number[];
  is_correct: boolean;
  time_taken_seconds: number;
};

export type BookmarkedQuestion = {
  id: string;
  user_id: string;
  question_id: number;
  created_at: string;
};

export type UserStats = {
  total_tests: number;
  avg_score_percent: number;
  best_score_percent: number;
  total_questions_answered: number;
  correct_answers: number;
  weak_topics: string[];
  recent_attempts: TestAttempt[];
};
