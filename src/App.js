import React, { Component } from 'react';
import './css/App.css';
import Productlist from './components/Productlists'


class App extends Component {
  constructor(props){
    super(props);
    this.state={
        layout:'grid',
        btnGrid: 'btn-grid-active',
        btnList: 'btn-list'
    }
    this.onClickList = this.onClickList.bind(this)
    this.onClickGrid = this.onClickGrid.bind(this)
}

onClickList = () =>{
    this.setState({
      layout:'',
      btnGrid: 'btn-grid',
      btnList: 'btn-list-active'
    })
}
onClickGrid = () =>{
  this.setState({
    layout:'grid',
    btnGrid: 'btn-grid-active',
    btnList: 'btn-list'
  })
}

  render() {
    return (
      <div className="container App">
          <div className="row row-button">
            <div className="col-sm">
            </div>
            <button href="#" onClick={this.onClickGrid}  className={"btn " + this.state.btnGrid + " float-right"} style={{borderTopRightRadius: '0px',borderBottomRightRadius: '0px'}}>
              <i className="fa fa-th-large" area="true"></i>
            </button>
            <button href="#" onClick={this.onClickList}  className={this.state.btnList + " float-right"}>
              <i className="fa fa-list-ul" aria-hidden="true"></i>
            </button>
          </div>
          <Productlist 
            Layout={this.state.layout}
          />
      </div>
    );
  }
}

export default App;
