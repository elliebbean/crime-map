import { Map as LeafletMap } from "leaflet";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import type { CrimeData } from "../api/crimesApi";
import useTranslateCrimeCategory from "../hooks/useTranslateCrimeCategory";

interface MapViewProps {
  ref?: React.Ref<LeafletMap>;
  crimes: CrimeData[];
}
export default function MapView({ ref, crimes }: MapViewProps) {
  const translateCrimeCategory = useTranslateCrimeCategory();

  const markers = useMemo(() => {
    return crimes.map((crime) => (
      <Marker key={crime.id} position={[parseFloat(crime.location.latitude), parseFloat(crime.location.longitude)]}>
        <Popup>
          <div>
            <span className="font-bold">Category:</span> {translateCrimeCategory(crime.category)}
          </div>
          <div>
            <span className="font-bold">Location:</span> {crime.location.street.name}
          </div>
          <div>
            <span className="font-bold">Month:</span> {crime.month}
          </div>
          {crime.outcome_status && (
            <div>
              <span className="font-bold">Outcome:</span> {crime.outcome_status?.category}
            </div>
          )}
        </Popup>
      </Marker>
    ));
  }, [crimes, translateCrimeCategory]);

  return (
    <MapContainer
      ref={ref}
      className="w-full h-full z-0"
      bounds={[
        [60, -10],
        [50, 2],
      ]}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='
            &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
            | &copy; <a href="https://carto.com/attributions">CARTO</a>
            | Contains OS data &copy; Crown copyright and database right 2025
            | Contains Royal Mail data &copy; Royal Mail copyright and database right 2025
            | Source: Office for National Statistics licensed under the Open Government Licence v.3.0
            '
        url={`http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png`}
        minZoom={0}
        maxZoom={20}
      />
      {markers.length > 0 && <MarkerClusterGroup>{markers}</MarkerClusterGroup>}
    </MapContainer>
  );
}
