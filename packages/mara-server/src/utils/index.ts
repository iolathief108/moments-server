export function addToLimitedArray<T>(el: T[], item: T, limit: number) {
    if (el.length >= limit) {
        el.splice(0, el.length - limit + 1);
    }
    el.push(item)
}
