import React from "react";
import Link from "next/link";
import { Image } from "cloudinary-react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ViewState } from "react-map-gl/src/mapbox/mapbox";
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery_houses } from "src/generated/HousesQuery";
// import { SearchBox } from "./searchBox";

interface Iprops {}

const Map = ({}: Iprops) => {
  const mapRef = React.useRef<ReactMapGL | null>(null);

  const [viewport, setViewport] = React.useState<ViewState>({
    latitude: 43,
    longitude: -79,
    zoom: 10,
  });

  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        // onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onViewportChange={setViewport}
        ref={(instance) => (mapRef.current = instance)}
        minZoom={5}
        maxZoom={15}
      ></ReactMapGL>
    </div>
  );
};

export default Map;
