import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//import Navbar from "./components/navbar.component";
import RdvList from "./components/rdv-list-user.component";
import Reservation from "./components/reservation.component";

//<Navbar />
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        
        <br/>
        <Routes>
          <Route path="/" exact element={<RdvList/>} />
          <Route path="/:id" element={<ReservationF/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function ReservationF() {
    let params = useParams();
    return (
      <Reservation rdvid={params.id}/>
    )
}

export default App;
