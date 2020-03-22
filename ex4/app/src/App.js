import React from 'react';
import './App.css';

// Пример отправки POST запроса:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Token c13951922970b3bf0e7bec894fbbf39fadd2977f'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

class Addresses extends React.Component {
  constructor(props){
    super(props);
    this.clickIngredient = this.clickIngredient.bind(this)
  }

  clickIngredient = (ev) => {
    let val = ev.target.dataset.value;
    this.props.onAddressChanged(val);
    console.log("clickIngredient" + val);
  };

  render() {
    const addresses = this.props.addressesList;

    if (addresses && this.props.addressCluesVisible) {
      const ingredientList = addresses.map((item, i) => {
      return (
        <li className = "addresses-block-list-item" key={i} data-value={item.value} onClick={this.clickIngredient}>{item.value}</li>
      );
      });

      return (
        <div className="addresses-block">
          <ul className="addresses-block-list">
            {ingredientList}
          </ul>
        </div>
        )
      }
    else {
      return (
        null
      )
    }
  }
}

class NewAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.addRecord = this.addRecord.bind(this)
    this.recordChanged = this.recordChanged.bind(this)
    this.addressChanged = this.addressChanged.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)

    this.state = {
      record : {
        fullName : "Инкапсулированный Полиморфизм Наследович",
        phoneNumber : "+010010111010010",   
        address : "г. Тверь",   
        comments : "Ящик протеина впридачу",
        selectedFile : null,
        loaded: 0  
      },
      addressClues : {},

      addressCluesVisible: true
    };
  }

  addressChanged(addr) {
    console.log("Address Changed " + addr)
    this.setState({
      record : {...this.state.record, address: addr}
    })

    this.setState({
      addressCluesVisible : false
    })
  }

  checkName(str) {
    let words = str.split(" ");
    let error = false
    if (words.length == 3) {
      for (let word of words) {
        if (word.length == 0) {
          error = true
        }
      }
    }
    else {
      error = true
    }

    if (error) {
      alert("Имя введено неверно!")
    }

    return !error
  }

  addRecord() {
    if (this.checkName(this.state.record.fullName)) {
      this.props.visibilityChange();
      this.props.onListChange(this.state.record);
    }
  }

  onChangeHandler=event=>{
    // this.setState({
    //   record : {...this.state.record, selectedFile: event.target.files[0]}
    // })

    // this.setState({
    //   record : {...this.state.record, loaded: 0}
    // })

    this.setState({
      record : {...this.state.record, ["selectedFile"]: event.target.files[0]}
    })

    console.log(this.state.record.selectedFile)  
  }

  handleChange(e) {        
    this.setState({
        connections : {...this.state.connections, [e.target.name]: e.target.value}
    })
  }

  recordChanged = e => {
    const {name, value} = e.target;

    if (name == "address" ) {
      postData('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', { query: value, count: 10 })
      .then((data) => {
        this.setState({
          addressClues: data
        })
        this.setState({
          addressCluesVisible : true
        })
        
      });
    }

    this.setState({
      record : {...this.state.record, [name]: value}
    })
  }

  render() {
    return (
      <div className='add-page'>
        <h1>{this.props.text}</h1>

        <label>Ваше ФИО* <span>(валидируется по 3 русским словам) </span>
          <input name = "fullName" onChange={this.recordChanged}  type="text" value={this.state.record.fullName}></input>
        </label>

        <label>Номер телефона* <span>(валидируется по маске) </span>
          <input name = "phoneNumber" onChange={this.recordChanged} type="text" value={this.state.record.phoneNumber}></input>
        </label>

        <label className = "addresses-label">Адрес* <span> (валидируется по маске) </span>
          <input name = "address"  onChange={this.recordChanged} type="text" value={this.state.record.address}></input>
        </label>

        <Addresses addressesList={this.state.addressClues.suggestions} onAddressChanged={this.addressChanged} 
        addressCluesVisible={this.state.addressCluesVisible}/>

        <label>Комментарии доставщику
          <input className = "comments-block" type="text"></input>
        </label>

        <label>Скан накладной*
            <div className="add-file-button">
              <label className="add-file-label" htmlFor="files"><span className = "plus-sign">+</span>Добавить</label>
              <input id="files" style={{visibility: "hidden"}} onChange = {this.onChangeHandler} type="file"/>
            </div>
        </label>
        <button className="button-send" type="button" onClick={this.addRecord}>Отправить</button>
    </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.showAddPage = this.showAddPage.bind(this);
    this.addElementToRegsList = this.addElementToRegsList.bind(this);
    this.state = {showAddPage: false, regsList: []};
  }

  showAddPage() {
    this.setState({showAddPage: !this.state.showAddPage});
  }

  addElementToRegsList(newelement) {
    this.setState({regsList:[...this.state.regsList, newelement]});
    console.log(this.state.regsList)
  }

  render() {
    return (
      <div>
        <button onClick={this.showAddPage}>Добавить регистрационные данные</button>
        <ul>
          {this.state.regsList.map((post, id) =>
            <li key={id}>
            Запись {id} <br/>
            Полное имя: {post.fullName} <br/>
            Адрес: {post.address} <br/>
            Телефон: {post.phoneNumber} <br/>
            Комментарий: {post.comments} <br/>
            Файл: {post.selectedFile ? post.selectedFile.name : "Не добавлен"} <br/> <br/>
            </li>
          )}
        </ul>
        {this.state.showAddPage &&
          <NewAddPage
          onListChange={this.addElementToRegsList}
          visibilityChange = {this.showAddPage} />
        }
      </div>
    );
  }
}

export default App;
