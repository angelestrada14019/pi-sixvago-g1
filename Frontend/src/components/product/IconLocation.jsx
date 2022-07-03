import L from 'leaflet'
const IconLocation = L.icon({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconAnchor:null,
    shadowAnchor:null,
    shadowSize:null,
    iconSize:[35,35],
    className:"leaflet-venue-icon"
})

export default IconLocation