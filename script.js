mapboxgl.accessToken = 'pk.eyJ1IjoiY29ubm9yYnJvdWdodG9uIiwiYSI6ImNtNmllajk3dDA4MnYya29vcmRhZ3pmMmkifQ.rVteR2UEyh7d5e4JIP3zCA';

const map = new mapboxgl.Map({
    container: 'my-map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-79.39, 43.71],
    zoom: 10,
});

map.on('load', () => {
    map.addSource('crimes-data', {
        type: 'vector',
        url: 'mapbox://connorbroughton.7vwajcfr'
    });

  
    map.addLayer({
        id: 'crimes-data-poly',
        type: 'fill',
        source: 'crimes-data',
        'source-layer': 'crimes-5zigho', 
        paint: {
            'fill-color': 'blue',
            'fill-opacity': 0.5,
        filter: ['==', ['get', 'AREA_NAME']]
        }
    });
});
