import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { hedgehogSchema } from "@shared/hedgehog";
import { sql } from "slonik";

export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().any(
      sql.type(hedgehogSchema)`SELECT id FROM hedgehog`
    );

    return hedgehogs;
  } catch (error) {
    logger.error(error);
  }
}

// Yksittäisen siilin hakeminen tietokannasta ID:llä
export async function getHedgehogByID(hedgehog_id) {
    try {
      const hedgehog = await getPool().one(
        sql.type(hedgehogSchema)`SELECT * FROM hedgehog WHERE id = ${hedgehog_id}`
      );
  
      return hedgehog;
    } catch (error) {
      logger.error(error);
    }
  }

  // Yksittäisen siilin lisäämisen sovelluslogiikka
  export async function addHedgeHog() {
    try {
      const hedgehog = await getPool().one(
        sql.type(hedgehogSchema)`INSERT INTO table1(hedgehog_name, hedgehog_gender, hedgehog_cakeday) VALUES (value1, value2, …) RETURNING *;`
      );
  
      return hedgehog;
    } catch (error) {
      logger.error(error);
    }
  }