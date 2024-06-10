import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
import InactivityTimeout from "./components/InactivityTimeout/InactivityTimeout";
import Prime from "./pages/primepage/Prime";
import ProtectAdminPanel from "./components/routeprotection/ProtectAdminPanel";

function App() {
  
  return (
    
    <BrowserRouter>
    <InactivityTimeout>
     <Routes>
     <Route path="/" element={<MainPage/>} />
     <Route path="/controlpanel"   element={<ProtectAdminPanel><Prime/></ProtectAdminPanel>} />
     </Routes>
     </InactivityTimeout>
    </BrowserRouter>
  );
}

export default App;
