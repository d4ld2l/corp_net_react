import reducer from '../../redux/reducers/loaders'

describe('loaders reducer', () => {
  const initialState = {
    birthdays: true,
    currentCandidate: true,
    resumeSources: true,
    candidates: true,
    languages: true,
    languagesLevel: true,
    educationLevel: true,
    uploadingFile: false,
    departments: true,
    news: true,
    survey: true,
    event: true,
    employees: true,
  }

  const expectLoaderToBeForTypes = (name: string, value: boolean, types: Array<string>) => {
    types.forEach(type =>
      // $FlowFixMe
      expect(reducer(initialState, { type })[name]).toBe(value)
    )
  }

  it('should toggle birthdays loader', () => {
    expectLoaderToBeForTypes('birthdays', true, ['GET_BIRTHDAYS_CURRENT_REQ'])

    expectLoaderToBeForTypes('birthdays', false, [
      'GET_BIRTHDAYS_CURRENT_RES',
      'GET_BIRTHDAYS_CURRENT_FAIL',
    ])
  })

  it('should toggle currentCandidate loader', () => {
    expectLoaderToBeForTypes('currentCandidate', true, [
      'GET_CURRENT_CANDIDATE_REQ',
      'UPDATE_CURRENT_CANDIDATE_REQ',
    ])

    expectLoaderToBeForTypes('currentCandidate', false, [
      'GET_CURRENT_CANDIDATE_RES',
      'GET_CURRENT_CANDIDATE_FAIL',
      'UPDATE_CURRENT_CANDIDATE_RES',
      'UPDATE_CURRENT_CANDIDATE_FAIL',
      'RELEASE_CURRENT_CANDIDATE',
    ])
  })

  it('should toggle resumeSources loader', () => {
    expectLoaderToBeForTypes('resumeSources', true, ['GET_RESUME_SOURCES_REQ'])

    expectLoaderToBeForTypes('resumeSources', false, [
      'GET_RESUME_SOURCES_RES',
      'GET_RESUME_SOURCES_FAIL',
    ])
  })

  it('should toggle candidates loader', () => {
    expectLoaderToBeForTypes('candidates', true, ['GET_CANDIDATES_REQ'])

    expectLoaderToBeForTypes('candidates', false, ['GET_CANDIDATES_RES', 'GET_CANDIDATES_FAIL'])
  })

  it('should toggle languages loader', () => {
    expectLoaderToBeForTypes('languages', true, ['GET_LANGUAGES_REQ'])

    expectLoaderToBeForTypes('languages', false, ['GET_LANGUAGES_RES', 'GET_LANGUAGES_FAIL'])
  })

  it('should toggle languagesLevel loader', () => {
    expectLoaderToBeForTypes('languagesLevel', true, ['GET_LANGUAGES_LEVEL_REQ'])

    expectLoaderToBeForTypes('languagesLevel', false, [
      'GET_LANGUAGES_LEVEL_RES',
      'GET_LANGUAGES_LEVEL_FAIL',
    ])
  })

  it('should toggle educationLevel loader', () => {
    expectLoaderToBeForTypes('educationLevel', true, ['GET_EDUCATION_LEVEL_REQ'])

    expectLoaderToBeForTypes('educationLevel', false, [
      'GET_EDUCATION_LEVEL_RES',
      'GET_EDUCATION_LEVEL_FAIL',
    ])
  })

  it('should toggle uploadingFile loader', () => {
    expectLoaderToBeForTypes('uploadingFile', true, ['UPLOAD_FILE_TO_CANDIDATE_REQ'])

    expectLoaderToBeForTypes('uploadingFile', false, [
      'UPLOAD_FILE_TO_CANDIDATE_RES',
      'UPLOAD_FILE_TO_CANDIDATE_FAIL',
    ])
  })

  it('should toggle departments loader', () => {
    expectLoaderToBeForTypes('departments', true, ['GET_DEPARTMENTS_TREE_REQ'])

    expectLoaderToBeForTypes('departments', false, [
      'GET_DEPARTMENTS_TREE_RES',
      'GET_DEPARTMENTS_TREE_FAIL',
    ])
  })

  it('should toggle news loader', () => {
    expectLoaderToBeForTypes('news', true, ['GET_NEWS_REQ'])

    expectLoaderToBeForTypes('news', false, ['GET_NEWS_RES', 'GET_NEWS_FAIL'])
  })

  it('should toggle survey loader', () => {
    expectLoaderToBeForTypes('survey', true, ['GET_SURVEY_REQ'])

    expectLoaderToBeForTypes('survey', false, ['GET_SURVEY_RES', 'GET_SURVEY_FAIL'])
  })

  it('should toggle event loader', () => {
    expectLoaderToBeForTypes('event', true, ['GET_EVENT_REQ'])

    expectLoaderToBeForTypes('event', false, ['GET_EVENT_RES', 'GET_EVENT_FAIL'])
  })

  it('should toggle employees loader', () => {
    expectLoaderToBeForTypes('employees', true, ['GET_EMPLOYEES_REQ'])

    expectLoaderToBeForTypes('employees', false, ['GET_EMPLOYEES_RES', 'GET_EMPLOYEE_FAIL'])
  })

  it('should toggle services loader', () => {
    expectLoaderToBeForTypes('services', true, ['GET_SERVICES_REQ'])
    expectLoaderToBeForTypes('services', false, ['GET_SERVICES_RES', 'GET_SERVICES_FAIL'])
  })

  it('should toggle service loader', () => {
    expectLoaderToBeForTypes('service', true, ['GET_SERVICE_REQ'])
    expectLoaderToBeForTypes('service', false, ['GET_SERVICE_RES', 'GET_SERVICE_FAIL'])
  })

  it('should toggle bids loader', () => {
    expectLoaderToBeForTypes('bids', true, ['GET_BIDS_REQ'])
    expectLoaderToBeForTypes('bids', false, ['GET_BIDS_RES', 'GET_BIDS_FAIL'])
  })

  it('should toggle bid loader', () => {
    expectLoaderToBeForTypes('bid', true, ['GET_BID_REQ'])
    expectLoaderToBeForTypes('bid', false, ['GET_BID_RES', 'GET_BID_FAIL'])
  })
})
