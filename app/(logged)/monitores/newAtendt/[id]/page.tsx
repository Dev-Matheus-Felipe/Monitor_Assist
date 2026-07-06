
export default async function NewAtendiment({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return <h1>Usuário {id}</h1>;
}