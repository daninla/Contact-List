import PhoneIcon from '@mui/icons-material/Phone';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#186915' }}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: '#f8fff9',
              alignItems: 'center',
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              endIcon: {
                marginLeft: '-100px',
              },
            }}
          >
            Contact List
            <PhoneIcon sx={{ color: '#f8fff9', ml: '20px' }} />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
