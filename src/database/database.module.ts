import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'sa',
      password: 'password',
      database: 'mysql_fans_crm',
      models: [typeof User],
      autoLoadModels: true,
      synchronize: true,
      logging: console.log
    }),
  ],
})
export class DatabaseModule {}
