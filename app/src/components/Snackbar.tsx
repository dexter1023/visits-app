import { useSnackbarContext } from "../context/snackbar.context"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />

export const SnackbarComponent = () => {
    const {isOpen, close, text, type} = useSnackbarContext()

    const handleClose = () => close()

    return (
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={isOpen}
            autoHideDuration={6000}
            onClose={handleClose}
      >
          <Alert severity={type}>{text}</Alert>
      </Snackbar>
    )
}