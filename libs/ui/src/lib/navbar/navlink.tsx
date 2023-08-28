import { Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export const NavLink = (props: Props) => {
  const { children, onClick } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'gray.700'
      }}
      href={'#'}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
