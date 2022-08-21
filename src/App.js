import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import GlobalLoading from './components/GlobalLoading';
import { AuthActions } from './redux/rootAction';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import News from './pages/News';
import AboutUs from './pages/AboutUs';
import Details from './pages/Details';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthRoute } from './routes/AuthRoute';
import { I18nProvider, LOCALES } from './i18n';

function App() {
  const token = useSelector((state) => state.AuthReducer.token);
  const dispatch = useDispatch();
  const [locale, setLocale] = useState(LOCALES.ENGLISH);
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      darkMode: () => {
        setMode('dark');
      },
      lightMode: () => {
        setMode('light');
      },
    }),
    []
  );

  const modeTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userData = JSON.parse(localStorage.getItem('user'));
    if (token) {
      dispatch(AuthActions.setToken(token));
    }
    if (userData) {
      dispatch(AuthActions.setUserData(userData));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);
  return (
    <>
      <GlobalLoading />
      <I18nProvider locale={locale}>
        <ThemeProvider theme={modeTheme}>
          <BrowserRouter>
            <Header colorMode={colorMode} setLocale={setLocale} />
            <Routes>
              <Route
                exact
                path='/'
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path='/details'
                element={
                  <ProtectedRoute>
                    <Details />
                  </ProtectedRoute>
                }
              />

              <Route exact path='/news' element={<News />} />
              <Route
                exact
                path='/about'
                element={
                  <ProtectedRoute>
                    <AboutUs />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path='/signin'
                element={
                  <AuthRoute>
                    <SignIn />
                  </AuthRoute>
                }
              />
              <Route
                exact
                path='/register'
                element={
                  <AuthRoute>
                    <SignUp />
                  </AuthRoute>
                }
              />

              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </I18nProvider>
    </>
  );
}

export default App;
