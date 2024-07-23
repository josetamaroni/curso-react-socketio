import React, { useEffect } from 'react'
import { useMapbox } from '../hooks/useMapbox';

const puntoIncial = {
  lng: -122.4722,
  lat: 37.8015,
  zoom: 13.5
}

export const MapaPage = () => {

  const { coords, mapaDiv, nuevoMarcador$, movimientoMarcador$ } = useMapbox( puntoIncial );

  useEffect(() => {
    nuevoMarcador$.subscribe((newMarcador)=>{
      console.log('MapaPage',newMarcador)
    });
  }, [nuevoMarcador$])

  useEffect(() => {
    movimientoMarcador$.subscribe((movimientoMarcador)=>{
      console.log('movimiento',movimientoMarcador)
    })
  }, [movimientoMarcador$])
  
  
  return (
    <>
      <div className='info'>lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}</div>
      <div ref={mapaDiv} className='mapContainer'></div>
    </>
  )
}
