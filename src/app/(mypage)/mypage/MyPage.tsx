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
            <S.Form>
                <S.Container>

                    <S.UserInfo>
                        <S.UserProfilePic>프로필사진</S.UserProfilePic>
                        <S.UserName>홍길동</S.UserName>
                    </S.UserInfo>

                    <S.UserMileage
                    onClick={() => setOpen(true)}
                    >
                        마일리지
                    </S.UserMileage>

                    <S.UserActions>
                        <S.UserActionItem>
                            내가 쓴 글
                            <S.BackButton
                                type="button"
                                onClick = {() => router.push('./myposts')}

                            >
                                &gt;
                            </S.BackButton>
                        </S.UserActionItem>

                        <S.UserActionItem>
                            북마크
                            <S.BackButton
                                type="button"
                                onClick = {() => router.push('./mybooks')}
                            >
                                &gt;
                            </S.BackButton>
                        </S.UserActionItem>
                        
                        <S.UserActionItem>
                            좋아요
                            <S.BackButton
                                type="button"
                                onClick = {() => router.push('./mylikes')}
                            >
                                &gt;
                            </S.BackButton>
                        </S.UserActionItem>



                        {/* 알림설정 회의하고 다시 작성 */}
                        <S.UserActionItem>
                            알림 설정
                            <S.BackButton
                                type="button"
                                onClick = {() => router.push('./mysettings')}
                            >
                                &gt;
                            </S.BackButton>
                        </S.UserActionItem>
                        
                        <S.UserActionItem>
                            회원 탈퇴
                            <S.BackButton           
                                type="button"
                                onClick = {() => router.push('./mydelete')}
                            >
                                &gt;
                            </S.BackButton>                        
                        </S.UserActionItem>

                        <S.Logout>
                            로그아웃
                            
                        </S.Logout>
                    </S.UserActions>

                    <S.MyBottomContainer>
                        {<MyBottomForm />}
                    </S.MyBottomContainer>
                </S.Container>
            </S.Form>


                        {/* 🔸 모달 (open === true일 때만 표시) */}
            {open && (
                <S.Overlay
                // onClick={() => setOpen(false)}
                >
                    <S.Model
                    // onClick={(e) => e.stopPropagation()}
                    >
                        <h2>마일리지 획득 방법</h2>

                        <h4>1. 채팅 고민 해결 참여</h4>
                        <p>고민을 나누고 해결에 참여해보세요</p>

                        <h4>2. 게시글, 댓글 좋아요 달성</h4>
                        <p>작성한 게시글, 댓글의 일정 수 이상의 좋아요를 받아보세요</p>

                        <h4>3. 주간 인기 게시글 선정</h4>
                        <p>한 주 동안 가장 많은 관심을 받은 게시글로 선정되어 보세요</p>

                        <h4>4. 하루 한 번 랜덤 돌리기</h4>
                        <p>---------</p>

                        <S.Buttons>
                            <S.ComfirmButton
                                type="button"
                                onClick={() => setOpen(false)}
                            >
                                확인
                            </S.ComfirmButton>
                        </S.Buttons>
                    </S.Model>
                </S.Overlay>
            )}
        </>

    );
};

export default MyPageForm;