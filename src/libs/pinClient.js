import { PinpointClient } from "@aws-sdk/client-pinpoint";
const REGION = process.env.REGION;
const pinClient = new PinpointClient({ region: REGION });
export { pinClient };