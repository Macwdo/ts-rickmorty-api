import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller("character")
export class CharacterController {
    @Get("/")
    public getCharacter(_: Request, res: Response): void {
        res.send({
            character: "rick",
        });
    }
}
