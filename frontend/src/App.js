import React from 'react';
import './App.css'
import {ThemeProvider} from '@material-ui/core/styles'
import  alteredTheme from './theme';
import MainComponent from './components/mainComponent/MainComponent';


function App() {
  return (
    <>
      <ThemeProvider theme={alteredTheme}>
      <MainComponent/>
      </ThemeProvider>
    </>
  );
}

export default App;
