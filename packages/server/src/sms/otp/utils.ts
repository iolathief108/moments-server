import sendMessage from '../send-sms';


export async function sendOtp(phone: string, pin: string): Promise<boolean> {
    return sendMessage(phone, "Your OTP code for Moments Registration is " + pin)
}

export type OtpDoc = {
    OTPs: {
        otp: string;
        timeGenerated: Date;
    }[];
    phone: string | undefined;
    failCount: number;
};

