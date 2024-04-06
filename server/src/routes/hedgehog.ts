import { getAllHedgehogs, addHedgehog, getHedgehogByID } from "@server/application/hedgehog";

import { FastifyInstance, FastifyPluginOptions } from "fastify";

interface HedgehogRequest {
    hedgehog_name: string;
    hedgehog_gender: string;
    hedgehog_cakeday: string;
    hedgehog_lng_lat: string;
}

interface HedgehogIDRequest {
    id: number;
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
        let { hedgehog_name, hedgehog_gender, hedgehog_cakeday, hedgehog_lng_lat } = _request.body;
        // let status = {hedgehog_name, hedgehog_gender, hedgehog_cakeday, hedgehog_lng_lat};
        // return reply.send({ status });
        if(hedgehog_name.trim() == ''){
            return reply.send({ 'status' : 0, 'message' : 'Siilin nimi on pakollinen tieto' });
        }
        if(hedgehog_lng_lat.trim() == ''){
            return reply.send({ 'status' : 0, 'message' : 'Siilin sijainti on pakollinen tieto' });
        }
        const hedgehog = await addHedgehog(hedgehog_name, hedgehog_gender, hedgehog_cakeday, hedgehog_lng_lat);
        // if(hedgehog.id){
            return reply.code(201).send({ 'status' : 1, 'message' : 'Uusi siili tallennettu!', 'hedgehog' : hedgehog });
        // }else{
        //     return reply.code(200).send({ 'status' : 0, 'message' : 'Siiliä ei voitu tallentaa', 'hedgehog' : null });
        // }
    });

    // Yksittäisen siilin hakeminen tietokannasta ID:llä
    fastify.post<{ Body: HedgehogIDRequest }>('/fetch_hedgehog', async function (_request, reply) {
        const { id } = _request.body;
        const hedgehog = await getHedgehogByID(id);
        return reply.code(200).send({
            hedgehog,
        });
    });

  done();
}
