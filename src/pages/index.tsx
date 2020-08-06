import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

const IndexPage: NextPage = () => {
  const [t] = useTranslation('common');

  return <Fragment>{'hi'}</Fragment>;
};

export default IndexPage;
