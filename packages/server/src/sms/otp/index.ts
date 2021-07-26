import { makePin } from "../../lib/makeID";
import { addToLimitedArray } from "../../utils";
import { OtpDoc, sendOtp } from './utils';

let otpDocs: OtpDoc[] = [];
const maxLKD = 10;
const maxAttempt = 5;
const otpMaxMin = 10;

function _getOtpDoc(phone: string) {
    for (const value of otpDocs) {
        if (value.phone_number === phone) {
            return value;
        }
    }
    let d: OtpDoc = {
        otps: [],
        fail_attempt_count: 0,
        phone_number: phone,
    };
    otpDocs.push(d);
    return d;
}

/**
 * @param phone should be in standard format 
 */
export async function sendOTP(phone: string): Promise<boolean> {

    let value = _getOtpDoc(phone);

    const generatedOTP = makePin(6);
    addToLimitedArray(
        value.otps,
        { otp: generatedOTP, timeGenerated: new Date() },
        4,
    );
    return await sendOtp(value.phone_number, value.otps[value.otps.length - 1].otp);
}


// todo: important code is not finished yet
// should check the time
export function verifyOTP(phone: string, otp: number) {
    //todo: important delete line
    return true;

    for (let i = 0; i < otpDocs.length; i++) {
        const value = otpDocs[i];
        if (
            value.phone_number === phone &&
            value.otps.find(item => item.otp === otp)
        ) {
            return true;
        }
    }
    return false;
}
