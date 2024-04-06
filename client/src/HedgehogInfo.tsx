import { Paper, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Hedgehog } from "@shared/hedgehog";

interface Props {
    hedgehogId: number | null;
}

export function HedgehogInfo({ hedgehogId }: Props) {
    const [hedgehog, setHedgehog] = useState<Hedgehog>(null);
    console.log(hedgehogId);
    useEffect(() => {
        if (hedgehogId != null) {
            console.log(hedgehogId);
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
        console.log(hedgehog);
        return (
            <Paper elevation={3} style={{ padding: '20px', margin: '20px 0px' }}>
                <Typography>
                    <div>Siilin nimi: {hedgehog.hedgehog_name}</div>
                    <div>Siilin sukupuoli:  {(hedgehog.hedgehog_gender == 'M' ? 'Uros' : 'Naaras')}</div>

                </Typography>
                
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
