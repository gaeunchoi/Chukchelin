export enum TermOption {
  TERM_OF_SERVICE = 'term_of_service',
  PRIVACY_POLICY = 'privacy_policy',
}

export const termLabel = {
  [TermOption.TERM_OF_SERVICE]: '[필수] 이용약관 동의',
  [TermOption.PRIVACY_POLICY]: '[필수] 개인정보 수집 및 이용 동의',
}
