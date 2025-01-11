import { makeCreatePostCommand } from './commands/create-post';

export function makePostsUseCases(dependencies: Dependencies) {
  return {
    commands: {
      createPost: makeCreatePostCommand(dependencies),
    },
  };
}
