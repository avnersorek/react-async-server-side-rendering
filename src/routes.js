import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './components/Home';
import CharacterList from './components/CharacterList';
import Character from './components/Character';


export default (
  <div>
    <Route path='/' component={Home}>
      <IndexRoute component={CharacterList}/>
      <Route path="/characters/:pageId" component={Character} />
    </Route>
  </div>
);
