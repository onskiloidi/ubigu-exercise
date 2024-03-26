import * as React from 'react';
import { Paper, Typography, Button, TextField, FormControl, FormLabel, RadioGroup,FormControlLabel, Radio} from '@mui/material';

interface Props {
  coordinates: number[];
}

export function HedgehogForm({ coordinates }: Props) {
    console.log(coordinates);
    const addHedgehod = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formdata = new FormData(event.target);
        // const data = {
        //     email: rawdata.get('email'),
        //     password: rawdata.get('password'),
        // };
        fetch('http://localhost:8080/add_hegdehog', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log(response);
            // console.log("response ok: " + response.ok);
            // console.log("response status: " + response.status);
            // console.log("response json: " + response.json());
            // if(response.ok) {
            //     console.log('Form data sent successfully');
            //     return response.json();
            // } else {
            //     console.error('Failed to send form data');
            // }
        }).catch (error => console.error(error))
    };

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4">Lisää uusi siili</Typography>
        <form onSubmit={addHedgehod}>
            <div>
                <TextField label="Siilin nimi" variant="outlined" margin="normal" fullWidth />
            </div>
            <div>
            <FormControl>
                <FormLabel id="siiliGender">Siilin sukupuoli</FormLabel>
                <RadioGroup aria-labelledby="siiliGender" defaultValue="male" name="radio-buttons-group">
                    <FormControlLabel value="male" control={<Radio />} label="Uros" />
                    <FormControlLabel value="female" control={<Radio />} label="Naaras" />
                </RadioGroup>
            </FormControl>
            </div>
            <div>
                <TextField label="Siilin syntymäaika" variant="outlined" margin="normal" fullWidth />
            </div>
            <Button type="submit">Tallenna siili</Button>
        </form>
        </Paper>
    );
}
