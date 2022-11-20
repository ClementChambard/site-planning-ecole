import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise-list.component";
import RdvList from "./components/rdv-list-user.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//<Navbar />
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        
        <br/>
        <Routes>
          <Route path="/" exact element={<RdvList/>} />
          <Route path="/edit/:ex_id" element={<EditExerciseF/>} />
          <Route path="/create" element={<CreateExercise/>} />
          <Route path="/user" element={<CreateUser/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function EditExerciseF() {
    let params = useParams();
    return (
      <EditExercise exid={params.ex_id}/>
    )
}

export default App;
