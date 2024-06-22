import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles"
import CustomLabel from "./CustomLabel";
import { Controller } from "react-hook-form";

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: 5,
    },
    '&:hover fieldset': {
      borderColor: error
        ? theme.palette.error.light
        : theme.palette.success.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.success.main,
    },
  },
}))


const CustomTextField = ({
  name, label, className, sx, defaultValue, isRequired, varaint, type, placeholder, control, style
}) => {
  return (
    <div className="flex flex-col">
      <CustomLabel>
        {label}
        {isRequired && <span className="text-red-500"> *</span>}
      </CustomLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({
          field,
          fieldState: { error }
        }) => (
          <StyledTextField
            {...field}
            className={className}
            sx={sx}
            style={style}
            type={type}
            variant={varaint}
            placeholder={placeholder}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
    </div>
  )
}

export default CustomTextField
