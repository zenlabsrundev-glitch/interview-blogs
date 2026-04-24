export type ExperienceLevel = "Intern" | "FTE";
export type PostResult = "Selected" | "Rejected";
export type RoundDifficulty = "Easy" | "Medium" | "Hard";

export interface Round {
  name: string;
  difficulty: RoundDifficulty;
  questions: string[];
}

export interface Post {
  id: string;
  user_id: string;
  company: string;
  role: string;
  experience_level: ExperienceLevel;
  result: PostResult;
  rounds: Round[];
  tips: string;
  created_at: string;
}

export interface PostWithAuthor extends Post {
  author_name: string | null;
  author_avatar_url: string | null;
}
