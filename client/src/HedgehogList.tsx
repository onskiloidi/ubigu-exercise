import { Box, MenuItem, Paper, Typography, List, ListItem, Button } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";

export default function HedgeHogList() {
  const [hedgehogs, setHedgehogs] = useState<Hedgehog[]>([]);
  // Fetch all hedgehog's during startup
  useEffect(() => {
    const getAllHedgehogs = async () => {
      try {
        const res = await fetch("/api/v1/hedgehog");
        console.log(res);
        if (!res.ok) return;

        const json = await res.json();
        console.log(json?.hedgehogs);
        setHedgehogs(json?.hedgehogs || []);
      } catch (err) {
        console.error(`Error while fetching hedgehogs: ${err}`);
      }
    };

    getAllHedgehogs();
  }, []);

  return (
    <Paper elevation={3} sx={{ margin: "1em", overflow: "hidden" }}>
      <Box
        sx={{
          backgroundColor: "#a1e6df",
          height: "3em",
          display: "flex",
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "darkslategrey" }}>
          Rekisteröidyt siilit
        </Typography>
      </Box>
      {hedgehogs.length ? (
        <List sx={{ overflowY: "scroll", height: "100%" }}>
          {hedgehogs.map((hedgehog, index: number) => (
            <ListItem key={`hedgehog-index-${index}`} sx={{ width: "100%" }}>
                <Button onClick={() => hogOnMap(hedgehog.id)} type="button" sx={{ width: "100%", padding: "20px", bgcolor: "#4db1a0", color: "white" }}>
                    {hedgehog.hedgehog_name}
                </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ padding: "1em" }}>Ei lisättyjä siilejä</Typography>
      )}
     
    </Paper>
  );
}

function hogOnMap(hedgehog_id: number) {
    console.log(JSON.stringify({'hedgehog_id' : hedgehog_id}));
    fetch('/api/v1/hedgehog/fetch_hedgehog', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({'hedgehog_id' : hedgehog_id})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Epäonnistui :(');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        if(data.hedgehog){
            HedgeHogList();
        }
    })
    .catch (error => console.error(error));
};