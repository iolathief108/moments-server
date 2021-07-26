import axios from "axios";

/**
 * 
 * @param phone phone number - should be in standard format
 * @param sms sms to be send
 * @returns status of success
 */
export default async function (phone: string, sms: string): Promise<boolean> {
    console.log(sms)
    return true;
    // todo: important uncom
    // const response = await axios.get("https://app.notify.lk/api/v1/send", {
    //   params: {
    //     user_id: "13315",
    //     api_key: "ArVaKDJmERaLaUbvMrse",
    //     sender_id: "NotifyDEMO",
    //     to: phone.slice(1),
    //     message: message
    //   },
    // });

    // return response.status === 200 && response.data.status === "success";
}
