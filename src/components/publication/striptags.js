export function striptags(value, truncate) {
  if (truncate) {
    const words = value.split(" ");
    if (words.length >= 15) {
      value = [].concat(words.slice(0, 15), "...").join(" ");
    }
  }
  return value.replace(
    /<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g,
    ""
  );
}
