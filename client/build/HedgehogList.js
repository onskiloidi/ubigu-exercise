import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Box, MenuItem, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
export default function HedgeHogList() {
    const [hedgehogs, setHedgehogs] = useState([]);
    // Fetch all hedgehog's during startup
    useEffect(() => {
        const getAllHedgehogs = async () => {
            try {
                const res = await fetch("/api/v1/hedgehog");
                if (!res.ok)
                    return;
                const json = await res.json();
                setHedgehogs(json?.hedgehogs || []);
            }
            catch (err) {
                console.error(`Error while fetching hedgehogs: ${err}`);
            }
        };
        getAllHedgehogs();
    }, []);
    return (_jsxs(Paper, { elevation: 3, sx: { margin: "1em", overflow: "hidden" }, children: [_jsx(Box, { sx: {
                    backgroundColor: "#a1e6df",
                    height: "3em",
                    display: "flex",
                    zIndex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                }, children: _jsx(Typography, { sx: { color: "darkslategrey" }, children: "Rekister\u00F6idyt siilit" }) }), hedgehogs.length ? (_jsx(Box, { sx: { overflowY: "scroll", height: "100%" }, children: hedgehogs.map((hedgehog, index) => (_jsx(MenuItem, { children: hedgehog.id }, `hedgehog-index-${index}`))) })) : (_jsx(Typography, { sx: { padding: "1em" }, children: "TODO: Mik\u00E4li tietokannasta l\u00F6ytyy siilej\u00E4, ne listautuvat t\u00E4h\u00E4n. Koodaa logiikka, jolla t\u00E4m\u00E4n listauksen siili\u00E4 klikkaamalla siili tulee valituksi, jonka j\u00E4lkeen sen tiedot tulee hakea viereiseen komponenttiin." }))] }));
}
