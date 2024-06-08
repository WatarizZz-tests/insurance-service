import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
import InactivityTimeout from "./components/InactivityTimeout/InactivityTimeout";
import Prime from "./pages/primepage/Prime";

function App() {
  
  return (
    
    <BrowserRouter>
    <InactivityTimeout>
     <Routes>
     <Route path="/" element={<MainPage/>} />
     <Route path="/controlpanel" element={<Prime/>} />
     </Routes>
     </InactivityTimeout>
    </BrowserRouter>
  );
}

export default App;
