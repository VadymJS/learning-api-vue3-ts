export interface Lesson {
    episode?: number,
    title?: string,
    subtitle?: string,
    video_url?: string,
    video_time?: number,
    description?: string,
    isAvailable?: boolean
}

export interface YoutubeEvent {
    target: string,
    data: number
}

export interface storeState {
    timer: number;
    currentEpisode: number;
    lessons: Lesson[];
    lesson: Lesson;
}
