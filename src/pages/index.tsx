import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/react-hooks';
import Dashboard from '../components/Dashboard/components/Dashboard';

const IndexPage: NextPage = () => {
  const [t] = useTranslation('common');
  const apolloClient = useApolloClient();

  return (
    <Dashboard />
  );
};

export default IndexPage;
