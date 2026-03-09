'use client';

import { useState} from "react";
import { useRouter } from "next/navigation";
// import styles from "./MyPage.module.css";

import MyBottomForm from "@/app/(mypage)/mybottom/MyBottom";
import * as S from "./MyPage.styles";



const MyPageForm = () => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("마일리지를 획득해 보세요.")

        setOpen(true);
    };

    return (
        <>
            <S.Header>마이페이지</S.Header>
            <S.Form onSubmit={handleSubmit}>
                <S.Container>
                    {/* 이미지 넣고 수정 */}
                    <S.UserInfo>
                        <S.UserProfilePic>P</S.UserProfilePic>
                        <S.UserName
                            type="button"
                            onClick={()=>router.push('/프로필 수정')}
                        >
                            홍길동          &gt;
                        </S.UserName>
                    </S.UserInfo>

                    <S.UserMileage>
                        <S.MileageItem>
                            <S.MileageText>마일리지</S.MileageText>
                            <S.MileagePoint>0P</S.MileagePoint>
                        </S.MileageItem>

                        {/* 이미지 넣고 수정 */}
                        <S.MileageIcon>
                            <S.MileageButton
                                type="button"
                                onClick={() => setOpen(true)}
                            >
                                M
                            </S.MileageButton>
                        </S.MileageIcon>
                        
                    </S.UserMileage>

                    <S.UserActions>
                        <S.UserActionItem>
                            내가 쓴 글
                            <S.BackButton
                                type="button"
                                onClick = {() => router.push('/myposts')}

                            >
                                &gt;
                            </S.BackButton>
                        </S.UserActionItem>

                        {/* 페이지 개설 후 수정 */}
                        <S.UserActionItem>
                            내 채팅
                            <S.BackButton
                                type="button"
                                onClick = {() => router.push('/mychats')}

                            >
                                &gt;
                            </S.BackButton>
                        </S.UserActionItem>

                        <S.UserActionItem>
                            북마크
                            <S.BackButton
                                type="button"
                                onClick = {() => router.push('/mybooks')}
                            >
                                &gt;
                            </S.BackButton>
                        </S.UserActionItem>
                        
                        <S.UserActionItem>
                            좋아요
                            <S.BackButton
                                type="button"
                                onClick = {() => router.push('/mylikes')}
                            >
                                &gt;
                            </S.BackButton>
                        </S.UserActionItem>



                        {/* 알림설정 회의하고 다시 작성 */}
                        <S.UserActionItem>
                            알림 설정
                            <S.BackButton
                                type="button"
                                onClick = {() => router.push('/mysettings')}
                            >
                                &gt;
                            </S.BackButton>
                        </S.UserActionItem>
                        
                        <S.UserActionItem>
                            회원 탈퇴
                            <S.BackButton           
                                type="button"
                                onClick = {() => router.push('/mydelete')}
                            >
                                &gt;
                            </S.BackButton>                        
                        </S.UserActionItem>

                        <S.Logout>
                            로그아웃
                            
                        </S.Logout>
                    </S.UserActions>

                    {/* 하단바 불러오기  */}
                    {/* <S.MyBottomContainer>
                        {<MyBottomForm />}
                    </S.MyBottomContainer> */}
                </S.Container>
            </S.Form>


                        {/* 🔸 모달 (open === true일 때만 표시) */}
            {open && (
                <S.Overlay
                // onClick={() => setOpen(false)}
                >
                    <S.Modal
                    // onClick={(e) => e.stopPropagation()}
                    >
                        <S.ModalTitle>마일리지 획득 방법</S.ModalTitle>

                        <S.ModalSubtitle>1. 채팅 고민 해결 참여</S.ModalSubtitle>
                        <S.ModalText>고민을 나누고 해결에 참여해보세요</S.ModalText>

                        <S.ModalSubtitle>2. 게시글, 댓글 좋아요 달성</S.ModalSubtitle>
                        <S.ModalText>작성한 게시글, 댓글의 일정 수 이상의 좋아요를 받아보세요</S.ModalText>

                        <S.ModalSubtitle>3. 주간 인기 게시글 선정</S.ModalSubtitle>
                        <S.ModalText>한 주 동안 가장 많은 관심을 받은 게시물로 선정되어 보세요</S.ModalText>

                        <S.ModalSubtitle>4. 하루 한 번 랜덤 돌리기</S.ModalSubtitle>
                        <S.ModalText>~~~~~~~~~~~~~`</S.ModalText>

                        
                        <S.ComfirmButton
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            확인
                        </S.ComfirmButton>
                    
                        
                        
                        
                    </S.Modal>
                </S.Overlay>
            )}
        </>

    );
};

export default MyPageForm;