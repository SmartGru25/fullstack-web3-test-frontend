export interface IStory {
  id: number;
  title: string;
  link: string;
  author: {
    id: number;
    name: string;
  };
}