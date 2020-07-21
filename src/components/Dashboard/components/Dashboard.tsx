import React, { Fragment } from 'react';
import { useApolloClient, useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';

export const query = {
  gql: {
    query: gql`
      query Query {
        group {
          list {
            result {
              name
            }
          }
        }
      }
    `,
  },
};

interface Props {}

const Dashboard = ({}: Props) => {
  return <Fragment>
    <>
      <h2>{'efef'}</h2>
   </>
  </Fragment>;
};

export default Dashboard;
