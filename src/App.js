import { useState, useContext, useEffect } from 'react';

import { ThemeContext } from './contexts/theme';
import Header from './components/Header/Header';
import WeatherCard from './components/WeatherCard/WeatherCard';
import SearchForm from './components/SearchForm/SearchForm';
import Error from './components/Error/Error';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import useForecast from './hooks/useForecast';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [{ themeName }] = useContext(ThemeContext);
  const { isError, isLoading, forecast, loadLocation } = useForecast();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [mount, setMount] = useState(false);

  const onSubmit = value => {
    loadLocation(value);
  };

  useEffect(() => {
    if(!mount) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      if (lat && long) {
        loadLocation({lat, long});
        setMount(true);
      }
    }
  }, [lat, long, mount, loadLocation]);


  return (
    <div id='top' className={`${themeName} app`}>
      <Header />
      <main>
        {!isLoading && <SearchForm submitSearch={onSubmit} />}
        {isError && <Error message={isError} />}
        {(!isLoading && forecast && !isError) && <WeatherCard forecast={forecast} />}
        {isLoading && <Loader />}
      </main>
      <Footer />
    </div>
  )
}

export default App;
