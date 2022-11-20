import React, { Component } from 'react';
import axios from 'axios';
import "./calendar.css"

class HourRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hour: props.hour
    };
  }

  render() {
    return (
      <>
      <tr className="fth-child">
        <td className="hour" rowSpan="4"><span>{this.state.hour}</span></td>
        <td rowSpan="4"></td>
 
      </tr>
      <tr>

      </tr>
      <tr className="odd-child">
 
      </tr>
      <tr className="fth-child">

      </tr>
      </>
    );
  }
}

class RdvLibre extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hour: props.hour,
      id: props.rdvid
    };
  }

  render() {
    return (
      <>
      <tr className="libre">
        <td className="hour" rowSpan="4"><span>{this.state.hour}</span></td>
      <td rowSpan="4"><b>Horaire disponible : </b> <a className="bouton" href={this.state.id/*"https://www.lamborghini.com/fr-en"*/}><strong>Réserver</strong></a>
 </td>
        
      </tr>
      <tr className="libre">
      </tr>
      <tr className="libre">
      </tr>
      <tr className="fth-child">
      </tr>
      </>
    );
  }
}

class RdvOccupe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hour: props.hour,
      eleve: props.eleve
    };
  }

  render() {
    return (
      <>
      <tr className="occupe">
        <td className="hour" rowSpan="4"><span>{this.state.hour}</span></td>
        <td  rowSpan="4"><b>Déjà réservé par : </b>{this.state.eleve}</td>
 
      </tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      {/* <tr>
        <td></td>

      </tr>
      <tr>
        <td></td>
 
      </tr>
      <tr className="fth-child">
        <td></td>

      </tr> */}
      </>
    );
  }
}

function orderTime(a, b) {
  if (a.heure === b.heure)
  {
    return a.minute - b.minute
  }
  return a.heure - b.heure;
}

export default class WeekCalendar extends Component {
  constructor(props) {
    super(props);

    this.rdvList = this.rdvList.bind(this);

    this.state = {
      rdvs: []
    }
  }

  componentDidMount() {
    axios.get('http://192.168.0.40:5000/rdvs/')
         .then(res => {
           res.data.sort(orderTime);
           this.setState({ rdvs: res.data });
         })
         .catch(err => console.log(err));
  }


  rdvList() {
    return this.state.rdvs.map(currentRdv => {
      const hourStr = `${currentRdv.heure}:${currentRdv.minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`;
      if (currentRdv.nom_eleve === "NONE") return (<HourRow hour={hourStr} key={currentRdv._id}/>);
      if (currentRdv.nom_eleve === "LIBRE") return (<RdvLibre rdvid={currentRdv._id} hour={hourStr} key={currentRdv._id}/>);
      return <RdvOccupe hour={hourStr} eleve={currentRdv.nom_eleve} key={currentRdv._id}/>
    });
  }

  render() {
    return (
      <div>
        <table className="calendar">
          <thead>
            <tr>
              <th className="first-child">
                <span className="thtext">Horaires</span>
              </th>
              <th className="last-child">
                <span className="thtext">Votre_choix</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.rdvList()}
          </tbody>
        </table>
      </div>
    )
  }
}
