import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Hedgehog } from "@shared/hedgehog";

interface Props {
    hedgehogId: number | null;
}

export function HedgehogInfo({ hedgehogId }: Props) {
    const [hedgehog, setHedgehog] = useState<Hedgehog | null>(null);
    console.log(hedgehogId);
    useEffect(() => {
        if (hedgehogId != null) {
            const fetchHedgehogData = async () => {
                try {
                    const response = await fetch('/api/v1/hedgehog/fetch_hedgehog', {
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({'id' : hedgehogId})
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Epäonnistui :(');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        if(data.hedgehog){
                            setHedgehog(data.hedgehog || null);
                        }
                    });
                } catch (error) {
                    console.error('Failed to fetch hedgehog data:', error);
                }
            };

            fetchHedgehogData();
        }
    }, [hedgehog]);

    return (
            <Typography sx={{ padding: "1em" }}>{hedgehog?.id}</Typography>
    );
};

// export function HedgehogInfo({ hedgehog_id }: Props) {
//     console.log(hedgehog_id);
//     const [hedgehog, setHedgehog] = useState<Hedgehog[]>([]);
//     fetch('/api/v1/hedgehog/fetch_hedgehog', {
//         method: 'POST',
//         headers: {'Content-Type' : 'application/json'},
//         body: JSON.stringify({'id' : hedgehog_id})
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Epäonnistui :(');
//         }
//         return response.json();
//     })
//     .then(data => {
//         if(data.hedgehog){
//             setHedgehog(data.hedgehog || null);
//         }
//     })
//     .catch (error => console.error(error));

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         margin: "1em 0em 1em 0em",
//         padding: "1em",
//       }}
//     >
//       <Typography>
//         TODO: Esitä tässä komponentissa haluamallasi tavalla yksittäisen, tällä
//         hetkellä valittuna olevan, siilin tiedot. Siili valitaan
//         vasemmanpuoleisesta listauksesta. Kartalla esitetään valitun siilin
//         sijainti karttamerkin avulla.
//       </Typography>
//       <br />
//       <Typography>
//         Komponentille välitetään React propertynä yksittäisen siilin ID, jonka
//         muuttuessa ko. siilin tiedot haetaan rajapinnalta.
//       </Typography>
//       <br />
//     </Paper>
//   );
// }
