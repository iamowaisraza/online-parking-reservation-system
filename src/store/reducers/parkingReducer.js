const initState = {};

const parkingReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PARKING':
            console.log('parking created', action.parking);
            return state;
        case 'ADD_PARKING_ERROR':
            console.log('parking created error', action.error);
            return state;
        default:
            return state;
    }
}

export default parkingReducer;