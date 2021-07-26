import {GraphQLClient} from 'graphql-request';
import {getSdk} from './generated';


export const sdk =  function (url?: string) {
    const client = new GraphQLClient(url ?? '/api/');
    return getSdk(client);
};