import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { HedgehogForm } from "./HedgehogForm";
import { HedgehogInfo } from "./HedgehogInfo";
import HedgeHogList from "./HedgehogList";
import { Map } from "./Map";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
export function App() {
    // Latest coordinates from the Map click event
    const [coordinates, setCoordinates] = useState();
    // ID of the currently selected hedgehog
    const [selectedHedgehogId, setSelectedHedgehogId] = useState(null);
    return (_jsxs(Box, { sx: {
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "space-between",
        }, children: [_jsx(Box, { sx: {
                    backgroundColor: "#00B2A0",
                    height: "40px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }, children: _jsx(Typography, { sx: { color: "white" }, variant: "overline", children: "Siilit kartalla" }) }), _jsxs(Box, { sx: {
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    gridAutoColumns: "1fr 1.5fr 2fr",
                    gridAutoFlow: "column",
                    overflow: "hidden",
                }, children: [_jsx(HedgeHogList, {}), _jsxs(Box, { children: [_jsx(HedgehogInfo, { hedgehogId: selectedHedgehogId }), _jsx(HedgehogForm, { coordinates: coordinates || [] })] }), _jsx(Paper, { elevation: 3, sx: { margin: "1em" }, children: _jsx(Map, { onMapClick: (coordinates) => setCoordinates(coordinates), 
                            // Esimerkki siitä, miten kartalle voidaan välittää siilien koordinaatteja GeoJSON -arrayssä
                            features: [
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
                            ] }) })] }), _jsxs(Box, { sx: {
                    backgroundColor: "#00B2A0",
                    height: "40px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }, children: [" ", _jsx(Typography, { sx: { color: "white" }, variant: "overline", children: "Powered by Ubigu Oy" })] })] }));
}
