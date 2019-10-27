//import redux...works when used with browserify
let redux = require('redux');
//the initial state of the app
const initialState = { count: 0 };
//the actions that can happen for our element
const actions = {
    increment: { type: 'INCREMENT' },
    decrement: { type: 'DECREMENT' },
    status: {type:'STATUS'}
};
//the reducer, which interacts with the state and the action
const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.increment.type:
            return {
            count: state.count + 1
            };

        case actions.decrement.type:
            return {
                count: state.count - 1
            };
        
        case actions.status.type:

        default:
            return state;
    }
};
//custom functions are going here
function updateScreen(status){
    console.log(status.count);
    let statusView = document.querySelector("#showCount");
    statusView.innerHTML = status.count;
}

//the store, which comes from redux, and deals with the reducer
const store = redux.createStore(countReducer);
//we subscribe to th store which returns the state to us on changes
store.subscribe(() =>{
   // console.log(store.getState());
    updateScreen(store.getState());
});

function initializeApp(counterStore){
    counterStore.dispatch(actions.status);
    let incBtn = document.querySelector("#inc");
    incBtn.addEventListener("click", (e) =>{
        counterStore.dispatch(actions.increment);
    });
    let decBtn = document.querySelector("#dec");
    decBtn.addEventListener("click", (e) =>{
        counterStore.dispatch(actions.decrement);
    });
}
initializeApp(store);
