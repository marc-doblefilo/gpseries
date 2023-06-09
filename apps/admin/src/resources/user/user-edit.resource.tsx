import * as React from 'react';
import {
  Edit,
  PasswordInput,
  SelectInput,
  SimpleForm,
  TextInput
} from 'react-admin';

import { transformUserForm, validateUserForm } from './user.form';

export const UserEdit = ({ permissions, ...props }) => (
  <Edit {...props} transform={transformUserForm}>
    <SimpleForm validate={validateUserForm}>
      <TextInput disabled source="id" />
      <TextInput source="username" />
      <TextInput source="name" />
      <SelectInput
        source="roles"
        choices={[
          { id: 'ROLE_ADMIN', name: 'Administrador' },
          { id: 'ROLE_USER', name: 'Usuario' }
        ]}
      />
      <PasswordInput source="plainPassword" />
      <PasswordInput source="plainPasswordRepeat" />
    </SimpleForm>
  </Edit>
);
