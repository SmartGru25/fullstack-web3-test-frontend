import axios from './base';
import { INewStory, IStory } from "../interfaces";

export async function fetchStories(authorId?: number): Promise<IStory[]> {
  const response = await axios.get<IStory[]>('/api/stories', {
    params: { authorId }
  });
  return response.data;
}

export async function createStory(story: INewStory): Promise<void> {
  await axios.post('/api/stories', story);
}

export async function deleteStory(storyId: number): Promise<void> {
  await axios.delete(`/api/stories/${storyId}`);
}