import {FC} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {useForm} from 'react-hook-form'
import {PatientRequest} from '../models/patient.model'
import {usePatientMutation} from '../hooks/usePatients'
import {useSnackbarContext} from '../context/snackbar.context'

interface AddPatientProps {
    open: boolean
    onClose: () => void
}

export const AddPatient: FC<AddPatientProps> = ({open, onClose}) => {
    const {register, errors, handleSubmit} = useForm()
    const snackbarContext = useSnackbarContext()
    const mutation = usePatientMutation()

    const handleSubmitForm = (data: PatientRequest) => {
        mutation.mutate(data, {
            onSuccess: () => snackbarContext.open('Poprawnie dodano pacjenta', 'success'),
            onError: () => snackbarContext.open('Błąd przy dodawaniu pacjenta', 'error')
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Dodaj pacjenta</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="Imię"
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.firstName}
                    />
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Nazwisko"
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.lastName}
                    />
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.email}
                    />
                    <TextField
                        id="identityNumber"
                        name="identityNumber"
                        label="PESEL"
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.identityNumber}
                    />
                    <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Numer telefonu"
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.phoneNumber}
                    />
                    <TextField
                        id="street"
                        name="street"
                        label="Ulica"
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.street}
                    />
                    <TextField
                        id="streetNumber"
                        name="streetNumber"
                        label="Nr domu/mieszkania"
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.streetNumber}
                    />
                    <TextField
                        id="postalCode"
                        name="postalCode"
                        label="Kod pocztowy"
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.postalCode}
                    />
                    <TextField
                        id="city"
                        name="city"
                        label="Miasto"
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.city}
                    />
                    <TextField
                        id="interview"
                        name="interview"
                        label="Wywiad"
                        multiline
                        inputRef={register({required: 'To pole jest wymagane'})}
                        error={!!errors.interview}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Zamknij</Button>
                <Button onClick={handleSubmit(handleSubmitForm)}>Dodaj pacjenta</Button>
            </DialogActions>
        </Dialog>
    )
}