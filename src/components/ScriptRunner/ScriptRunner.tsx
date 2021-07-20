import React from 'react';
import styled from '@emotion/styled'

interface Props {
  script: string;
}

export const ScriptRunner: React.FC<Props> = ({ script: src }) => {
  const container = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    container.current?.appendChild(script);

    return () => {
      container.current?.removeChild(script);
    };
  }, []);

  return <Container ref={container} />;
};

const Container = styled.div`
  margin: 40px 0;
  text-align: center;
`;
