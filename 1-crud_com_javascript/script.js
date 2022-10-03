
class Cadastro {
  constructor() {
    this.id;
    this.registeresPeople = [];
  }
  adicionar() {
    const people = this.readData();
    if(this.checkData(people)){
      this.addPeople(people);
      this.writeOnScreen();
      this.setData();
    }
  }
  delete(event){
    event.preventDefault();
    const lines = document.querySelectorAll('[data-people]');
    lines.forEach((line)=>{
      let i = line.dataset['people'];
      if( i == this.dataset['delete'] ){
        registered.registeresPeople.splice( i, 1 );
        line.remove();
      }
    });
  }
  setData(){
    localStorage.setItem('registeres_people', JSON.stringify(this.registeresPeople));
  }
  loadData(){
    const registeres_people = JSON.parse(localStorage.getItem('registeres_people')) ?? [];
    for (let i in registeres_people){
      this.registeresPeople.push(registeres_people[i]);
    }
    this.writeOnScreen(registeres_people);
  }
  writeOnScreen(){
    const registered = document.querySelector('[data-registered]');
    registered.innerHTML = '';

    for(let i = 0; i < this.registeresPeople.length; i++){
      let name = this.registeresPeople[i].name;
      let email = this.registeresPeople[i].email;
      let phone = this.registeresPeople[i].phone;
      let birth = this.registeresPeople[i].birth;
      const newTr = document.createElement('tr');
      newTr.dataset.people = `${i}`;
      registered.insertAdjacentElement("beforeend", newTr);
      const tr = document.querySelector(`[data-people="${i}"]`);
      tr.insertAdjacentHTML("afterbegin", `
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${birth}</td>
        <td>
          <div class="actions">
            <button type='button' class='btn btn-warning px-2 py-1' date-edit>Editar</button>
            <button type='button' class='btn btn-danger px-2 py-1' data-delete="${i}">Deletar</button>
          </div>
        </td>
      `);
    }
    
    const btnDelete = document.querySelectorAll('[data-delete]');
    btnDelete.forEach(btn => {
      ['click'].forEach(event =>{
          btn.addEventListener(event, this.delete);
      })
    })
  }
  addPeople(people){
    this.registeresPeople.push(people);
    this.addId();
  }
  addId(){
    let id = 0;
    for(let people of this.registeresPeople){
      people.id = id;
      id++
    }
  }
  checkData(people){
    let msg = '';
    if(people.name == ''){
      msg += 'Informe o nome \n';
    }
    if(people.email == ''){
      msg += 'Informe o email \n';
    }
    if(people.phone == ''){
      msg += 'Informe o número de telefone \n';
    }
    if(people.birth == ''){
      msg += 'Informe a data de nascimento \n';
    }
    if(msg != ''){
      alert(msg);
      return false;
    }
    return true;
  }
  readData(){
    const people = {};
    people.id = '';
    people.name = document.querySelector('[data-name]').value;
    people.email = document.querySelector('[data-email]').value;
    people.phone = document.querySelector('[data-phone]').value;
    people.birth = document.querySelector('[data-birth]').value;
    return people;
  }
}
const registered = new Cadastro();

window.addEventListener('load', ()=> {
  registered.loadData()
})

