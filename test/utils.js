export function render(Component, props = {}) {
    if (document.getElementById('component')) {
        const el = document.getElementById('component');
        el.parentElement.removeChild(el);
    }
    const div = document.createElement('div');
    div.id = "component";
    document.documentElement.append(div);
    return new Component({ target: div, props });
}