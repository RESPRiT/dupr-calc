//import { useState } from "react";

import Header from "./components/Header.tsx";
import Calculator from "./components/Calculator.tsx";
import Footer from "./components/Footer.tsx";

import "./App.css";

function App() {
  return (
    <body className="bg mx-4 flex justify-center">
      <div className="">

        <Header />
        <Calculator />
        <Footer />

      </div>
    </body>
  );
}

export default App;
