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
        mockedAxios.get.mockResolvedValue({data: characterFixture});

        const rickMorty = new RickMorty(mockedAxios);
        const locationFields = await rickMorty.getCharacterLocationFields(anyCharacterId);

        expect(locationFields).toEqual(characterLocationFixture);
    });

    it("should return location detail from character request", async () => {

        const anyCharacterId = 1;
        mockedAxios.get.mockResolvedValueOnce({data: characterFixture});
        mockedAxios.get.mockResolvedValueOnce({data: locationFixture});

        const rickMorty = new RickMorty(mockedAxios);
        const location = await rickMorty.getCharacterLocation(anyCharacterId);

        expect(location).toEqual(locationFixture);

    });

    it("should return location residents by character id", async () => {
        const anyCharacterId = 1;
        mockedAxios.get.mockResolvedValueOnce({data: characterFixture});
        mockedAxios.get.mockResolvedValueOnce({data: locationFixture});

        const rickMorty = new RickMorty(mockedAxios);
        const residents = await rickMorty.getLocationResidentByCharacterId(anyCharacterId);

        expect(residents).toEqual(locationResidentsFixture);
    });

});
