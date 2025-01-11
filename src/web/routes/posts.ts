import { makePostsUseCases } from '@application/posts';

export default async function postRoutes(fastify: FastifyRouteInstance) {
  const posts = makePostsUseCases(fastify.diContainer.cradle);

  fastify.route({
    method: 'POST',
    url: '/api/v1/posts',
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
        },
        required: ['title'],
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
      400: { $ref: 'ExceptionResponse#' },
      tags: ['posts'],
    },
    async handler(req, res) {
      const post = await posts.commands.createPost(req.body);

      res.status(201).send(post);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/api/v1/posts/:id',
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
      response: {
        200: {},
        400: { $ref: 'ExceptionResponse#' },
      },
      tags: ['posts'],
    },
    async handler(req, res) {
      await posts.commands.deletePost({ id: req.params.id });

      res.status(200).send({});
    },
  });
}
