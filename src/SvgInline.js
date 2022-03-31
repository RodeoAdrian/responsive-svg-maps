import React, { useEffect, useState } from 'react';
import useIsMounted from 'ismounted';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './svgInline.css';

const SvgInline = (props) => {
    const isMounted = useIsMounted();
    const [svg, setSvg] = useState(null);
    const [svg2, setSvg2] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [isOverlay, setIsOverlay] = useState(false);

    const [currentMapId, setCurrentMapId] = useState(props.idMain);

    const handleClick = (e) => {
      console.log(e.target);
      const type = e.target.getAttribute('data-type');
      const id = e.target.getAttribute('data-id');
      const overlays = e.target.getAttribute('data-overlays');
      console.log(`id: ${id} type: ${type} overlays: ${overlays ? overlays : 0}`);

      if (type === 'stall') {
        if (e.target.classList.contains("selected")) {
          e.target.classList.remove("selected");
          e.target.style.fill = '#fff';
        } else {
          e.target.classList.add("selected");
          e.target.style.fill = '#41dd41';
          alert(`SELECTED id: ${id} type: ${type} overlays: ${overlays ? overlays : 0}`)
        }
      }

      if (overlays) {
        const ids = overlays.split(',');
        const currentSvgWrapper = document.getElementById(currentMapId)
        if (currentSvgWrapper && currentSvgWrapper.classList.contains("visible")) {
          currentSvgWrapper.classList.add("invisible");
          currentSvgWrapper.classList.remove("visible");
        }

        ids.forEach(( overlay ) => {
          const svgWrapper = document.getElementById(overlay);
          setCurrentMapId(overlay)
          if (svgWrapper && svgWrapper.classList.contains("invisible")) {
            svgWrapper.classList.remove("invisible");
            svgWrapper.classList.add("visible");
          }
        })
      }
    }

    const handleGoBack  = () => {
      if (isOverlay) {
        const currentSvgWrapper = document.getElementById(currentMapId)
        const mainSvgWrapper = document.getElementById(props.idMain)

        if (currentSvgWrapper && currentSvgWrapper.classList.contains("visible")) {
          currentSvgWrapper.classList.add("invisible");
          currentSvgWrapper.classList.remove("visible");
        }

        if (mainSvgWrapper && mainSvgWrapper.classList.contains("invisible")) {
          mainSvgWrapper.classList.remove("invisible");
          mainSvgWrapper.classList.add("visible");

          setCurrentMapId(props.idMain)
          setIsOverlay(false)
        }
      }
    }

    useEffect(() => {
        fetch(props.url)
            .then(res => res.text())
            .then(setSvg)
            .catch(setIsErrored)
            .then(() => setIsLoaded(true))

        fetch(props.url2)
            .then(res => res.text())
            .then(setSvg2)
            .catch(setIsErrored)
            .then(() => setIsLoaded(true))
    }, [props.url, props.url2]);

    useEffect(() => {
      if (props.idMain !== currentMapId){
        setIsOverlay(true)
      }
    }, [props.idMain, currentMapId]);

    return (
        <div
          style={{ width: props.width ? props.width : "768px", height: props.height ? props.height : "768px"}}
          className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
        >
          {isOverlay && <div className='back-button' onClick={handleGoBack}>
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M12.5,32,45.17,0,51.5,6.62,25.24,32,51.5,57.38,45.17,64Z"></path></svg>
          </div>}
          <div id={props.idMain} className="svg-map main-map visible" dangerouslySetInnerHTML={{ __html: svg }} onClick={handleClick}></div>
          <TransformWrapper
            initialScale={6.55}
            initialPositionX={-880}
            initialPositionY={-1000}
          >
            <TransformComponent>
               <div id={props.idSecond} className="svg-map arena-map invisible" dangerouslySetInnerHTML={{ __html: svg2 }} onClick={handleClick}></div>
            </TransformComponent>
          </TransformWrapper>
          {/* <TransformWrapper
            initialScale={1}
            initialPositionX={200}
            initialPositionY={100}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <React.Fragment>
                <div className="tools">
                  <button onClick={() => zoomIn()}>+</button>
                  <button onClick={() => zoomOut()}>-</button>
                  <button onClick={() => resetTransform()}>x</button>
                </div>
                <TransformComponent>
                  <div id={props.idSecond} className="svg-map arena-map invisible" dangerouslySetInnerHTML={{ __html: svg2 }} onClick={handleClick}></div>
                </TransformComponent>
              </React.Fragment>
            )}
          </TransformWrapper> */}
        </div>
    );
}

export default SvgInline