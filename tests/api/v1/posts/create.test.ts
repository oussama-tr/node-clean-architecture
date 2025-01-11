import { makeClient } from '../../client';

describe('POST /api/v1/posts', () => {
  describe('given an invalid request', () => {
    it('should respond with a 400 status code', async () => {
      // Arrange
      const { client } = await makeClient();

      // Act
      const response = await client.post('/api/v1/posts').send({
        title: '', // Cannot be empty
      });

      // Assert
      expect(response.status).toEqual(400);
    });
  });

  describe('given a valid request', () => {
    it('should create post and respond with a 201 status code', async () => {
      // Arrange
      const { client } = await makeClient();

      // Act
      const createResponse = await client.post('/api/v1/posts').send({
        title: 'Example post',
      });

      // Assert
      expect(createResponse.status).toEqual(201);
      expect(createResponse.body).toMatchSnapshot({
        id: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
      });
    });
  });
});
