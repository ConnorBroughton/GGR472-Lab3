mapboxgl.accessToken = 'pk.eyJ1IjoiY29ubm9yYnJvdWdodG9uIiwiYSI6ImNtNmllajk3dDA4MnYya29vcmRhZ3pmMmkifQ.rVteR2UEyh7d5e4JIP3zCA';

const map = new mapboxgl.Map({
    container: 'my-map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-79.39, 43.71],
    zoom: 10,
});

map.addControl(new mapboxgl.NavigationControl());

map.addControl(new mapboxgl.FullscreenControl());

map.on('load', () => {
    map.addSource('crimes-data', {
        type: 'vector',
        url: 'mapbox://connorbroughton.7vwajcfr'
    });

    // Add the fill layer
    map.addLayer({
        id: 'crimes-data-poly',
        type: 'fill',
        source: 'crimes-data',
        'source-layer': 'crimes-5zigho',
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'HOMICIDE_2024'],
                0, '#ffffcc',
                1, '#ffeda0',
                2, '#ffeda0',
                3, '#feb24c',
                4, '#feb24c',
                5, '#bd0026'
            ],
            'fill-opacity': 0.7,
        }
    });

    map.addLayer({
        id: 'crimes-data-outline',
        type: 'line',
        source: 'crimes-data',
        'source-layer': 'crimes-5zigho',
        paint: {
            'line-color': '#000000', // Black outline
            'line-width': 1,        // Outline thickness
        }
    });

    map.on('click', 'crimes-data-poly', (e) => {
        const properties = e.features[0].properties;
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                <h3>Properties</h3>
                <pre>${JSON.stringify(properties, null, 2)}</pre>
            `)
            .addTo(map);
    });

    // Hover effects
    map.on('mouseenter', 'crimes-data-poly', () => {
        map.setPaintProperty('crimes-data-poly', 'fill-opacity', 1); // Increase opacity to 1
        map.getCanvas().style.cursor = 'pointer'; // Change cursor to pointer
    });

    // Hover effect: Reset opacity on mouse leave
    map.on('mouseleave', 'crimes-data-poly', () => {
        map.setPaintProperty('crimes-data-poly', 'fill-opacity', 0.7); // Reset opacity to 0.7
        map.getCanvas().style.cursor = ''; // Reset cursor
    });
});

