<template>
    <div v-if="store.lessons.length" class="p-4 mx-auto max-w-5xl text-center">
        <div class="text-2xl">
            <a href="/">Atom</a>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold my-8">{{ store.lesson.title }}</h2>
        <h3 class="text-2xl"><span class="text-orange-500">Епізод {{  store.lesson.episode }}. </span>{{  store.lesson.subtitle }}</h3>
        <div class="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div class="col-span-2 mb-8 md:mb-0">
                <YouTube
                    :src=" store.lesson.video_url ||  ''"
                    class="iframe-container"
                    @state-change="onChange"/>
            </div>
            <LessonList/>
            <div class="lg:col-span-2 my-8 md:m-0 lg:mr-8 text-left">
                <p class="text-orange-500 text-2xl mb-4">У цьому епізоді ви дізнаєтесь:</p>
                {{  store.lesson.description }}
            </div>
            <div class="col-span-1 flex flex-col">
                <span class="font-bold mb-4">Вже переглянули? Отримайте доступ до наступного:</span>
                <button
                    v-if="store.currentEpisode !== store.lessons.length"
                    class="text-white py-2 px-4 rounded-sm font-bold shadow-lg"
                    :class="{'bg-orange-500 hover:bg-orange-600': !store.lessons[store.currentEpisode].isAvailable, 'bg-gray-500': store.lessons[store.currentEpisode].isAvailable}"
                    :disabled="store.lessons[store.currentEpisode].isAvailable"
                    @click="openNextLesson">
                    Наступний епізод
                </button>
                <p v-else>Вітаю, це останній епізод!</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {ref, onMounted} from 'vue';
import { useStore } from '../stores/store.ts';
import LessonList from "../components/LessonList.vue";
import YouTube from 'vue3-youtube';
import { toast } from 'vue3-toastify';

const store = useStore();
const interval = ref<number>(0);

onMounted(async (): Promise<void> => {
    await store.getLessons();

    store.changeLesson(store.lessons[store.currentEpisode - 1]);
})

function openNextLesson(): void {
    clearInterval(interval.value);
    store.lessons[store.currentEpisode].isAvailable = true;

    notify();
}

function onChange(event): void {
    const playerState = event.data;

    if (playerState === 1) {
        if (store.currentEpisode === store.lessons.length || store.lessons[store.currentEpisode].isAvailable) {
            return;
        }

        interval.value = setInterval(() => {
            if (store.timer >= store.lesson.video_time) {
                clearInterval(interval.value);

                store.lessons[store.currentEpisode].isAvailable = true;

                notify();
            }
            store.incrementTimer();

        }, 1000);
    } else if (playerState === 2) {
        clearInterval(interval.value);
    }
}

function notify(): void {
    toast('Вітаю, ви можете подивитись нове відео!');
}

</script>
