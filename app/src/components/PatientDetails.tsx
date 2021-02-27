import {FC} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {PatientModel} from '../models/patient.model'

interface PatientDetailsProps {
    patient: PatientModel
}

export const PatientDetails: FC<PatientDetailsProps> = ({patient}) => {
    return (
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography variant='h4'>{patient?.firstName} {patient?.lastName}</Typography>
        </Grid>
        <Grid item>
            <Typography>Pesel: {patient?.identityNumber}</Typography>
        </Grid>
        <Grid item>
            <Typography>Email: {patient?.email}</Typography>
        </Grid>
        <Grid item>
            <Typography>Telefon: {patient?.phoneNumber}</Typography>
        </Grid>
        <Grid item>
            <Typography>Adres: {patient?.street} {patient?.streetNumber}, {patient?.postalCode} {patient?.city}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>Wywiad: {patient?.interview}</Typography>
        </Grid>
    </Grid>
    )
} 