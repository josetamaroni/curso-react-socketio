import { useCallback, useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs';
import { v4 } from 'uuid';
import mapboxgl from 'mapbox-gl';

// TODO: CAMBIAR A VARIABLE GLOBAL env
mapboxgl.accessToken = 'pk.eyJ1IjoidGF0b2pvc2UiLCJhIjoiY2x5cTZzenA0MDc4ZzJqcTAxeGo4MGs0YiJ9.eq-F4VLlgPkMG-L5OB_eHw';

export const useMapbox = ( puntoIncial ) => {

    const mapaDiv = useRef();
    const mapa = useRef();
    const marcadores = useRef({}); // Objeto de marker

    const [coords, setCoords] = useState(puntoIncial);

    //* Observables de RXJS
    const nuevoMarcador = useRef( new Subject() );
    const movimientoMarcador = useRef( new Subject() );

    //* Funcion para agregar marcadores
    const agregarMarcador = useCallback((ev,id) => {
        const { lng, lat } = ev.lngLat || ev;
        const marker = new mapboxgl.Marker();
        marker.id = id ?? v4();
        marker
            .setLngLat([lng, lat])
            .addTo( mapa.current )
            .setDraggable(true);

        marcadores.current[marker.id] = marker;

        if ( !id ) {
            nuevoMarcador.current.next({
                id: marker.id,
                lng,
                lat
            });
        }

        //* escuchar movimiento de los markers
        marker.on('drag',({ target })=>{
            const { id } = target;
            const { lng, lat } = target.getLngLat();

            //* Eemitir los cambios de movimiento del marcador
            movimientoMarcador.current.next({
                id,
                lng,
                lat
            })
        })
    },[]);

    // Funcion para actualizar la ubicacion del marcador
    const actualizarMarcador = useCallback( ({ id,lng,lat }) => {
        console.log('id',id)
        console.log('test',marcadores.current[id])
        marcadores.current[id].setLngLat([ lng, lat ]);
    },[]);


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [ puntoIncial.lng, puntoIncial.lat ], // starting position [lng, lat]
            zoom: puntoIncial.zoom, // starting zoom
        });
        mapa.current = map;

        mapa.current?.on('move', ()=>{
            const { lng, lat } = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            });
        })
    }, [puntoIncial])
  
    //* Agregar marcadores cuando se hace click
    useEffect(() => {
        mapa.current?.on( 'click', agregarMarcador);
    }, [agregarMarcador])
  
    return {
        coords,
        mapaDiv,
        marcadores,
        nuevoMarcador$: nuevoMarcador.current, //* el signo $ representa un observable
        movimientoMarcador$: movimientoMarcador.current,
        agregarMarcador,
        actualizarMarcador
    }
}
