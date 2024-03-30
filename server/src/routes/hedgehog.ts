import { getAllHedgehogs, addHedgehog } from "@server/application/hedgehog";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

interface HedgehogRequest {
    name: string;
    gender: string;
    cakeday: string;
}

export function hedgehogRouter(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) {
    fastify.get('/', async function (_request, reply) {
        const hedgehogs = await getAllHedgehogs();
        return reply.code(200).send({
            hedgehogs,
        });
    });

    // Yksittäisen siilin lisäämisen sovelluslogiikka
    // fastify.get('/add_hedgehog', async function (_request, reply) {
    //     if (_request.query) {
    //         const { name, gender, cakeday } = _request.query;
    //         const hedgehog = await addHedgehog(name, gender, cakeday);
    //         return reply.code(200).send({
    //             hedgehog,
    //         });
    //     }
    // });

    fastify.post<{ Body: HedgehogRequest }>('/add_hedgehog', async (_request, reply) => {
        const { name, gender, cakeday } = _request.body;
        const hedgehog = await addHedgehog(name, gender, cakeday);
        return reply.code(201).send({ hedgehog });
    });

    //   // Yksittäisen siilin hakeminen tietokannasta ID:llä
    //   fastify.get('/get_hedgehog', async function (_request, reply) {
    //     const hedgehog = await getHedgehogByID(hedgehog_id);
    //     return reply.code(200).send({
    //         hedgehog,
    //     });
    //   });

  done();
}
