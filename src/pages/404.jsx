import { Container } from "../components/Container";

export function NotFound() {
  return (
    <Container className="grow text-center flex items-center flex-col mt-20">
      <h1 className="text-9xl font-bold tracking-tighter mb-5">
        404
        <br />
        <span className="text-5xl font-black stroke-sky-700 tracking-normal block">
          NOT FOUND
        </span>
      </h1>
      <p className="italic">The requested content has not been found.</p>
    </Container>
  );
}
