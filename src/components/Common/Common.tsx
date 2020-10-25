import styled from '@emotion/styled';
import { getSightColor } from '../../helpers/helpers';
import { SightColor } from '../../types';

export const SightName = styled.span<{ color?: string }>`
  font-weight: 600;
  color: ${props => (props.color ? getSightColor(props.color as SightColor) : '#000')};
  & > * {
    color: ${props => (props.color ? getSightColor(props.color as SightColor) : '#000')};
  }
`;

export const AdditionalInfo = styled.span<{ isSingle?: boolean }>`
  display: inline-block;
  color: #dadada;
  position: relative;
`;

export const Marker = styled.span`
  display: inline-block;
  width: 3px;
  height: 3px;
  margin: 0 10px;
  border-radius: 3px;
  background: #dadada;
`;
