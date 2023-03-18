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
import { useRouter } from "next/router";

const URL = "http://localhost:3030/producto/nuevoProducto";

type Inputs = {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
    tieneIva: boolean;
};

export default function () {
    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<Inputs>();
    const [openCreateInstanceDialog, setOpenCreateInstanceDialog] = useState(false);
    const [producto, setProducto] = useState({} as ProductoInterface);
    const [productos, setProductos] = useState([] as ProductoInterface[]);
    const [checked, setChecked] = useState(false);
    const router = useRouter();


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
    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };


    const handleAcceptCreateInstance: SubmitHandler<Inputs> = data => {
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
        router.push("/inventario");
    };

    return (
        <Layout>
            <Grid container >
                <Grid item xs={12}  padding={"1rem"} >
                    <Grid container alignContent={"center"}>
                        <Grid item md={12} >
                            <p className={"productosTitulo"}>Nuevo Producto</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={"nuevoProductoContainer"}>
                    <Grid item xs={12}>
                        <p className={"infoProducto"}>Información del Producto</p>
                    </Grid>
                    <Grid container>
                        <Grid item xs={3}>
                            <p className={"labelNuevo"}>Nombre</p>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                className={"inputStyle"}
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
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={3}>
                            <p className={"labelNuevo"}>Cantidad</p>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                className={"inputStyle"}
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
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={3}>
                            <p  className={"labelNuevo"}>Precio</p>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                className={"inputStyle"}
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
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={3}>
                            <p  className={"labelNuevo"}>Tiene IVA</p>
                        </Grid>
                        <FormControlLabel
                            id={"tieneIva"}
                            control={<Checkbox defaultChecked={producto.tieneIva}/>}
                            label="¿Tiene IVA?"
                            {...register("tieneIva")}
                        />
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <Button className={"botonRegistro"} onClick={handleSubmit(handleAcceptCreateInstance)} disabled={!isValid}>Registrar Producto</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    )

}