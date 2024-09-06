import styled from 'styled-components';
import { colors } from '../../styles/colors';
import '../../styles/font.css';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1190px;
    height: auto;
`;

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 40px;
    // background-color: ${colors.main_green};
`;

export const BodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 22px;
    gap: 22px;
    height: auto;
    box-sizing: border-box;
    font-family: 'Happiness-Sans', sans-serif;
    font-weight: 400; /* Bold */
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${colors.white};
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    // background-color: ${colors.drak_gray};
`;

export const RowItem = styled.div`
    // gap: 15px;
    width: auto;
    align-items: center;
    display: flex;
    flex-direction: row;
`;

export const BodyWrapperTitle = styled.p`
    font-family: 'Happiness-Sans', sans-serif;
    font-weight: 800; /* Bold */
    font-size: 18px;
    width: auto;
    align-items: center;
    color: ${colors.black};
    // background-color: ${colors.drak_gray};
`;

export const HintTitle = styled.p`
    font-family: 'Happiness-Sans', sans-serif;
    font-weight: 800; /* Bold */
    font-size: 12px;
    width: 50px;
    align-items: center;
    color: ${colors.black};
`;

export const InputField = styled.input`
    width: ${(props) => props.width || '200px'};
    height: ${(props) => props.height || '35px'};
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid ${colors.gray};
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Happiness-Sans', sans-serif;
    font-weight: 400; /* Bold */
`;
