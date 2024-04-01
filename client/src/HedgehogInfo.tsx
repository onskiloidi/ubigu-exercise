import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Hedgehog } from "@shared/hedgehog";

interface Props {
    selectedHedgehogId: number | null;
}

export const HedgehogInfo: React.FC<Props> = ({ selectedHedgehogId }) => {
    const [hedgehog, setHedgehogData] = useState(null);

    useEffect(() => {
        if (selectedHedgehogId !== null) {
            // Tässä voisi olla funktio, joka hakee tietyllä ID:llä varustetun siilin tiedot
            // Esimerkki:
            const fetchHedgehogData = async () => {
                try {
                    const response = await fetch('/api/v1/hedgehog/fetch_hedgehog', {
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({'id' : selectedHedgehogId})
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Epäonnistui :(');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if(data.hedgehog){
                            setHedgehogData(data.hedgehog || null);
                        }
                    })
                    .catch (error => console.error(error));
                } catch (error) {
                    console.error('Failed to fetch hedgehog data:', error);
                }
            };

            fetchHedgehogData();
        }
    }, [selectedHedgehogId]); // Riippuvuuslista, jossa on `hedgehogId`. Tämä tarkoittaa, että useEffect suoritetaan uudelleen, kun `hedgehogId` muuttuu.

    // Renderöi komponentti tässä käyttäen `hedgehogData`
    return (
        <div>
            {hedgehog
            ? ( {selectedHedgehogId} )
            :
            ('')
            }
        </div>
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
