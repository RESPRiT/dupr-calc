//import { useState } from "react";

import Header from "./components/Header.tsx";
import Calculator from "./components/Calculator.tsx";
import Footer from "./components/Footer.tsx";

import "./App.css";

function App() {
  return (
    <div className="bg mx-5 flex justify-center">
      <div
        className="mb-[clamp(4rem,15vh,6rem)] md:mb-0 w-full max-w-sm
          md:max-w-lg"
      >
        <Header />
        <Calculator />
        <Footer />
      </div>
    </div>
  );
}

export default App;
