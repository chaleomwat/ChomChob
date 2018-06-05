import React,{Component} from 'react';
import '../css/Productlist.css';
import Grid from './Grid';
import List from './List';

class Products extends Component{    
    render(){
        if(this.props.Layout === 'grid'){
            return(
                <div>
                    <Grid />
                </div>
            );
        }
        return(
            <div>
                <List />
            </div>
        );
    }
}

export default Products;
