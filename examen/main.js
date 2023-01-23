const {leerArchivo, escribirArchivo} = require("./functions/manejoArchivos")
const {Anime} = require("./entities/anime")
const {Character} = require("./entities/character")
const {Menu} = require("./functions/menu")

const main = async () => {
    console.log("Bienvenido a la base de datos de animes")
    let animes = JSON.parse(await leerArchivo("./data/animes.txt"))
    let characters = JSON.parse(await leerArchivo("./data/characters.txt"))
    const menu = new Menu(animes, characters)
    const res = await menu.manageMainMenu()
    animes = res[0]
    characters = res[1]
    await escribirArchivo("./data/animes.txt", JSON.stringify(animes))
    await escribirArchivo("./data/characters.txt", JSON.stringify(characters))
}

main()