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
      <tr className="odd-child">
        <td className="hour" rowSpan="4"><span>{this.state.hour}</span></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr className="odd-child">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr className="fth-child">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
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
              <th className="first-child"></th>
              <th>
                <span className="day">1</span>
                <span className="long">Lundi</span>
                <span className="short">Lun</span>
              </th>
              <th>
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
              </th>
            </tr>
          </thead>
          <tbody>
            <HourRow hour="1:00"/>
            <HourRow hour="2:00"/>
            <HourRow hour="3:00"/>
            <HourRow hour="4:00"/>
            <HourRow hour="6:00"/>
          </tbody>
        </table>
      </div>
    )
  }
}
