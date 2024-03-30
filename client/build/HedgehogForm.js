import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Paper, Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
export function HedgehogForm({ coordinates }) {
    console.log(coordinates);
    const addHedgehod = (event) => {
        event.preventDefault();
        console.log(event.currentTarget);
        let thisForm = event.currentTarget;
        const formdata = new FormData();
        ;
        fetch('/api/v1/add_hegdehog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
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
        }).catch(error => console.error(error));
    };
    return (_jsxs(Paper, { elevation: 3, style: { padding: '20px' }, children: [_jsx(Typography, { variant: "h4", children: "Lis\u00E4\u00E4 uusi siili" }), _jsxs("form", { onSubmit: addHedgehod, children: [_jsx("div", { children: _jsx(TextField, { label: "Siilin nimi", variant: "outlined", margin: "normal", fullWidth: true }) }), _jsx("div", { children: _jsxs(FormControl, { children: [_jsx(FormLabel, { id: "siiliGender", children: "Siilin sukupuoli" }), _jsxs(RadioGroup, { "aria-labelledby": "siiliGender", defaultValue: "male", name: "radio-buttons-group", children: [_jsx(FormControlLabel, { value: "male", control: _jsx(Radio, {}), label: "Uros" }), _jsx(FormControlLabel, { value: "female", control: _jsx(Radio, {}), label: "Naaras" })] })] }) }), _jsx("div", { children: _jsx(TextField, { label: "Siilin syntym\u00E4aika", variant: "outlined", margin: "normal", fullWidth: true }) }), _jsx(Button, { type: "submit", children: "Tallenna siili" })] })] }));
}
