import NavBar from "../nav-Bar/nav-bar";
import { Box, TextField, Button, Select, InputLabel, FormControl, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Pagination, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './stateAdd.css'
import Axios from "axios"
import { useState, useEffect } from "react";


const AddStates = () => {
    const [state, setState] = useState([])
    const [locate, setLocate] = useState([])
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(true)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // state Api

    const FetchAllState = async () => {
        let values = await Axios.get(`https://tavel-advisor.herokuapp.com/v1/state`)
        if (values.status === 200) {
            setLoading(false)
        }
        setState(values.data)
    }

    // Fetch Category

    const FetchCategory = async () => {
        let values = await Axios.get(`https://tavel-advisor.herokuapp.com/v1/category`)
        setLocate(values.data)
    }
    console.log(locate);

    useEffect(() => {
        FetchCategory()
        FetchAllState()
    }, [])
    console.log(state);


    return (<div>
        <NavBar />
        <div className="state">
            <div className="stateform">
                <h1>State Enrolment</h1>
                <div className="boxes">
                    <TextField
                        id="demo-helper-text-misaligned"
                        label="Enter State Name"
                        style={{ width: "100%", maxWidth: "95%", marginLeft: "10px", paddingTop: "10px" }}
                        size="sm"
                    />
                    <FormControl sx={{ m: 1, minWidth: 495 }}>
                        <InputLabel id="demo-simple-select-helper-label">Select Located</InputLabel>

                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            style={{ width: "100%", marginTop: "10px", maxWidth: "95%", marginLeft: "10px" }}
                            label="Age"
                            onChange={(e) => { console.log(e.target.value) }}
                        >{locate.map(e => <MenuItem value={e._id}>{e.Name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        id="demo-helper-text-misaligned"
                        label="Enter Captital"
                        style={{ width: "100%", marginTop: "10px", maxWidth: "95%", marginLeft: "10px" }}
                        size="sm"
                    />
                    <textarea rows="4" cols="50" style={{ width: "94%", marginTop: "10px", marginLeft: "10px" }} placeholder=" Enterhistory" />
                    <TextField
                        id="demo-helper-text-misaligned"
                        label="Enter Climate"
                        style={{ width: "100%", marginTop: "5px", maxWidth: "95%", marginLeft: "10px" }}
                        size="sm"
                    />
                    <TextField
                        id="demo-helper-text-misaligned"
                        label=" Enter time To Visit"
                        style={{ width: "100%", marginTop: "10px", maxWidth: "95%", marginLeft: "10px" }}
                        size="sm"
                    />
                    <TextField
                        id="demo-helper-text-misaligned"
                        label="Enter Food   "
                        style={{ width: "100%", marginTop: "10px", maxWidth: "95%", marginLeft: "10px" }}
                        size="sm"
                    />
                    <TextField
                        id="demo-helper-text-misaligned"
                        label="User Name"
                        style={{ width: "100%", marginTop: "10px", maxWidth: "95%", marginLeft: "10px" }}
                        size="sm"
                    />
                    <TextField
                        id="demo-helper-text-misaligned"
                        label="Enter Latitude   "
                        style={{ marginTop: "10px", marginLeft: "10px" }}
                        size="sm"
                    />
                    <TextField
                        id="demo-helper-text-misaligned"
                        label="Enter Longitude"
                        style={{ marginLeft: "28px", marginTop: "10px" }}
                        size="sm"
                    />
                    <Button
                        variant="contained"
                        size="large"
                        style={{ marginTop: "3%", width: "80%", marginLeft: "45px", marginBottom: "15px" }}
                    >
                        Add State
                    </Button>
                </div>
            </div>
            <div className="edit_model">
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="500px"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Edit The State"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="State Name"
                            style={{ width: "100%", marginTop: "10px", maxWidth: "96%" }}
                            size="sm"
                        /><br />
                        <FormControl sx={{ m: 1, minWidth: 475 }}>
                            <InputLabel id="demo-simple-select-helper-label">Select Located</InputLabel>

                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                style={{ width: "100%", marginTop: "1px", maxWidth: "100%", marginLeft: "-10px" }}
                                label="Age"
                                onChange={(e) => { console.log(e.target.value) }}
                            >{locate.map(e => <MenuItem value={e._id}>{e.Name}</MenuItem>)}
                            </Select>
                        </FormControl><br />
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="Enter Capital"
                            style={{ width: "100%", marginTop: "10px", maxWidth: "96%", }}
                            size="sm"
                        /><br />
                        <textarea rows="4" cols="100" style={{ maxWidth: "465px", marginTop: "10px", marginLeft: "2px" }} placeholder=" Enterhistory" /><br />
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="Enter Climate"
                            style={{ width: "100%", marginTop: "5px", maxWidth: "96%" }}
                            size="sm"
                        /><br />
                        <TextField
                            id="demo-helper-text-misaligned"
                            label=" Enter time To Visit"
                            style={{ width: "100%", marginTop: "10px", maxWidth: "96%" }}
                            size="sm"
                        /><br />
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="Enter Food   "
                            style={{ width: "100%", marginTop: "10px", maxWidth: "96%" }}
                            size="sm"
                        />
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="Enter Latitude   "
                            style={{ marginTop: "10px" }}
                            size="sm"
                        />
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="Enter Longitude"
                            style={{ marginLeft: "28px", marginTop: "10px" }}
                            size="sm"
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" style={{ background: "red" }}>Close</Button>
                        <Button onClick={handleClose} variant="contained" color="success">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
            <div className="available_State">
                <h1 style={{}}>Available States</h1>
                <div className="table-State" style={{ position: "relative" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: "lightcyan" }}>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>Located</TableCell>
                                    <TableCell>Lat & Long</TableCell>
                                    <TableCell>Edit (State)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.map((row, index) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell >{row.category == null ? "Not Located" : row.category}</TableCell>
                                        <TableCell >{row.lot & row.long == null ? "Missing" : row.lot & row.long}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" endIcon={<EditIcon />} onClick={(e) => { console.log(row._id); handleClickOpen() }}>
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {loading ? <div style={{ position: "absolute", top: "30px", marginLeft: "45%" }}>
                        <CircularProgress size={"100px"} />
                    </div> : ""}
                    <div className="pagination">
                        <Stack spacing={2}>
                            <Pagination count={10} color="primary" onChange={(e, v) => { console.log(v) }} />
                        </Stack>
                    </div>
                </div>
            </div>

        </div>

    </div>)
}


export default AddStates