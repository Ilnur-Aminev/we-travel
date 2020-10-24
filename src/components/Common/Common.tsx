import styled from '@emotion/styled';
import { getSightColor } from '../../helpers/helpers';
import { SightColor } from '../../types';

export const SightName = styled.span<{ color?: string }>`
  font-weight: 600;
  font-size: 16px;
  color: ${props => (props.color ? getSightColor(props.color as SightColor) : '#000')};
  & > * {
    color: ${props => (props.color ? getSightColor(props.color as SightColor) : '#000')};
  }
`;

export const AdditionalInfo = styled.span<{ isSingle?: boolean }>`
  display: inline-block;
  margin-left: ${p => (p.isSingle ? 0 : '10px')};
  color: #dadada;
  position: relative;
  padding-left: ${p => (p.isSingle ? 0 : '12px')};
  &:before {
    position: absolute;
    top: 10px;
    left: 0;
    content: '';
    display: ${p => (p.isSingle ? 'none' : 'block')};
    width: 3px;
    height: 3px;
    border-radius: 3px;
    background: #dadada;
  }
`;