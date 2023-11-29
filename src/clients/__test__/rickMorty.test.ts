import axios from "axios";
import { RickMorty } from "@src/clients/rickMorty";

import characterFixture from "@test/fixtures/character.json";
import characterLocationFixture from "@test/fixtures/character_location.json";
import locationFixture from "@test/fixtures/location.json";
import locationResidentsFixture from "@test/fixtures/location_residents.json";

jest.mock("axios");

describe("Rick Morty Client", () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    it("should return location fields from character request", async () => {
        const anyCharacterId = 1;
        mockedAxios.get.mockResolvedValue({ data: characterFixture });

        const rickMortyClient = new RickMorty(mockedAxios);
        const locationFields =
            await rickMortyClient.getCharacterLocationFields(anyCharacterId);

        expect(locationFields).toEqual(characterLocationFixture);
    });

    it("should return location detail from character request", async () => {
        const anyCharacterId = 1;
        mockedAxios.get.mockResolvedValueOnce({ data: characterFixture });
        mockedAxios.get.mockResolvedValueOnce({ data: locationFixture });

        const rickMortyClient = new RickMorty(mockedAxios);
        const location =
            await rickMortyClient.getCharacterLocation(anyCharacterId);

        expect(location).toEqual(locationFixture);
    });

    it("should return location residents by character id", async () => {
        const anyCharacterId = 1;
        mockedAxios.get.mockResolvedValueOnce({ data: characterFixture });
        mockedAxios.get.mockResolvedValueOnce({ data: locationFixture });

        const rickMortyClient = new RickMorty(mockedAxios);
        const residents =
            await rickMortyClient.getLocationResidentsByCharacterId(
                anyCharacterId,
            );

        expect(residents).toEqual(locationResidentsFixture);
    });

    it("should get a generic error from RickMorty service when the request fail before reaching th service", async () => {
        const anyCharacterId = 1;

        mockedAxios.get.mockRejectedValue({ message: "Network Error" });

        const rickMortyClient = new RickMorty(mockedAxios);

        await expect(
            rickMortyClient.getCharacterLocation(anyCharacterId),
        ).rejects.toThrow(
            "Unexpected error when trying to communicate to RickMorty service: Network Error",
        );

        await expect(
            rickMortyClient.getCharacterLocationFields(anyCharacterId),
        ).rejects.toThrow(
            "Unexpected error when trying to communicate to RickMorty service: Network Error",
        );

        await expect(
            rickMortyClient.getLocationResidentsByCharacterId(anyCharacterId),
        ).rejects.toThrow(
            "Unexpected error when trying to communicate to RickMorty service: Network Error",
        );
    });

    it("should get a 'RickMortyResponseError' when the RickMorty Service responds with error", async () => {
        const anyCharacterId = 1;

        mockedAxios.get.mockRejectedValue({
            response: {
                status: 400,
                data: {
                    errors: ["Some bad request"],
                },
            },
        });

        const rickMortyService = new RickMorty(mockedAxios);

        await expect(
            rickMortyService.getCharacterLocation(anyCharacterId),
        ).rejects.toThrow(
            "Unexpected error returned by the RickMorty service: Error {\"errors\":[\"Some bad request\"]} Code: 400",
        );
    });
});
