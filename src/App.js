
import { Component } from 'react';
import './App.css';

class App extends Component {

  state = { obj: [],
    inputItem:'' }
  textValue = (event) => {
    this.setState({ [event.target.name]: event.target.value}) 
    }
    
    
  submitValue = () => {
    let newval = {
      inputItem:this.state.inputItem,
      status: null,
      id: Date.now()
    }
    if (this.state.inputItem.trim()) {
      const updatedObj = [...this.state.obj, newval];
      this.setState({
        obj: updatedObj,
        inputItem: ''
      });
  
      localStorage.setItem('obj', JSON.stringify(updatedObj));
    }
  }
  deleteItem = (ind) => {
    this.state.obj.splice(ind, 1)
    this.setState({obj:this.state.obj})
    localStorage.setItem('obj', JSON.stringify(this.state.obj));
  }
  updated = (e, ind) => {
    if(e.target.checked){
      const updateObj=[...this.state.obj]
      updateObj[ind].status=true
      this.setState({
        obj: updateObj
      })
      localStorage.setItem('obj', JSON.stringify(updateObj));
    }else{
      const updateObj=[...this.state.obj]

      updateObj[ind].status=false
    
      this.setState({
        obj:updateObj
      }) 
      localStorage.setItem('obj', JSON.stringify(updateObj));
    }
  }
 
  componentDidMount() {
    const storedObj = JSON.parse(localStorage.getItem('obj'));
    if (storedObj !== null) {
      this.setState({ obj: storedObj });
    }
  }
  
  render() {

    return (
      <div className="app">
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2>Whoop, it's Awesome 🌝 ☕ </h2>
        </div>
        <form >
          <div className="input">
            <input type="text" name='inputItem' value={this.state.inputItem} onChange={this.textValue} placeholder="🖊️ Add item..." />
            <button type='button' onClick={this.submitValue}> <i className="fas fa-plus"></i></button>
          </div>
        </form>
        {
          this.state.obj.map((val, index) => {
            return (
              <div key={index} className="todos">
                <div className="todo">
                  <div className="left">
                    <input onChange={(e) => this.updated(e, index)} type="checkbox" name="" id="" checked={val.status ? true:''} />
                    <p>{val.inputItem}</p>
                  </div>
                  <div className="right">
                    <i onClick={() => this.deleteItem(index)} className="fas fa-times"></i> 
                  </div>
                </div>
              </div>)
          }) 
        }
        <div className='todoSelect'>
          <h1>Selected Items</h1>
{
          this.state.obj.map((val, index) => {

            if(val.status){
            return (
              <div key={index} className="todos1"> 
              
                <div className="todo1">
                  <div className="left1">   
                    <p>{val.inputItem}</p>
                  </div> 
                </div>
              </div>)}
              return null
          })
        }
        </div>
      </div>
    ) 
  } 
} 


export default App;
