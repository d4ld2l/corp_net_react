import get from 'lodash/get'

const initialStyles = {
  white: '#ffffff',
  head_menu_item: '#ffffff',
  side_menu_color: '#ffffff',
  default_reddish_pink: '#ff2f51',
  reddish_pink: '#ff2f51',
  reddish_pink_01: 'rgba(255, 47, 81, 0.1)',
  carnation2: '#ff7b91',
  pig_pink: '#e583b9',
  purplish_pink: '#d16ca8',
  pale_red: '#e14a3b',
  lipstick: '#ce223d',
  lipstick2: '#cc2641',
  scarlet: '#d0021b',
  default_charcoal_grey: '#34363c',
  charcoal_grey: '#34363c',
  charcoal_grey_05: 'rgba(52, 54, 60, 0.5)',
  default_cool_grey: '#93959a',
  cool_grey: '#93959a',
  cool_grey_04: 'rgba(147, 149, 154, 0.4)',
  cool_grey_05: 'rgba(147, 149, 154, 0.5)',
  charcoal_grey_08: 'rgba(52, 54, 60, 0.8)',
  cool_grey2: '#b6bcc3',
  silver: '#d2d8d9',
  silver_05: 'rgba(210, 216, 217, 0.5)',
  silver2: '#e9ebec',
  grey: '#f7f7f7',
  elephant: '#818388',
  sepia: '#8b572a',
  clay_brown: '#b77942',
  dusty_orange: '#f58223',
  dusty_orange_7: 'rgba(245, 130, 35, .7)',
  squash: '#f4990a',
  golden_rod: '#f9bb0e',
  golden_rod_01: 'rgba(249, 187, 14, 0.1)',
  golden_rod_7: 'rgba(249, 187, 14, .7)',
  maize: '#f7c853',
  maize_015: 'rgba(247, 200, 83, 0.15)',
  dark: '#2b2d4b',
  twilight: '#575b97',
  twilight_7: 'rgba(87, 91, 151, .7)',
  faded_blue: '#7d82cd',
  perrywinkle: '#a78de5',
  perrywinkle2: '#9176d8',
  water_blue: '#158cdf',
  water_blue_7: 'rgba(21, 140, 223, .7)',
  water_blue_05: '#158cdf80',
  dodger_blue: '#43acf5',
  azure: '#16b8f5',
  robins_egg: '#52cef9',
  greenish_teal: '#4bd4b3',
  default_greenblue: '#20c58f',
  greenblue: '#20c58f',
  greenblue_7: 'rgba(32, 197, 143, .7)',
  greeny_blue: '#3aafa9',
  teal_green: '#278f86',
  light_moss_green: '#9bcd65',
  turtle_green: '#88ba4f',
  turtle_green_7: 'rgba(136, 186, 79, .7)',
  lawn_green: '#5b9f0d',
  dark_grass_green: '#417505',
  signin_picture_url: "url('../../../public/logo-form.png')",
  signin_logo_url: "/public/main-logo-cosmo.png",
  signin_animation_url: "/public/login-loader.gif",
  main_page_picture_url: null,
  main_logo_url: null,
}

export default (vars = initialStyles, action, state) => {
  const { type, payload } = action
  switch (type) {
    case 'GET_LOGIN_SETTINGS_RES':
      return {
        ...vars,
        reddish_pink: get(payload, 'active_color') ? get(payload, 'active_color') : state.reddish_pink,
        carnation2: get(payload, 'active_color_light') ? get(payload, 'active_color_light') : state.carnation2,
        lipstick: get(payload, 'active_color_dark') ? get(payload, 'active_color_dark') : state.lipstick,
        dark: get(payload, 'menu_color') ? get(payload, 'menu_color') : state.dark,
        twilight: get(payload, 'base_color') ? get(payload, 'base_color') : state.twilight,
        maize: get(payload, 'head_menu_item_active') ? get(payload, 'head_menu_item_active') : state.maize,
        perrywinkle: get(payload, 'head_menu_item_hover') ? get(payload, 'head_menu_item_hover') : state.perrywinkle,
        head_menu_item: get(payload, 'head_menu_item') ? get(payload, 'head_menu_item') : state.head_menu_item,
        side_menu_color: get(payload, 'side_menu_color') ? get(payload, 'side_menu_color') : state.side_menu_color,
        signin_picture_url: payload.signin_picture_url ?
          `url(${process.env.ADMIN_HOST}${payload.signin_picture_url})` :
          state.signin_picture_url,
        signin_logo_url: payload.signin_logo_url ?
          `${process.env.ADMIN_HOST}${payload.signin_logo_url}` :
          state.signin_logo_url,
        signin_animation_url: payload.signin_animation_url ?
          `${process.env.ADMIN_HOST}${payload.signin_animation_url}` :
          state.signin_animation_url,
        main_logo_url: payload.main_logo_url ?
          `${process.env.ADMIN_HOST}${payload.main_logo_url}` :
          state.main_logo_url,
        main_page_picture_url: payload.main_page_picture_url ?
          `${process.env.ADMIN_HOST}${payload.main_page_picture_url}` :
          state.main_page_picture_url,
      }
    case 'APPLICATION_SETTINGS_UPDATE_RES':
      const { ui } = payload
      return {
        ...vars,
        reddish_pink: get(ui, 'active_color') ? get(ui, 'active_color') : state.reddish_pink,
        carnation2: get(ui, 'active_color_light') ? get(ui, 'active_color_light') : state.carnation2,
        lipstick: get(ui, 'active_color_dark') ? get(ui, 'active_color_dark') : state.lipstick,
        dark: get(ui, 'menu_color') ? get(ui, 'menu_color') : state.dark,
        twilight: get(ui, 'base_color') ? get(ui, 'base_color') : state.twilight,
        maize: get(ui, 'head_menu_item_active') ? get(ui, 'head_menu_item_active') : state.maize,
        perrywinkle: get(ui, 'head_menu_item_hover') ? get(ui, 'head_menu_item_hover') : state.perrywinkle,
        head_menu_item: get(ui, 'head_menu_item') ? get(ui, 'head_menu_item') : state.head_menu_item,
        side_menu_color: get(ui, 'side_menu_color') ? get(ui, 'side_menu_color') : state.side_menu_color,
        signin_picture_url: ui.signin_picture_url ?
          `url(${process.env.ADMIN_HOST}${ui.signin_picture_url})` :
          state.signin_picture_url,
        signin_logo_url: ui.signin_logo_url ?
          `${process.env.ADMIN_HOST}${ui.signin_logo_url}` :
          state.signin_logo_url,
        signin_animation_url: ui.signin_animation_url ?
          `${process.env.ADMIN_HOST}${ui.signin_animation_url}` :
          state.signin_animation_url,
        main_logo_url: ui.main_logo_url ?
          `${process.env.ADMIN_HOST}${ui.main_logo_url}` :
          state.main_logo_url,
        main_page_picture_url: ui.main_page_picture_url ?
          `${process.env.ADMIN_HOST}${ui.main_page_picture_url}` :
          state.main_page_picture_url,
      }
    default:
      return vars
  }
}
