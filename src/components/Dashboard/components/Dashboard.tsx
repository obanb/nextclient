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
  const { loading, data } = useQuery<any>(query.gql.query, {
    fetchPolicy: 'network-only',
  });
  return !loading && <Fragment>
    <>
      <h2>{JSON.stringify(data)}</h2>
   </>
  </Fragment>;
};

export default Dashboard;
