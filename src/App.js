import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoiam9saXZldGZhYnJpY2UiLCJhIjoiY2x5dXBycnVrMTJ0ejJrcXZoeHMyc2RtNSJ9.T5SXrtXDyqcx7tJgRl5nnQ";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10", // Dark style
      center: [-1.1701353637784893, 46.146323540973256], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    mapRef.current.on("load", () => {
      if (!mapRef.current.getSource("openseamap")) {
        // Add OpenSeaMap layer
        mapRef.current.addSource("openseamap", {
          type: "raster",
          tiles: ["https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"],
          tileSize: 256,
        });
        mapRef.current.addLayer({
          id: "openseamap",
          type: "raster",
          source: "openseamap",
          minzoom: 0,
          maxzoom: 22,
        });
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      style={{ height: "100%" }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default MapboxExample;
