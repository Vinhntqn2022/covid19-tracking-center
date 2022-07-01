import { Box } from '@mui/system';
import './Home.css';
import translate from '../../i18n/translate';

export default function Home() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        border: '1px solid',
        borderColor: 'red',
        height: '2000px',
      }}
    >
      {translate('hello')}
      <hr />
      {translate('home')}
    </Box>
  );
}
