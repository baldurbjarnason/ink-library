import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';
const [send, receive] = crossfade({
    duration: d => {
        return Math.sqrt(d * 300)
    },
    fallback(node, params) {

        return {
            duration: 0
        };
    }
});

export {send, receive};