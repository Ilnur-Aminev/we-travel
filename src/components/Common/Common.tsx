import styled from '@emotion/styled';
import { getSightColor } from '../../helpers/helpers';
import mediaqueries from '../../styles/media';
import { SightColor } from '../../types';

export const AdditionalInfo = styled.span`
  display: inline-block;
  color: #dadada;
  position: relative;
  margin-right: 10px;
  padding-right: 12px;

  &:not(:last-child):after {
    position: absolute;
    top: 10px;
    right: 0;
    content: '';
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 3px;
    background: #dadada;
  }

  ${mediaqueries.phablet`
    font-weight: 500;
  `}
`;

export const SightName = styled(AdditionalInfo)<{ color?: string }>`
  color: ${props => (props.color ? getSightColor(props.color as SightColor) : '#000')};
  & > * {
    color: ${props => (props.color ? getSightColor(props.color as SightColor) : '#000')};
  }
`;
