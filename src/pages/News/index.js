import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Grid, Typography, Button, Link } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalActions } from '../../redux/rootAction';
import { useNavigate } from 'react-router-dom';

import { checkToken } from '../../ultils/checkToken';
import ButtonArrow from '../../components/ButtonArrow';
export default function News() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.AuthReducer.token);
  const dispatch = useDispatch();
  const [newsData, setNewsData] = useState(null);

  const getNewsData = async () => {
    dispatch(GlobalActions.setIsLoading(true));
    try {
      const res = await axios.get(
        'https://corona--tracker.herokuapp.com/newslist?_page=1&amp;_limit=12'
      );
      setNewsData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(GlobalActions.setIsLoading(false));
    }
  };
  useEffect(() => {
    getNewsData();
  }, []);
  const handleClick = () => {
    navigate('/signin');
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          height: '50px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {checkToken(token) === false ? (
          <Typography sx={{ fontSize: '1.5rem', color: 'red' }}>
            <Link onClick={() => handleClick()}>Sign In</Link> to learn more
          </Typography>
        ) : null}
      </Box>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Grid container spacing={2}>
          {newsData?.map((news) => (
            <Grid item lg={6} xs={12}>
              <Grid
                spacing={2}
                container
                direction='row'
                justifyContent={'flex-end'}
                alignItems={'center'}
              >
                <Grid item md={6}>
                  <h3>{news.title}</h3>
                  <p>{news.description}</p>
                  <Grid container justifyContent={'space-between'}>
                    <Grid item>
                      <Typography variant='h6' align='left'>
                        {news.author}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant='link' href={news.url}>
                        Learn more
                        <ButtonArrow
                          width={15}
                          height={15}
                          fill='red'
                          align='right'
                        ></ButtonArrow>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <img
                    src={news.urlToImage}
                    className='img-fluid'
                    height={'500px'}
                    width={'300px'}
                    alt=''
                  ></img>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          height: '50px',
        }}
      ></Box>
    </>
  );
}
