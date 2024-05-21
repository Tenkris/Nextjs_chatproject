interface ReqData {
  email: string;
  password: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    const { email, password, name }: ReqData = await request.json();

    if (!email || !password || !name) {
      throw new Error('Missing required fields');
    }

    return Response.json(
      { message: 'User created successfully', data: { email, password, name } },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
