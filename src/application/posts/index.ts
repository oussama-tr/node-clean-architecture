import { makeCreatePostCommand } from './commands/create-post';
import { makeDeletePostCommand } from './commands/delete-post';
import { makeGetPostQuery } from './queries/get-post';

export function makePostsUseCases(dependencies: Dependencies) {
  return {
    commands: {
      createPost: makeCreatePostCommand(dependencies),
      deletePost: makeDeletePostCommand(dependencies),
    },
    queries: {
      getPost: makeGetPostQuery(dependencies),
    },
  };
}
