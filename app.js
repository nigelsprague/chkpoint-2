console.log('wazzap')

let resource = 0
let perClick = 1
let perAuto = 0

let clickUpgrades = [
  {
    name: 'pickaxe',
    price: 100,
    quantity: 0,
    bonus: 1
  }
];

let automaticUpgrades = [
  {
    name: 'rover',
    price: 600,
    quantity: 0,
    bonus: 20
  }
];

function collectResource() {
  resource++
  updateResource()
}

function updateResource() {
  let click = document.getElementById('perClick')
  let auto = document.getElementById('perAuto')
  let bank = document.getElementById('resourceBank')
  click.innerText = perClick
  auto.innerText = perAuto
  bank.innerText = resource
}
updateResource()