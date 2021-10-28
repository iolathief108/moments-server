
export function parser(str) {
    let name, x, y, q, j;

    str = str.split('_');
    if (str.length !== 2) {
        if (str[0].endsWith('.jpg'))
            j = true;
        else if (str[0].endsWith('.webp'))
            j = false;
        else return false;

        str = str[0].slice(0, j ? -4 : -5);
        if (str.length < 19)
            return [str, null, null, null, j];
    }


    name = str[0];
    if (!name) return false;

    if (str[1].endsWith('.jpg'))
        j = true;
    else if (str[1].endsWith('.webp'))
        j = false;
    else
        return false;

    str = str[1].slice(0, j ? -4 : -5).split('q');
    if (str.length === 1 && !str[0]) return false;

    if (str.length === 1) { //40x40 or 500
        str = str[0].split('x');
        x = Number(str[0]);
        y = Number(str[1] ?? str[0]);
        return [name, x, y, null, j];
    } else if (str.length === 2) { //40x40q30 or q20 or 400q30
        if (str[0] === '') { // q20
            q = Number(str[1]);
            if (typeof q !== 'number' || !q) return false;
            return [name, null, null, q, j];
        } else { // 50x50q30 or 500q20
            q = Number(str[1]);
            if (typeof q !== 'number' || !q) return false;

            str = str[0].split('x'); // [300, 200] [200]
            x = Number(str[0]);
            y = Number(str[1] ?? str[0]);
            if (x === 0 || y === 0 || isNaN(x) || isNaN(y)) return false;
            return [name, x, y, q, j];
        }
    } else return false;

}

;