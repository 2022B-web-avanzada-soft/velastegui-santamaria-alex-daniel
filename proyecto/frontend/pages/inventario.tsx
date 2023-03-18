import Layout from "../components/Layout";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    DialogContentText,
    Checkbox, FormControlLabel, Box
} from "@mui/material";
import {useForm, SubmitHandler} from "react-hook-form";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {ProductoInterface} from "../interfaces/producto-interface";
import styles from "../components/Layout.module.css";

const URL = "http://localhost:3030/producto";

type Inputs = {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
    tieneIva: boolean;
};

export default function () {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<Inputs>();
    const [openCreateInstanceDialog, setOpenCreateInstanceDialog] = useState(false);
    const [producto, setProducto] = useState({} as ProductoInterface);
    const [productos, setProductos] = useState([] as ProductoInterface[]);

    useEffect(
        () => {
            const getProductos = async () => {
                const response = await fetch(URL);
                const productos = await response.json();
                setProductos(productos);
            }
            getProductos();
        },
        []
    )

    function ProductoCards(): JSX.Element[]  {
        const returnCards: JSX.Element[] = [];
        productos.forEach((productos: ProductoInterface) => {
            returnCards.push(
                <Grid item xs={12}   key={productos.id}>
                    <Grid container>
                        <Grid item xs={3}>
                            <p className={"datosProducto"}>{productos.nombre.toString()}</p>
                        </Grid>
                        <Grid item xs={3}>
                            <p className={"datosProducto"}>{productos.cantidad}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p className={"datosProducto"}>{productos.precio}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p className={"datosProducto"}>{productos.tieneIva? "Si" : "No"}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid item xs={12} >
                                <Button className={"botones"} onClick={(e) => hanldeUpdateInstanceDialog(productos)}>
                                    <img className={"imagenProductos"} src="/imagenes/editar%20(1).png" alt="Image right" />
                                </Button>
                                <Button className={"botones"} onClick={(e) => handleDeleteInstance(productos.id)}>
                                    <img className={"imagenProductos"} src="/imagenes/eliminar.png" alt="Image right" />
                                </Button>
                            </Grid>
                        </Grid>


                    </Grid>
                </Grid>
            )
        })
        return returnCards;
    }


    const handleDeleteInstance = (productoId: number) => {
        axios.delete(`${URL}/${productoId}`).then(r => {
            const newProductos = productos.filter((producto: ProductoInterface) => producto.id !== productoId);
            setProductos(newProductos);
        }).catch(e => {
            console.log(e);
        })

    }

    const hanldeUpdateInstanceDialog = (producto: ProductoInterface) => {
        setProducto(producto);
        setOpenCreateInstanceDialog(true);
    }

    const handleCancelCreateInstanceDialog = () => {
        setProducto({} as ProductoInterface);
        setOpenCreateInstanceDialog(false);
    };
    const handleAcceptCreateInstanceDialog: SubmitHandler<Inputs> = data => {
        const newProducto: ProductoInterface = {
            id: 1,
            nombre: data.nombre,
            cantidad: +data.cantidad,
            precio: +data.precio,
            tieneIva: data.tieneIva,
        }
        axios.post(URL, newProducto).then(r => {
            setProductos([...productos, r.data]);
            setOpenCreateInstanceDialog(false);
        }).catch(e => {
            console.log(e);
        });
    };
    const handleAcceptUpdateInstanceDialog: SubmitHandler<Inputs> = data => {
        const newProducto: ProductoInterface = {
            id: producto.id,
            nombre: data.nombre,
            cantidad: +data.cantidad,
            precio: +data.precio,
            tieneIva: data.tieneIva,
        }
        axios.put(`${URL}/${producto.id}`, newProducto).then(r => {
            const newProducto = productos.map((producto: ProductoInterface) => {
                if (producto.id === r.data.id) {
                    return r.data;
                }
                return producto;
            });
            setProductos(newProducto);
            setOpenCreateInstanceDialog(false);
        }).catch(e => {
            console.log(e);
        });
    }

    const handleCreateInstance = () => {
        console.log("Create instance")
        setOpenCreateInstanceDialog(true);
    }

    const renderDataDialog = (producto?: ProductoInterface) => {
        return (
            <Dialog open={openCreateInstanceDialog}>
                <DialogTitle>Crear un nuevo Profesor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Los siguientes datos son requeridos para registrar un nuevo profesor.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={producto?.nombre}
                        id="name"
                        label="Nombre del Producto"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("nombre", {required: "Este campo es requerido"})}
                    />
                    {errors.nombre && <span>Este campo es requerido</span>}
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={producto?.precio}
                        id="precio"
                        label="Precio del Producto"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("precio", {required: "Este campo es requerido"})}
                    />
                    {errors.precio && <span>Este campo es requerido</span>}
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={producto?.cantidad}
                        id="cantidad"
                        label="Cantidad del Producto"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("cantidad", {required: "Este campo es requerido"})}
                    />
                    {errors.cantidad && <span>Este campo es requerido</span>}
                    <FormControlLabel
                        id={"tieneIva"}
                        control={<Checkbox defaultChecked={producto.tieneIva}/>}
                        label="¿Tiene IVA?"
                        {...register("tieneIva")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelCreateInstanceDialog}>Cancelar</Button>
                    {producto?.nombre && <Button onClick={handleSubmit(handleAcceptUpdateInstanceDialog)} disabled={!isValid}>Actualizar</Button>}
                    {!producto?.nombre && <Button onClick={handleSubmit(handleAcceptCreateInstanceDialog)} disabled={!isValid}>Crear</Button>}
                </DialogActions>
            </Dialog>
        )
    }


    return (
        <Layout>
            <Grid container >
                <Grid item xs={12}  padding={"1rem"} >
                    <Grid container alignContent={"center"}>
                        <Grid item md={12} >
                            <p className={"productosTitulo"}>Productos</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={"productosContainer"}>
                    <Grid container xs={12}>
                        <Grid item xs={3}>
                            <p className={"caracteritica"}>Nombre</p>
                        </Grid>
                        <Grid item xs={3}>
                            <p className={"caracteritica"}>Precio Unitario</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p className={"caracteritica"}>Cantidad</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p className={"caracteritica"}>Tiene IVA</p>
                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item  xs={12} sx={{
                            width: '100%',
                            marginTop: '-1rem',
                        }}>
                            <Grid item md={12}  >
                                <Box >
                                    <Grid container>
                                        {ProductoCards()}
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {renderDataDialog(producto)}
        </Layout>
    )
}