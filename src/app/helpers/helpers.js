/**
 * Capitalize first letter
 * @param {string} string String to capitalize
 */
export function capitalizeFirstLetter(string) {
  if (!string || string.length === 0) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatPermission(permission) {
  return permission
    .split('_')
    .map(v => capitalizeFirstLetter(v.toLowerCase()))
    .join(' ');
}

/**
 * Slices a state slice by its action. If the action is the specified
 * one, normal slice. Otherwise error and success is reset to default.
 * @param {Object} sliceData State slice
 * @param {string} sliceData.action Last emitted action
 * @param {string} sliceData.error Last emitted error
 * @param {boolean} sliceData.success Last emitted success
 * @param {*} parentAction Action to slice from
 * @param {Object} state Complete state object
 * @param {Object} state.auth Auth state object
 * @param {string} state.auth.token Token
 */
export function sliceStateByAction(sliceData, parentAction, state) {
  if (sliceData.action !== parentAction) {
    return { ...sliceData, error: null, success: false, token: state.auth.token };
  }
  return { ...sliceData, token: state.auth.token };
}
