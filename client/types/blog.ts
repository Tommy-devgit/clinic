export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author?: {
    _id?: string;
    name?: string;
    role?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
