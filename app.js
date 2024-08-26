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
    bonus: 10
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
  let total = document.getElementById('total')
  bank.innerText = resource
  total.innerText = 'Total Criterions Over Time: ' + resourceOverTime
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

  click.innerText = '+' + perClick
  auto.innerText = '+' + perAuto + '/sec'
  stats.innerHTML = `
    <section class="row text-center justify-content-between p-2">
          <div class="col-5 me-3">
            <h6 class="bungee-regular text-center">Click Stats</h6>
            <section class="row justify-content-between my-3">
              <div class="col-3 px-1 border bungee-regular">${cSmall.quantity}</div>
              <div class="col-6 px-2">Dbl Feature =></div>
              <div class="col-3 border px-1 bungee-regular">${cSmall.quantity * cSmall.bonus}</div>
            </section>
            <section class="row justify-content-between">
              <div class="col-3 px-1 border bungee-regular">${cBig.quantity}</div>
              <div class="col-6 px-2">Box Set =></div>
              <div class="col-3 px-1 border bungee-regular">${cBig.quantity * cBig.bonus}</div>
            </section>
          </div>
          <div class="col-6">
            <h6 class="bungee-regular text-center">Automatic Stats</h6>
            <section class="row justify-content-between my-3">
              <div class="col-3 px-1 border bungee-regular">${aSmall.quantity}</div>
              <div class="col-6 px-2">Subscription =></div>
              <div class="col-3 px-1 border bungee-regular">${aSmall.quantity * aSmall.bonus}</div>
            </section>
            <section class="row justify-content-between">
              <div class="col-3 px-1 border bungee-regular">${aBig.quantity}</div>
              <div class="col-6 px-2">Closet =></div>
              <div class="col-3 px-1 border bungee-regular">${aBig.quantity * aBig.bonus}</div>
            </section>
          </div>
        </section>`

  upgrades.innerHTML = `
    <div class="col-6">
            <h6 class="bungee-regular text-center">Click Upgrades</h6>
            <section class="row my-3">
              <button onclick="buyUpgrade('clickUpgrades', 'csmall')" class="col-4 bungee-regular btn">$${cSmall.price}</button><span
                class="col pe-0">Double Feature +1</span>
            </section>
            <section class="row mb-3">
              <button onclick="buyUpgrade('clickUpgrades', 'cbig')" class="col-4 bungee-regular btn">$${cBig.price}</button><span
                class="col pe-0">Director's
                Box-Set +5</span>
            </section>
          </div>
          <div class="col-6">
            <h6 class="bungee-regular text-center">Automatic Upgrades</h6>
            <section class="row my-3">
              <button onclick="buyUpgrade('automaticUpgrades', 'asmall')" class="col-4 bungee-regular btn">$${aSmall.price}</button>
              <span class="col pe-0">Criterion Subscription +100 / 3s</span>
            </section>
            <section class="row mb-3">
              <button onclick="buyUpgrade('automaticUpgrades', 'abig')" class="col-4 bungee-regular btn">$${aBig.price}</button>
              <span class="col pe-0">Criterion Closet +1000 / 3s</span>
            </section>
          </div>
        </section>
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

      } else alert('You dont have enough cheddah, get yo money up Big Dawg')
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
      } else alert('You dont have enough cheddah, get yo money up Big Dawg')
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