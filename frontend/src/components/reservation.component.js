import React, { Component } from 'react';
//import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

export default class Reservation extends Component {
  constructor(props) {
    super(props);

    this.onChangeEleve = this.onChangeEleve.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nom_eleve: "",
      heure: 0,
      minute: 0,
      eleves: [],
      id: props.rdvid
    };
  }

  componentDidMount() {
    console.log(this.props.rdvid);
    axios.get("http://192.168.0.40:5000/rdvs/"+this.props.rdvid)
         .then(res => {
           this.setState({
             //nom_eleve: res.data.nom_eleve,
             heure: res.data.heure,
             minute: res.data.minute,
           });
         });
    //axios.get("http://localhost:5000/users/")
         //.then(res => {
           //if (res.data.length > 0) {
             //this.setState({
               //users: res.data.map(user => user.username),
             //});
           //}
         //});
  }

  onChangeEleve(e) {
    this.setState({
      nom_eleve: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const rdv = {
      nom_eleve: this.state.nom_eleve,
      heure: this.state.heure,
      minute: this.state.minute
    }

    console.log(rdv);

    axios.post("http://192.168.0.40:5000/rdvs/update/"+this.state.id, rdv)
         .then(res => console.log(res.data));
//
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Réservation</h3>
        <p>
          Vous souhaitez vous inscrire pour le rendez-vous de
          <b> {this.state.heure}h{this.state.minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})} </b>
          .
        </p>
        <p>
          Vous assistez au rendez-vous pour : {this.state.nom_eleve}
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nom de l'élève : </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.nom_eleve}
              onChange={this.onChangeEleve}/>
            {//<select ref="userInput"
              //required
              //className="form-control"
              //value={this.state.username}
              //onChange={this.onChangeUsername}>
              //{
                //this.state.users.map(function(user) {
                  //return <option key={user} value={user}>{user}</option>;
                //})
              //}
            //</select>
            }
          </div>
          <br/>
          <div className="form-group">
            <input type="submit" value="Confirmer" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    );
  }
}
