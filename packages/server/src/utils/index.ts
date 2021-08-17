import moment from 'moment';

export function addToLimitedArray<T>(el: T[], item: T, limit: number) {
    if (el.length >= limit) {
        el.splice(0, el.length - limit + 1);
    }
    el.push(item);
}

// envs
export const IS_DEV = process.env.NODE_ENV === 'development';

export function getTimeDiffFromNow(time: Date, format: 'minute'): number {
    let now = moment(new Date()); //todays date
    let end = moment(time); // another date
    let duration = moment.duration(now.diff(end));
    let diff: number;
    if (!format || format === 'minute') {
        diff = Math.round(duration.asMinutes());
    } else {
        diff = Math.round(duration.asMinutes());
    }
    return diff;
}
