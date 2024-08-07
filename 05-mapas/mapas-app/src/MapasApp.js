import React from 'react'
import { MapaPage } from "./pages/MapaPage";
import { SocketProvider } from './context/socketContext';

export const MapasApp = () => {
  return (
    <SocketProvider>
      <MapaPage/>
    </SocketProvider>
  )
}
