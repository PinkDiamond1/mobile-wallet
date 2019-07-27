export const walletsReducer = (state = [], action) => {
  switch (action.type) {
    case 'WALLET/CREATE/SUCCESS':
      return [...state, action.data.wallet]
    case 'WALLET/DELETE_ALL/SUCCESS':
      return []
    default:
      return state
  }
}
