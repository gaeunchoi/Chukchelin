export enum SortOption {
  RATING_HIGH = 'RATING_HIGH',
  RATING_LOW = 'RATING_LOW',
  REVIEW_COUNT_HIGH = 'REVIEW_COUNT_HIGH',
  REVIEW_COUNT_LOW = 'REVIEW_COUNT_LOW',
  HOME_FAN_RECOMMEND_HIGH = 'HOME_FAN_RECOMMEND_HIGH',
  HOME_FAN_RECOMMEND_LOW = 'HOME_FAN_RECOMMEND_LOW',
}

export const sortConfig = {
  [SortOption.RATING_HIGH]: {
    sortBy: 'review_average_score',
    sortOrder: 'desc',
  },
  [SortOption.RATING_LOW]: {
    sortBy: 'review_average_score',
    sortOrder: 'asc',
  },
  [SortOption.REVIEW_COUNT_HIGH]: {
    sortBy: 'review_count',
    sortOrder: 'desc',
  },
  [SortOption.REVIEW_COUNT_LOW]: {
    sortBy: 'review_count',
    sortOrder: 'asc',
  },
  [SortOption.HOME_FAN_RECOMMEND_HIGH]: {
    sortBy: 'home_fan_recommend_count',
    sortOrder: 'desc',
  },
  [SortOption.HOME_FAN_RECOMMEND_LOW]: {
    sortBy: 'home_fan_recommend_count',
    sortOrder: 'asc',
  },
}

export const sortLabelMap = {
  [SortOption.RATING_HIGH]: '평점 높은 순',
  [SortOption.RATING_LOW]: '평점 낮은 순',
  [SortOption.REVIEW_COUNT_HIGH]: '리뷰 개수 많은 순',
  [SortOption.REVIEW_COUNT_LOW]: '리뷰 개수 적은 순',
  [SortOption.HOME_FAN_RECOMMEND_HIGH]: '홈 팬 추천 많은 순',
  [SortOption.HOME_FAN_RECOMMEND_LOW]: '홈 팬 추천 적은 순',
}

export enum ReviewSortOption {
  REVIEW_DATE_NEW = 'REVIEW_DATE_NEW',
  RATING_HIGH = 'RATING_HIGH',
  RATING_LOW = 'RATING_LOW',
}

export const reviewSortConfig = {
  [ReviewSortOption.REVIEW_DATE_NEW]: {
    sortBy: 'id',
    sortOrder: 'desc',
  },
  [ReviewSortOption.RATING_HIGH]: {
    sortBy: 'score',
    sortOrder: 'desc',
  },
  [ReviewSortOption.RATING_LOW]: {
    sortBy: 'score',
    sortOrder: 'asc',
  },
}

export const reviewSortLabelMap = {
  [ReviewSortOption.REVIEW_DATE_NEW]: '최신순',
  [ReviewSortOption.RATING_HIGH]: '평점 높은 순',
  [ReviewSortOption.RATING_LOW]: '평점 낮은 순',
}
