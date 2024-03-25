import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { GlobalStyles } from "@mui/material";
import { View, Map as OlMap, Feature } from "ol";
import { GeoJSON } from "ol/format";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM.js";
import VectorSource from "ol/source/Vector";
import { Circle } from "ol/style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { useEffect, useRef, useState } from "react";
export function Map({ children, onMapClick, features }) {
    const mapRef = useRef(null);
    /**
     * OpenLayers View: @see https://openlayers.org/en/latest/apidoc/module-ol_View-View.html
     * View's projection is defined based on the target country (area): E.g. EPSG:3067 in Finland
     */
    const [olView] = useState(() => {
        return new View({
            center: [2659167.020281517, 9632038.56757201],
            zoom: 5,
            multiWorld: false,
            enableRotation: false,
        });
    });
    /**
     * OpenLayers Map: @see https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
     * "For a map to render, a view, one or more layers, and a target container are needed" -docs
     */
    const [olMap] = useState(() => {
        return new OlMap({
            target: "",
            controls: [],
            view: olView,
            keyboardEventTarget: document,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                new VectorLayer({
                    source: new VectorSource(),
                    style: new Style({
                        image: new Circle({
                            radius: 7,
                            fill: new Fill({ color: "#00B2A0" }),
                            stroke: new Stroke({ color: "darkblue", width: 3 }),
                        }),
                    }),
                }),
            ],
        });
    });
    /** olMap -object's initialization on startup  */
    useEffect(() => {
        olMap.setTarget(mapRef.current);
        olMap.on("click", (event) => {
            onMapClick(event.coordinate);
        });
    }, [olMap]);
    /** Listen for changes in the 'features' property */
    useEffect(() => {
        if (!features || !features.length)
            return;
        const layers = olMap.getLayers().getArray();
        const source = layers[1].getSource();
        const olFeatures = features.map((geometry) => new Feature({
            geometry: new GeoJSON().readGeometry(geometry.geometry),
        }));
        source?.addFeatures(olFeatures);
    }, [features]);
    return (_jsxs("div", { style: { width: "100%", height: "100%" }, children: [_jsx(GlobalStyles, { styles: {
                    ".ol-viewport": {
                        cursor: "pointer",
                    },
                } }), _jsx("div", { style: { width: "100%", height: "100%", position: "relative" }, ref: mapRef, children: children })] }));
}
