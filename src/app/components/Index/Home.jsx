import React from 'react';
import { CssBaseline } from '@material-ui/core';

import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppAppBar from './modules/views/AppAppBar';

function Index() {
  return (
    <>
      <CssBaseline />
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductSmokingHero />
      <ProductHowItWorks />
      <AppFooter />
    </>
  );
}

export default Index;
