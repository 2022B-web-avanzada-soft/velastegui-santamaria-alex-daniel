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
                console.log("update");
                break;
            case "delete":
                console.log("delete");
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
}

module.exports.Menu = Menu;