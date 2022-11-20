import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import WeekCalendar from './week-calendar.component';

class Rdv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rdv: props.rdv,
      deleteRdv: props.deleteRdv
    };
  }

  render() {
    return (
      <tr>
        <td>{this.state.rdv.nom_eleve}</td>
        <td>{this.state.rdv.date.substring(0,10)}</td>
        <td>
          <Link to={"/edit/"+this.state.rdv._id}>edit</Link> | <a href="#" onClick={() => {this.state.deleteRdv(this.state.rdv._id)}}>delete</a>
        </td>
      </tr>

    );
  }
}

export default class RdvList extends Component {
  constructor(props) {
    super(props);

    this.deleteRdv = this.deleteRdv.bind(this);
    this.rdvList = this.rdvList.bind(this);

    this.state = {
      rdvs: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/rdvs/')
         .then(res => {
           this.setState({ rdvs: res.data });
         })
         .catch(err => console.log(err));
  }

  deleteRdv(id) {
    axios.delete('http://localhost:5000/rdvs/' + id)
         .then(res => console.log(res));
    this.setState({
      rdvs: this.state.rdvs.filter(el => el._id !== id)
    });
  }

  rdvList() {
    var i = 0;
    return this.state.rdvs.map(currentrdv => {
      i = i + 1;
      return <Rdv rdv={currentrdv} deleteRdv={this.deleteRdv} key={currentrdv._id}/>;
    });
  }

  render() {
    return (
      <div>
        <h3>Bienvenue sur l'interface de prise de rendez-vous de Mme Chambard du samedi 10 décembre .</h3>
        {/* <table className="table">
          <thead className="thread-light">
            <tr>
              <th>Nom eleve</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.rdvList() }
          </tbody>
        </table> */}
        <WeekCalendar/>
      </div>
    );
  }
}
