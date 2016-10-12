import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

@observer(['appStore'])
export default class Character extends Component {
  static preServerRender(appStore, params) {
    return appStore.loadCharacter(params.pageId);
  }

  componentDidMount() {
    const { appStore, params } = this.props;
    appStore.loadCharacter(params.pageId);
  }

  render() {
    const { currentCharacter } = this.props.appStore;
    let characterEl;

    if (currentCharacter && currentCharacter.pageid == this.props.params.pageId) {
      characterEl = (
        <div>
          <h2>{currentCharacter.title}</h2>
          <p>{currentCharacter.extract}</p>
        </div>
      );
    }
    else {
      characterEl = <p>Loading character ...</p>;
    }

    return (
      <div>
        <Link to='/'>&lt;&lt;back</Link>
        {characterEl}
      </div>
    );
  }
}
