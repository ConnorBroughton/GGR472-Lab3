mapboxgl.accessToken = 'pk.eyJ1IjoiY29ubm9yYnJvdWdodG9uIiwiYSI6ImNtNmllajk3dDA4MnYya29vcmRhZ3pmMmkifQ.rVteR2UEyh7d5e4JIP3zCA'; 

const map = new mapboxgl.Map({
    container: 'my-map', 
    style: 'mapbox://styles/mapbox/standard', //style URL
    // alternatively you can use mapbox-owned style from https://docs.mapbox.com/api/maps/styles/#mapbox-styles
    center: [-79.39, 43.66], 
    zoom: 12, 
});

map.AddSource('crimes', {
    type: 'geojson',
    data: 'https://'
})