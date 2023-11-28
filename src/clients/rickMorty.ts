import { AxiosStatic } from "axios";


export interface Location {
    readonly id: number;
    readonly name: string;
    readonly type: string;
    readonly dimension: string;
    readonly residents: string[];
    readonly url: string;
    readonly created: string;
}

export interface CharacterLocation {
    readonly name: string;
    readonly url: Location;
}

export interface CharacterOrigin {
    readonly name: string;
    readonly url: string;
}

export interface Character {
    readonly id: number;
    readonly name: string;
    readonly status: string;
    readonly species: string;
    readonly type: string;
    readonly gender: string;
    readonly origin: CharacterOrigin;
    readonly location: CharacterLocation;
    readonly image: string;
    readonly episode: string[];
    readonly url: string;
    readonly created: string;
}



export class RickMorty {

    readonly rickMortyApiUrl: string = "https://rickandmortyapi.com/api";

    constructor(protected request: AxiosStatic) {

    }
    public async getCharacterLocationFields(characterId: number): Promise<CharacterLocation> {
        const response = await this.request.get<Character>(`${this.rickMortyApiUrl}/character/${characterId}`);
        return {
            name: response.data.location.name,
            url: response.data.location.url,
        };
    }

    public async getCharacterLocation(characterId: number): Promise<Location> {
        const characterResponse = await this.request.get<Character>(`${this.rickMortyApiUrl}/character/${characterId}`);
        const locationResponse = await this.request.get<Location>(characterResponse.data.url);
        return locationResponse.data;
    }

    public async getLocationResidentByCharacterId(characterId: number): Promise<string[]>{
        const characterResponse = await this.request.get<Character>(`${this.rickMortyApiUrl}/character/${characterId}`);
        const locationResponse = await this.request.get<Location>(characterResponse.data.url);
        return locationResponse.data.residents;
    }

}
