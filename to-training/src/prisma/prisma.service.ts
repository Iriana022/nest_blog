import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Se connecte à la DB au démarrage du module
  async onModuleInit() {
    await this.$connect();
  }

  // Ferme proprement la connexion si le serveur s'arrête
  async onModuleDestroy() {
    await this.$disconnect();
  }
}