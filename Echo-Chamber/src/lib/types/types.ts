export interface IPost {
  id: number;
  content: string;
  imageUrl: string;
  userId: string;
  likes: number;
  reports: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  author: {
    id: string;
    username: string;
    profile: string;
  };
}
