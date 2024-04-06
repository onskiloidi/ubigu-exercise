import { Paper, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { GeoJSON } from "ol/format";
import { Hedgehog } from "@shared/hedgehog";

interface Props {
    hedgehogId: number | null;
    features: GeoJSON.Feature[]
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

export function HedgehogInfo({ hedgehogId, features }: Props) {
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
                } catch (error) {
                    console.error(error);
                }
            };

            fetchHedgehogData();
        }
    }, [hedgehogId]);

    if(hedgehog){
        features=[
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [2859167.020281517, 9632038.56757201],
                },
                properties: {
                  name: "Siili Silvennoinen",
                  age: 50,
                  gender: "male",
                },
              },
            ];

        return (
            <Paper elevation={3} style={{ padding: '20px', margin: '20px 0px' }}>
                <Typography>Valitun siilin tiedot</Typography>
                <Typography>Siilin nimi: {hedgehog.hedgehog_name}</Typography>
                <Typography>Siilin sukupuoli:  {(hedgehog.hedgehog_gender == 'M' ? 'Uros' : 'Naaras')}</Typography>
                <Typography>Siilin syntymäpäivä:  {hedgehog.hedgehog_cakeday != null ? formatCakeDay(hedgehog.hedgehog_cakeday)+'('+calculateAge(hedgehog.hedgehog_cakeday)+')' : '-'}</Typography>
            </Paper>
        );
    }
    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px 0px' }}>
            <Typography>
                Ei tarkasteluun valittua siiliä
            </Typography>
        </Paper>
        );
};
