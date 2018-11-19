import moment from "moment/moment";

const initialState = {
  data: [],
  projectsAllCount: 0,
  projectsMyCount: 0,
  page: 1,
  activeTabMy: true,
  scroll: true,
  all: false,
  current: {},
  filterActive: false,
  filterOpen: false,
  searchParams: '',
  filter: {
    customer: null,
    legalUnit: null,
    manager: null,
    department: null,
    begin_date: null,
    end_date: null,
    product_list: null,
    technology_list: null,
    methodology_list: null,
    close_project: false,
  },
  technologies: [],
  products: [],
  methodologies: [],
  saveState: false,
}

function setFilterData(filter, payload) {
  const res = {}

  res.customer = payload.customer
  res.legalUnit = payload.legalUnit
  res.manager = payload.manager
  res.department = payload.department
  res.close_project = payload.close_project
  res.begin_date = payload.begin_date
  res.end_date = payload.end_date
  res.product_list = payload.product_list
  res.technology_list = payload.technology_list
  res.methodology_list = payload.methodology_list

  return res
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROJECTS_DATA_RES':
      return { ...state,
        data: action.payload.projects,
        projectsAllCount: action.payload.total,
        projectsMyCount: action.payload.my_projects_count,
        scroll:  action.payload.projects.length === action.per_page,
        page: 2 }
    case 'GET_PROJECTS_DATA_TOGGLE_TAB_RES':
      return { ...state, activeTabMy: action.payload, page: 1 }
    case 'POST_CREATE_PROJECTS_RES':
    case 'GET_PROJECT_DATA_RES':
      return { ...state, current: action.payload }
    case 'GET_PROJECTS_DATA_PAGINATION_RES':
      return { ...state,
        data: [].concat(state.data, action.payload.projects),
        scroll:  action.payload.projects.length === action.per_page,
        page: (state.page + 1) }
    case 'SET_FILTER_PROJECTS_DATA_RES':
      return {
        ...state,
        filter: setFilterData(state.filter, action.payload),
        filterOpen: false,
      }
    case 'TOGGLE_FILTER_PROJECTS_DATA':
      return {
        ...state,
        filterOpen: action.payload
      }
    case 'GET_PROJECTS_DICTIONARY_RES':
      return{
        ...state,
        methodologies: action.dictionary === 'methodologies' ? action.payload : state.methodologies,
        products: action.dictionary === 'products' ? action.payload : state.products,
        technologies: action.dictionary === 'technologies' ? action.payload : state.technologies,
      }
    case 'SET_SEARCH_PROJECTS_DATA_RES':
      return{
        ...state,
        searchParams: action.payload,
      }
    case 'CLEAR_SEARCH_FILTER_PROJECTS_DATA':
      return{
        ...state,
        filterOpen: false,
        searchParams: '',
        filter: {
          customer: null,
          legalUnit: null,
          manager: null,
          department: null,
          begin_date: null,
          end_date: null,
          product_list: null,
          technology_list: null,
          methodology_list: null,
          close_project: false,
        },
      }
    case 'POST_CREATE_PROFILE_PROJECT_RES':
      return {
        ...state,
        current: {
          ...state.current,
          profiles_count: state.current.profiles_count + 1,
          profile_projects: [].concat(state.current.profile_projects, {profile_id: action.payload.account_project.account_id}),
        }
      }
    default:
      return state
  }
}
