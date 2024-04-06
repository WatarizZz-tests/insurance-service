import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
import InactivityTimeout from "./components/InactivityTimeout/InactivityTimeout";

function App() {
  
  return (
    
    <BrowserRouter>
    <InactivityTimeout>
     <Routes>
     <Route path="/" element={<MainPage/>} />
     </Routes>
     </InactivityTimeout>
    </BrowserRouter>
  );
}

export default App;
