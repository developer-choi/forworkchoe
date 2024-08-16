import styled from 'styled-components';

export default function Home() {
  return (
    <Wrap>
      <Button>제출</Button>
    </Wrap>
  )
}

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 100%;
  padding: 20px;
  background: aqua;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export async function getServerSideProps() {
  return {
    props: {}
  };
}
