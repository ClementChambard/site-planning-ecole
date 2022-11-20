import React, { Component } from 'react';
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
      hour: props.hour
    };
  }

  render() {
    return (
      <>
      <tr className="libre">
        <td className="hour" rowSpan="4"><span>{this.state.hour}</span></td>
        <td rowSpan="4"><b>Horaire disponible : </b> <a className="bouton" herf="https://www.lamborghini.com/fr-en"><strong>Réserver</strong></a>
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


export default class WeekCalendar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className="calendar">
          <thead>
            <tr>
              <th className="first-child">
              <span className="day">Horaires</span>
                <span className="long"></span>
                <span className="short"></span>
                </th>
              <th className="last-child">
                <span className="day">{"Votre_choix"}</span>
                <span className="long"></span>
                <span className="short"></span>
              </th>
              {/* <th>
                <span className="day">2</span>
                <span className="long">Mardi</span>
                <span className="short">Mar</span>
              </th>
              <th>
                <span className="day">3</span>
                <span className="long">Mercredi</span>
                <span className="short">Mer</span>
              </th>
              <th>
                <span className="day">4</span>
                <span className="long">Jeudi</span>
                <span className="short">Jeu</span>
              </th>
              <th className="last-child">
                <span className="day active">5</span>
                <span className="long">Vendredi</span>
                <span className="short">Ven</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            <RdvLibre hour="8h00"/>
            <RdvLibre hour="8h10"/>
            <RdvLibre hour="8h20"/>
            <RdvLibre hour="8h30"/>
            <RdvLibre hour="8h40"/>
            <RdvOccupe hour="8h50" eleve="moi"/>
            <RdvLibre hour="9h00"/>
            <RdvLibre hour="9h10"/>
            <RdvLibre hour="9h20"/>
            <RdvLibre hour="9h30"/>
            <RdvLibre hour="9h40"/>
            <RdvLibre hour="9h50"/>
            <RdvLibre hour="10h00"/>
            <RdvLibre hour="10h10"/>
            <RdvLibre hour="10h20"/>
            <RdvLibre hour="10h30"/>
            <RdvLibre hour="10h40"/>
            <RdvLibre hour="10h50"/>
            <RdvLibre hour="11h00"/>
            <RdvLibre hour="11h10"/>
            <RdvLibre hour="11h20"/>
            <RdvLibre hour="11h30"/>
            <RdvLibre hour="11h40"/>
            <RdvLibre hour="11h50"/>
            <RdvLibre hour="12h00"/>
            <RdvLibre hour="12h10"/>
            <RdvLibre hour="12h20"/>
            <RdvLibre hour="12h30"/>
          </tbody>
        </table>
      </div>
    )
  }
}
