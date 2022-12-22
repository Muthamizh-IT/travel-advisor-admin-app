import { useState, useEffect } from "react";
import NavBar from "../nav-Bar/nav-bar";
import {
    Table, TableBody, TableCell, useMediaQuery, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Box, Stack, Pagination, TextField, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem
} from "@mui/material"
import './places.css'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import PlaceIcon from '@mui/icons-material/Place';
import Axios from "axios"


const Places = () => {
    const [openadd, setOpenadd] = useState(false);
    const [places, setPlaces] = useState([])
    const [state, setState] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [totalPage, setTotalPage] = useState(0)
    const [savePlace, setSavePlace] = useState({})
    const [EditPlace, setEditPlace] = useState({})
    const [placeId, setPlaceId] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenadd = () => {
        setOpenadd(true);
    };

    const handleCloseadd = () => {
        setOpenadd(false);
    };
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // fetch places

    const FetchPlaces = async () => {
        const values = await Axios.get(`https://travellor-app.onrender.com/v1/tourist/fetch/tourist/places?page=${page}`)
        if (values.status === 200) {
            setLoading(false)
            setPlaces(values.data.values)
            let pages = Math.ceil(values.data.total / 10)
            setTotalPage(pages)
        }
    }

    const pageclick = async (page) => {
        setPage(page - 1)
        page = page - 1
        setLoading(true)
        const values = await Axios.get(` https://travellor-app.onrender.com/v1/tourist/fetch/tourist/places?page=${page}`)
        if (values.status === 200) {
            setLoading(false)
            setPlaces(values.data.values)
            let pages = Math.ceil(values.data.total / 10)
            setTotalPage(pages)
        }

    }
    // Fetch All States

    const fetchStates = async () => {
        let values = await Axios.get(` https://travellor-app.onrender.com/v1/state`)
        if (values.status === 200) {
            setState(values.data)
        }
    }
    useEffect(() => {
        FetchPlaces()
        fetchStates()
    }, [])

    const OnchangeFun = async (e) => {
        setSavePlace({ ...savePlace, [e.target.name]: e.target.value })
    }
    const OnSubmitSavePlace = async () => {
        await Axios.post('https://travellor-app.onrender.com/v1/tourist', savePlace).then((e) => {
            console.log(e.data)
        })
    }

    const updateOneChange = async (e) => {
        setEditPlace({ ...EditPlace, [e.target.name]: e.target.value })
    }

    const EditOnsubmit = async () => {
        console.log(EditPlace)
        await Axios.put(`https://travellor-app.onrender.com/v1/tourist/${placeId}`, EditPlace).then((e) => {
            console.log(e.data)
        })
    }

    return (<div>
        <NavBar />
        <div className="container" style={{ position: "relative" }}>
            <h1>Manage Places</h1>
            <div className="places-table" style={{ position: "relative", maxWidth: "70%", margin: "auto" }}>
                <div>
                    <Dialog open={open} onClose={handleClose} fullScreen>
                        <DialogContent>
                            <div className="editplace">
                                <h2>Edit Places <EditIcon /></h2>
                                <div className="form_edit">

                                    <input type="text" placeholder="place Name" style={{ width: "350px", height: "39px" }} name="name" onChange={(e) => { updateOneChange(e) }} /><br></br>
                                    <select style={{ width: "360px", height: "45px" }} onChange={(e) => { updateOneChange(e) }} name="stateId" >
                                        <option value={"null"}>Select State</option>
                                        {
                                            state.map((e) => (
                                                <option value={e._id}>{e.name}</option>
                                            ))
                                        }
                                    </select><br></br>
                                    Image <Button variant="contained" component="label" size="sm" style={{ marginTop: "10px" }}>
                                        Upload
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button><br></br>
                                    <input type="text" placeholder="Info" style={{ width: "350px", height: "39px" }} name="info" onChange={(e) => { updateOneChange(e) }} /><br></br>
                                    <input type="text" placeholder=" Enter Latitude" style={{ width: "350px", height: "39px" }} name="lat" onChange={(e) => { updateOneChange(e) }} /><br></br>
                                    <input type="text" placeholder=" Enter Longitude" style={{ width: "350px", height: "39px" }} name="long" onChange={(e) => { updateOneChange(e) }} /><br></br>
                                    <Button variant="contained" onClick={() => { EditOnsubmit(); handleClose() }} style={{ marginTop: "10px", width: "200px", marginLeft: "70px", marginBottom: "10px" }} endIcon={<EditIcon />}>save</Button>
                                </div>

                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        fullScreen={fullScreen}
                        open={openadd}
                        onClose={handleCloseadd}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center", color: "blue" }}>
                            {"Add New Place"}<PlaceIcon style={{ color: "blue" }} />
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <TextField
                                    label="Enter Place Name"
                                    id="filled-hidden-label-small"
                                    variant="filled"
                                    size="small"
                                    name="name"
                                    onChange={(e) => { OnchangeFun(e) }}
                                    style={{ maxHeight: "20px", }}
                                />
                                <FormControl variant="filled" sx={{ minWidth: 215 }} style={{ marginLeft: "10px" }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Age"
                                        size="small"
                                        name="stateId"
                                        onChange={(e) => { OnchangeFun(e) }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            state.map((e) => (
                                                <MenuItem value={e._id}>{e.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl><br />
                                <TextField
                                    label="Enter place info"
                                    id="filled-hidden-label-small"
                                    variant="filled"
                                    name="info"
                                    size="small"
                                    style={{ marginTop: "5px" }}
                                    onChange={(e) => { OnchangeFun(e) }}
                                />
                                <Button variant="contained" component="label" style={{ marginLeft: "10px", marginTop: "5px", width: "216px", height: "45px" }} endIcon={<PhotoCameraBackIcon />}>
                                    choose image
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button><br />
                                <TextField
                                    label="Enter Lattitude"
                                    id="filled-hidden-label-small"
                                    variant="filled"
                                    size="small"
                                    name="lat"
                                    style={{ marginTop: "5px" }}
                                    onChange={(e) => { OnchangeFun(e) }}
                                />
                                <TextField
                                    label="Enter Longitude"
                                    id="filled-hidden-label-small"
                                    variant="filled"
                                    size="small"
                                    name="long"
                                    style={{ marginLeft: "10px", marginTop: "5px" }}
                                    onChange={(e) => { OnchangeFun(e) }}
                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCloseadd} variant="contained" color="error">
                                close
                            </Button>
                            <Button onClick={() => { handleCloseadd(); OnSubmitSavePlace() }} autoFocus variant="contained" color="success">
                                Add Place
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Button variant="contained" endIcon={<AddIcon />} style={{ marginBottom: "2%" }} onClick={handleClickOpenadd}>Add</Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell >Place</TableCell>
                                <TableCell >State</TableCell>
                                <TableCell >Lattitude & Longitude</TableCell>
                                <TableCell >Edite</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {places.map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell >{row.State}</TableCell>
                                    <TableCell >{row.lat ? <p style={{ color: "green" }}>{row.lat + " " + row.long}</p> : <p style={{ color: "red" }}>Misssing</p>}</TableCell>
                                    <TableCell > <Button variant="contained" endIcon={<EditIcon />} onClick={(e) => { setPlaceId(row._id); handleClickOpen() }}>
                                        Edit
                                    </Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {loading ? <div className="loader" style={{ position: "absolute", marginLeft: "45%", marginTop: "10px" }}>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </div> : ""}
                <div className="pagination">
                    <Stack spacing={2}>
                        <Pagination count={totalPage} color="primary" onChange={(e, v) => { pageclick(v) }} />
                    </Stack>
                </div>
            </div>
            <div>

            </div>
        </div>

    </div >)
}


export default Places