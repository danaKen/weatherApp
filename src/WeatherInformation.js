import {
    Grid,
    Box,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    city: {
        fontWeight: 'bold',
        color: theme.palette.info.dark
    }
}))

export const imageURL = "http://openweathermap.org/img/wn/"

export function WeatherInformation({weather}) {
    const classes = useStyles()

    return (
      <Box my={4}>
        {(typeof weather.main != "undefined") ? (
          <Grid container justify="center">
            <Typography variant="h3" className={classes.city}>
              {weather.name}, {weather.sys.country}
            </Typography>
            <Grid container direction="row" justify="center" alignItems="center">
              <Typography variant="h4" className={classes.city}>{Math.round(weather.main.temp)}°c</Typography>
              <img src={`${imageURL}${weather.weather[0].icon}@2x.png`} />
            </Grid>
            <Grid container justify="center">
              <Typography variant="h6" className={classes.city}>{weather.weather[0].main}</Typography>
            </Grid>
          </Grid>
        ) : (weather.cod === "404") ? (
          <Grid container justify="center">
            <Typography variant="h4">Please, enter a valid city</Typography>
          </Grid>
        ) : ('')}
      </Box>
    )
  }