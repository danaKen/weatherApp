import {
    Grid, 
    Table, 
    TableBody, 
    TableContainer, 
    TableRow,
    Paper,
    TableHead,
    TableCell, 
    Box,
    Typography,
    makeStyles,
    withStyles
} from '@material-ui/core';
import { imageURL } from './WeatherInformation'

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 'light',
        color: theme.palette.info.dark,
        fontStyle: "italic",
        padding: theme.spacing(4,0,2,0)
    }
}))

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.grey[100],
        fontWeight: "bold"
    },
    body: {
        backgroundColor: 'rgba(217, 226, 225)'
    }
}))(TableCell)

export function PreviousSearch({lastSearchList}) {
    const classes = useStyles()

    return (
        (lastSearchList.length > 0) && 
            (<Grid>
                <Typography variant="h5" className={classes.title}>Search History</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">City</StyledTableCell>
                                <StyledTableCell align="center">Weather</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lastSearchList.map((row, index) =>(
                                <TableRow key={index}>
                                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Grid container alignItems="center" justify="space-evenly">
                                            <Grid item>{Math.round(row.main.temp)}°c </Grid>
                                            <Grid item><img src={`${imageURL}${row.weather[0].icon}.png`} /></Grid>
                                            <Grid item>{row.weather[0].main}</Grid>
                                        </Grid>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>)
    )
  }
