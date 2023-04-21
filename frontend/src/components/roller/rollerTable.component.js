import React, { Component } from 'react';
import axios from 'axios';
import RollerEleve from './rollerEleve.component'
import "./rollerTable.css"

export default class RollerTable extends Component {
  constructor(props) {
    super(props);

    this.eleveList = this.eleveList.bind(this);

    this.state = {
      eleves: [],
      matches: false
    }
  }

  componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
    this.setState({matches: window.innerWidth>768})
    axios.get('http://localhost:5000/roller/')
         .then(res => {
           res.data.sort();
           this.setState({ eleves: res.data });
         })
         .catch(err => console.log(err));
  }

  eleveList(m) {
    return this.state.eleves.map(currentEleve => {
      return <RollerEleve eleve={currentEleve} matches={m} key={currentEleve._id}/>
    });
  }

  render() {
    return (
      <div>
        <table className="rollertable">
          <thead>
            <tr>
              <th className="left">
                <span className="thtext">Elève</span>
              </th>
              <th>
                <span className="thtext">Roller</span>
              </th>
              <th/>
              <th>
                <span className="thtext">Casque</span>
              </th>
              <th className="right">
                <span className="thtext">{this.state.matches ? "Protections" : "Protec."}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.eleveList(this.state.matches)
            }
          </tbody>
        </table>
      </div>
    )
  }
}
