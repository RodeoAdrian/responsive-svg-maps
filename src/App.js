import React, { useRef } from 'react';
import './App.css';
import reactSVG from './logo.svg';
import arenaSVG from './arena.svg';
import simpleMapSVG from './simple-map.svg';
import uvaldeSVG from './uvalde.svg';
import { ReactComponent as ArenaSVGComp } from './arena.svg'
import SvgInline from './SvgInline'

function App() {
  const ref = useRef(null)
  
  return (
    <div className="App" ref={ref}>
      <h1>SVGs</h1>

      {/* <h3>SVG as img</h3>
      <div class="img-container">
        <img src={arenaSVG} alt="svg map"/>
      </div> */}

      {/* <h3>SVG using object</h3>
      <div onClick={handleClick}>
        <object type="image/svg+xml" data={arenaSVG}>
          <h3>Fallback text</h3>
        </object>
      </div> */}

      <h3>SVG inline</h3>
      {/* <ArenaSVGComp onClick={handleClick}/> */}
      <SvgInline width="768px" height="768px" url2={arenaSVG} url={uvaldeSVG} idMain="uvalde" idSecond="arena"/>
      <SvgInline url="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg" />
    </div>
  );
}

export default App;
