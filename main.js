const { Authflow } = require('prismarine-auth') 
const { RealmAPI } = require('prismarine-realms')

const authflow = new Authflow()

const api = RealmAPI.from(authflow, 'bedrock')

if(process.argv.length < 3 || process.argv[2] == "-l") {
    api.getRealms().then(_=>{
        console.log(_.map(_=>`${_.id} ${_.name}`).join('\n'));
    })
} else if(process.argv[2] == "-c") {
    api.getRealm(process.argv[3]).then(async realm=>{
        let api2 = new RealmAPI(authflow, "bedrock");
        await api2.rest.post(`/worlds/${realm.id}`, {
            body: {
              name: process.argv.slice(4).join(' '),
              description: realm.motd
            }
        })
        console.log(`Changed realm name to ${process.argv.slice(4).join(' ')}`)
    })
}