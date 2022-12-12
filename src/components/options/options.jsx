import { useState, useEffect } from "react";
import NavBar from "../nav-Bar/nav-bar";
import { Card, CardContent, CardMedia, CardActionArea, Typography, Button } from "@mui/material"
import './options.css'
import { useNavigate } from "react-router-dom"

const Options = () => {
    const navigate = useNavigate()
    return (<div>
        <NavBar />
        <div className="container">
            <h1 style={{ textAlign: "center" }}>Welcome To Admin-Panel</h1>
            <div className="cards">
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea onClick={() => { navigate("/AddState") }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="http://www.incredibleindiatour.net/images/state-map-2.jpg"
                            alt="green iguana"
                        />

                        <CardContent  >
                            <Typography gutterBottom variant="h5" component="div">
                                Manage States
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You can Add The States And Edit the existing State like add new states and add locations and where located the state from existing State
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea onClick={() => navigate("/places")}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://fullsuitcase.com/wp-content/uploads/2020/10/Amazing-destinations-from-all-over-the-world.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Manage The Places
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You can Add The places And Edit the existing places like add new places and add places  where located. and add places details from existing State
                            </Typography>
                        </CardContent>
                    </CardActionArea>

                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea onClick={() => navigate("/manageTopPlaces")}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://ds393qgzrxwzn.cloudfront.net/resize/m600x500/cat1/img/images/0/Qk72bvtEC7.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Manage top Places
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                this menu provide to access top Five places and change the top places, And change the mostly visited places
                            </Typography>
                        </CardContent>

                    </CardActionArea>

                </Card>
            </div>
        </div>
    </div>)
}


export default Options