<template>
  <v-app>
    <v-main class="d-flex flex-column ga-4 align-center justify-center">
      <v-card class="pa-2 w-50">
        <v-card-title>No source avatars</v-card-title>
        <div class="d-flex ga-2">
          <SmartAvatar size="small" name="brian pirot" />
          <SmartAvatar size="medium" name="sammy hagar" />
          <SmartAvatar size="large" name="ozzy osbourne" />
          <SmartAvatar name="layne staley" />
        </div>
      </v-card>

      <v-card class="pa-2 w-50">
        <v-card-title>Single image avatars</v-card-title>
        <div class="d-flex ga-2">
          <SmartAvatar size="small" name="carson daly" :sources="[sourcesData[0]]"/>
          <SmartAvatar size="medium" name="carson daly" :sources="[sourcesData[1]]"/>
          <SmartAvatar size="large" name="carson daly" :sources="[sourcesData[2]]"/>
        </div>
      </v-card>

      <v-card class="pa-2 w-50">
        <v-card-title>Single video avatars</v-card-title>
        <div class="d-flex ga-2">
          <SmartAvatar size="small" name="carson daly" :sources="[sourcesData[4]]"/>
          <SmartAvatar size="medium" name="carson daly" autoplay :sources="[sourcesData[4]]"/>
          <SmartAvatar size="large" name="carson daly" autoplay loop :sources="[sourcesData[4]]"/>
        </div>
      </v-card>

      <v-card class="pa-2 w-50">
        <v-card-title>Multi-source avatars</v-card-title>
        <div class="d-flex ga-2">
          <SmartAvatar size="small" name="sammy hagar" :sources="sourcesData"/>
          <SmartAvatar size="medium" name="sammy hagar" autoplay :sources="sourcesData"/>
          <SmartAvatar size="large" name="sammy hagar" autoplay loop :sources="sourcesData"/>
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

import testVideo from '@/assets/TestVideo.mp4'

const sourcesData = [{
  type: "image",
  url: "https://picsum.photos/id/40/200",
  description: "cat nose",
}, {
  type: "image",
  url: "https://picsum.photos/id/64/200",
  description: "woman holding flowers",
}, {
  type: "image",
  url: "https://picsum.photos/id/84/200",
  description: "bridge at night",
}, {
  type: "image",
  url: "https://picsum.photos/id/111/200",
  description: "old car",
}, {
  type: "video",
  url: testVideo,
  description: "husky running through mountains",
}]
</script>
