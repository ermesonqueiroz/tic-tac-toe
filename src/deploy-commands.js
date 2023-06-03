const { REST, Routes } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')
require('dotenv/config')

const commandsPath = path.resolve(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const commands = commandFiles.map(file => {
  const command = require(path.join(commandsPath, file));
  return command.data.toJSON()
})

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

async function execute() {
  try {
    console.log(`Resetando ${commands.length} comandos...`)

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    )
    
    console.log("Todos os comandos foram registrados com sucesso!")
  } catch(error) {
    console.error(error)
  }
}

execute()
