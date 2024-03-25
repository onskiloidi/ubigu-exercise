import { getAllHedgehogs } from "@server/application/hedgehog";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export function hedgehogRouter(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.get("/", async function (_request, reply) {
    const hedgehogs = await getAllHedgehogs();

    return reply.code(200).send({
      hedgehogs,
    });
  });

  // TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä
  // fastify.get(...);

  // TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
  // fastify.post(...)

  done();
}
