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
                    await fetch('/api/v1/hedgehog/fetch_hedgehog', {
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({'id' : hedgehogId})
                    })
                    .then(response => {
                        console.log(response);
                        if (!response.ok) {
                            throw new Error('Epäonnistui :(');
                        }
                        return response.json();
                    })
                    .then(hedgehog_data => {
                        console.log(hedgehog_data);
                        setHedgehog(hedgehog);
                    })
                    .catch (error => console.error(error));
                
            };

            fetchHedgehogData();
        }
    }, []);

    if(hedgehog != null){
        return (
            <Paper>
                <Box>
                    <Typography>
                        {hedgehog.hedgehog_name}
                    </Typography>
                </Box>
            </Paper>

        );
    }
    return (
        <Paper>
                <Box>
                    <Typography>
                        Ei valittua siiliä
                    </Typography>
                </Box>
            </Paper>
        );
};
