# How to run:
1. Clone repo.
2. Run `npm install`
3. Run `npm run dev`

# How I approached the problem:
The project was initiated using the instructions on Vuetify's website (running `npm create vuetify@latest`)

I began by making the text only avatar as Vuetify's `Avatar` component gets you 90% of the way there with little additional logic needed. Once that was done, I updated the component to show a single image. I skipped video for now as I didn't have one handy and am not as familiar with working with videos and didn't want to stop my progress to look a few things up.

At this point, the logic was starting to add up, so I pulled it into a composable that could be used alongside the component. I then worked on getting the slideshow feature working with only images. Since avatars are typically fairly small, I decided to pull all controls below the avatar so that they do not cover the image, and so that they are more easily visible since the images can change color and possibly reduce contrast with any overlayed buttons.

Once I had completed all of the work for the text/image avatar, I began working on the video portion. I quickly noticed that the in-viewer controls would not be usable in such a small format, so I created a play/pause button that appears below the video and only when a video is playing.

# What I would add with more time:
1. Transitions. I would make the transition from one image/video to the next more smooth (possibly pre-load the assets so they are ready to go, assuming the assets are reasonable in size), and I would add a transition for the play/pause button when it appears/disappears.

2. Visual indicator for when a change is coming for the autoplay images. I thought about using the `v-progress-circular` component as a "border" for the avatar and using a more elaborate interval to track the progress so that it would slowly transition from an empty ring to a full ring, with the content switching when the ring is full, but I passed for the sake of time.

3. I would tweak the carousel/video controls so that they also reacted to the > size > prop of the component.

4. I would probably add some sort of hover effect where hovering on an the avatar would open the image/video in a larger component like a dialog or a drawer.

5. I would likely create two additional components, one for the controls, and one for the image/video/text display. This would make it a little easier to isolate the logic that might be specific to one of those areas.