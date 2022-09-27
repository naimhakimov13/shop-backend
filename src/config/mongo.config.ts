import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

const options = {}

export const getMongoConfig = async (
  configService: ConfigService
): Promise<TypegooseModuleOptions> => ({
  uri: configService.get('mongodb://localhost:27017/Api'),
  ...options,
})
