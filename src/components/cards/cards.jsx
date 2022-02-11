import React from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CountUp from "react-countup";
import cx from "classnames";
import styles from "./cards.module.css"

function Cards(props){
    const {confirmed,recovered,deaths,lastUpdated,todayCases,todayDeaths,todayRecovered}=props.data;

    if(!props.data){
        return "Loading...";
    }

    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected)}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>Active</Typography>
                <Typography variant="h5">
                    <CountUp 
                        start={0}
                        end={confirmed}
                        duration={2.5}
                        separator=","
                    />
                </Typography>
                <Typography color="rgba(0, 0, 255, 0.5)">+ <CountUp 
                        start={0}
                        end={todayCases}
                        duration={2.5}
                        separator=","
                    /> today</Typography>
                <Typography color="textSecondary">{new Date(lastUpdated).toDateString()}</Typography>
                <Typography variant="body2">Number of new cases of covid19</Typography>
            </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.recovered)}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                <Typography variant="h5">
                <CountUp 
                        start={0}
                        end={recovered}
                        duration={2.5}
                        separator=","
                    />
                </Typography>
                <Typography color="rgb(124, 252, 0)">+ <CountUp 
                        start={0}
                        end={todayRecovered}
                        duration={2.5}
                        separator=","
                    /> today</Typography>
                <Typography color="textSecondary">{new Date(lastUpdated).toDateString()}</Typography>
                <Typography variant="body2">Number of recoveries from covid19</Typography>
            </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.deaths)}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                <Typography variant="h5">
                <CountUp 
                        start={0}
                        end={deaths}
                        duration={2.5}
                        separator=","
                    />
                </Typography>
                <Typography color="rgba(255, 0, 0, 0.5)">+ <CountUp 
                        start={0}
                        end={todayDeaths}
                        duration={2.5}
                        separator=","
                    /> today</Typography>
                <Typography color="textSecondary">{new Date(lastUpdated).toDateString()}</Typography>
                <Typography variant="body2">Number of deaths caused by covid19</Typography>
            </CardContent>
            </Grid>
            </Grid>
        </div>
    );
}

export default Cards;