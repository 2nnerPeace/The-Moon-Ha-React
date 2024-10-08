/**
 * Router
 * @author 최유경
 * @since 2024.08.26
 * @version 1.0
 *
 * <pre>
 * 수정일        수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.08.26   최유경       최초 생성
 * 2024.09.03   최유경       header, sidebar 추가
 * 2024.09.09  	최유경       Layout 구성
 * </pre>
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/index.css';

import Main from './pages/Main';
import Lesson from './pages/Lesson';
import ShortForm from './pages/ShortForm';
import Craft from './pages/Craft';
import Prologue from './pages/Prologue';
import Suggestion from './pages/Suggestion';
import LiveStartPage from './pages/LiveStartPage';
import LiveBroadcastPage from './pages/LiveBroadcastPage';
import LessonRegisterPage from './pages/LessonRegister';
import ShortFormRegisterPage from './pages/ShortFormRegister';
import PrologueRegisterPage from './pages/PrologueRegister';
import PrologueDetailPage from './pages/PrologueDetail';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import LessonDetailPage from './pages/LessonDetail';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/shortForm" element={<ShortForm />} />
            <Route path="/shortForm/register" element={<ShortFormRegisterPage />} />
            <Route path="/lesson" element={<Lesson />} />
            <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
            <Route path="/lesson/register" element={<LessonRegisterPage />} />
            <Route path="/craft" element={<Craft />} />
            <Route path="/prologue" element={<Prologue />} />
            <Route path="/prologue/:prologueThemeId" element={<PrologueDetailPage />} />
            <Route path="/prologue/register" element={<PrologueRegisterPage />} />
            <Route path="/suggestion" element={<Suggestion />} />
            <Route path="/live/broadcast" element={<LiveBroadcastPage />} />
            <Route path="/live/start" element={<LiveStartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
    );
};

export default Router;
