import { makeCreatePostCommand } from './commands/create-post';
import { makeDeletePostCommand } from './commands/delete-post';

export function makePostsUseCases(dependencies: Dependencies) {
  return {
    commands: {
      createPost: makeCreatePostCommand(dependencies),
      deletePost: makeDeletePostCommand(dependencies),
    },
  };
}
