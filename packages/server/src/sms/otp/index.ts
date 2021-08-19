import { makePin } from "../../lib/makeID";
import { addToLimitedArray, getTimeDiffFromNow, IS_DEV } from "../../utils";
import { OtpDoc, sendOtp } from './utils';

let otpDocs: OtpDoc[] = [];
let cleanPending = false;
const maxAttempt = 15;
const otpMaxMin = 10;
const otpDocClearingTimeMin = 30;

function _getOtpDoc(phone: string) {
    for (const value of otpDocs) {
        if (value.phone === phone) {
            return value;
        }
    }
    let doc: OtpDoc = {
        otps: [],
        failCount: 0,
        phone: phone,
    };
    otpDocs.push(doc);
    return doc;
}

function _clean() {

    const theClean = () => {
        let removeIndexes = [];
        for (let i = 0; i < otpDocs.length; i++) {
            const doc = otpDocs[i];
            for (const otp of doc.otps) {

                let docClearedCount = 0;
                if (getTimeDiffFromNow(otp.timeGenerated, 'minute') > otpDocClearingTimeMin) {
                    docClearedCount++;
                }

                if (docClearedCount > 3) {
                    removeIndexes.push(i);
                }
            }
        }
        removeIndexes.forEach(v => {
            otpDocs.splice(v, 1);
        });
        cleanPending = false;
    };

    if (!cleanPending) {
        cleanPending = true;
        setTimeout(theClean, 1000 * 60 * 60);
    }
}

/**
 * @param phone should be in standard format
 */
export async function sendOTP(phone: string): Promise<boolean> {
    _clean();
    let value = _getOtpDoc(phone);

    const generatedOTP = makePin(6);
    addToLimitedArray(
        value.otps,
        { otp: generatedOTP, timeGenerated: new Date() },
        4,
    );
    return await sendOtp(value.phone, value.otps[value.otps.length - 1].otp);
}


// should check the time
export function verifyOTP(phone: string, otp: number) {
    if (IS_DEV) {
        if (phone.endsWith('33')) {
            return false;
        }
        return true;
    }

    for (let i = 0; i < otpDocs.length; i++) {
        const value = otpDocs[i];
        if (value.phone === phone) {
            const success = !!value.otps.find(item => item.otp === otp && getTimeDiffFromNow(item.timeGenerated, 'minute') <= otpMaxMin);
            if (!success) {
                value.failCount++;
            }
            if (success && value.failCount < maxAttempt) {
                otpDocs.splice(i, 1);
                return true;
            }
            return false;
        }
    }
    return false;
}
