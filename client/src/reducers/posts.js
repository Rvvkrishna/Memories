
const posts = (state=[], action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...state, action.payload];
        case 'UPDATE':
        case 'LIKE':
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        case 'DELETE':
            return state.filter((post) => post._id !== action.payload.id)
        default:
            return state;
    }
}

export default posts;