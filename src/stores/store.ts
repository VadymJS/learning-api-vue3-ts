import { defineStore } from 'pinia';
import {storeState, Lesson} from '../types/templateTypes.interface.ts'

export const useStore = defineStore('store', {
  state: (): storeState => ({
    timer: 0,
    currentEpisode: 1,
    lessons: [],
    lesson: {}
  }),
  actions: {
    incrementTimer(): void {
      this.timer++;
    },
    resetTimer():void {
      this.timer = 0;
    },
    changeCurrentEpisode(episode: number): void {
      this.currentEpisode = episode;
    },
    async getLessons(): Promise<void> {
      const request: Response = await fetch('../../api/lessons.json');
      this.lessons = await request.json();
    },
    changeLesson(lesson: Lesson): void {
      this.lesson = lesson;
    }
  },
});
