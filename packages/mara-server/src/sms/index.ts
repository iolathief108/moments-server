import moment from "moment";
import {makeID, makePin} from "../lib/makeID";
import {addToLimitedArray} from "../utils";

//notify.lk
type OtpDoc = {
    otp_id: string;
    otps:
        | {
              otp: number;
              timeGenerated: Date;
          }[]
        | undefined;
    phone_number: string | undefined;
    fail_attempt_count: number;
};

let otpDocs: OtpDoc[] = [];
const maxLKD = 10;
const maxAttempt = 5;
const pinCode = "h238hulks8io";

export function createLKD(pin: string): string {
    if (pin !== pinCode) return "";
    const id = makeID(40);
    otpDocs.push({
        otp_id: id,
        otps: [],
        fail_attempt_count: 0,
        phone_number: null,
    });
    return id;
}

export async function sendOTP(id: string, phone: string): Promise<boolean> {
    for (let i = 0; i < otpDocs.length; i++) {
        const value = otpDocs[i];
        if (value.otp_id !== id) continue;

        // if previusly given phone number is changed then remove all otps
        if (value.phone_number && value.phone_number !== phone) {
            value.otps = [];
        }
        value.phone_number = phone;
        const generatedOTP = makePin(6);
        addToLimitedArray(
            value.otps,
            {otp: generatedOTP, timeGenerated: new Date()},
            4,
        );
        console.log(value.otps);
        return await _OTP(value.phone_number, value.otps[value.otps.length - 1].otp);
    }
    return false;
}

async function _OTP(phone: string, pin: number): Promise<boolean> {
    return true;
    // const response = await axios.get("https://app.notify.lk/api/v1/send", {
    //   params: {
    //     user_id: "13315",
    //     api_key: "ArVaKDJmERaLaUbvMrse",
    //     sender_id: "NotifyDEMO",
    //     to: "94" + phone,
    //     message: "Your OTP code for Zola Registration is " + pin,
    //   },
    // });

    // return response.status === 200 && response.data.status === "success";
}

//todo: important code is not finished yet
export function verifyOTP(id: string, phone: string, otp: number) {
    for (let i = 0; i < otpDocs.length; i++) {
        const value = otpDocs[i];
        if (
            value.otp_id === id &&
            value.phone_number === phone &&
            value.otps.find(item => item.otp === otp)
        ) {
            return true;
        }
    }
    return false;
}
