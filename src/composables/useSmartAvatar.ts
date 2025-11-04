import { ref, computed } from 'vue'

export type AvatarSize = 'small' | 'medium' | 'large'

export interface SmartAvatarProps {
    sources?: Record<string, any>[]
    name: string
    size?: AvatarSize
    autoplay?: boolean
    loop?: boolean
}

export function useSmartAvatar(props: SmartAvatarProps) {
    function getInitials (name: string): string {
        const names = name.split(' ')
        const initials = names.reduce((acc, curName) => {
            acc += curName[0]
            return acc
        }, '')

        return initials
    }

    const BGCOLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] as const
    type Color = typeof BGCOLORS[number]
    

    function getBackgroundColor (name: string): Color {
        const firstLetter = name.toLowerCase()[0]
        const charCode = firstLetter?.charCodeAt(0) || 0
        const colorIndex = charCode % BGCOLORS.length
        
        return BGCOLORS[colorIndex] ?? BGCOLORS[0]
    }

    function setAvatarSize (size?: AvatarSize) {
        switch(size) {
            case 'small':
                return 40
            case 'medium':
                return 60
            case 'large':
                return 100
            default:
                return 60
        }
    }

    const avatarSize = ref(setAvatarSize(props.size))

    function setHasSources (sources?: any[]): boolean {
        return Array.isArray(sources) && sources.length > 0
    }

    function setHasMultipleSources (sources?: any[]): boolean {
        return Array.isArray(sources) && sources.length > 1
    }

    const initials = getInitials(props.name)
    const backgroundColor = getBackgroundColor(props.name)
    const hasSources = setHasSources(props.sources)
    const hasMultipleSources = setHasMultipleSources(props.sources)
    const sourceIndex = ref(0)
    const currentSource = computed(() => {
        if (hasSources) {
            return props.sources[sourceIndex.value]
        }

        return null
    })

    function handleNextSource ():void {
        if (props.sources && sourceIndex.value < props.sources?.length - 1) {
            sourceIndex.value++
        } else {
            if(intervalId.value && !props.loop) {
                clearAutoPlayInterval()
                return
            }
            sourceIndex.value = 0
        }
    }

    function handlePrevSource ():void {
        if (props.sources && sourceIndex.value === 0) {
            sourceIndex.value = props.sources.length - 1
        } else {
            sourceIndex.value--
        }

    }

    const intervalId = ref<number | null>(null)

    function setAutoPlayInterval() {
        if (!props.autoplay || !hasMultipleSources) return
        clearAutoPlayInterval()

         intervalId.value = setInterval(() => {
            handleNextSource()
        }, 3000)
    }

    function clearAutoPlayInterval() {
        if(!intervalId.value) return
        clearInterval(intervalId.value)
        intervalId.value = null
    }





    return {
        avatarSize,
        initials,
        backgroundColor,
        hasSources,
        hasMultipleSources,
        sourceIndex,
        currentSource,
        handleNextSource,
        handlePrevSource,
        setAutoPlayInterval,
        clearAutoPlayInterval,
    }
}