

export function striptags (value, truncate) {
  if (truncate) {
    value = [].concat(value.split(' ').slice(0, 15), '...').join(' ')
  }
  return value.replace(/<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g, '')
}