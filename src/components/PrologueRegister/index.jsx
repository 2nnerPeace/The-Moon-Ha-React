/**
 * 프롤로그 등록 페이지
 * @author 최유경
 * @since 2024.09.06
 * @version 1.0
 *
 * <pre>
 * 수정일        수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.06  	최유경       최초 생성
 * </pre>
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteBtnIcon from '../../assets/images/contentDeleteBtnIcon.svg';

import {
    Container,
    HintTitle,
    InputField,
    RowItem,
    Wrapper,
    BodyWrapper,
    ModalP,
    ModalContainer,
    RowNoCenterItem,
    WrapperTitle,
    ColumnWrapper,
} from './styled';
import DatePicker from '../DatePicker';
import FileUpload from '../Upload';
import CustomModal from '../Modal';
import Button from '../Button';
import plusIcon from '../../assets/images/plusIcon.svg';
import cancelIcon from '../../assets/images/cancelIcon.svg';
import CustomTable from '../Table';
import { prologueRegisterAPIV2 } from '../../apis/Craft';
import { getFileNameServer } from '../../util';
import { getPresignedUrlList, uploadFileToS3 } from '../../apis/S3';
import Player from '../Player';
import CustomImage from '../Image';

const PrologueRegister = () => {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const [themeName, setThemeName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
    const [titleList, setTitleList] = useState([]);
    const [thumbnailList, setThumbnailList] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [prologueList, setPrologueList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [presignedUrls, setPresignedUrls] = useState({ videoUrls: {}, thumbnailUrls: {} });
    const [fileNames, setFileNames] = useState({ videoFileNames: [], prologueFileNames: [] });

    const handleDateChange = (dates, dateStrings) => {
        setSelectedDateRange(dates);
    };

    const handleAddPrologue = (prologueName, newThumbnail, newVideo) => {
        setThumbnailList([...thumbnailList, newThumbnail]);
        setVideoList([...videoList, newVideo]);
        setTitleList([...titleList, prologueName]);

        setPrologueList([
            ...prologueList,
            {
                key: prologueList.length + 1,
                video: URL.createObjectURL(newVideo),
                thumbnail: URL.createObjectURL(newThumbnail),
                title: prologueName,
            },
        ]);
    };

    const handleDelete = (key) => {
        // 해당 key를 가진 항목을 삭제
        setPrologueList(prologueList.filter((item) => item.key !== key));
    };

    const handleSubmit = async () => {
        const videoFileNames = videoList.map((file) => file.name);
        const thumbnailFileNames = thumbnailList.map((file) => file.name);

        setFileNames({
            videoFileNames,
            thumbnailFileNames,
        });

        setLoading(true);

        if (!isDisabled) {
            // 1. 비디오 파일 presigned URLs 요청
            const videoResponse = await getPresignedUrlList(videoFileNames);
            const videoPresignedUrls = await videoResponse.data;

            // const videoResponse = await createMultipart(videoFileNames);
            // const videoUploadIds = await videoResponse.data;
            // console.log('videoUploadIds : ', videoUploadIds);

            // 2. 프롤로그 파일 presigned URLs 요청
            const thumbnailResponse = await getPresignedUrlList(thumbnailFileNames);
            const thumbnailPresignedUrls = await thumbnailResponse.data;

            // Presigned URLs을 상태에 저장
            setPresignedUrls({
                videoUrls: videoPresignedUrls,
                thumbnailUrls: thumbnailPresignedUrls,
            });
            console.log('videoPresignedUrls : {}', videoPresignedUrls);
            console.log('thumbnailPresignedUrls : {}', thumbnailPresignedUrls);

            await new Promise((resolve) => setTimeout(resolve, 0));

            // 3. 파일 업로드
            const uploadPromises = [
                ...videoList.map((file, index) => {
                    const fileName = videoFileNames[index];
                    const presignedUrl = videoPresignedUrls[fileName];
                    return uploadFileToS3(file, presignedUrl);
                }),
                ...thumbnailList.map((file, index) => {
                    const fileName = thumbnailFileNames[index];
                    const presignedUrl = thumbnailPresignedUrls[fileName];
                    return uploadFileToS3(file, presignedUrl);
                }),
            ];
            await Promise.all(uploadPromises);
            console.log('파일 업로드 완료');

            // 4. 업로드된 파일의 URL 생성
            const baseUrl = 'https://image.themoonha.site/';
            const updatedVideoUrls = videoFileNames.map((fileName) => `${baseUrl}${fileName}`);
            const updatedThumbnailUrls = thumbnailFileNames.map((fileName) => `${baseUrl}${fileName}`);

            // 서버로 데이터 전송
            const prologueRegister = {
                name: themeName,
                description: description,
                videoCnt: titleList.length,
                startDate: selectedDateRange ? selectedDateRange[0].format('YYYY-MM-DD') : null,
                expireDate: selectedDateRange ? selectedDateRange[1].format('YYYY-MM-DD') : null,
                prologueList: titleList,
                thumbnailList: updatedThumbnailUrls,
                videoList: updatedVideoUrls,
            };

            try {
                // API 호출
                const response = await prologueRegisterAPIV2(prologueRegister);

                console.log('응답 : {}', response);
                if (response.status === 200) {
                    console.log('Success:', response.data);
                    navigate('/prologue');
                } else {
                    console.error('Server Error:', response.status, response.statusText);
                }
            } catch (error) {
                if (error.response) {
                    console.error('서버 응답 에러 데이터:', error.response.data);
                    console.error('서버 응답 상태:', error.response.status);
                } else {
                    console.error('요청 에러:', error.message);
                }
            }
        }
    };

    useEffect(() => {
        if (
            themeName !== '' &&
            description !== '' &&
            selectedDateRange[0] !== null &&
            titleList.length !== 0 &&
            thumbnailList.length !== 0 &&
            videoList.length !== 0 &&
            titleList.length === thumbnailList.length &&
            titleList.length === videoList.length
        ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [themeName, description, selectedDateRange, titleList, thumbnailList, videoList]);

    const columns = [
        {
            title: '프롤로그',
            dataIndex: 'video',
            key: 'video',
            width: '25%',
            render: (text, record) => <Player url={record.video} width="100%" height="auto" />,
        },
        {
            title: '썸네일',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: '25%',
            render: (text, record) => (
                <CustomImage
                    src={record.thumbnail} // 비디오 URL 데이터 인덱스에 맞게 수정
                    width="100%" // 원하는 너비
                />
            ),
        },
        {
            title: '제목',
            dataIndex: 'title',
            key: 'title',
            width: '40%',
        },
        {
            dataIndex: 'edit',
            key: 'edit',
            width: '10%',
            align: 'left',
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: 'none', padding: '22px' }}>
                    <Button variant="contentDeleteBtn" icon={deleteBtnIcon} onClick={() => handleDelete(record.key)} />
                </div>
            ),
        },
    ];

    return (
        <Container>
            <Wrapper>
                <WrapperTitle>테마 등록</WrapperTitle>
                <BodyWrapper>
                    <ColumnWrapper width="70%">
                        <RowItem>
                            <HintTitle>테마명</HintTitle>
                            <InputField type="text" value={themeName} onChange={(e) => setThemeName(e.target.value)} />
                        </RowItem>
                        <RowItem>
                            <HintTitle>설명</HintTitle>
                            <InputField
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </RowItem>
                    </ColumnWrapper>
                    <ColumnWrapper width="30%">
                        <RowItem>
                            <HintTitle>기간</HintTitle>
                            <DatePicker onChange={handleDateChange} />
                        </RowItem>
                    </ColumnWrapper>
                </BodyWrapper>
            </Wrapper>
            <Wrapper />
            <Wrapper>
                <WrapperTitle>프롤로그 등록</WrapperTitle>
                <BodyWrapper>
                    <CustomTable columns={columns} data={prologueList} hasPage={false} />
                </BodyWrapper>

                <CustomModal
                    variant="prologuePlusBtn"
                    buttonContent={<img src={plusIcon} alt="open" style={{ width: '15px', height: '15px' }} />}
                    closeIcon={<img src={cancelIcon} alt="close" style={{ width: '15px', height: '15px' }} />}
                >
                    <RegisterModal onUpdate={handleAddPrologue} />
                </CustomModal>
            </Wrapper>

            <Button variant="registerBtn" onClick={handleSubmit} disabled={isDisabled}>
                예약 등록하기
            </Button>
        </Container>
    );
};

export default PrologueRegister;

const RegisterModal = ({ setOpen, setConfirmLoading, confirmLoading, onUpdate }) => {
    const [prologueName, setPrologueName] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleOk = () => {
        setConfirmLoading(true);
        // 파일 이름을 getFileNameServer 함수로 변경
        const thumbnailFileName = thumbnailFile ? getFileNameServer('craft', thumbnailFile.name) : null;
        const videoFileName = videoFile ? getFileNameServer('craft', videoFile.name) : null;

        // 새로운 파일 객체 생성
        const renamedThumbnailFile = thumbnailFile
            ? new File([thumbnailFile], thumbnailFileName, { type: thumbnailFile.type })
            : null;
        const renamedVideoFile = videoFile ? new File([videoFile], videoFileName, { type: videoFile.type }) : null;

        setTimeout(() => {
            if (onUpdate) {
                onUpdate(prologueName, renamedThumbnailFile, renamedVideoFile);
            }
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleThumbnailFileChange = (file) => {
        setThumbnailFile(file);
    };

    const handleVideoFileChange = (file) => {
        setVideoFile(file);
    };

    useEffect(() => {
        if (prologueName !== '' && thumbnailFile !== null && videoFile !== null) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [prologueName, thumbnailFile, videoFile]);

    return (
        <ModalContainer>
            <RowNoCenterItem>
                <ModalP>영상 이름</ModalP>
                <InputField
                    type="text"
                    width="400px"
                    value={prologueName}
                    onChange={(e) => setPrologueName(e.target.value)}
                />
            </RowNoCenterItem>
            <RowNoCenterItem>
                <ModalP>썸네일 사진</ModalP>
                <FileUpload onChange={handleThumbnailFileChange} id="image" width="400px" ratio="16/9" />
            </RowNoCenterItem>
            <RowNoCenterItem>
                <ModalP>프리뷰 영상</ModalP>
                <FileUpload onChange={handleVideoFileChange} id="video" width="400px" ratio="16/9" />
            </RowNoCenterItem>
            <Button
                key="ok"
                type="primary"
                variant="prologueAddBtn"
                loading={confirmLoading ? confirmLoading : false}
                onClick={handleOk}
                disabled={isDisabled}
            >
                등록하기
            </Button>
        </ModalContainer>
    );
};
