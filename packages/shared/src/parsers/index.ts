
export function parseName(name: string): string {

    let d = name.split(' ');
    let res = '';
    d.forEach(v => {
        if (v !== '') {
            if (res !== '')
                res += ' ' + v;
            else res += v;
        }
    });
    return res;
}