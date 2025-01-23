
export interface User {
  id: number;
  name: string;
  password: string;
  createdAt: Date;
}

export interface CoreNote {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
