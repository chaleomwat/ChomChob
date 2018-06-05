import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Detail from './components/Detail'
import {BrowserRouter,Route} from 'react-router-dom';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
    productDetail:[]
}

const reducer = (state=initialState,action) =>{
    switch (action.type){
        case "getProduct":
            state={
                ...state,
                productDetail:action.payload
            }
        break;
    default:
    }
    return state
}

const store = createStore(combineReducers({detail:reducer}));

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/Detail" component={Detail} />
        </div>
    </BrowserRouter>
</Provider>, 
document.getElementById('root'));

