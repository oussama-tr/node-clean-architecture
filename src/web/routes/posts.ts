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

  fastify.route({
    method: 'GET',
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
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
          },
        },
        400: { $ref: 'ExceptionResponse#' },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
      tags: ['posts'],
    },
    async handler(req, res) {
      const post = await posts.queries.getPost({ id: req.params.id });

      if (!post) {
        res.status(404).send({ message: `Post with id ${req.params.id} not found` });
        return;
      }

      res.status(200).send(post);
    },
  });
}
