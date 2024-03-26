import { getAllHedgehogs, getHedgehogByID, addHedgeHog } from "@server/application/hedgehog";

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

  // Yksittäisen siilin hakeminen tietokannasta ID:llä
  fastify.get('/get_hedgehog', async function (_request, reply) {
    const hedgehog = await getHedgehogByID(hedgehog_id);
    return reply.code(200).send({
        hedgehog,
    });
  });

  // Yksittäisen siilin lisäämisen sovelluslogiikka
  fastify.post('/add_hegdehog', async function (_request, reply) {
    const hedgehog = await addHedgeHog();
    return reply.code(200).send({
        hedgehog,
    });
  });

  done();
}
