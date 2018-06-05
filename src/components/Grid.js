import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LazyLoad from 'react-lazy-load';


class Grid extends Component{
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
        localStorage.setItem('products',JSON.stringify({"img":image_url,"productName":name,"productDescription":description,"productPrice":price}))
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
                <div className="row">
                    {
                        this.state.product.map((items)=>
                        items.list.map((products,i)=>
                         <div className="card" key={i}>
                            <div className="filler" />
                            <LazyLoad height={200} offsetTop={200}>
                                <img className="card-img-top" src={products.image_url} alt="" />
                            </LazyLoad>
                            <div className="card-body">
                                <img className="logo" src={products.brand_info.url} alt="" />
                                <p className="card-text-header" style={{WebkitBoxOrient: 'vertical'}}>{products.name}</p>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{products.description}</p>
                            </div>
                            <div className="card-body">
                                <p className="card-price">฿{this.formatPrice(products.price)}</p>
                            </div>
                            <div className="card-body">
                                <Link to="Detail"><button href="#" className="btn btndetail" onClick={this.onClickDetail.bind(this,products.image_url,products.name,products.description,products.price)}>Detail</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStatetoProps =(state)=>{
    return{
        detail:state.detail
    }
}

const mapDispatchtoProps =(dispatch)=>{
    return{
        getProduct:(productDetail)=>{
            dispatch({
                type:"getProduct",
                payload:productDetail
            })
        }
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Grid);
