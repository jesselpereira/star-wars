import React, { Suspense } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Loading from 'react-fullscreen-loading'; 

export default function App() {
  return(
    <>
    <Suspense fallback={<Loading loading background="#282c34" loaderColor="#3498db" />}>
      <Header />
      <Home />
    </Suspense>
    </>
  );
}