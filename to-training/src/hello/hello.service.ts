import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Brique } from '@prisma/client'

export interface BriqueVisa {
    id: number,
    tache: string,
    statut: string
}

@Injectable()

export class HelloService {

    constructor(private prisma: PrismaService){}

    private briqueVisa: BriqueVisa[] = [
        {id: 1, tache: "Apprendre nest js", statut: "En cours..."},
        {id:2, tache: "Valider J9 sobriété", statut: "Presque fini"}
    ]

    sayhello(nom: string){
        return 'Hello ' +nom;
    }
    async getData(){
        return {
            message: 'Direction Québec !',
            joursSobriete: 9,
            statut: 'Guerrier'
        };
    }

    async getDataDb(): Promise<Brique[]>{
        return await this.prisma.brique.findMany()
    }

    getAllBricks() : BriqueVisa[] {
        return this.briqueVisa
    }

    async addBrick(newTask: string): Promise<Brique>{
        return await this.prisma.brique.create({
            data: {
                tache: newTask,
                statut: "validé"
            }
        })
    }
}
