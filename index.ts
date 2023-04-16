import fs from 'fs-extra'
const folder = "race" //folder of the logo
const prefix = "TeamDAO - CHELTENHAM FESTIVAL - " // change "TeamDAO - CHELTENHAM FESTIVAL - Dark Raven.png" to remove the fucking string
const suffix = '.png' // remove the file extension
const dir = fs.readdirSync(`./${folder}`)
const link = `https://raw.githubusercontent.com/psi0ne/teamdao-staking-icons/master/${folder}/`
const regex = new RegExp(`^${prefix}|\\${suffix}$`, "g")
let data: any[] = []
dir.map(x => data.push({ name: x.replace(regex, "").toUpperCase(), image: `${link}${x}` }))
fs.writeJSONSync('data.json', data)
//copy the content of data.json
//paste it to teams varaible
//copy the code and paste to dev tools
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