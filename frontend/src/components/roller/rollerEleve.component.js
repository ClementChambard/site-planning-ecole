import React, { Component } from 'react';
import "./rollerTable.css"
import axios from 'axios'

function rollerCol(e, c, q1, q2, q3, onpress, m) {
  let d = (c === 0) ? e.roller : ((c === 1) ? e.casque : e.protec);
  if (d === -1)
    return (
      <td className="hasRollerQ">
          <span className="question">{q1}</span>
          <br/>
          <input className="yesbut" type="button" value={m?"Oui":"O"} onClick={() => onpress(2)}/>
          <input className="nobut" type="button" value={m?"Non":"N"} onClick={() => onpress(1)}/>
      </td>
    )
  if (d === 1)
    return (
      <td className="hasRollerN">
        <span className="no">{m ? q2 : "Non"}</span>
      </td>
    )
  if (d === 2)
    return (
      <td className="hasRollerY">
        <span className="yes">{m ? q3 : "Oui"}</span>
      </td>
    )
}

function rollerPointure(e, pointure, onupdate, onsubmit, m) {
  if (e.roller === 1) {
    if (e.pointure === -1) {
      return (
          <td className="hasRollerQ">
            <span>Pointure :</span>
            <br/>
            <input className="textfield" type="text" value={pointure} onChange={onupdate}/>
            <input name="" type="button" value="OK" onClick={onsubmit}/>
          </td>
      )
    } else {
      return (
          <td className="hasRollerQ">
            <span>Pointure : {e.pointure}</span>
          </td>
      )
    }
  }
  else return (
    <td className="hasRollerQ"></td>
  )
}

export default class RollerEleve extends Component {
  constructor(props) {
    super(props);

    this.setHasRoller = this.setHasRoller.bind(this);
    this.setHasCasque = this.setHasCasque.bind(this);
    this.setHasProtec = this.setHasProtec.bind(this);
    this.updatePoint = this.updatePoint.bind(this);
    this.setPoint = this.setPoint.bind(this);
    this.reset = this.reset.bind(this);
    this.update = this.update.bind(this);

    this.state = {
      pointure: "",
      eleve: props.eleve,
      matches: props.matches
    };
  }

  update() {
    axios.post("http://localhost:5000/roller/update/"+this.state.eleve._id, {
      name: this.state.eleve.name,
      roller: this.state.eleve.roller,
      pointure: this.state.eleve.pointure,
      casque: this.state.eleve.casque,
      protec: this.state.eleve.protec,
    })
         .then(res => console.log(res.data));
  }

  setHasRoller(v) {
    var e = this.state.eleve;
    e.roller = v;
    this.setState({eleve: e});
    this.update();
  }

  setHasCasque(v) {
    var e = this.state.eleve;
    e.casque = v;
    this.setState({eleve: e});
    this.update();
  }

  setHasProtec(v) {
    var e = this.state.eleve;
    e.protec = v;
    this.setState({eleve: e});
    this.update();
  }

  updatePoint(e) {
    this.setState({pointure: e.target.value});
  }

  setPoint() {
    var e = this.state.eleve;
    e.pointure = parseInt(this.state.pointure);
    this.setState({eleve: e});
    this.update();
  }

  reset() {
    var e = this.state.eleve;
    e.pointure = -1;
    e.protec = -1;
    e.casque = -1;
    e.roller = -1;
    this.setState({eleve: e});
    this.update();
  }


  render() {
  const resetBut = () => { if (this.state.eleve.roller !== -1 || this.state.eleve.casque !== -1 ||this.state.eleve.protec !== -1) return (<input className="again" type="Button" value="" onClick={this.reset}/>) };
    return (
      <>
      <tr className="">
      <td className="eleve"><span className="eleveText">{this.state.eleve.name}</span></td>
          {
            rollerCol(this.state.eleve, 0, "J'ai des rollers ?", "Je n'ai pas de rollers", "J'ai des rollers", this.setHasRoller, this.state.matches)
          }
          {
            rollerPointure(this.state.eleve, this.state.pointure, this.updatePoint, this.setPoint, this.state.matches)
          }
          {
            rollerCol(this.state.eleve, 1, "J'ai un casque ?", "Je n'ai pas de casque", "J'ai un casque", this.setHasCasque, this.state.matches)
          }
          {
            rollerCol(this.state.eleve, 2, "J'ai des protections ?", "Je n'ai pas de protections", "J'ai des protections", this.setHasProtec, this.state.matches)
          }
          {
            resetBut()
          }
      </tr>
      </>
    );
  }
}
