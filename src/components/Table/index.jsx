/**
 * Table 컴포넌트
 * @author 최유경
 * @since 2024.09.09
 * @version 1.0
 *
 * <pre>
 * 수정일        수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.09  	최유경       최초 생성
 * </pre>
 */

import React from 'react';
import '../../styles/font.css';
import { StyleTable } from './styled';

const CustomTable = ({ columns, data, hasPage, shouldNavigate, onRowClick, pagination }) => {
    // 클릭 시 이동할 경로를 설정하는 함수
    const handleClick = (record) => {
        if (shouldNavigate && shouldNavigate(record)) {
            onRowClick(record); // 페이지 이동 처리
        } else {
            console.log('페이지 이동 조건을 충족하지 않음');
        }
    };

    return (
        <>
            <StyleTable
                columns={columns}
                dataSource={data}
                pagination={hasPage ? { pageSize: pagination } : false}
                locale={{
                    emptyText: (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>데이터가 없습니다.</div>
                    ),
                }}
                onRow={(record) => {
                    const isNavigable = shouldNavigate && shouldNavigate(record);
                    return {
                        onClick: () => handleClick(record), // 행 클릭 시 호출
                        className: isNavigable ? 'navigable-row' : '', // 조건에 따라 className 추가
                    };
                }}
            />
        </>
    );
};
export default CustomTable;
