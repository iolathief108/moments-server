import {GraphQLClient} from 'graphql-request';
import {getSdkWithHooks} from './generated';
import {isServer} from '../utils/pageUtils';

export const client = new GraphQLClient(isServer() ? 'http://localhost/api/' : '/api/');
const sdk = getSdkWithHooks(client);
export default sdk;