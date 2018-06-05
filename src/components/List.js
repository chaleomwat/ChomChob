import React,{Component} from 'react';
import '../css/Productlist.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

class List extends Component{
    constructor(props){
        super(props);
        this.state={
            product:[]
        }
    }

    onClickDetail =(image_url,name,description,price)=> {
        this.props.getProduct({
            productImg:image_url,
            productName:name,
            productDescription:description,
            productPrice:price
        })
    }
    
    formatPrice(value){
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    componentDidMount =()=>{
        fetch('https://cc-mock-api.herokuapp.com/product')
        .then(response=>response.json())
        .then((res)=>{
            this.setState({product:[res]})
        }).catch((err)=>{
            console.log(err)
        })
    }

    
    render(){
        return(
            <div>            
                {
                    this.state.product.map((items)=>
                    items.list.map((products,i)=>
                    <div className="row list" key={i}>
                        <div className="col-sm-2">
                            <div className="filler" />
                            <LazyLoad height={200} offsetTop={200}>
                            <img className="card-img-list" src={products.image_url} alt="" />
                            </LazyLoad>
                        </div>
                        <div className="col-sm-9">
                            <div>
                                <p className="card-text-header" style={{WebkitBoxOrient: 'vertical'}}>{products.name}</p>   
                            </div>
                            <div><p className="card-text-list">{products.description}</p></div>
                        </div>
                        <div className="col-sm-1">
                            <p className="card-price-list">฿{this.formatPrice(products.price)}</p>
                            <Link to="Detail"><button href="#" className="btn btndetail" onClick={this.onClickDetail.bind(this,products.image_url,products.name,products.description,products.price)}>Detail</button></Link>
                        </div>
                    </div>
                    
                ))}
            </div>
        );
    }
}


const mapStatetoProps =(state)=>{
    return{
        productDetail:state.productDetail
    }
}

const mapDispatchtoProps =(dispatch)=>{
    return {
        getProduct:(productDetail)=>{
            dispatch({
                type: "getProduct",
                payload: productDetail
            })
        }
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(List);