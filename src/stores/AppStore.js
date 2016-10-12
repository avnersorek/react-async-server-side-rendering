import { observable, action } from 'mobx';
import wikipediaProvider from '../providers/wikipediaProvider';

export default class AppStore {
  @observable characters;
  @observable currentCharacter;

  constructor(initialState) {
    if (initialState) {
      this.characters = initialState.characters;
      this.currentCharacter = initialState.currentCharacter;
    }
  }

  @action
  loadCharacters() {
    if (this.characters) return Promise.resolve(this.characters);
    else return wikipediaProvider.loadCharacters().then(characters => this.characters = characters);
  }

  @action
  loadCharacter(pageId) {
    if (this.currentCharacter && this.currentCharacter.pageid == pageId) return Promise.resolve(this.currentCharacter);
    else return wikipediaProvider.getPage(pageId).then(character => this.currentCharacter = character);
  }

  toJson() {
    return {
      characters: this.characters,
      currentCharacter: this.currentCharacter
    };
  }

}
