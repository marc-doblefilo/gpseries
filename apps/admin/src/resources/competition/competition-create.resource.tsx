import * as React from 'react';
import {
  AutocompleteInput,
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput
} from 'react-admin';
import * as uuid from 'uuid';

export const CompetitionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="ownerId" reference="users">
        <AutocompleteInput />
      </ReferenceInput>
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
