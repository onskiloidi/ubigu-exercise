import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Paper, Typography } from "@mui/material";
export function HedgehogForm({ coordinates }) {
    console.log(coordinates);
    return (_jsxs(Paper, { elevation: 3, sx: {
            margin: "1em 0em 1em 0em",
            padding: "1em",
        }, children: [_jsx(Typography, { children: "TODO: Luo t\u00E4h\u00E4n lomake painikkeineen, jonka avulla uusia siilihavaintoja saa lis\u00E4tty\u00E4 palveluun." }), _jsx("br", {}), _jsx(Typography, { children: "Siililt\u00E4 kysytt\u00E4v\u00E4t tiedot: nimi, ik\u00E4, sukupuoli. Lis\u00E4ksi siilin havainnon yhteydess\u00E4 merkit\u00E4\u00E4n havainnon sijainti kartalla. Kartalta saadaan koordinaattipiste t\u00E4lle HedgehogForm:lle klikkaamalla karttaa (kts. consolin logit). T\u00E4m\u00E4 koordinaattipiste tulee tallentaa tietokantaan muiden tietojen oheen. PostGIS tarjoaa koordinaateille sopivan tietokantatyypin koordinaattien tallennukseen. Yll\u00E4 olevat tiedot tulee tallentaa tietokantaan sopivalla HTTP pyynn\u00F6ll\u00E4 siilien tietokantaan." })] }));
}
