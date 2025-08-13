// Amplitude 이벤트 상수
export const AMPLITUDE_EVENTS = {
  // 회원가입/온보딩 퍼널
  PAGE_VIEWED: 'Page Viewed',
  SIGN_UP_STARTED: 'Sign Up Started',
  SIGN_UP_COMPLETED: 'Sign Up Completed',
  TEAM_SELECTED: 'Team Selected',
  HOME_VIEWED_PERSONALIZED: 'Home Viewed (Personalized)',

  // 맛집 탐색 퍼널
  STADIUM_PAGE_VIEWED: 'Stadium Page Viewed',
  RESTAURANT_VIEWED: 'Restaurant Viewed',
  RESTAURANT_FAVORITED: 'Restaurant Favorited',
  CALL_CLICKED: 'Call Clicked',
  NAVIGATE_CLICKED: 'Navigate Clicked',
  REVIEW_SUBMITTED: 'Review Submitted',

  // 리뷰 작성 퍼널
  REVIEW_STARTED: 'Review Started',
  IMAGE_UPLOADED: 'Image Uploaded',
  IMAGE_UPLOAD_FAILED: 'Image Upload Failed',
} as const

// 이벤트 속성 상수
export const AMPLITUDE_PROPERTIES = {
  // 공통 속성
  METHOD: 'method', // 카카오, 네이버 등
  TEAM: 'team', // 선택된 팀
  STADIUM: 'stadium', // 구장
  CATEGORY: 'category', // 맛집 카테고리
  RESTAURANT_ID: 'restaurant_id',
  RESTAURANT_NAME: 'restaurant_name',

  // 페이지 관련
  PAGE_NAME: 'page_name',
  PAGE_PATH: 'page_path',

  // 시간 관련
  TIME_SPENT: 'time_spent', // 페이지 체류 시간
  UPLOAD_TIME: 'upload_time', // 이미지 업로드 시간

  // 에러 관련
  ERROR_TYPE: 'error_type',
  ERROR_MESSAGE: 'error_message',
} as const

// 퍼널 분석을 위한 사용자 속성
export const AMPLITUDE_USER_PROPERTIES = {
  SIGNUP_METHOD: 'signup_method',
  SELECTED_TEAM: 'selected_team',
  SIGNUP_DATE: 'signup_date',
  LAST_ACTIVITY: 'last_activity',
} as const

// 이벤트 속성 값들의 타입 정의
export type AmplitudeEventProperties = {
  // 공통 속성
  [AMPLITUDE_PROPERTIES.METHOD]?: string
  [AMPLITUDE_PROPERTIES.TEAM]?: string
  [AMPLITUDE_PROPERTIES.STADIUM]?: string
  [AMPLITUDE_PROPERTIES.CATEGORY]?: string
  [AMPLITUDE_PROPERTIES.RESTAURANT_ID]?: string
  [AMPLITUDE_PROPERTIES.RESTAURANT_NAME]?: string

  // 페이지 관련
  [AMPLITUDE_PROPERTIES.PAGE_NAME]?: string
  [AMPLITUDE_PROPERTIES.PAGE_PATH]?: string

  // 시간 관련
  [AMPLITUDE_PROPERTIES.TIME_SPENT]?: number
  [AMPLITUDE_PROPERTIES.UPLOAD_TIME]?: number

  // 에러 관련
  [AMPLITUDE_PROPERTIES.ERROR_TYPE]?: string
  [AMPLITUDE_PROPERTIES.ERROR_MESSAGE]?: string

  // 추가 속성들
  has_images?: boolean
  custom_property?: string
}

// 사용자 속성 타입 정의
export type AmplitudeUserProperties = {
  [AMPLITUDE_USER_PROPERTIES.SIGNUP_METHOD]?: string
  [AMPLITUDE_USER_PROPERTIES.SELECTED_TEAM]?: string
  [AMPLITUDE_USER_PROPERTIES.SIGNUP_DATE]?: string
  [AMPLITUDE_USER_PROPERTIES.LAST_ACTIVITY]?: string
}

// 추가 이벤트 속성을 위한 확장 타입
export type ExtendedAmplitudeEventProperties =
  AmplitudeEventProperties & {
    [key: string]: string | number | boolean | undefined
  }
