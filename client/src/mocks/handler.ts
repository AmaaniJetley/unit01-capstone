// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

type LoginBody = {
  email: string;
  password: string;
};

export const handlers = [
  http.post('/api/users/login', async ({ request }) => {
    const { email, password } = await request.json() as LoginBody;

    if (email === 'good@user.com' && password === 'correctpass') {
      return HttpResponse.json({ token: 'fake-jwt-token' }, { status: 200 });
    }

    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }),
];