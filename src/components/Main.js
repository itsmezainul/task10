import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    async function imageFeching() {
      setIsLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/photos");
      const data = await res.json();
      console.log(data);
      setList(data);
      setIsLoading(false);
    }
    imageFeching();
  }, []);
  return (
    <main>
      <Container>
        <Row
          style={
            isLoading
              ? {
                  minHeight: "90vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {}
          }
        >
          {isLoading && <Loader />}
          {!isLoading &&
            list.map((pre) => <ImageList list={pre} key={pre.id} />)}
        </Row>
      </Container>
    </main>
  );
}

function ImageList({ list }) {
  return (
    <Col md={6} lg={3} className="mb-5">
      <Image src={list.url} fluid></Image>
    </Col>
  );
}

function Loader() {
  return (
    <Col className="text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Col>
  );
}
