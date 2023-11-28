import "module-alias/register";
import { Server } from "@overnightjs/core";
import { Application, json } from "express";
import { CharacterController } from "./controllers/characters";

export class SetupServer extends Server {
    constructor(private port = 3000) {
        super();
    }

    public init(): void {
        this.setupExpress();
        this.setupControlers();
    }

    private setupExpress(): void {
        this.app.use(json());
    }

    private setupControlers(): void {
        const characterController = new CharacterController();
        this.addControllers([characterController]);
    }

    public getApp(): Application {
        return this.app;
    }
}
