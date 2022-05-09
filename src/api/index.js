import TwilioClient from "./twilio";
import MyClient from "./custom";

let clientApi;
const clientType = process.env.REACT_APP_CLIENT_API;
if (clientType === "twilio") {
    clientApi = new TwilioClient();
} else if (clientType === "custom") {
    clientApi = new MyClient();
} else {
    throw new Error("Please supply environment variable 'REACT_APP_CLIENT_API'");
}

console.log(`Initialized ${clientType} API client`);
export default clientApi;
