import { useEffect, useState } from "react";
import { Paper, Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import HedgeHogList from './HedgehogList';

interface Props {
  coordinates: number[];
}

export function HedgehogForm({ coordinates }: Props) {
    console.log(coordinates)
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
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formDataObject)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Verkkopyyntö epäonnistui');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            if(data.hedgehog){
                // HedgeHogList();
            }
        })
        .catch (error => console.error(error));
    };

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
                <RadioGroup aria-labelledby="siiliGender" defaultValue="M" name="hedgehog_gender">
                    <FormControlLabel value="M" control={<Radio />} label="Uros"/>
                    <FormControlLabel value="F" control={<Radio />} label="Naaras" />
                </RadioGroup>
            </FormControl>
            </div>
            <div>
            <FormControl fullWidth>
                <FormLabel id="siiliGender">Siilin syntymäpäivä</FormLabel>
                <input type="date" name="hedgehog_cakeday"
                style={{height: "1.4375em", width: "96%", borderWidth: "2px", borderRadius: "4px", borderStyle: "inset", padding: "16.5px 14px", borderColor: "light-dark(rgb(118, 118, 118), rgb(133, 133, 133))"}}/>
            </FormControl>
            </div>
            <div>
                <TextField label="Siilin koordinaatit" variant="outlined" margin="normal" fullWidth name="hedgehog_lng_lat" value={coordinates.join(' ')} readOnly helperText="Klikkaa karttaa valitaksesi siilin sijannin"/>
            </div>
            <Button type="submit" sx={{ marginTop: "1em"}} color="primary">Tallenna siili</Button>
        </form>
        </Paper>
    );
}
