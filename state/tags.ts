import { web } from "./web";
import { tagsURL$ } from "./state-urls";
import { distinctUntilChanged, map } from "rxjs/operators";
export const tags$ = web(tagsURL$.pipe(distinctUntilChanged()));

let tags: Array<Tag> = [];
tags$.subscribe({
  next(tagResult) {
    if (tagResult) {
      tags = tagResult;
    }
  },
});

interface Tag {
  name: string;
  id: string;
}

export function getIdsFromNames(
  names: Array<string>,
  optionalTags: Array<Tag> = []
) {
  console.log(tags, optionalTags);
  optionalTags = optionalTags.concat(tags);
  return optionalTags
    .filter((item) => names.includes(item.name))
    .map((item) => item.id);
}
