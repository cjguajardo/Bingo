import React from 'react';

const NavigationContext = React.createContext({
  page: 'Home',
  pages: [],
  setPage: () => {},
  params: {},
});

export default NavigationContext;
