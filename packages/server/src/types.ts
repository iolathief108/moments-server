import "fastify-session";
import { FastifyRequest, FastifyReply } from "fastify";

/** node_modules\fastify-session\types\types.d.ts:15
 * remove `extends Record<string, any>` to get proper typing
 */
declare module "fastify" {
  interface Session {
    vendorID: string | null | undefined;
  }
}

export type GQLContext = {
  request: FastifyRequest,
  reply: FastifyReply
}
