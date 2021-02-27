import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {LoginForm} from '../components/LoginForm'
import { FC } from "react";
import { useAuthContext } from "../context/auth.context";
import { AuthRequest } from "../models/auth.model";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    card: {
        padding: '20px',
        width: '400px'
    }
})

export const LoginPage: FC = () => {
    const classes = useStyles()
    const authContext = useAuthContext()
    const [error, setError] = useState(false)
    const history = useHistory()

    const onSubmit = async (data: AuthRequest) => {
        try {
            await authContext?.login(data)
            setError(false)
            history.push('/wizyty')
        } catch (error) {
            setError(true)
        }
    }

    return (
        <Card className={classes.card}>
            <Typography variant='h3' component='h1' align='center'>Logowanie</Typography>
            <CardContent>
                <LoginForm onSubmit={onSubmit}/>
                {error && <Typography color='error' align="center">Nieprawidłowe dane</Typography>}
            </CardContent>
        </Card>
    )
}