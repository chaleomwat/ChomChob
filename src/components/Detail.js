import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../css/Detail.css'

class Detail extends Component{

    constructor(props){
        super(props);
        this.state={
            itemsAdd: 0,
            btnMinus:false,
            btnPlus:false,
            test:[]
        }
    }

    
    onClickMinus =()=>{
        this.setState({itemsAdd: this.state.itemsAdd - 1})
        if(this.state.itemsAdd -1 === 0){
            this.setState({btnMinus:true})
        }
    }

    onClickPlus =()=>{
        this.setState({itemsAdd: this.state.itemsAdd + 1})
        if(this.state.itemsAdd +1 > 0){
            this.setState({btnMinus: false})
        }

    }

    formatPrice(value){
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    componentDidMount =()=>{
        if(this.state.itemsAdd <= 0){
            this.setState({btnMinus:true})
        }
        else{
            this.setState({btnMinus:false})
        }
        const local = localStorage.getItem('products')
        console.log(local)
    }

    render(){
        return(
            <div className="container App">
                <div className="row row-button">
                    <Link to="/"><p className="url-text">Home</p></Link>
                    <p className="url-text">/</p>
                    <p className="url-text">{this.props.detail.productDetail.productName}</p>
                </div>
                <div className="row margin-top-20">
                    <div className="col-sm-3 padding-0">
                        <img src={this.props.detail.productDetail.productImg} className="detail-img" alt="" />
                    </div>
                    <div className="col-sm-9">
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="text-header">{this.props.detail.productDetail.productName}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="text-desc">{this.props.detail.productDetail.productDescription}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="text-price">฿{this.formatPrice(this.props.detail.productDetail.productPrice)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn-minus" onClick={this.onClickMinus} disabled={this.state.btnMinus}>
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button className="btn-total"><span className="text-desc">{this.state.itemsAdd}</span></button>
                                <button className="btn-plus" onClick={this.onClickPlus} disabled={this.state.btnPlus}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>   
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-cart float-left">
                                        Add to Cart
                                </button>
                            </div>   
                        </div>
                    </div>
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

export default connect(mapStatetoProps)(Detail);