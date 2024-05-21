import styled from 'styled-components';

/**
 * Doc : https://docs.google.com/document/d/1Ja8GOJ1wBbFzD5G2-1cJbz6AMUc1NxpA7QU674LpCOU/edit#heading=h.2tcq6sm1q2op
 */
export default function Home() {
  return (
    <Wrapper>
      <ScrollWrapper>
        <Inner>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
          <Box/>
        </Inner>
      </ScrollWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ScrollWrapper = styled.div`
  background: white;
  width: 300px;
  max-height: 500px;
  overflow-y: scroll;
  border: 2px solid black;
  
  &::-webkit-scrollbar {
    width: 20px;
  }
  
  // 아이폰, 아이패드 대응
  @supports (-webkit-overflow-scrolling: touch) {
    padding-right: 20px;
  }
  
  &::-webkit-scrollbar-thumb {
    border: 6px solid transparent;
    background-clip: padding-box;
    border-radius: 9999px;
    background-color: #AAAAAA;
  }
`;

const Inner = styled.div`
  padding: 20px 0 20px 20px;
  
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Box = styled.div`
  height: 50px;
  border: 1px solid black;
`;
