import React from 'react';
import { Admin, Resource } from 'react-admin';

import { Dashboard } from '../components';
import { authProvider, dataProvider } from '../lib';
import {
  CompetitionCreate,
  CompetitionEdit,
  CompetitionList,
  DriverList,
  TeamEdit,
  TeamList,
  UserCreate,
  UserEdit,
  UserList
} from '../resources';

const App = () => (
  <Admin
    authProvider={authProvider}
    dashboard={Dashboard}
    dataProvider={dataProvider}
  >
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
    />
    <Resource
      name="competitions"
      list={CompetitionList}
      edit={CompetitionEdit}
      create={CompetitionCreate}
    />
    <Resource name="drivers" list={DriverList} />
    <Resource name="teams" edit={TeamEdit} list={TeamList} />
  </Admin>
);

export default App;
