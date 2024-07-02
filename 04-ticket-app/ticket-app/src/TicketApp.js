import { SocketProvider } from './context/SocketContext';
import { UiProvider } from './context/UiContext';
import { RouterPages } from "./pages/RouterPages";


function TicketApp() {
  return (
    <SocketProvider>
      <UiProvider>
        <RouterPages/>
      </UiProvider>
    </SocketProvider>
  );
}

export default TicketApp;
