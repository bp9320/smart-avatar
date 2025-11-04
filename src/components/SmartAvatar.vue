<template>
    <div class="d-flex flex-column justify-center align-center">
        <v-avatar :class="`bg-${backgroundColor}`" :size="avatarSize">
            <v-img 
                v-if="hasSources && currentSource && currentSource.type === 'image'" 
                :src="currentSource?.url"
                :alt="currentSource?.description"
            />
            <video
                v-else-if="hasSources && currentSource && currentSource.type === 'video'"
                ref="video-player"
                :src="currentSource.url"
                muted
                :loop="props.loop"
                :autoplay="props.autoplay"
                :width="avatarSize * 2"
            ></video>
            <span v-else class="text-uppercase font-weight-bold" :class="{
                'text-h3': props.size === 'large',
                'text-h4': props.size === 'medium',
                'text-h5': props.size === 'small',
            }">{{ initials }}</span>
        </v-avatar>
        <div v-if="hasMultipleSources || currentSource?.type === 'video'" class="d-flex justify-center align-center">
            <v-btn
                v-if="hasMultipleSources"
                variant="text" 
                density="compact" 
                icon="mdi-arrow-left" 
                @click="handlePrevSource"
            ></v-btn>
            <v-btn
                v-if="currentSource?.type === 'video'"
                variant="text"
                density="compact"
                :icon="playPauseBtnIcon" 
                @click="togglePlayPause"
            ></v-btn>
            <v-btn
                v-if="hasMultipleSources"
                variant="text"
                density="compact"
                icon="mdi-arrow-right"
                @click="handleNextSource"
            ></v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useTemplateRef, computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { 
    useSmartAvatar,
    type AvatarSize,
    type SmartAvatarProps as Props
} from '@/composables/useSmartAvatar'

const props = withDefaults(defineProps<Props>(), {
    size: 'small',
    autoplay: false,
    loop: false,
})

const {
    avatarSize,
    initials,
    backgroundColor,
    hasSources,
    hasMultipleSources,
    currentSource,
    handleNextSource,
    handlePrevSource,
    setAutoPlayInterval,
    clearAutoPlayInterval,
} = useSmartAvatar(props)


 // video player logic
const videoPlayer = useTemplateRef('video-player')

const isVideoPlaying = ref(props.autoplay)

watch(currentSource, () => {
    isVideoPlaying.value = props.autoplay
})

const playPauseBtnIcon = computed(()=> {
    return isVideoPlaying.value ? 'mdi-pause' : 'mdi-play'
})

 function handlePauseVideo(): void {
    videoPlayer.value?.pause()
 }

 function handlePlayVideo(): void {
    videoPlayer.value?.play()
 }

 function togglePlayPause(): void {
    if(videoPlayer.value?.paused) {
        handlePlayVideo()
        isVideoPlaying.value = true
    } else {
        handlePauseVideo()
        isVideoPlaying.value = false
    }
 }

 // lifecycle hooks
 onMounted(() => {
    setAutoPlayInterval()
 })

 onBeforeUnmount(() => {
    clearAutoPlayInterval()
 })

</script>