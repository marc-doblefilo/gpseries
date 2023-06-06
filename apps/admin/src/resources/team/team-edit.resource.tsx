import * as React from 'react';
import {
  ArrayInput,
  DateInput,
  DateTimeInput,
  Edit,
  SimpleForm,
  SimpleFormIterator,
  TextInput
} from 'react-admin';

export const TeamEdit = ({ permissions, ...props }) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="competitionId" />
      <TextInput source="ownerId" />
    </SimpleForm>
  </Edit>
);
