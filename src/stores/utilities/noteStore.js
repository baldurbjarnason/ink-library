import {cachedWeb} from './web.js'
import { derived } from "svelte/store";

export function noteStore (note) {
  const store = cachedWeb(`/api/note/${note.shortId}`, {initialData: note})

  const annotation = derived(store, $store => {
    if ($store.error) console.error($store.error)
    return $store.data
  }, {})

  const noted = derived(annotation, $annotation => {
    return [].concat($annotation.body).find(item =>  {
      return (item.motivation === "commenting" || item.purpose === "commenting")
    });
  }, {})
  const highlighted = derived(annotation, $annotation => {
    return [].concat($annotation.body).find(item =>  {
      return (item.motivation === "highlighting" || item.purpose === "highlighting")
    });
  }, {})
  const flags = derived(annotation, $annotation => {
    return [].concat($annotation.tags).filter(flag => flag.type === "flag" && !flag.name.startsWith("colour"))
  }, [])
  const colours = derived(annotation, $annotation => {
    const colourTags = [].concat($annotation.tags).filter(flag => flag.name.startsWith("colour"))
    if (colourTags.length === 0) {
      return [{name: "colour 1"}]
    } else {
      return colourTags
    }
  }, [{name: "colour 1"}])
  return {annotation, noted, colours, flags, highlighted}
}