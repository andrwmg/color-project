import { Route, Routes, useParams, Link, useLocation, Navigate, redirect } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import PaletteList from './PaletteList';
import PaletteWrapper from './PaletteWrapper';
import seedColors from './seedColors';
import SingleColorWrapper from './SingleColorWrapper';
import NewPaletteForm from './NewPaletteForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
  const [palettes, setPalettes] = React.useState(savedPalettes || seedColors)
  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette])
  }

  const deletePalette = (id) => {
    setPalettes(palettes.filter(p => p.id !== id))
  }

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes))
  }

  React.useEffect(() => {
    syncLocalStorage()
  }, [palettes])

  const location = useLocation()
  const [displayLocation, setDisplayLocation] = React.useState(location)
  const [transitionStage, setTransitionStage] = React.useState('fadeIn')

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage('fadeOut')
  }, [displayLocation,location]);

  return (
          <div
      className={`App ${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransitionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}
    >
        <Routes location={displayLocation}>
          <Route path='/' className='page' element={<PaletteList palettes={palettes} deletePalette={deletePalette} />} />
          <Route path='/palette/new' element={<NewPaletteForm savePalette={savePalette} palettes={palettes} />} />
          <Route path='/palette/:id' element={<PaletteWrapper palettes={palettes} />} />
          <Route path='/palette/:id/:colorId' element={<SingleColorWrapper palettes={palettes} />} />
          <Route path='*' element={<Navigate replace to='/' />} />

        </Routes>
    </div>
  );
}

export default App;
