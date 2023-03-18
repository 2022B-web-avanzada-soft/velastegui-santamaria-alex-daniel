import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './Layout.module.css'
import imagenIz from '../public/imagenes/Logo.png'
import {Grid} from "@mui/material";

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'Proyecto Final' }: Props) => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    return (
        <div id="container">
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header>
                <div className={styles.bienvenido}>
                    <Link href="/inventario"><img className={styles.imageLeft} src={imagenIz.src} alt="Image left" /></Link>
                    <p className={styles.text}>Bienvenidos</p>
                    <img className={styles.imageRight} src="/imagenes/epn.png" alt="Image right" />
                </div>
                <div className={`${styles.menu} clearfix`}>
                    <div className={currentPath === '/inventario' ? `${styles.elementos} ${styles.active}` : styles.elementos}><Link href="/inventario" className={currentPath === '/inventario' ? `${styles.elementosInternoActivado}` : styles.elementosInterno}>Inventario</Link></div>
                    <div className={currentPath === '/registrar-producto' ? `${styles.elementos} ${styles.active}` : styles.elementos}><Link href="/registrar-producto" className={currentPath === '/registrar-producto' ? `${styles.elementosInternoActivado}` : styles.elementosInterno}>Registrar Producto</Link></div>
                </div>
            </header>
            <div id="content">{children}</div>
            <footer id="footer" className={styles.footer}>
                <Grid container>
                    <Grid item xs={6} padding={"1rem"} >
                        <p className={styles.tituloFooter}>Contáctanos</p>
                        <Grid container >
                            <Grid item xs={5} padding={"1rem"} >
                                <p className={styles.textoFooter}>Marco Salazar</p>
                                <p className={styles.textoFooter}>Daniel Velasteguí</p>
                            </Grid>
                            <Grid item xs={7} padding={"1rem"} >
                                <p className={styles.textoFooter}> <img className={styles.imageFooter} src="/imagenes/correo.png" alt="Image right Footer" />marco.salazar02@epn.edu.ec</p>
                                <p className={styles.textoFooter}> <img className={styles.imageFooter} src="/imagenes/correo.png" alt="Image right Footer" />alex.velastegui@epn.edu.ec</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} padding={"1rem"} >
                        <p className={styles.tituloFooter}>Ubicación</p>
                        <Grid container alignContent={"center"}>
                            <Grid item xs={12} padding={"1rem"} >
                            <p className={styles.textoFooter}> <img className={styles.imageFooter2} src="/imagenes/ubicacion.png" alt="Image right Footer" />Ladrón de Guevara E11·253 [PO·Box 17-01-2759]
                                Quito · Ecuador</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </footer>
        </div>
    )
}

export default Layout
