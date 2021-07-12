import styled from '@emotion/styled';

export const Container = styled('div')`
  align-items: center;
  background: white;
  border-style: dashed;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 90vh;
  overflow: hidden;
  padding: 1em;
`;

export const AppContainer = styled('div')`
  align-items: flex-start;
  display: grid;
  grid-template-columns: 25% 75%;
  height: 90vh;
  position: relative;
  overflow: hidden;
  width: 100%;
`;
