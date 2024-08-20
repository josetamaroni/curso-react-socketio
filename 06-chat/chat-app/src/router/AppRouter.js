import React, { useContext, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
// import { ChatPage } from '../pages/ChatPage';
// import { AuthRouter } from './AuthRouter';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
    verificaToken();
  }, [verificaToken])
  
  if(auth.checking)
    return <h1>Espere por favor</h1>

  return (
    <Router>
        <div>
            <Routes>
              <Route path="/auth/*" element={ <PublicRoute isAuthenticated={auth.logged}/> }/>
              <Route path="/" element={ <PrivateRoute isAuthenticated={auth.logged}/> }/>

       
              <Route path="/*" element={<Navigate to ="/auth/login" />}/>
            </Routes>
        </div>
    </Router>
  )
}
