import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import Cors from '@fastify/cors';
import Helmet from '@fastify/helmet';
import { makeInfrastructureDependencies } from '@infrastructure/di';
import { FastifyInstance } from 'fastify';

export default async function makeApp(fastify: FastifyInstance) {
  // Create a dependency injection container
  await fastify.register(fastifyAwilixPlugin);

  diContainer.register({
    ...makeInfrastructureDependencies(),
  });

  // Set sensible default security headers
  await fastify.register(Helmet, {
    global: true,
  });

  // Configure CORS
  await fastify.register(Cors, {
    origin: false, // TODO: Set this to a valid origin
  });

  return fastify;
}
