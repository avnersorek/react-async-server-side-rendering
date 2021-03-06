import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CharacterList from './CharacterList';

@observer
export default class Home extends Component {
  render () {
    return (
      <div>
        <h1>Redux Async SSR Example</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
