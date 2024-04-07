import { Paper, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { GeoJSON } from "ol/format";
import { Hedgehog } from "@shared/hedgehog";
import { fromLonLat } from 'ol/proj';

interface Props {
    hedgehogId: number | null;
    // features: GeoJSON.Feature[];
    setFeatures: useState<GeoJSON.Feature | null>;
}

function formatCakeDay(cakeday: string): string {
    const [year, month, day] = cakeday.split("-");
    return `${day}.${month}.${year}`;
}

function calculateAge(cakeday: string) {
    const birthdate = new Date(cakeday);
    const today = new Date();
  
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
  
    if (today.getDate() < birthdate.getDate()) {
        months--;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return `${(years < 0 ? 0 : years)} vuotta, ${months} kuukautta`;
  }

export function HedgehogInfo({ hedgehogId, setFeatures }: Props) {
    const [hedgehog, setHedgehog] = useState<Hedgehog>(null);
    useEffect(() => {
        if (hedgehogId != null) {
            const fetchHedgehogData = async () => {
                try {
                    const response = await fetch('/api/v1/hedgehog/fetch_hedgehog', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 'id': hedgehogId })
                    });

                    if (!response.ok) {
                        throw new Error('Epäonnistui :(');
                    }

                    const json = await response.json();
                    setHedgehog(json?.hedgehog || null);
                    console.log(json);
                    if(json?.hedgehog.hedgehog_lng_lat){
                        let coords = JSON.parse(json.hedgehog.hedgehog_lng_lat);
                        console.log( coords.coordinates);
                        // const [lat, lng] = coords.coordinates;
                        const [lng, lat] = fromLonLat(coords.coordinates);
                        console.log(lng, lat);
                        setFeatures([
                            {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [lng, lat],
                                },
                                properties: {
                                    name: json.hedgehog.hedgehog_name,
                                    age: 50,
                                    gender: json.hedgehog.hedgehog_gender === 'M' ? 'male' : 'female',
                                },
                            },
                        ]);

                        // setFeatures([
                        //     {
                        //       type: "Feature",
                        //       geometry: {
                        //         type: "Point",
                        //         coordinates: [2859167.020281517, 9632038.56757201],
                        //       },
                        //       properties: {
                        //         name: "Siili Silvennoinen",
                        //         age: 50,
                        //         gender: "male",
                        //       },
                        //     },
                        //   ]);
                        
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchHedgehogData();
        }
    }, [hedgehogId]);

    return (
       <Paper elevation={3} style={{ padding: '20px', margin: '20px 0px' }}>
            <Typography>Valitun siilin tiedot</Typography>
            <Typography>Siilin nimi: {hedgehog?.hedgehog_name}</Typography>
            <Typography>Siilin sukupuoli:  {(hedgehog?.hedgehog_gender == 'M' ? 'Uros' : 'Naaras')}</Typography>
            <Typography>Siilin syntymäpäivä:  {hedgehog?.hedgehog_cakeday != null ? formatCakeDay(hedgehog?.hedgehog_cakeday)+'('+calculateAge(hedgehog?.hedgehog_cakeday)+')' : '-'}</Typography>
        </Paper>
    );
   
};
