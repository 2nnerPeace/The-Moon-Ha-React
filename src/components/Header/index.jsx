/**
 * header 컴포넌트
 * @author 최유경
 * @since 2024.08.26
 * @version 1.0
 *
 * <pre>
 * 수정일        수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.08.26  	최유경       최초 생성
 * 2024.09.13   최유경       header 상단 고정
 * </pre>
 */
import React from 'react';
import { Container, LeftWrapper, RightWrapper, StyledLink } from './styled';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../recoil';
import Button from '../Button';
import { LogOutAPI } from '../../apis/Auth';
import { notification } from 'antd';
import { useNavigate } from 'react-router';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useRecoilValue(authState);
    const setAuthState = useSetRecoilState(authState);

    const handleLogout = async () => {
        try {
            // 로그인 API 요청
            const response = await LogOutAPI();
            console.log('LogOutAPI response : ', response);
            if (response.data.success) {
                // 로그인 성공 시 localStorage에 저장
                localStorage.setItem('isLoggedIn', 'false');
                setAuthState(false);
                notification.success({ message: 'Logout successful!' }); // 성공 알림
                navigate('/login');
            } else {
                notification.error({ message: 'Login failed. Please try again.' }); // 실패 알림
            }
        } catch (error) {
            console.error('LogOutAPI error:', error);
            notification.error({ message: 'An error occurred. Please try again.' }); // 오류 알림
        }
        setAuthState(false);
    };

    return (
        <Container>
            <LeftWrapper>{/* <LogoImage src={logo} /> */}더 문화적인 하루 관리자</LeftWrapper>
            <RightWrapper>
                {/* hello! */}
                {isAuthenticated ? (
                    <Button variant="logoutBtn" onClick={handleLogout}>
                        LOGOUT
                    </Button>
                ) : (
                    <>
                        <StyledLink to="/login">LOGIN</StyledLink>
                        {/* /<StyledLink to="/signup">SIGNUP</StyledLink> */}
                    </>
                )}
            </RightWrapper>
        </Container>
    );
};
export default Header;
