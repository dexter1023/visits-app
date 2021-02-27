import { FC, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField'
import {useVisits} from '../hooks/useVisits'
import {VisitsTable} from '../components/VisitsTable'
import {formatDate} from '../utils/date.utils'
import Button from '@material-ui/core/Button'
import { AddVisit } from "../components/AddVisit";

export const VisitsPage: FC = () => {
    const [date, setDate] = useState<Date>(new Date())
    const [visitModal, setVisitModal] = useState<boolean>(false)

    const handleCloseModal = () => {
        setVisitModal(false)
    }

    const handleOpenModal = () => {
        setVisitModal(true)
    }

    const { data } = useVisits(date)

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(e.target.value))
    }

    return (
        <Grid container direction='row'>
            <Grid item>
                <Button onClick={handleOpenModal}>Dodaj wizytę</Button>
                <TextField 
                    id="date"
                    type="date"
                    defaultValue={formatDate(date)}
                    onChange={handleDateChange}
                />
            </Grid>
            <Grid item style={{width: '100%'}}>
                <Grid container>
                    <VisitsTable data={data}/>
                </Grid>
            </Grid>
            <AddVisit open={visitModal} onClose={handleCloseModal} />
        </Grid>
    )

}