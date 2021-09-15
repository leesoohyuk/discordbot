const moment = require("moment")
require("moment-duration-format")
const momenttz = require("moment-timezone")
const MessageAdd = require("./db/message_add.js")

function checkPermission(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> 명령어를 수행할 관리자 권한을 소지하고 있지않습니다.`)
    return true
  } else {
    return false
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str
  limitLen -= tmp.length

  for (let i = 0; i < limitLen; i++) {
    tmp += " "
  }

  return tmp
}

function getEmbedFields(message, modify = false) {
  if (message.content == "" && message.embeds.length > 0) {
    let e = message.embeds[0].fields
    let a = []

    for (let i = 0; i < e.length; i++) {
      a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`)
    }

    return a.join("")
  } else if (modify) {
    return message.author.lastMessage.content
  } else {
    return message.content
  }
}

function MessageSave(message, modify = false) {
  imgs = []
  if (message.attachments.cache.array().length > 0) {
    message.attachments.cache.array().forEach((x) => {
      imgs.push(x.url + "\n")
    })
  }

  username = message.author.username.match(/[\u3131-\uD79D^a-zA-Z^0-9]/giu)
  channelName = message.channel.type != "dm" ? message.channel.name : ""
  try {
    username = username.length > 1 ? username.join("") : username
  } catch (error) {}

  try {
    channelName = channelName.length > 1 ? channelName.join("") : channelName
  } catch (error) {}

  var s = {
    ChannelType: message.channel.type,
    ChannelId: message.channel.type != "dm" ? message.channel.id : "",
    ChannelName: channelName,
    GuildId: message.channel.type != "dm" ? message.channel.guild.id : "",
    GuildName: message.channel.type != "dm" ? message.channel.guild.name : "",
    Message: getEmbedFields(message, modify),
    AuthorId: message.author.id,
    AuthorUsername: username + "#" + message.author.discriminator,
    AuthorBot: Number(message.author.bot),
    Embed: Number(message.embeds.length > 0), // 0이면 false 인거다.
    CreateTime: momenttz().tz("Asia/Seoul").locale("ko").format("ll dddd LTS"),
  }

  s.Message = (modify ? "[수정됨] " : "") + imgs.join("") + s.Message

  MessageAdd(s.ChannelType, s.ChannelId, s.ChannelName, s.GuildId, s.GuildName, s.Message, s.AuthorId, s.AuthorUsername, s.AuthorBot, s.Embed, s.CreateTime)
    // .then((res) => {
    //   console.log('db 저장을 했다.', res)
    // })
    .catch((error) => console.log(error))
}

module.exports.checkPermission = checkPermission
module.exports.changeCommandStringLength = changeCommandStringLength
module.exports.getEmbedFields = getEmbedFields
module.exports.MessageSave = MessageSave