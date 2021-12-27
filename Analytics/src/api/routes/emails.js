import { EmailsHandler as handler } from '../handlers';
import { Email as schema } from '../schemas/requests';

const externalPath = '/external/emails';
const { rules } = schema;

export const emails = [
  {
    method: 'get',
    path: externalPath,
    options: {
      tags: ['api'],
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Get set of emails',
      notes: 'Returns a set of all emails'
    },
    handler: handler.list
  },
  {
    method: 'get',
    path: `${externalPath}/{id}`,
    handler: handler.get,
    options: {
      tags: ['api'],
      validate: rules.get,
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Get email by id',
      notes: 'Returns an email by the parameter passed in the path'
    }
  },
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
      validate: rules.create,
      description: 'Post email',
      notes: 'Returns the email passed in the body'
    }
  },
  {
    method: 'delete',
    path: `${externalPath}/{id}`,
    handler: handler.remove,
    options: {
      tags: ['api'],
      validate: rules.get,
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Delete email by id',
      notes: 'Delete email by the parameter passed in the path'
    }
  },
  {
    method: 'put',
    path: `${externalPath}/{id}`,
    handler: handler.update,
    options: {
      tags: ['api'],
      validate: rules.update,
      payload: {
        parse: true
      },
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      validate: rules.update,
      description: 'Put email by id',
      notes: 'Edit the email by the parameter passed in the path'
    }
  }
];
