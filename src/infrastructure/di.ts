import * as Interfaces from '@application/common/interfaces';
import { makeConfig } from '@infrastructure/config';
import { Resolver, asValue } from 'awilix';

import { makeLogger } from './logger';

export type Dependencies = {
  config: Interfaces.ApplicationConfig;
  logger: Interfaces.Logger;
};

export function makeInfrastructureDependencies(): {
  [dependency in keyof Dependencies]: Resolver<Dependencies[dependency]>;
} {
  const config = makeConfig();
  const logger = makeLogger(config);

  return {
    config: asValue(config),
    logger: asValue(logger),
  };
}
