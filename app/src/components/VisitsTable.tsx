import {FC} from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import { VisitListItem } from "../models/visits.model";

interface VisitsTableProps {
    data: VisitListItem[] | undefined
}

export const VisitsTable: FC<VisitsTableProps> = ({data}) => {
    return (
        <TableContainer>
            <TableHead>
                <TableCell>
                    Imię
                </TableCell>
                <TableCell>
                    Nazwisko
                </TableCell>
                <TableCell>
                    Data wizyty
                </TableCell>
                <TableCell>
                    Akcje
                </TableCell>
            </TableHead>
            <TableBody>
                {
                    data && data.map((el, i) => (
                        <TableRow key={`visit-${i}`}>
                            <TableCell>{el.patient.firstName}</TableCell>
                            <TableCell>{el.patient.lastName}</TableCell>
                            <TableCell>{el.vistiDate}</TableCell>
                            <TableCell align="right">
                                <Link to={`/wizyty/${el.id}`}>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </Link>
                            </TableCell>

                        </TableRow>
                    ))
                }
            </TableBody>
        </TableContainer>
    )
}