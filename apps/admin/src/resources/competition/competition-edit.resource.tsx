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

export const CompetitionEdit = ({ permissions, ...props }) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="ownerId" />
      <TextInput source="name" />
      <TextInput source="description" />
      <ArrayInput source="races">
        <SimpleFormIterator>
          <TextInput source="name" label="Race Name" />
          <DateTimeInput
            source="date"
            label="Race Date"
            format={val => new Date(val)}
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
