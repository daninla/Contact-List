import { useField } from 'formik';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const ContactInput = ({ placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <TextField
      {...field}
      {...props}
      label={placeholder}
      fullWidth
      size="small"
      error={meta.touched && Boolean(meta.error)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => helpers.setValue('')}
                edge="end"
                size="small"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
export default ContactInput;