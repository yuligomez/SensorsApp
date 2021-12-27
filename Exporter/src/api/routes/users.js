import { UsersHandlers as handler } from '../handlers';
import { User as schema } from '../schemas/requests';

const externalPath = '/external/users';
const { rules } = schema;

export const users = [
  {
    method: 'post',
    path: externalPath,
    handler: handler.create,
    options: {
      tags: ['api'],
      validate: rules.create,
      payload: {
        parse: true
      },
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Post user by the email',
      notes: 'Returns the user passed in the body, token and uri'
    }
  }
];
