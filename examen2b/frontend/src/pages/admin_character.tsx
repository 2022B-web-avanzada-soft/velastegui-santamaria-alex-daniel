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
    Checkbox, FormControlLabel, Select, InputLabel, MenuItem
} from "@mui/material";
import {useForm, SubmitHandler} from "react-hook-form";
import {useEffect, useState} from "react";
import {CharacterInterface} from "@/interfaces/character-interface";
import {AnimeInterface} from "@/interfaces/anime-interface";
import axios from "axios";
import SelectInput from "@mui/material/Select/SelectInput";

const URL = "http://localhost:3030/character";
type Inputs = {
    id: number;
    name: string;
    isMortal: boolean;
    birthDate: string;
    isMarried: boolean;
    anime?: number;
};

export default function () {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<Inputs>();
    const [openCreateInstanceDialog, setOpenCreateInstanceDialog] = useState(false);
    const [characters, setCharacters] = useState([] as CharacterInterface[]);
    const [animes, setAnimes] = useState([] as AnimeInterface[]);
    const [character, setCharacter] = useState({} as CharacterInterface);

    useEffect(
        () => {
            const getCharacters = async () => {
                const response = await fetch(URL);
                const characters = await response.json();
                setCharacters(characters);
            }
            const getAnimes = async () => {
                const response = await fetch("http://localhost:3030/anime");
                const animes = await response.json();
                setAnimes(animes);
            }
            getCharacters();
            getAnimes();
        },
        []
    )

    function CharacterCards(): JSX.Element[]  {
        const returnCards: JSX.Element[] = [];
        characters.forEach((character: CharacterInterface) => {
            returnCards.push(
                <Grid item xs={12} bgcolor={"#ECEBEB"} padding={"1rem"} sx={{
                    borderRadius: "1rem",
                    marginBottom: "1rem",
                }} key={character.id}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <h2 style={{color: "#6F6F6F"}}>{character.name}</h2>
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
                            }} onClick={(e) => {handleEditInstance(character)}}>
                                Editar
                            </Button>
                            <Button variant={"contained"} style={{
                                borderRadius: 35,
                                backgroundColor: "#e5625e",
                            }} sx={{
                                marginLeft: "1rem",
                            }} onClick={(event) => {handleDeleteInstance(character.id)}}>
                                Eliminar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <p style={{color: "#6F6F6F"}}><strong>Fecha de nacimiento: </strong> {character.birthDate}</p>
                            <p style={{color: "#6F6F6F"}}><strong>Es mortal: </strong>{character.isMortal? "Si" : "No"}</p>
                            <p style={{color: "#6F6F6F"}}><strong>Está casado: </strong>{character.isMarried? "Si" : "No"}</p>
                            <p style={{color: "#6F6F6F"}}><strong>Anime: </strong>{character.anime?.name}</p>
                        </Grid>
                    </Grid>
                </Grid>
            )
        })
        return returnCards;
    }


    const handleDeleteInstance = (characterId: number) => {
        axios.delete(`${URL}/${characterId}`).then(r => {
            const newCharacters = characters.filter((character: CharacterInterface) => character.id !== characterId);
            setCharacters(newCharacters);
        }).catch(e => {
            console.log(e);
        })

    }
    const handleCancelCreateInstanceDialog = () => {
        setCharacter({} as CharacterInterface)
        setOpenCreateInstanceDialog(false);
    };
    const handleAcceptCreateInstanceDialog: SubmitHandler<Inputs> = data => {

        const newCharacter: CharacterInterface = {
            id: data.id,
            name: data.name,
            isMortal: data.isMortal,
            birthDate: data.birthDate,
            isMarried: data.isMarried,
            anime: data.anime,
        }
        axios.post(URL, newCharacter).then(r => {
            newCharacter.anime = animes.find((anime: AnimeInterface) => anime.id === newCharacter.anime);
            const newCharacters = characters.concat(newCharacter);
            setCharacters(newCharacters);
            setOpenCreateInstanceDialog(false);
        }).catch(e => {
            console.log(e);
        });

    };
    const handleUpdateCreateInstanceDialog: SubmitHandler<Inputs> = data => {
        console.log(data)
        const newCharacter: CharacterInterface = {
            id: character.id,
            name: data.name,
            isMortal: data.isMortal,
            birthDate: data.birthDate,
            isMarried: data.isMarried,
            anime: data.anime,
        }
        axios.put(`${URL}/${character.id}`, newCharacter).then(r => {
            newCharacter.anime = animes.find((anime: AnimeInterface) => anime.id === newCharacter.anime);
            const newCharacters = characters.map((character: CharacterInterface) => {
                if (character.id === newCharacter.id) {
                    return newCharacter;
                }
                return character;
            });
            setCharacters(newCharacters);
            setCharacter({} as CharacterInterface)
            setOpenCreateInstanceDialog(false);
        }).catch(e => {
            console.log(e);
        });
    }
    const handleCreateInstance = () => {
        console.log("Create instance")
        setOpenCreateInstanceDialog(true);
    }
    const handleEditInstance = (c: CharacterInterface) => {
        setCharacter(c);
        setOpenCreateInstanceDialog(true);
    }

    const openDataDialog = (character: CharacterInterface) => {
        return(
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
                        label="Nombre del personaje"
                        defaultValue={character.name}
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("name", {required: "Este campo es requerido"})}
                    />
                    {errors.name && <span>Este campo es requerido</span>}
                    <TextField
                        margin="dense"
                        id="birthDate"
                        defaultValue={character.birthDate}
                        type="date"
                        fullWidth
                        variant="outlined"
                        {...register("birthDate", {required: "Este campo es requerido"})}
                    />
                    {errors.birthDate && <><span>Este campo es requerido</span><br/></>}
                    <Select
                        margin="dense"
                        labelId="Anime"
                        id="anime"
                        label="Anime"
                        defaultValue={character.anime?.id}
                        fullWidth
                        variant="outlined"
                        {...register("anime", {required: "Este campo es requerido"})}>
                        {animes.map((anime: AnimeInterface) => {
                            return <MenuItem key={anime.id} value={anime.id}>{anime.name}</MenuItem>
                        })
                        }
                    </Select>
                    <FormControlLabel
                        id={"isMortal"}
                        control={<Checkbox defaultChecked={character.isMortal}/>}
                        label="¿Es Mortal?"
                        {...register("isMortal")}
                    />
                    <FormControlLabel
                        id={"isMarried"}
                        control={<Checkbox defaultChecked={character.isMarried}/>}
                        label="¿Está casado?"
                        {...register("isMarried")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelCreateInstanceDialog}>Cancelar</Button>
                    {character.id? <Button onClick={handleSubmit(handleUpdateCreateInstanceDialog)} disabled={!isValid}>Actualizar</Button> :
                        <Button onClick={handleSubmit(handleAcceptCreateInstanceDialog)} disabled={!isValid}>Crear</Button>}
                </DialogActions>
            </Dialog>
        )
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
                            <h1>Gestionar Personajes</h1>
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
                        {CharacterCards()}
                    </Grid>
                </Grid>
            </Grid>
            {openDataDialog(character)}
        </Layout>
    )
}