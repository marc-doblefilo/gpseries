import * as React from 'react';
import {
  ArrayField,
  Datagrid,
  List,
  ReferenceField,
  SingleFieldList,
  TextField
} from 'react-admin';

export const DriverList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="competitionId" reference="competitions">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
