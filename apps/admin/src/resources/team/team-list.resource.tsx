import * as React from 'react';
import {
  ArrayField,
  Datagrid,
  List,
  ReferenceField,
  SingleFieldList,
  TextField
} from 'react-admin';

export const TeamList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="competitionId" reference="competitions">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
