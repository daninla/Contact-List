import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ContactItem({
  contact,
  deleteContact,
  selectContact,
  handleClearSuccessEditContact,
}) {
  const setDoubleClick = () => {
    selectContact(contact);
    handleClearSuccessEditContact();
  };

  return (
    <Box
      component="li"
      onDoubleClick={setDoubleClick}
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        border: '1px solid #000',
        marginBottom: '5px',
        cursor: 'pointer',
        listStyle: 'none',
        width: '300px',
        height: '40px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          marginLeft: '10px',
        }}
      >
        <Typography component="p">{contact.firstName}</Typography>
        <Typography component="p">{contact.lastName}</Typography>
      </Box>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          deleteContact(contact.id);
          handleClearSuccessEditContact();
        }}
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          borderRadius: 0,
          minWidth: '50px',
          '&:hover': {
            backgroundColor: '#115293',
          },
        }}
      >
        X
      </Button>
    </Box>
  );
}

export default ContactItem;
