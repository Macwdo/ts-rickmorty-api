import axios, { AxiosStatic } from "axios";

export class RickMorty {
    constructor(protected request: AxiosStatic) {}
    public async findCharacterLocation(characterId: number): Promise<string> {
        return this.request.get(
            `https://rickandmortyapi.com/api/character/${characterId}`,
        );
    }
}
