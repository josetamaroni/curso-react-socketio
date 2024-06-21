import { UiProvider } from './context/UiContext';
import { RouterPages } from "./pages/RouterPages";


function TicketApp() {
  return (
    <UiProvider>
      <RouterPages/>
    </UiProvider>
  );
}

export default TicketApp;
