export function getToken() {
  return document.querySelector('[name="csrftoken"]').getAttribute("content")
}