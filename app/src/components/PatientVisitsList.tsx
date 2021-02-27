import {FC} from 'react'
import {VisitPatient} from '../models/visits.model'
import Grid from '@material-ui/core/Grid'
import T from '@material-ui/core/Typography'

interface PatientVisitsListProps {
    visits: VisitPatient[]
}

const M

export const PatientVisitsList: FC<PatientVisitsListProps> = ({visits}) => {
    return (
        <Grid container>
            {
                visits.map(visit => (
                    <Grid item key={`visit-${visit.id}`}>
                        <T>{visit.visitDate}</T>
                        <T>Opis: {visit.description}</T>
                        <T> Zalecenia: {visit.recommendations}</T>
                        
                    </Grid>
                ))
            }
        </Grid>
    )
}