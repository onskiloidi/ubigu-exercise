import { getAllHedgehogs, addHedgehog } from "@server/application/hedgehog";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

interface HedgehogRequest {
    hedgehog_name: string;
    hedgehog_gender: string;
    hedgehog_cakeday: string;
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

    fastify.post<{ Body: HedgehogRequest }>('/add_hedgehog', async (_request, reply) => {
        let { hedgehog_name, hedgehog_gender, hedgehog_cakeday } = _request.body;
        // let status = {hedgehog_name, hedgehog_gender, hedgehog_cakeday};
        // return reply.send({ status });
        if(hedgehog_name.trim() == ''){
            return reply.send({ 'status' : 0, 'message' : 'Siilin nimi on pakollinen tieto' });
        }
        const hedgehog = await addHedgehog(hedgehog_name, hedgehog_gender, hedgehog_cakeday);
        return reply.code(201).send({ 'status' : 1, 'message' : 'Uusi siili tallennettu!', 'hedgehog' : hedgehog });
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
