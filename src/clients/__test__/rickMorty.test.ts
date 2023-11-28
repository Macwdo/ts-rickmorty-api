import { RickMorty } from "@src/clients/rickMorty";
import axios from "axios";

jest.mock("axios");

describe("Rick Morty Client", () => {
    it("should return location from character", async () => {
        const characterId = 1;

        axios.get = jest.fn().mockResolvedValue({});

        const rickMorty = new RickMorty(axios);
        const response = await rickMorty.findCharacterLocation(characterId);

        expect(response).toEqual({});
    });
});
