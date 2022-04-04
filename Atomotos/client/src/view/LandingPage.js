import React, { Component }  from 'react';
import {
  Particles,
  TokenArea,
  TeamArea,
  Blog,
} from '../component/landing-page';
import {
  Header,
  Footer,
  // ConnectWallet,
  Header_P_T
} from '../component/header-footer'

export default function LandingPage() {
  return (
    <>
        {/* <Header/>
        <Particles/>
        <TokenArea/> */}
        <Header_P_T/>
        <TeamArea/>
        <Blog/>
        <Footer/>
    </>
  );
}
