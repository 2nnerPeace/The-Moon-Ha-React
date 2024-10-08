import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const PlayerWrapper = styled.div`
    position: relative;
    border-radius: 10px;
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '100%'};
    z-index: 1;
    aspect-ratio: ${(props) => props.ratio || '16 / 9'};
    background-color: ${colors.black};
    overflow: hidden;

    .player {
        position: relative; /* absolute 대신 relative 사용 */
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
    }
`;

export const ThumbnailWrapper = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
    z-index: 2; /* 썸네일이 ReactPlayer보다 위에 위치 */
`;
