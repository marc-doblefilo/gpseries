import { DynamicModule, MiddlewareConsumer, NestModule } from '@nestjs/common';

import { AppLoggerMiddleware } from './app.middleware';
import { AuthModule } from './auth/auth.module';
import { BootstrapModule } from './bootstrap.module';
import { CompetitionModule } from './competition/infrastructure/competition.module';
import { DriverModule } from './driver/infrastructure/driver.module';
import { IncidentModule } from './incident/infrastructure/incident.module';
import { InscriptionModule } from './inscription/infrastructure/inscription.module';
import { NotificationModule } from './notification/infrastructure/notification.module';
import { RaceModule } from './race/infrastructure/race.module';
import { TeamModule } from './team/infrastructure/team.module';
import { UserModule } from './user/infrastructure';

export class AppModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        BootstrapModule,
        AuthModule,
        UserModule,
        DriverModule,
        CompetitionModule,
        TeamModule,
        RaceModule,
        IncidentModule,
        InscriptionModule,
        NotificationModule
      ]
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
