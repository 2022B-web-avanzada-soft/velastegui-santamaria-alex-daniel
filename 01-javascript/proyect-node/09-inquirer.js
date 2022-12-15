const inquirer = require('inquirer');

async function main() {
    try {
        const resp = await inquirer.prompt([
            {
                type: 'input',
                name: 'nombre',
                message: '¿Cuál es tu nombre?'
            },
            {
                type: 'input',
                name: 'edad',
                message: '¿Cuál es tu edad?'
            }
        ]);
        console.log(resp);
    } catch (error) {
        console.log(error);
    }
}

main();