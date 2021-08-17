import sendMessage from "../send-sms";

export async function sendOtp(phone: string, pin: number): Promise<boolean> {
    const response = sendMessage(phone, "Your OTP code for Moments Registration is " + pin)
    return response
}

export type OtpDoc = {
    otps: {
        otp: number;
        timeGenerated: Date;
    }[];
    phone: string | undefined;
    failCount: number;
};

