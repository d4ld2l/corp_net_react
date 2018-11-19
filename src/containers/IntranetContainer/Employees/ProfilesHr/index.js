import { connect } from 'react-redux'
import { get } from 'lodash'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    loaders: state.loaders,
    data: state.profilesHr.data,
    current: state.profilesHr.current,
    showCardProfile: state.profilesHr.showCardProfile,
    scroll: state.profilesHr.scroll,
    page: state.profilesHr.page,
    filterOpen: state.profilesHr.filterOpen,
    searchParams: state.profilesHr.searchParams,
    filter: state.profilesHr.filter,
    legalUnitIds: state.profilesHr.legalUnitIds,
    count: state.profilesHr.count,
    legal_units: state.legal_units,
    departments: state.departments,
    dictionaries: state.dictionaries,
    block: get(state, 'form.Filtered.values.block', []),
    legal_unit_ids: get(state, 'form.Filtered.values.legal_unit_ids', []),
    enabledComponents: state.system.enabledComponents,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const profileHr = connect(mapStateToProps, mapDispatchToProps)(Container)

export default profileHr
