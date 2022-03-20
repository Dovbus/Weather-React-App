import React, { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider(props) {
  const [weatherData, setWeatherData] = useState({});

  const API_KEY = '73b04f10a5d603d29c52ac0a00cc5625';

  const value = {
    weatherData,
    setWeatherData,
    API_KEY,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
