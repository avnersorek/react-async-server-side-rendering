import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

@observer(['appStore'])
export default class CharacterList extends Component {
  static preServerRender(appStore, params) {
    return appStore.loadCharacters();
  }

  componentDidMount() {
    const { appStore } = this.props;
    appStore.loadCharacters();
  }

  render() {
    const { characters } = this.props.appStore;
    let list = <p>Loading character list ...</p>;

    if (characters) {
      list = (
        <ul>
          {characters.map(character => (
            <li key={character.pageid}>
              <Link to={'/characters/' + character.pageid}>{character.title}</Link>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div>
        <h2>Characters created by Stan Lee :</h2>
        { list }
      </div>
    );
  }
}
