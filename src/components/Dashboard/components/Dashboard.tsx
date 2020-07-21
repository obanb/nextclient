import React, { Fragment } from 'react';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import TableRow from './TableRow'

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
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    async function getData() {
      const res = await fetch('/api')
      const newData = await res.json()
      setData(newData)
    }
    getData()
  }, [])

  return <Fragment>
    {data.length > 0 ? (
            data.map(d => (
              <TableRow
                key={d.data.telephone}
                creditCard={d.data.creditCard.number}
                firstName={d.data.firstName}
                lastName={d.data.lastName}
                loading={false}
                telephone={d.data.telephone}
              />
            ))
          ) : (
            <>
             {"loading"}
            </>
          )}
  </Fragment>;
};

export default Dashboard;
