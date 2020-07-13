import { writable } from 'svelte/store';


export function interval (time = 3000) {
  const { subscribe, set } = writable(Date.now());
  let timer = setTimeout(refresh, time)

  function refresh () {
    set(Date.now())
    timer = setTimeout(refresh, time)
  }

  function clear () {
    clearTimeout(timer)
  }
  return {
    subscribe,
    clear
  };
}
