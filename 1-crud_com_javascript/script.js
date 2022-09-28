class Cadastro {
  constructor() {
    this.id;
    this.registeresPeople = [];
  }
  adicionar() {
    const people = this.readData();
    if(this.checkData(people)){
      this.addPeople(people);
      this.writeOnScreen()
    }
  }
  writeOnScreen(){
    const registered = document.querySelector('[data-registered');
    registered.innerHTML = ''
    for(let i = 0; i < this.registeresPeople.length; i++){
      let name = this.registeresPeople[i].name;
      let email = this.registeresPeople[i].email;
      let phone = this.registeresPeople[i].phone;
      let birth = this.registeresPeople[i].birth;

      const newTr = document.createElement('tr');
      newTr.dataset.people = `${i}`;
      registered.insertAdjacentElement("afterbegin", newTr);
      const tr = document.querySelector(`[data-people="${i}"]`);
      tr.insertAdjacentHTML("afterbegin", `
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${birth}</td>
        <td>
          <div class="actions">
            <button type='button' class='btn btn-warning px-2 py-1'>Editar</button>
            <button type='button' class='btn btn-danger px-2 py-1'>Deletar</button>
          </div>
        </td>
      `);
    }
  }
  addPeople(people){
    this.registeresPeople.push(people);
    this.addIds();
  }
  addIds(){
    let id = 0;
    for(let person of this.registeresPeople){
      id++
      person.id = id;
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
    people.name = document.querySelector('[data-get-name]').value;
    people.email = document.querySelector('[data-get-email]').value;
    people.phone = document.querySelector('[data-get-phone]').value;
    people.birth = document.querySelector('[data-get-birth]').value;
    return people;
  }
}
const registered = new Cadastro();
