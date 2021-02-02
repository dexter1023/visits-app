import { Grid } from "@material-ui/core"
import React, {FC} from 'react'
import {Switch} from 'react-router-dom'
import UnauthenticateRoute from '../utils/unauthenticate-route'

const containerStyle = {
    width: '100vw',
    height: '100vh'
}

export const UnauthorizedLayout: FC = ({children}) => (
    <Grid container justify='center' alignItems='center' style={containerStyle} >
        <Switch>
            <UnauthenticateRoute >

            </UnauthenticateRoute>
        </Switch>
    </Grid>
)