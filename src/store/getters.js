export default {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  tags: state => state.tagsView.defaultTags.concat(state.tagsView.currentTags)
}
