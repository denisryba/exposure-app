import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SelectStaff({ fetchFunc, label, passStaffObj }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const staff = await fetchFunc();

      if (active) {
        setOptions(staff);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, fetchFunc]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (e, value, reason) => {
    if (reason === 'select-option') {
      passStaffObj(value);
    }
  }

  return (
    <Autocomplete
      style={{ width: 300 }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={handleChange}
      getOptionSelected={(option, value) =>
        (option.name.last + ' ' + option.name.first + ' ' + option.name.middle)
        === (value.name.last + ' ' + value.name.first + ' ' + value.name.middle)}
      getOptionLabel={(option) => option.name.last + ' ' + option.name.first + ' ' + option.name.middle}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}