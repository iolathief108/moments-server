import {GraphQLClient} from "graphql-request";
import {getSdkWithHooks} from "./generated";

export const client = new GraphQLClient('https://www.zola.lk/api/', {
    // @ts-ignore
    agent: new (require('https').Agent)({
        rejectUnauthorized: false
    })
})
const sdk = getSdkWithHooks(client)
export default sdk;