import styled from 'styled-components';
import { colors } from '../../styles/colors';
import '../../styles/font.css';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: auto;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 22px;
    gap: 10px;
    padding: 22px;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    font-family: 'Happiness-Sans', sans-serif;
    background-color: ${colors.white};
    font-weight: 400; /* Bold */
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 22px;
`;

export const UploadWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px;
    gap: 22px;
`;

export const RowItem = styled.div`
    gap: 5px;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
`;

export const UploadItem = styled.div`
    width: 100%;
    gap: 5px;
    align-item: center;
    display: flex;
    flex-direction: column;
`;

export const HintTitle = styled.p`
    font-family: 'Happiness-Sans', sans-serif;
    font-weight: 800; /* Bold */
    font-size: 12px;
    width: 60px;
    align-items: center;
    white-space: nowrap;
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

export const TextAreaField = styled.textarea`
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid ${colors.gray};
    border-radius: 5px;
    font-size: 12px;
    font-family: 'Happiness-Sans', sans-serif;
    font-weight: 400;
    resize: none;
    overflow-y: auto;
`;

// CheckBox 컨테이너
export const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
`;

// CheckBox 스타일
export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border: 1px solid ${colors.bright_gray};
`;

export const RadioContainer = styled.div`
    display: flex;
    gap: 15px; /* 라디오 버튼 사이의 간격 */
    align-items: center; /* 수직 가운데 정렬 */
    font-family: 'Happiness-Sans', sans-serif;
    font-weight: 400;
`;

export const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    font-family: 'Happiness-Sans', sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: ${colors.black};
`;

export const RadioInput = styled.input`
    margin-right: 8px; /* 라디오 버튼과 레이블 사이의 간격 */
`;
