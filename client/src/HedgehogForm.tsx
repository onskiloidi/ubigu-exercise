import { useEffect, useState } from "react";
import { Paper, Typography, Button, TextField, FormControl, FormLabel, RadioGroup,FormControlLabel, Radio} from '@mui/material';

interface Props {
  coordinates: number[];
}

export function HedgehogForm({ coordinates }: Props) {
    // console.log(coordinates)
    const addHedgehod = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const formDataObject = {};
        formdata.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log(JSON.stringify(formDataObject));
        fetch('/api/v1/hedgehog/add_hedgehog', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
            body: JSON.stringify(formDataObject)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Verkkopyyntö epäonnistui');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Tässä on vastauksen data, jonka Fastify-palvelin lähetti
            console.dir(data); 
            console.log('Vastaanotettu data:', JSON.stringify(data, null, 2));
        })
        .catch (error => console.error(error));
        
    };

    // const addHedgehod = async (e) => {
    //     e.preventDefault();
    //     const formdata = new FormData(e.currentTarget);
    
    //     // Muodosta kyselyparametrit suoraan FormData-oliosta
    //     const queryParams = new URLSearchParams();
    //     for (const [key, value] of formdata) {
    //         queryParams.append(key, value);
    //     }
    
    //     fetch(`/add_hedgehog?${queryParams.toString()}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(response => {
    //         console.log(response);
    //     }).catch (error => console.error(error));
    // };

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4">Lisää uusi siili</Typography>
        <form onSubmit={addHedgehod}>
            <div>
                <TextField label="Siilin nimi" variant="outlined" margin="normal" fullWidth name="hedgehog_name" />
            </div>
            <div>
            <FormControl>
                <FormLabel id="siiliGender">Siilin sukupuoli</FormLabel>
                <RadioGroup aria-labelledby="siiliGender" defaultValue="male" name="hedgehog_gender">
                    <FormControlLabel value="M" control={<Radio />} label="Uros" />
                    <FormControlLabel value="F" control={<Radio />} label="Naaras" />
                </RadioGroup>
            </FormControl>
            </div>
            <div>
                <TextField label="Siilin syntymäaika" variant="outlined" margin="normal" fullWidth name="hedgehog_cakeday" />
            </div>
            <Button type="submit">Tallenna siili</Button>
        </form>
        </Paper>
    );
}
