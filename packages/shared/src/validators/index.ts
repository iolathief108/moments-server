
export function isNumeric(str: string) {
    if (typeof str != "string") return false;
    return !isNaN(str as any) && !isNaN(parseFloat(str));
}

function isCorrectVendor(v: string) {
    if (
        v === '77' ||
        v === '76' ||
        v === '75' ||
        v === '71' ||
        v === '72' ||
        v === '78' ||
        v === '11'
    ) {
        return true;
    }

    return false;
}


export const validateStandardSLPhone = (phone: string): boolean => {


    if (!phone.startsWith('+94')) return false;

    phone = phone.slice(3);

    if (!isNumeric(phone)) return false;

    if (phone.includes('.')) return false;

    if (phone.length !== 9) return false;

    if (Number(phone) < 0) return false;

    if (!isCorrectVendor(phone.slice(0, 2))) return false;

    return true;
};



export const parseSLPhone = (phone: string) => {

    // remove spaces
    phone = phone.replace(/ /g, '');
    // remove -
    phone = phone.replace(/-/g, '');
    // remove 0 or +94 or 94
    phone = phone.startsWith('0') ? phone.slice(1) :
        phone.startsWith('+94') ? phone.slice(3) :
            phone.startsWith('94') ? phone.slice(2) : phone;

    if (phone.length !== 9) return false;

    if (!isCorrectVendor(phone.slice(0, 2))) return false;

    if (!isNumeric(phone)) return false;

    return '+94' + phone;
};

export const isValidBusinessAddress = (address: string) => {
    if (address.length < 6) {
        return false
    }
    return true;
}

export const isValidPassword = (password: string) => {
    const passwordPattern = /^[A-Za-z\.\)\(\*\&\^\%\$\#\@\!\[\]\{\}\-\_\=\+\?<>0-9~]{8,14}$/;

    // check valid
    const res = password.match(passwordPattern)
    if (!res) return false

    return true;
}