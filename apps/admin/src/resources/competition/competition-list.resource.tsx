import * as React from 'react';
import { Datagrid, List, ReferenceField, TextField } from 'react-admin';

export const CompetitionList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="ownerId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="description" />
    </Datagrid>
  </List>
);
