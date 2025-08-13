import { init, track, setUserId } from '@amplitude/analytics-browser'
import {
  AMPLITUDE_EVENTS,
  AMPLITUDE_PROPERTIES,
  AMPLITUDE_USER_PROPERTIES,
  AmplitudeEventProperties,
  AmplitudeUserProperties,
  ExtendedAmplitudeEventProperties,
} from '@/constants/analytics'

// Amplitude 초기화 (한 번만 실행)
let isInitialized = false

export const initializeAmplitude = () => {
  if (isInitialized) return

  const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
  if (AMPLITUDE_API_KEY) {
    init(AMPLITUDE_API_KEY, undefined, {
      defaultTracking: {
        sessions: true,
      },
      minIdLength: 1,
    })
    isInitialized = true
    console.log('[Analytics] Amplitude initialized')
  } else {
    console.warn('[Analytics] AMPLITUDE_API_KEY not found')
  }
}

// 기본 이벤트 추적 함수
export const trackEvent = (
  eventName: string,
  properties?: ExtendedAmplitudeEventProperties,
) => {
  try {
    track(eventName, properties)
    console.log(`[Analytics] ${eventName}:`, properties)
  } catch (error) {
    console.error(`[Analytics Error] ${eventName}:`, error)
  }
}

// 사용자 ID 설정
export const setAmplitudeUserId = (userId: string) => {
  try {
    setUserId(userId)
    console.log(`[Analytics] User ID set: ${userId}`)
  } catch (error) {
    console.error('[Analytics Error] Failed to set user ID:', error)
  }
}

// 사용자 속성 설정 (이벤트로 추적)
export const setAmplitudeUserProperties = (
  properties: AmplitudeUserProperties,
) => {
  try {
    // 사용자 속성을 이벤트로 추적
    trackEvent('User Property Set', properties)
    console.log('[Analytics] User properties set:', properties)
  } catch (error) {
    console.error(
      '[Analytics Error] Failed to set user properties:',
      error,
    )
  }
}

// 페이지 뷰 추적
export const trackPageView = (
  pageName: string,
  pagePath: string,
  additionalProperties?: AmplitudeEventProperties,
) => {
  trackEvent(AMPLITUDE_EVENTS.PAGE_VIEWED, {
    [AMPLITUDE_PROPERTIES.PAGE_NAME]: pageName,
    [AMPLITUDE_PROPERTIES.PAGE_PATH]: pagePath,
    ...additionalProperties,
  })
}

// 회원가입 퍼널 추적
export const trackSignUpStarted = (method: string) => {
  trackEvent(AMPLITUDE_EVENTS.SIGN_UP_STARTED, {
    [AMPLITUDE_PROPERTIES.METHOD]: method,
  })
}

export const trackSignUpCompleted = (method: string) => {
  trackEvent(AMPLITUDE_EVENTS.SIGN_UP_COMPLETED, {
    [AMPLITUDE_PROPERTIES.METHOD]: method,
  })

  // 사용자 속성 설정
  setAmplitudeUserProperties({
    [AMPLITUDE_USER_PROPERTIES.SIGNUP_METHOD]: method,
    [AMPLITUDE_USER_PROPERTIES.SIGNUP_DATE]: new Date().toISOString(),
  })
}

export const trackTeamSelected = (team: string) => {
  trackEvent(AMPLITUDE_EVENTS.TEAM_SELECTED, {
    [AMPLITUDE_PROPERTIES.TEAM]: team,
  })

  // 사용자 속성 설정
  setAmplitudeUserProperties({
    [AMPLITUDE_USER_PROPERTIES.SELECTED_TEAM]: team,
  })
}

export const trackHomeViewedPersonalized = (team: string) => {
  trackEvent(AMPLITUDE_EVENTS.HOME_VIEWED_PERSONALIZED, {
    [AMPLITUDE_PROPERTIES.TEAM]: team,
  })
}

// 맛집 탐색 퍼널 추적
export const trackStadiumPageViewed = (
  stadium: string,
  team: string,
) => {
  trackEvent(AMPLITUDE_EVENTS.STADIUM_PAGE_VIEWED, {
    [AMPLITUDE_PROPERTIES.STADIUM]: stadium,
    [AMPLITUDE_PROPERTIES.TEAM]: team,
  })
}

export const trackRestaurantViewed = (
  restaurantId: string,
  restaurantName: string,
  category: string,
  stadium: string,
) => {
  trackEvent(AMPLITUDE_EVENTS.RESTAURANT_VIEWED, {
    [AMPLITUDE_PROPERTIES.RESTAURANT_ID]: restaurantId,
    [AMPLITUDE_PROPERTIES.RESTAURANT_NAME]: restaurantName,
    [AMPLITUDE_PROPERTIES.CATEGORY]: category,
    [AMPLITUDE_PROPERTIES.STADIUM]: stadium,
  })
}

export const trackRestaurantFavorited = (
  restaurantId: string,
  restaurantName: string,
) => {
  trackEvent(AMPLITUDE_EVENTS.RESTAURANT_FAVORITED, {
    [AMPLITUDE_PROPERTIES.RESTAURANT_ID]: restaurantId,
    [AMPLITUDE_PROPERTIES.RESTAURANT_NAME]: restaurantName,
  })
}

export const trackCallClicked = (
  restaurantId: string,
  restaurantName: string,
) => {
  trackEvent(AMPLITUDE_EVENTS.CALL_CLICKED, {
    [AMPLITUDE_PROPERTIES.RESTAURANT_ID]: restaurantId,
    [AMPLITUDE_PROPERTIES.RESTAURANT_NAME]: restaurantName,
  })
}

export const trackNavigateClicked = (
  restaurantId: string,
  restaurantName: string,
) => {
  trackEvent(AMPLITUDE_EVENTS.NAVIGATE_CLICKED, {
    [AMPLITUDE_PROPERTIES.RESTAURANT_ID]: restaurantId,
    [AMPLITUDE_PROPERTIES.RESTAURANT_NAME]: restaurantName,
  })
}

// 리뷰 작성 퍼널 추적
export const trackReviewStarted = (
  restaurantId: string,
  restaurantName: string,
) => {
  trackEvent(AMPLITUDE_EVENTS.REVIEW_STARTED, {
    [AMPLITUDE_PROPERTIES.RESTAURANT_ID]: restaurantId,
    [AMPLITUDE_PROPERTIES.RESTAURANT_NAME]: restaurantName,
  })
}

export const trackImageUploaded = (
  restaurantId: string,
  uploadTime: number, // 밀리초 단위
) => {
  trackEvent(AMPLITUDE_EVENTS.IMAGE_UPLOADED, {
    [AMPLITUDE_PROPERTIES.RESTAURANT_ID]: restaurantId,
    [AMPLITUDE_PROPERTIES.UPLOAD_TIME]: uploadTime,
  })
}

export const trackImageUploadFailed = (
  restaurantId: string,
  errorType: string,
  errorMessage: string,
) => {
  trackEvent(AMPLITUDE_EVENTS.IMAGE_UPLOAD_FAILED, {
    [AMPLITUDE_PROPERTIES.RESTAURANT_ID]: restaurantId,
    [AMPLITUDE_PROPERTIES.ERROR_TYPE]: errorType,
    [AMPLITUDE_PROPERTIES.ERROR_MESSAGE]: errorMessage,
  })
}

export const trackReviewSubmitted = (
  restaurantId: string,
  restaurantName: string,
  hasImages: boolean,
) => {
  trackEvent(AMPLITUDE_EVENTS.REVIEW_SUBMITTED, {
    [AMPLITUDE_PROPERTIES.RESTAURANT_ID]: restaurantId,
    [AMPLITUDE_PROPERTIES.RESTAURANT_NAME]: restaurantName,
    has_images: hasImages,
  })
}

// 페이지 체류 시간 추적을 위한 헬퍼
export const createPageViewTracker = (
  pageName: string,
  pagePath: string,
) => {
  const startTime = Date.now()

  // 페이지 진입 시 추적
  trackPageView(pageName, pagePath)

  // 페이지 이탈 시 체류 시간 추적
  const trackTimeSpent = () => {
    const timeSpent = Date.now() - startTime
    trackEvent('Page Time Spent', {
      [AMPLITUDE_PROPERTIES.PAGE_NAME]: pageName,
      [AMPLITUDE_PROPERTIES.PAGE_PATH]: pagePath,
      [AMPLITUDE_PROPERTIES.TIME_SPENT]: timeSpent,
    })
  }

  return trackTimeSpent
}
