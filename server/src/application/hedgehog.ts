import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { hedgehogSchema } from "@shared/hedgehog";
import { sql } from "slonik";

export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().any(
      sql.type(hedgehogSchema)`SELECT id, hedgehog_name, hedgehog_gender, hedgehog_cakeday, ST_AsGeoJSON(hedgehog_location) as hedgehog_lng_lat, hedgehog_coords FROM hedgehog ORDER BY id DESC;`
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
        sql.type(hedgehogSchema)`SELECT id, hedgehog_name, hedgehog_gender, hedgehog_cakeday, ST_AsGeoJSON(hedgehog_location) as hedgehog_lng_lat, hedgehog_coords FROM hedgehog WHERE id = ${id}`
      );
  
      return hedgehog;
    } catch (error) {
      logger.error(error);
    }
  }

// Yksittäisen siilin lisäämisen sovelluslogiikka
  export async function addHedgehog(hedgehog_name: string, hedgehog_gender: string, hedgehog_cakeday: string | null, hedgehog_location: string) {
    const hedgehog_point_str = hedgehog_location.replace(', ', ' ');
    // const hedgehog_point = `POINT(${hedgehog_point_str})`;
    try {
        // const hedgehog = await getPool().one(
        //     sql.type(hedgehogSchema)`INSERT INTO hedgehog(hedgehog_name, hedgehog_gender, hedgehog_cakeday, hedgehog_location, hedgehog_coords)
        //     VALUES (${hedgehog_name}, ${hedgehog_gender}, ${hedgehog_cakeday}, ST_GeogFromText(${hedgehog_point}), ${hedgehog_location}) RETURNING *;`
        // );
  
        const hedgehog = await getPool().one(
            sql.type(hedgehogSchema)`INSERT INTO hedgehog(hedgehog_name, hedgehog_gender, hedgehog_cakeday, hedgehog_coords)
            VALUES (${hedgehog_name}, ${hedgehog_gender}, ${hedgehog_cakeday}, ${hedgehog_location}) RETURNING *;`
        );

        return hedgehog;
    } catch (error) {
      logger.error(error);
    }
  }