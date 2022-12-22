import React from "react";
import NavBar from "../nav-Bar/nav-bar";
import { Box, Card, CardActions, CardContent, Button, Typography, CardActionArea, Switch, CardMedia, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Stack } from '@mui/material';
import { useState, useEffect } from "react";
import Axios from 'axios'
import './manage-places.css'



const Manage_Places = () => {
    const [topfive, setTopfive] = useState([])
    const [places, setPlaces] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [Loading, setLoading] = useState(true)
    // fetch Top Places
    const Fetch_Top_Five = async () => {
        let values = await Axios.get(`https://travellor-app.onrender.com/v1/tourist/fetchTop/Fiveplaces`)
        if (values.status === 200) {
            setTopfive(values.data)
        }
    }
    const FetchPlaces = async () => {
        const values = await Axios.get(` https://travellor-app.onrender.com/v1/tourist/fetch/tourist/places?page=${page}`)
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
    useEffect(() => {
        Fetch_Top_Five()
        FetchPlaces()
    }, [])

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    return (<div>
        <NavBar />
        <div>
            <h1>Manage Top Places</h1>
            <h2 style={{ color: "forestgreen", textAlign: "center" }}>Top Five places in India</h2>
            <div className="top-cards">
                {topfive.map((e) => (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={e.img}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "center" }}>
                                    {e.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {e.info.slice(0, 110)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))
                }
            </div>
            <div>
                <h2 style={{ textAlign: "center", color: "orange" }}>Places</h2>
                {!Loading ? <div className="table-places" style={{ maxWidth: "60%", margin: "auto" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Place Name</TableCell>
                                    <TableCell >State</TableCell>
                                    <TableCell>Top Places</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {places.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell >{row.State}</TableCell>
                                        <TableCell >{row.topfive ? <Switch {...label} defaultChecked value={row.topfive} onChange={(e) => console.log(e.target.value)} /> : <Switch {...label} value={row.topfive} onChange={(e) => console.log(e.target.value)} />
                                        }</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></div> : <div style={{ marginLeft: "50%" }}><CircularProgress /> </div>}
                <div className="pagination" style={{ maxWidth: "60%", marginRight: "300px" }}>
                    <Stack spacing={2}>
                        <Pagination count={totalPage} color="primary" onChange={(e, v) => { pageclick(v) }} />
                    </Stack>
                </div>
            </div>
        </div>
    </div>)
}



export default Manage_Places