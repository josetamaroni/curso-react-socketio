import React, { useContext, useEffect } from 'react'
import { useMapbox } from '../hooks/useMapbox';
import { SocketContext } from '../context/socketContext';

const puntoIncial = {
  lng: -122.4722,
  lat: 37.8015,
  zoom: 13.5
}

export const MapaPage = () => {

  const { coords, mapaDiv, nuevoMarcador$, movimientoMarcador$, agregarMarcador, actualizarMarcador } = useMapbox( puntoIncial );
  const { socket } = useContext(SocketContext);

  // Escuchar Marcadores Nuevos
  useEffect(() => {
    socket.on('marcadores-activos', (marcadores) => {
      console.log(marcadores)
      // recorrer marcadores
      for(let id in marcadores){
        agregarMarcador(marcadores[id], id);
      }
    })
  }, [socket,agregarMarcador])
  

  useEffect(() => {
    nuevoMarcador$.subscribe((newMarcador)=>{
      socket.emit('marcador-nuevo', newMarcador );
    });
  }, [nuevoMarcador$,socket])

  // Movimiento del marcador
  useEffect(() => {
    movimientoMarcador$.subscribe((marcador)=>{
      socket.emit('marcador-actualizado', marcador);
    })
  }, [socket,movimientoMarcador$])

  // Mover marcador actualizado
  useEffect(() => {
    socket.on('marcador-actualizado', (marcador) => {
      console.log('Marcador-actualizado',marcador)
      actualizarMarcador(marcador);
    })
  }, [socket, actualizarMarcador])
  

  // Escuchar nuevos Marcadores
  useEffect(() => {
    socket.on('marcador-nuevo', (marcador) => {
      agregarMarcador(marcador, marcador.id);
    })
  }, [socket,agregarMarcador])
  
  
  return (
    <>
      <div className='info'>lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}</div>
      <div ref={mapaDiv} className='mapContainer'></div>
    </>
  )
}
