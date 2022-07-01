import { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { I18nProvider, LOCALES } from './i18n';

function App() {
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
  return (
    <I18nProvider locale={locale}>
      <ThemeProvider theme={modeTheme}>
        <BrowserRouter>
          <Header colorMode={colorMode} setLocale={setLocale} />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/services' element={<div>Services</div>} />
            <Route exact path='/newcases' element={<div>New Cases</div>} />
            <Route exact path='/deads' element={<div>Deads</div>} />
            <Route exact path='/vacinations' element={<div>Vacinations</div>} />
            <Route exact path='/news' element={<div>News</div>} />
            <Route exact path='/about' element={<div>About</div>} />
            <Route exact path='/estimate' element={<div>Estimate</div>} />
            <Route exact path='/signin' element={<div>Sign in</div>} />
            <Route exact path='/register' element={<div>Register</div>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
