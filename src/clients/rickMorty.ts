import { InternalError } from "@src/utils/internal-error";
import { AxiosError, AxiosStatic } from "axios";

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

export class RickMortyResponseError extends InternalError {
    constructor(message: string) {
        const internalMessage =
            "Unexpected error returned by the RickMorty service";
        super(`${internalMessage}: ${message}`, 400);
    }
}

export class ClientRequestError extends InternalError {
    constructor(message: string) {
        const internalMessage =
            "Unexpected error when trying to communicate to RickMorty service";
        super(`${internalMessage}: ${message}`);
    }
}

export class RickMorty {
    readonly rickMortyApiUrl: string = "https://rickandmortyapi.com/api";

    constructor(protected request: AxiosStatic) {}
    public async getCharacterLocationFields(
        characterId: number,
    ): Promise<CharacterLocation> {
        try {
            const response = await this.request.get<Character>(
                `${this.rickMortyApiUrl}/character/${characterId}`,
            );
            return {
                name: response.data.location.name,
                url: response.data.location.url,
            };
        } catch (e) {
            if (
                (e as AxiosError).response &&
                (e as AxiosError).response?.data
            ) {
                throw new RickMortyResponseError(
                    `Error ${JSON.stringify(
                        (e as AxiosError).response?.data,
                    )} Code: ${(e as AxiosError).response?.status}`,
                );
            }
            throw new ClientRequestError((e as Error).message);
        }
    }

    public async getCharacterLocation(characterId: number): Promise<Location> {
        try {
            const characterResponse = await this.request.get<Character>(
                `${this.rickMortyApiUrl}/character/${characterId}`,
            );
            const locationResponse = await this.request.get<Location>(
                characterResponse.data.url,
            );
            return locationResponse.data;
        } catch (e) {
            if (
                (e as AxiosError).response &&
                (e as AxiosError).response?.data
            ) {
                throw new RickMortyResponseError(
                    `Error ${JSON.stringify(
                        (e as AxiosError).response?.data,
                    )} Code: ${(e as AxiosError).response?.status}`,
                );
            }
            throw new ClientRequestError((e as Error).message);
        }
    }

    public async getLocationResidentsByCharacterId(
        characterId: number,
    ): Promise<string[]> {
        try {
            const characterResponse = await this.request.get<Character>(
                `${this.rickMortyApiUrl}/character/${characterId}`,
            );
            const locationResponse = await this.request.get<Location>(
                characterResponse.data.url,
            );
            return locationResponse.data.residents;
        } catch (e) {
            if (
                (e as AxiosError).response &&
                (e as AxiosError).response?.data
            ) {
                throw new RickMortyResponseError(
                    `Error ${JSON.stringify(
                        (e as AxiosError).response?.data,
                    )} Code: ${(e as AxiosError).response?.status}`,
                );
            }
            throw new ClientRequestError((e as Error).message);
        }
    }
}
