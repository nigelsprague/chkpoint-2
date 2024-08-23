console.log('wazzap')

let clickUpgrades = [
  {
    name: 'csmall',
    price: 100,
    quantity: 0,
    bonus: 1
  },
  {
    name: 'cbig',
    price: 200,
    quantity: 0,
    bonus: 5
  }
];

let automaticUpgrades = [
  {
    name: 'asmall',
    price: 1200,
    quantity: 0,
    bonus: 20
  },
  {
    name: 'abig',
    price: 3000,
    quantity: 0,
    bonus: 100
  }
];

let resource = 0
let resourceOverTime = 0
let perClick = 1
let perAuto = 0
let automaticCollection = false

function collectResource() {
  resource += perClick
  resourceOverTime += perClick
  updateResource()
}

function autoCollect() {
  if (automaticCollection == true) {
    resource += perAuto
    resourceOverTime += perAuto
    // console.log(automaticCollection, perAuto)
    updateResource()
  } else return
}

setInterval(autoCollect, 3000)

function updateResource() {
  let bank = document.getElementById('resourceBank')
  bank.innerText = resource
}
updateResource()

function updateUpgrades() {
  let click = document.getElementById('perClick')
  let auto = document.getElementById('perAuto')
  let stats = document.getElementById('stats')
  let upgrades = document.getElementById('upgrades')
  let cSmall = clickUpgrades[0]
  let cBig = clickUpgrades[1]
  let aSmall = automaticUpgrades[0]
  let aBig = automaticUpgrades[1]

  click.innerText = perClick
  auto.innerText = perAuto
  stats.innerHTML = `
    <section class="row">
      <div class="col-6">
      <h6>Click Stats</h6>
        <section class="row">
          <div class="col-2 card">${cSmall.quantity}</div>
          <div class="col-6">=></div>
          <div class="col-2 card">${cSmall.quantity * cSmall.bonus}</div>
        </section>
        <section class="row">
          <div class="col-2 card">${cBig.quantity}</div>
          <div class="col-6">=></div>
          <div class="col-2 card">${cBig.quantity * cBig.bonus}</div>
        </section>
      </div>
      <div class="col-6">
      <h6>Automatic Stats</h6>
        <section class="row">
          <div class="col-2 card">${aSmall.quantity}</div>
          <div class="col-6">=></div>
          <div class="col-2 card">${aSmall.quantity * aSmall.bonus}</div>
        </section>
        <section class="row">
          <div class="col-2 card">${aBig.quantity}</div>
          <div class="col-6">=></div>
          <div class="col-2 card">${aBig.quantity * aBig.bonus}</div>
        </section>
      </div>
    </section>`

  upgrades.innerHTML = `
    <div class="col-6">
      <h6>Click Upgrades</h6>
      <button onclick="buyUpgrade('clickUpgrades', 'csmall')" class="btn bg-info">${cSmall.price}</button>
      <button onclick="buyUpgrade('clickUpgrades', 'cbig')" class="btn bg-info">${cBig.price}</button>
    </div>
    <div class="col-6">
      <h6>Automatic Upgrades</h6>
      <button onclick="buyUpgrade('automaticUpgrades', 'asmall')" class="btn bg-info">${aSmall.price}</button>
      <button onclick="buyUpgrade('automaticUpgrades', 'abig')" class="btn bg-info">${aBig.price}</button>
    </div>`
}
updateUpgrades()


function buyUpgrade(upgradeType, upgradeName) {
  if (upgradeType == 'clickUpgrades') {
    let upgrade = clickUpgrades.filter(upgrade => upgrade.name == upgradeName)
    upgrade.forEach((upgrade) => {
      if (resource >= upgrade.price) {
        upgrade.quantity++
        resource -= upgrade.price
        upgrade.price += (upgrade.price * 1 + 1)
        // console.log('purchased', upgradeName, clickUpgrades)

      } else console.log('no')
    })
  } else if (upgradeType == 'automaticUpgrades') {
    let upgrade = automaticUpgrades.filter(upgrade => upgrade.name == upgradeName)
    upgrade.forEach((upgrade) => {
      if (resource >= upgrade.price) {
        upgrade.quantity++
        resource -= upgrade.price
        upgrade.price += (upgrade.price * 1 + 3)
        automaticCollection = true
        // console.log('purchased', upgradeName, automaticUpgrades)
      } else console.log('no')
    })
  }
  collectRate()
  updateResource()
  updateUpgrades()
}

function collectRate() {
  let clickRate = 1
  let autoRate = 0
  clickUpgrades.forEach(click => clickRate += click.bonus * click.quantity)
  automaticUpgrades.forEach(auto => autoRate += auto.bonus * auto.quantity)
  console.log(clickRate, autoRate)
  perClick = clickRate
  perAuto = autoRate
}