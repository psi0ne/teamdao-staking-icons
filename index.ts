import fs from 'fs-extra'
const folder = "race"
const dir = fs.readdirSync(`./${folder}`)
const link = `https://raw.githubusercontent.com/psi0ne/teamdao-staking-icons/master/${folder}/`
const regex = /^TeamDAO - CHELTENHAM FESTIVAL - |\.png$/g
let data: any[] = []
dir.map(x => data.push({ name: x.replace(regex, "").toUpperCase(), image: `${link}${x}` }))
fs.writeJSONSync('data.json', data)
const teams: any[] = []
teams.map(async team => {
    const req = await fetch('/api/control/teams/create', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(team)
    })
    if (req.ok) {
        const res = await req.json()
        console.log(res)
    } else {
        console.log(`${req.status} ${req?.statusText}`)
    }
})