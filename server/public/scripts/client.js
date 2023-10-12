console.log( 'js' );

let id = 1999;
const nameIn = document.querySelector('#nameIn');
const ageIn = document.querySelector('#ageIn');
const genderIn = document.querySelector('#genderIn');
const readyForTransferIn = document.querySelector('#readyForTransferIn');
const notesIn = document.querySelector('#notesIn');
const viewKoalas = document.querySelector('#viewKoalas');

// GET REQUEST
function getKoalas(){
  console.log( 'in getKoalas' );
  // axios GET call to server to get koalas
  axios.get('/koalas').then((response) => {
    console.log(response.data);
    // koalas array assigned to variable
    let koalas = response.data;
    // koala string to append to DOM has been cleared
    let viewKoalasStr = "";
    // clear your innerHTML table
    viewKoalas.innerHTML = viewKoalasStr;
    
    for (let koala of koalas) {
      console.log(koala.ready_to_transfer);
      if(koala.ready_to_transfer == false){
        viewKoalasStr += `
          <tr>
            <td>${koala.name}</td>
            <td>${koala.gender}</td>
            <td>${koala.age}</td>
            <td><button onclick='readyKoala(${koala.id})'>Ready for Transfer</button></td>
            <td>${koala.notes}</td>
            <td><button onClick='removeKoala(${koala.id})'>Delete</button>
          </tr>
        `;
      }
      else{
        // loop through your koala table data and add to viewKoalaStr
        viewKoalasStr += `
          <tr>
            <td>${koala.name}</td>
            <td>${koala.gender}</td>
            <td>${koala.age}</td>
            <td></td>
            <td>${koala.notes}</td>
            <td><button onClick='removeKoala(${koala.id})'>Delete</button>
          </tr>
        `;
      }
      
    }
    // append your viewKoalasStr to the DOM
    viewKoalas.innerHTML = viewKoalasStr;
    
  }).catch((error) => {
    // include your catch
    console.error(error);
    alert('Koala GET failed');
  });
} // end getKoalas

// POST REQUEST
function saveKoala(event){
  event.preventDefault();
  console.log( 'in saveKoala' );
  // axios POST call to server to get koalas
  // obtain values from input fields
  let name = nameIn.value;
  let age = ageIn.value;
  let gender = genderIn.value;
  let transfer = readyForTransferIn.value;
  let notes = notesIn.value;
  
  console.log(`Name: ${name}, Age: ${age}, Gender: ${gender}, Ready for Transfer: ${transfer}, Notes: ${notes}`)
  // begin POST match '/savekoalas'
  axios.post('/koalas', {
    // object to be passed to array
    id : id,
    name: name,
    age: age,
    gender: gender,  
    readyToTransfer: transfer,
    notes: notes
  }).then((response) => {
    console.log('Koala transfer successful');
    getKoalas();
  }).catch((error) => {
    // dont forget the .catch
    console.error(error);
    alert(`Koalas not added, something went wrong!`)
  });
// increment your id to label your koalas
  id += 1
}

getKoalas();

// UPDATE REQUEST
function readyKoala(id) {
  console.log('Koala to make ready', id);
  axios.put(`/koalas/${id}`, {
    readyToTransfer: 'Y'
  }).then((response) =>{
    console.log(`Koala transfer updated`);
    getKoalas();
  }).catch((error) => {
    console.log(error);
    alert(`Could not update Ready to Transfer ${id}`)
  });
}

// DELETE REQUEST
function removeKoala(id){
  if (window.confirm('Are you sure you want to remove this poor innocent sweet koala? This action cannot be undone')) {
    console.log('Koala to remove: ', id);
    axios.delete(`/koalas/${id}`).then(() => {
      console.log('You successfully terminated that koala');
      getKoalas();
    }).catch((error) => {
      console.log(error);
      alert(`your koala was not deleted`);
    });
}}