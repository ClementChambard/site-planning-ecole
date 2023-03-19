import React, { Component } from 'react';
import RollerTable from '../components/roller/rollerTable.component'

export default class Roller extends Component {

  render() {
    return (
      <div>
        <br/>
        <h3>Sondage rollers</h3>
        <br/>
        <p>
          Merci de remplir la ligne de tableau concernant votre enfant.
        </p>
        <p>
          Attention de bien valider (pour ceux qui n'en ont pas) la pointure des rollers en cliquant sur OK.
        </p>
        <br/>
        <RollerTable/>
      </div>
    );
  }
}
