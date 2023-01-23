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
                console.log("crud_anime");
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
                const character = new Character(
                    characterInfo.id,
                    characterInfo.name,
                    characterInfo.isMortal,
                    characterInfo.birthdate,
                    characterInfo.isMarried);
                this.characters.push(character);
                console.log("Personaje creado");
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
}

module.exports.Menu = Menu;