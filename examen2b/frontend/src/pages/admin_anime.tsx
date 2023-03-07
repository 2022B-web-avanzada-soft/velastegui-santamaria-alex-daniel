import Layout from "@/components/Layout";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    DialogContentText,
    Checkbox, FormControlLabel
} from "@mui/material";
import {useForm, SubmitHandler} from "react-hook-form";
import {useState} from "react";
import {AnimeInterface} from "@/interfaces/anime-interface";

type Inputs = {
    id:number,
    name: string;
    isOnAir: boolean;
    releaseDate: Date;
    capNumber: number;
    characters: string;
};

export default function () {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [openCreateInstanceDialog, setOpenCreateInstanceDialog] = useState(false);
    const naruto: AnimeInterface = {
        id: 1,
        name: "Naruto",
        isOnAir: false,
        releaseDate: "2002-10-03",
        capNumber: 220,
        characters: ["Naruto", "Sasuke", "Sakura" ],
    }
    const dragonball: AnimeInterface = {
        id: 2,
        name: "Dragon Ball",
        isOnAir: false,
        releaseDate: "1986-02-26",
        capNumber: 153,
        characters: ["Goku", "Vegeta", "Gohan" ],
    }
    const [animes, setAnimes] = useState([naruto, dragonball] as AnimeInterface[]);

    function AnimeCards(): JSX.Element[]  {
        const returnCards: JSX.Element[] = [];
        animes.forEach((anime: AnimeInterface) => {
            returnCards.push(
                <Grid item xs={12} bgcolor={"#ECEBEB"} padding={"1rem"} sx={{
                    borderRadius: "1rem",
                    marginBottom: "1rem",
                }}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <h2 style={{color: "#6F6F6F"}}>{anime.name}</h2>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                            <Button variant={"contained"} style={{
                                borderRadius: 35,
                                backgroundColor: "#e5625e",
                            }}  sx={{
                                marginLeft: "1rem",
                            }}>
                                Editar
                            </Button>
                            <Button variant={"contained"} style={{
                                borderRadius: 35,
                                backgroundColor: "#e5625e",
                            }} sx={{
                                marginLeft: "1rem",
                            }}>
                                Eliminar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <p style={{color: "#6F6F6F"}}><strong>Fecha de estreno: </strong> {anime.releaseDate}</p>
                            <p style={{color: "#6F6F6F"}}><strong>Capítulos: </strong>{anime.capNumber}</p>
                            <p style={{color: "#6F6F6F"}}><strong>Está al aire: </strong>{anime.isOnAir? "Si" : "No"}</p>
                        </Grid>
                    </Grid>
                </Grid>
            )
        })
        return returnCards;
    }


    const handleCancelCreateInstanceDialog = () => {
        setOpenCreateInstanceDialog(false);
    };
    const handleAcceptCreateInstanceDialog: SubmitHandler<Inputs> = data => {
        console.log(data);
        setOpenCreateInstanceDialog(false);
    };
    const handleCreateInstance = () => {
        console.log("Create instance")
        setOpenCreateInstanceDialog(true);
    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} bgcolor={"#bdd358"} color={"white"} padding={"1rem"} sx={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                }}>
                    <Grid container alignContent={"center"}>
                        <Grid item md={8}>
                            <h1>Gestionar Animes</h1>
                        </Grid>
                        <Grid item md={4} sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                            <Button variant={"contained"} style={{
                                borderRadius: 35,
                                backgroundColor: "#e5625e",
                            }}  onClick={handleCreateInstance} sx={{
                                marginLeft: "1rem",
                            }}>
                                Agregar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} bgcolor={"#f5f5f5"} padding={"1rem"}>
                    <Grid container>
                        {AnimeCards()}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={openCreateInstanceDialog}>
                <DialogTitle>Crear un nuevo Anime</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Los siguientes datos son requeridos para registrar un nuevo anime.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre del anime"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("name", {required: "Este campo es requerido"})}
                    />
                    {errors.name && <span>Este campo es requerido</span>}
                    <TextField
                        margin="dense"
                        id="capNumber"
                        label="Numero de capitulos"
                        type="integer"
                        fullWidth
                        variant="outlined"
                        {...register("capNumber", {required: "Este campo es requerido"})}
                    />
                    {errors.capNumber && <span>Este campo es requerido</span>}
                    <TextField
                        margin="dense"
                        id="releaseDate"
                        label="Fecha de estreno"
                        type="date"
                        fullWidth
                        variant="outlined"
                        {...register("releaseDate", {required: "Este campo es requerido"})}
                    />
                    {errors.releaseDate && <><span>Este campo es requerido</span><br/></>}
                    <FormControlLabel
                        id={"isOnAir"}
                        control={<Checkbox defaultChecked/>}
                        label="¿Está al aire?"
                        {...register("isOnAir")}
                    />
                    <DialogContentText>
                        Ha continuacion coloque las ciudades que ha visitado separadas por comas.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelCreateInstanceDialog}>Cancel</Button>
                    <Button onClick={handleSubmit(handleAcceptCreateInstanceDialog)}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    )
}