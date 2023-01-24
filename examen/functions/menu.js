const inquirer = require('inquirer');
const {Anime} = require("../entities/anime")
const {Character} = require("../entities/character")
const DatePrompt = require('inquirer-date-prompt');

inquirer.registerPrompt('date', DatePrompt);

class Menu {
    constructor(animes, characters){
        this.animes = animes;
        this.characters = characters;
    }
    // Manjadores de Menus
    async manageMainMenu(){
        const option = await this.showMainMenu();
        switch(option.option){
            case "crud_anime":
                await this.manageCRUDAnimeMenu();
                break;
            case "crud_character":
                await this.manageCRUDCharacterMenu();
                break;
            case "exit":
                break;
        }
        return [this.animes, this.characters];
    }

    async manageCRUDCharacterMenu(){
        let option = await this.showCRUDCharacterMenu();
        switch(option.option){
            case "create":
                const characterInfo = await this.showCreateCharacterMenu();
                const existentCharacter = this.characters.find(character => character.id === characterInfo.id);
                if (existentCharacter){
                    console.log("El personaje con esa ID ya existe");
                }else{
                    const character = new Character(
                        characterInfo.id,
                        characterInfo.name,
                        characterInfo.isMortal,
                        characterInfo.birthdate,
                        characterInfo.isMarried);
                    this.characters.push(character);
                    console.log("Personaje creado");
                }
                await this.manageCRUDCharacterMenu();
                break;
            case "read":
                console.log("Los personajes son:");
                console.log(this.characters);
                await this.manageCRUDCharacterMenu();
                break;
            case "update":
                const idUpt = await this.showSelectCharacterMenu();
                const characterUpt = this.characters.find(character => character.id === idUpt.id);
                if(characterUpt){
                    console.log("El personaje es:");
                    console.log(characterUpt);
                    const characterInfoUpt = await this.showCreateCharacterMenu();
                    characterUpt.name = characterInfoUpt.name;
                    characterUpt.isMortal = characterInfoUpt.isMortal;
                    characterUpt.birthdate = characterInfoUpt.birthdate;
                    characterUpt.isMarried = characterInfoUpt.isMarried;
                    console.log("Personaje actualizado");
                }else{
                    console.log("Personaje no encontrado");
                }
                await this.manageCRUDCharacterMenu();
                break;
            case "delete":
                const idDel = await this.showSelectCharacterMenu();
                const characterDel = this.characters.find(character => character.id === idDel.id);
                if(characterDel){
                    console.log("El personaje es:");
                    console.log(characterDel);
                    this.characters = this.characters.filter(character => character.id !== idDel.id);
                    console.log("Personaje eliminado");
                }else{
                    console.log("Personaje no encontrado");
                }
                await this.manageCRUDCharacterMenu();
                break;
            case "return":
                await this.manageMainMenu();
                break;
            case "exit":
                break;
        }
    }

    async manageCRUDAnimeMenu(){
        const option = await this.showCRUDAnimeMenu();
        switch(option.option){
            case "create":
                const animeInfo = await this.showCreateAnimeMenu();
                const existentAnime = this.animes.find(anime => anime.id === animeInfo.id);
                if (existentAnime){
                    console.log("El anime con esa ID ya existe");
                }else{
                    const anime = new Anime(
                        animeInfo.id,
                        animeInfo.name,
                        animeInfo.isOnAir,
                        animeInfo.releaseDate,
                        animeInfo.capNumber,
                        []);
                    this.animes.push(anime);
                    console.log("Anime creado");
                }
                await this.manageCRUDAnimeMenu();
                break;
            case "read":
                console.log("Los animes son:");
                console.log(this.animes);
                await this.manageCRUDAnimeMenu();
                break;
            case "update":
                const idUpt = await this.showSelectAnimeMenu();
                const animeUpt = this.animes.find(anime => anime.id === idUpt.id);
                if(animeUpt){
                    console.log("El anime es:");
                    console.log(animeUpt);
                    const updtOption = await this.showUpdateAnimeMenu();
                    switch(updtOption.option){
                        case "push_character":
                            while(true){
                                const characterId = await this.showSelectCharacterMenu();
                                const character = this.characters.find(character => character.id === characterId.id);
                                if(character){
                                    animeUpt.characters.push(character);
                                    console.log("Personaje agregado");
                                    break;
                                }else {
                                    console.log("Personaje no encontrado");
                                }
                            }
                            break;
                        case "pop_character":
                            while(true){
                                const characterId = await this.showSelectCharacterMenu();
                                const character = animeUpt.characters.find(character => character.id === characterId.id);
                                if(character){
                                    animeUpt.characters = animeUpt.characters.filter(character => character.id !== characterId.id);
                                    console.log("Personaje eliminado");
                                    break;
                                }else {
                                    console.log("Personaje no encontrado en el anime seleccionado");
                                }
                            }
                            break;
                        case "anime_info":
                            const animeInfoUpt = await this.showCreateAnimeMenu();
                            animeUpt.name = animeInfoUpt.name;
                            animeUpt.isOnAir = animeInfoUpt.isOnAir;
                            animeUpt.releaseDate = animeInfoUpt.releaseDate;
                            animeUpt.capNumber = animeInfoUpt.capNumber;
                            console.log("Anime actualizado");
                            break;
                    }
                }else{
                    console.log("Anime no encontrado");
                }
                await this.manageCRUDAnimeMenu();
                break;
            case "delete":
                const id = await this.showSelectAnimeMenu();
                const anime = this.animes.find(anime => anime.id === id.id);
                if(anime){
                    console.log("El anime es:");
                    console.log(anime);
                    this.animes = this.animes.filter(anime => anime.id !== id.id);
                    console.log("Anime eliminado");
                }else{
                    console.log("Anime no encontrado");
                }
                await this.manageCRUDAnimeMenu();
                break;
            case "return":
                await this.manageMainMenu();
                break;
            case "exit":
                break;
        }
    }

    // Se construyen todos los menus
    async showMainMenu(){
        return await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "¿Qué clase desea hacer CRUD?",
                choices: [
                    {
                        value: "crud_anime",
                        name: "Animes"
                    },
                    {
                        value: "crud_character",
                        name: "Personajes"
                    },
                    {
                        value: "exit",
                        name: "Salir"
                    }
                ]
            }
        ]);
    }

    // Se constryen los submenus de Personajes
    async showCRUDCharacterMenu(){
        return await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "¿Qué desea hacer?",
                choices: [
                    {
                        value: "create",
                        name: "Crear"
                    },
                    {
                        value: "read",
                        name: "Leer"
                    },
                    {
                        value: "update",
                        name: "Actualizar"
                    },
                    {
                        value: "delete",
                        name: "Eliminar"
                    },
                    {
                        value: "return",
                        name: "Regresar"
                    },
                    {
                        value: "exit",
                        name: "Salir"
                    }
                ]
            }
        ]);
    }

    async showCreateCharacterMenu(){
        return await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "ID del personaje:"
            },
            {
                type: "input",
                name: "name",
                message: "Nombre del personaje:"
            },
            {
                type: "confirm",
                name: "isMortal",
                message: "¿Es mortal?"
            },
            {
                type: "date",
                name: "birthdate",
                message: "Fecha de nacimiento del personaje:"
            },
            {
                type: "confirm",
                name: "isMarried",
                message: "¿El personaje está casado?"
            }
        ]);
    }

    async showSelectCharacterMenu(){
        return await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "ID del personaje:"
            }
        ]);
    }

    // Se construyen los submenus de Animes
    async showCRUDAnimeMenu(){
        return await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "¿Qué desea hacer?",
                choices: [
                    {
                        value: "create",
                        name: "Crear"
                    },
                    {
                        value: "read",
                        name: "Leer"
                    },
                    {
                        value: "update",
                        name: "Actualizar"
                    },
                    {
                        value: "delete",
                        name: "Eliminar"
                    },
                    {
                        value: "return",
                        name: "Regresar"
                    },
                    {
                        value: "exit",
                        name: "Salir"
                    }
                ]
            }
        ]);
    }

    async showCreateAnimeMenu(){
        return await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "ID del anime:"
            },
            {
                type: "input",
                name: "name",
                message: "Nombre del anime:"
            },
            {
                type: "confirm",
                name: "isOnAir",
                message: "¿El anime está en emisión?"
            },
            {
                type: "date",
                name: "releaseDate",
                message: "Fecha de estreno del anime:"
            },
            {
                type: "number",
                name: "capNumber",
                message: "Número de episodios:"
            }
        ]);
    }

    async showSelectAnimeMenu(){
        return await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "ID del anime:"
            }
        ]);
    }

    async showUpdateAnimeMenu(){
        return await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "¿Qué desea actualizar?",
                choices: [
                    {
                        value: "push_character",
                        name: "Agregar personaje"
                    },
                    {
                        value: "pop_character",
                        name: "Eliminar personaje"
                    },
                    {
                        value: "anime_info",
                        name: "Información del anime"
                    },
                    {
                        value: "exit",
                        name: "Salir"
                    }
                ]
            }
        ]);
    }
}

module.exports.Menu = Menu;