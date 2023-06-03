const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')
require('dotenv/config')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

const commandsPath = path.resolve(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

commandFiles.forEach(file => {
  const command = require(path.join(commandsPath, file));
  
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  }
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return
  
  const command = interaction.client.commands.get(interaction.commandName)
  try {
    await command.execute(interaction)
  } catch {
    interaction.reply('Não foi possível executar esse comando!')
  }
})

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(process.env.TOKEN)
