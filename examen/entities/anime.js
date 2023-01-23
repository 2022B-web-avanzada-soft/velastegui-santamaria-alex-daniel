class Anime{
    constructor(id, name, isOnAir, releaseDate, capNumber, characters){
        this.id = id;
        this.name = name;
        this.isOnAir = isOnAir;
        this.releaseDate = releaseDate;
        this.capNumber = capNumber;
        this.characters = characters;
    }
}

module.exports = Anime;