import axios from "axios";
import { RickMorty } from "@src/clients/rickMorty";

import characterFixture from "@test/fixtures/character.json";
import characterLocationFixture from "@test/fixtures/character_location.json";

jest.mock("axios");

describe("Rick Morty Client", () => {

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    it("should return location from character", async () => {

        const characterId = 1;
        mockedAxios.get.mockResolvedValue({data: characterFixture});

        const rickMorty = new RickMorty(mockedAxios);
        const response = await rickMorty.findCharacterLocation(characterId);

        expect(response).toEqual(characterLocationFixture);
    });
});
