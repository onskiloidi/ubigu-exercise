import { Box, MenuItem, Paper, Typography, List, ListItem, Button } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";

interface Props {
    setSelectedHedgehogId: useState<number | null>
}

export default function HedgeHogList({setSelectedHedgehogId}:Props) {
  const [hedgehogs, setHedgehogs] = useState<Hedgehog[]>([]);

  // Fetch all hedgehog's during startup
  useEffect(() => {
    const getAllHedgehogs = async () => {
      try {
        const res = await fetch("/api/v1/hedgehog");
        if (!res.ok) return;
        const json = await res.json();
        setHedgehogs(json?.hedgehogs || []);
      } catch (err) {
        console.error(`Error while fetching hedgehogs: ${err}`);
      }
    };

    getAllHedgehogs();
  }, [hedgehogs]);

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
        <List sx={{ overflowY: 'scroll', height: '100%', paddingBottom: '40px' }}>
          {hedgehogs.map((hedgehog:Hedgehog, index: number) => (
            <ListItem key={`hedgehog-index-${hedgehog.id}`} sx={{ width: '100%' }}>
                <Button onClick={() => setSelectedHedgehogId(hedgehog.id) } type="button" sx={{ width: '100%', padding: '20px', bgcolor: '#4db1a0', color: 'white' }}>
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

