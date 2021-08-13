import firebase from 'firebase/app'
import './components/form/form.scss';
import './App.css';
import React from 'react'
import  { ModalInstagram }  from './components/modal/modal';
import  { Form }  from './components/form/form';
import { useChat } from './useChat';
import { db } from './firebase';
import { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import { _DIR } from './utils/dir';
import { _PATH } from './utils/dir';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import $ from 'jquery';

window.$ = $;

$(window).on('load', function() {

  var inputs = document.querySelectorAll('.input');

function hiddenAll(){
    for(var i=0; i < inputs.length; i++){
      $(inputs[i]).attr('disabled',true)
      
    }
  }

  hiddenAll()
  
    var storageRef = firebase.storage()
    var listRef = storageRef.ref('pictures/');

      listRef.listAll().then(function(res) {
        
        res.items.forEach(function(itemRef) {
         var img = document.getElementById('img');
         var path = (`${_DIR}` & '/pictures' & '%2F' & itemRef.name & `${_PATH}`)
         img.src = path;
      })
    })
  })

function App() {

  const [message, setMessage] = React.useState('')
  const { messages } = useChat()
  const [percentage, setPercentage] = useState('');

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const  handleOnChange = (newState) => (e) =>{

    var storageRef = firebase.storage()
      var listRef = storageRef.ref(`pictures/${localStorage.getItem('obj_img')}`);
          listRef.delete()

    const file = e.target.files[0]
    localStorage.setItem("obj_img", file.name);
   

    if (!(/\.(jpg|png|jpeg)$/i).test(file.name)) {
        setState({ open: true, ...newState });
  }else{

        const storageRef = firebase.storage().ref(`pictures/${file.name}`) // referencia al directorio de las imagenes.
        const task = storageRef.put(file)
    
        task.on('state_changed', (snapshot) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          Promise.resolve(setPercentage(percentage))
          .then(() => {
            return new Promise((resolve) => {
              resolve('Exito en la operación!');
               setTimeout(() => {
               $('.filupp').on('click', (e) => {e.preventDefault()})
              },);
            }).then(value => {
              // console.log(value); // Success!
            }, reason => {
              // console.error(reason); // Error!
            });
          })

          storageRef.getDownloadURL().then(function(url) {

            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.open('GET', url);
            xhr.send();
            var img = document.getElementById('img');
            img.src = url;
            
           })
        })
      }
    }


  const sendMessage = (e) => {

    setMessage([])

    if(message.length > 0){

    if (message.trim() !== '') {
  
    e.preventDefault()

    db.collection('messages').add({
      timestamp: Date.now(), message })
    }
    
   }
  }

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const deleteText = () => {
   $('#content .a').prop('hidden', true)
  };

  // const reloadImage = () => {
  //   window.location.reload(true)
  //  };

   const deleteImage = () =>{

   Promise.resolve()
    
      var storageRef = firebase.storage()
      var listRef = storageRef.ref(`pictures/${localStorage.getItem('obj_img')}`);
          listRef.delete()
          localStorage.clear()
          window.location.reload(true)
          
      }

  tippy('#delete', {
    content: 'Borrar imágen',
    theme: 'tomato',
    placement: 'right'
  });

  tippy('#deleteConv', {
    content: 'Borrar chat',
    theme: 'tomato',
    placement: 'right'
  });

  tippy('#Reload', {
    content: 'Recargar imágen',
    theme: 'tomato',
    placement: 'right'
  });

  tippy('.js-value', {
    content: 'Buscar imágen',
    theme: 'dark',
    placement: 'top'
  });

  // $( ".inputval" ).focusin(function() {
  //   $( this ).find( "span" ).animate({"opacity":"0"}, 200);
  // });
  
  // $( ".inputval" ).focusout(function() {
  //   $( this ).find( "span" ).animate({"opacity":"1"}, 300);
  // });
  
  // $(".login").submit(function(){
  //   $(this).find(".sb i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
  //   $(".sb").css({"background":"#2ecc71", "border-color":"#2ecc71"});
  //   $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
  //   $("input").css({"border-color":"#2ecc71"});
  //   return false;
  // });


  return (
      <div className="App">
        <div className="App-header">
          <div className="wrapper">
          <Form />
          <div className="inner" id="inner">
          <img width='200' height='250' id="img" alt="" />
          <ModalInstagram />
         
          <div>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message="Archivo no permitido!"
              key={vertical + horizontal}
            />
       
          </div>
         
          <label htmlFor="custom-file-upload" className="filupp">
            <span className="js-value"><i title="" className="fas fa-cloud-upload-alt"  style={{cursor: 'pointer'}}></i></span>
            <input type="file" className="input" name="attachment-file" value="" onChange={handleOnChange({ vertical: 'top', horizontal: 'center' })} id="custom-file-upload"/>
            <progress value={percentage} id="progress" max='100' style={{marginLeft: 10}}>
              {percentage}
            </progress>
          </label>
          <div className="" id="error" />
            <div className="content" id="content">{messages.map(m => <div className="a contenido" key ={m.id}>{m.message}</div>)} </div>
          </div>
          <div className="adminActions">
              <input type="checkbox" name="adminToggle" className="adminToggle input" />
              <a href="#" className="adminButton"><i className="fa fa-cog"></i></a>
              <div className="adminButtons">
                <a href="#" id="delete" style={{Display: 'right' }} onClick={deleteImage}><i className="material-icons">delete_forever</i></a>
                <a href="#" id="deleteConv" onClick={deleteText}><i className="material-icons">delete</i></a>
                {/* <a href="#" id="Reload" onClick={reloadImage}><i class="material-icons">sync</i></a> */}
              </div>
          </div>
          <div className="bottom" id="bottom">
              <textarea value={ message } onChange={ (e) => setMessage(e.target.value) } className="input" id="input"></textarea>
              <div className="send" onClick={sendMessage} id="send"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
