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
      <TextField source="name" />
      <ReferenceField source="teamId" reference="teams">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
