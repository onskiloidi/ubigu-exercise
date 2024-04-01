import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { hedgehogSchema } from "@shared/hedgehog";
import { sql } from "slonik";

export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().any(
      sql.type(hedgehogSchema)`SELECT * FROM hedgehog`
    );

    return hedgehogs;
  } catch (error) {
    logger.error(error);
  }
}

// Yksittäisen siilin hakeminen tietokannasta ID:llä
export async function getHedgehogByID(id: number) {
    try {
      const hedgehog = await getPool().one(
        sql.type(hedgehogSchema)`SELECT * FROM hedgehog WHERE id = ${id}`
      );
  
      return hedgehog;
    } catch (error) {
      logger.error(error);
    }
  }

// Yksittäisen siilin lisäämisen sovelluslogiikka
  export async function addHedgehog(hedgehog_name: string, hedgehog_gender: string, hedgehog_cakeday: string | null) {
    try {
      const hedgehog = await getPool().one(
        sql.type(hedgehogSchema)`INSERT INTO hedgehog(hedgehog_name, hedgehog_gender) VALUES (${hedgehog_name},${hedgehog_gender}) RETURNING *;`
      );
  
      return hedgehog;
    } catch (error) {
      logger.error(error);
    }
  }