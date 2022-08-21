import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

import CountUp from 'react-countup';

import styles from './Cards.module.css';

const Cards = ({ data }) => {
  if (data) {
    return (
      <div className={styles.container}>
        <Grid container spacing={3} justifyContent='center'>
          <Grid
            item
            component={Card}
            className={styles.card}
            sx={{ borderBottom: '10px solid rgba(0, 0, 255, 0.5)' }}
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Infected
              </Typography>
              <Typography sx={{ fontSize: '1.5em' }}>
                <CountUp
                  start={0}
                  end={data.cases}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {Date(data.updated)}
              </Typography>
              <Typography variant='body2'>
                Number of active cases of COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            className={styles.card}
            sx={{ borderBottom: '10px solid rgba(0, 255, 0, 0.5)' }}
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Recovered
              </Typography>
              <Typography sx={{ fontSize: '1.5em' }}>
                <CountUp
                  start={0}
                  end={data.recovered}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {Date(data.updated)}
              </Typography>
              <Typography variant='body2'>
                Number of recoveries from COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            className={styles.card}
            sx={{ borderBottom: '10px solid rgba(255, 0, 0, 0.5)' }}
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Deaths
              </Typography>
              <Typography sx={{ fontSize: '1.5em' }}>
                <CountUp
                  start={0}
                  end={data.deaths}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {Date(data.updated)}
              </Typography>
              <Typography variant='body2'>
                Number of deaths caused by COVID-19
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    );
  }
};
export default Cards;
