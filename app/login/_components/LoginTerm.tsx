'use client'
import { useParams } from 'next/navigation'
import { TermOption } from '@/constants/termLabel'
import { flexCol } from '@/style/custom'

function LoginTerm() {
  const { title } = useParams() as { title: TermOption }

  if (title === TermOption.TERM_OF_SERVICE) {
    return (
      <div className={flexCol('w-full', 'gap-4')}>
        <div className={flexCol('w-full')}>
          <div className="text-[14px] font-bold">제1조 (목적)</div>
          <p className="text-[12px]">
            본 약관은 축슐랭(이하 &ldquo;회사&rdquo;)이 제공하는 K리그
            구장별 맛집 정보 서비스(이하 &ldquo;서비스&rdquo;)의 이용
            조건 및 절차, 회사와 회원 간의 권리·의무 및 책임사항을
            규정함을 목적으로 합니다.
          </p>
        </div>
        <div className={flexCol('w-full')}>
          <div className="text-[14px] font-bold">제2조 (정의)</div>
          <ol className="text-[12px]">
            <li>
              회원: 본 약관에 동의하고 카카오 소셜로그인을 통해 회사와
              이용계약을 체결한 자
            </li>
            <li>
              콘텐츠: 회사가 서비스 상에서 제공하는 모든 정보, 이미지,
              텍스트, 영상, 기타 자료
            </li>
            <li>선호팀: 회원이 서비스 내에서 선택한 K리그 구단</li>
          </ol>
        </div>
        <div className={flexCol('w-full')}>
          <div className="text-[14px] font-bold">
            제3조 (약관의 효력 및 변경)
          </div>
          <ol className="text-[12px]">
            <li>
              본 약관은 서비스 화면에 게시하거나 기타 방법으로
              회원에게 공지함으로써 효력이 발생합니다.
            </li>
            <li>
              회사는 관련 법령을 위배하지 않는 범위에서 약관을 변경할
              수 있으며, 변경 시 사전 공지합니다.
            </li>
          </ol>
        </div>
        <div className={flexCol('w-full')}>
          <div className="text-[14px] font-bold">
            제4조 (회원 가입)
          </div>
          <ol className="text-[12px]">
            <li>
              회원 가입은 카카오 소셜로그인을 통해 이루어집니다.
            </li>
            <li>
              회원은 가입 시 본 약관과 개인정보 수집·이용에 동의해야
              합니다.
            </li>
          </ol>
        </div>
        <div className={flexCol('w-full')}>
          <div className="text-[14px] font-bold">
            제5조 (서비스의 제공)
          </div>
          <ol className="text-[12px]">
            <li>
              회사는 회원에게 K리그 구장별 맛집 정보, 선호팀 맞춤
              정보, 기타 부가 서비스를 제공합니다.
            </li>
            <li>
              서비스 제공 시간은 연중무휴를 원칙으로 하나, 운영상의
              이유로 변경될 수 있습니다.
            </li>
          </ol>
        </div>
        <div className={flexCol('w-full')}>
          <div className="text-[14px] font-bold">
            제6조 (회원의 의무)
          </div>
          <ol className="text-[12px]">
            <li>
              회원은 서비스 이용 시 법령, 약관, 안내 사항을 준수해야
              합니다.
            </li>
            <li>
              타인의 계정을 도용하거나, 서비스 내 허위 정보를
              등록해서는 안 됩니다.
            </li>
          </ol>
        </div>
        <div className={flexCol('w-full')}>
          <div className="text-[14px] font-bold">제7조 (저작권)</div>
          <p className="text-[12px]">
            서비스 내 제공되는 모든 콘텐츠의 저작권은 회사 또는
            제휴사에 귀속됩니다.
          </p>
        </div>
        <div className={flexCol('w-full')}>
          <div className="text-[14px] font-bold">
            제8조 (이용 제한)
          </div>
          <p className="text-[12px]">
            회원이 본 약관을 위반한 경우, 회사는 서비스 이용을 제한할
            수 있습니다.
          </p>
        </div>
        <div className={flexCol('w-full')}>
          <div className="text-[14px] font-bold">제9조 (면책)</div>
          <p className="text-[12px]">
            회사는 천재지변, 서버 장애 등 불가항력적인 사유로 인한
            서비스 중단에 대하여 책임을 지지 않습니다.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={flexCol('w-full', 'gap-4')}>
      <div className={flexCol('w-full')}>
        <div className="text-[14px] font-bold">수집·이용 목적</div>
        <ul className="text-[12px]">
          <li>
            카카오 계정을 통한 회원 식별 및 서비스 제공 선호팀 기반
          </li>
          <li>맞춤형 맛집 정보 제공</li>
          <li>서비스 개선 및 고객 문의 대응</li>
        </ul>
      </div>
      <div className={flexCol('w-full')}>
        <div className="text-[14px] font-bold">수집 항목</div>
        <ul className="text-[12px]">
          <li>
            필수: 카카오 로그인 ID(고유 식별자), 닉네임, 프로필
            이미지, 이메일 주소, 선호팀 정보
          </li>
        </ul>
      </div>
      <div className={flexCol('w-full')}>
        <div className="text-[14px] font-bold">보유·이용 기간</div>
        <ul className="text-[12px]">
          <li>
            회원 탈퇴 시 즉시 파기 (관련 법령에 따라 보관이 필요한
            경우 해당 기간 보관 후 파기)
          </li>
        </ul>
      </div>
      <div className={flexCol('w-full')}>
        <div className="text-[14px] font-bold">
          동의 거부 권리 및 불이익
        </div>
        <ul className="text-[12px]">
          <li>
            회원은 개인정보 수집 및 이용에 동의하지 않을 권리가
            있습니다.
          </li>
          <li>
            다만, 동의 거부 시 회원가입 및 서비스 이용이 제한될 수
            있습니다.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LoginTerm
