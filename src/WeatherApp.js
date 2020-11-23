import { useState } from 'react';
import { WeatherInformation } from './WeatherInformation'
import { PreviousSearch} from './PreviousSearch'
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(4, 4),
    backgroundColor: 'rgba(203, 235, 222)'
  },
  inputField: {
    display: 'flex'
  }
}))

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "147e7031bce0ee2dabfe5833e10328a5"
}

function WeatherApp() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [lastSearchList, setLastSearchList] = useState([])

  const classes = useStyles()

  const searchCityWeather = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('');
      })

      if(weather.cod == "200") {
        let newList = addCityToList(weather)
        setLastSearchList(newList)
      }
    }
  }

  function addCityToList(cityInfo) {
    let previousList = [...lastSearchList]
    if(lastSearchList.length >= 5) {
      previousList.pop()
    }

    let newList = [cityInfo, ...previousList]
    return newList
  }

  return (
    <div className={classes.page}>
      <TextField
        className={classes.inputField}
        variant = "outlined"
        label="Enter city..."
        onChange = {e => setCity(e.target.value)}
        value = {city}
        onKeyPress = {searchCityWeather}
      />
      <WeatherInformation weather={weather}/>
      <PreviousSearch lastSearchList={lastSearchList}/>
    </div>
  );
}

export default WeatherApp;
