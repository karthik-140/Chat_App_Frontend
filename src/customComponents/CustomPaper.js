import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles"

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[10],
}))

const CustomPaper = (props) => {
  const { className, ...rest } = props
  return (
    <div className="flex justify-center max-w-full">
      <StyledPaper
        className={`w-10/12 sm:w-3/4 lg:w-1/2 md:mx-10 sm:mx-5 mb-10 mt-6 ${className}`}
        {...rest}
      />
    </div>
  )
}

export default CustomPaper
