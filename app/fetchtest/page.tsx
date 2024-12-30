export default async function FetchTest() {
  const respone = await fetch("http://localhost:3000/api/hello");
  const data = await respone.json();
  return <h1>{data.message}</h1>;
}
