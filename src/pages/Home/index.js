import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import CountUp from 'react-countup';
import { GlobalActions } from '../../redux/rootAction';
import { fetchAllData, fetchCountriesData } from '../../api';
import './Home.module.css';
import translate from '../../i18n/translate';
import { ConstructionOutlined } from '@mui/icons-material';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'cases',
    label: 'Cases',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'recoveries',
    label: 'Recoveries',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'deaths',
    label: 'Deaths',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

export default function Home() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fetchData = async () => {
    dispatch(GlobalActions.setIsLoading(true));
    try {
      const res = await fetchAllData();
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(GlobalActions.setIsLoading(false));
    }
  };
  const fetchCountriesDataApi = async () => {
    dispatch(GlobalActions.setIsLoading(true));
    try {
      const res = await fetchCountriesData();
      setRows(res);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(GlobalActions.setIsLoading(false));
    }
  };
  useEffect(() => {
    fetchData();
    fetchCountriesDataApi();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          height: '50px',
        }}
      ></Box>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Grid container direction='column'>
          <Grid item>
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              direction='row'
              spacing={8}
            >
              <Grid item>
                <Grid
                  container
                  direction='column'
                  spacing={3}
                  justifyContent='center'
                >
                  <Grid
                    item
                    component={Card}
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
                    sx={{ borderBottom: '10px solid rgba(0, 255, 0, 0.5)' }}
                  >
                    <CardContent>
                      <Typography color='textSecondary' gutterBottom>
                        Recoveries
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
                        Number of deaths caused by of COVID-19
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label='sticky table'>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role='checkbox'
                                tabIndex={-1}
                                key={row.code}
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.format &&
                                      typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
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
