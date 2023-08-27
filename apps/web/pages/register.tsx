import { Container } from '@chakra-ui/react';
import { RegisterForm } from '@gpseries/ui';

export default function RegisterPage() {
  return (
    <Container bg="gray.50" minW={'100vw'}>
      <RegisterForm />
    </Container>
  );
}
