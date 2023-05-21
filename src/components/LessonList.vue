<template>
    <ul class="flex flex-col justify-between col-span-1">
        <li v-for="lesson in store.lessons" :key="lesson.episode">
            <button
                class="text-white p-4 rounded-sm font-bold shadow-lg flex items-center w-full"
                :class="{'bg-orange-500 hover:bg-orange-600': lesson.isAvailable, 'bg-gray-500': !lesson.isAvailable}"
                :disabled="!lesson.isAvailable"
                @click="changeLesson(lesson.episode || 1)">
                <svg v-if="lesson.isAvailable" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-a">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span class="ml-1">{{ lesson.subtitle }}</span>
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">

import { useStore } from '../stores/store.ts';

const store = useStore();

function changeLesson(episode: number): void {
    if (episode === store.currentEpisode) {
        return;
    }

    store.changeCurrentEpisode(episode);
    store.resetTimer();

    store.changeLesson(store.lessons[store.currentEpisode - 1]);
}

</script>
