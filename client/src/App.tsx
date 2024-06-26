import { HedgehogForm } from "./HedgehogForm";
import { HedgehogInfo } from "./HedgehogInfo";
import HedgeHogList from "./HedgehogList";
import { Map } from "./Map";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";

import { GeoJSON } from "ol/format";
import { Hedgehog } from "@shared/hedgehog";

export function App() {
  // Latest coordinates from the Map click event
  const [coordinates, setCoordinates] = useState<number[]>();
  // ID of the currently selected hedgehog
  const [selectedHedgehogId, setSelectedHedgehogId] = useState<number | null>(null);
  const [hedgehogs, setHedgehogs] = useState<Hedgehog[]>([]);
  const [features, setFeatures] = useState<GeoJSON.Feature[]>([]);

  const addHedgehog = (new_hedgehog:Hedgehog) => {
    console.log('lisää uusi siili', new_hedgehog);
    setHedgehogs(hedgehogs => [new_hedgehog, ...hedgehogs]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#00B2A0",
          height: "40px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "white" }} variant="overline">
          Siilit kartalla
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridAutoColumns: "1fr 1.5fr 2fr",
          gridAutoFlow: "column",
          overflow: "hidden",
        }}
      >
        <HedgeHogList setSelectedHedgehogId={setSelectedHedgehogId} hedgehogs={hedgehogs || []} setHedgehogs={setHedgehogs} />
        <Box>
          <HedgehogInfo hedgehogId={selectedHedgehogId || null} setFeatures={setFeatures} />
          <HedgehogForm coordinates={coordinates || []} onAddHedgehog={addHedgehog} />
        </Box>
        <Paper elevation={3} sx={{ margin: "1em" }}>
          <Map
            onMapClick={(coordinates) => setCoordinates(coordinates)} features={features}
            // Esimerkki siitä, miten kartalle voidaan välittää siilien koordinaatteja GeoJSON -arrayssä
            // features={[
            //   {
            //     type: "Feature",
            //     geometry: {
            //       type: "Point",
            //       coordinates: [2859167.020281517, 9632038.56757201],
            //     },
            //     properties: {
            //       name: "Siili Silvennoinen",
            //       age: 50,
            //       gender: "male",
            //     },
            //   },
            // ]}
          />
        </Paper>
      </Box>
      <Box
        sx={{
          backgroundColor: "#00B2A0",
          height: "40px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography sx={{ color: "white" }} variant="overline">
          Powered by Ubigu Oy
        </Typography>
      </Box>
    </Box>
  );
}
