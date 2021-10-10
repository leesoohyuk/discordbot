const Discord = require("discord.js")
const intent_list = new Discord.Intents(["GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS", "GUILD_INVITES"])
const client = new Discord.Client({ ws: { intents: intent_list } })
const { checkPermission, changeCommandStringLength, getEmbedFields, MessageSave } = require("./modules/utils.js")
const moment = require("moment")
require("moment-duration-format")
const momenttz = require("moment-timezone")
const token = ""
const keepAlive = require('./server.js')
const welcomeChannelName = "입퇴장"
const byeChannelName = "입퇴장"
const welcomeChannelComment = "어서오세요!"
const byeChannelComment = "OUT"
const roleName = "멤버"


client.on("ready", () => {
  console.log("켰다.")
  client.user.setPresence({ activity: { name: "챗봇" }, status: "online" })

  let state_list = [
    '챗봇',
    '디스코드',
    '크몽',
    '커미션',
  ]
  let state_list_index = 1;
  let change_delay = 3000;

  function changeState() {
    setTimeout(() => {
      console.log( '상태 변경 -> ', state_list[state_list_index] );
      client.user.setPresence({ activity: { name: state_list[state_list_index] }, status: 'online' })
      state_list_index += 1;
      if(state_list_index >= state_list.length) {
        state_list_index = 0;
      }
      changeState()
    }, change_delay);
  }

  changeState();
})

client.on("guildMemberAdd", (member) => {
  const guild = member.guild
  const newUser = member.user
  const welcomeChannel = guild.channels.cache.find((channel) => channel.name == welcomeChannelName)

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`)
  member.roles.add(guild.roles.cache.find((role) => role.name === roleName).id)
})

client.on("guildMemberRemove", (member) => {
  const guild = member.guild
  const deleteUser = member.user
  const byeChannel = guild.channels.cache.find((channel) => channel.name == byeChannelName)

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`)
})

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content) return 
    if(oldMessage.author.bot) return;
    let img = oldMessage.author.avatar ? `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.webp?size=256` : undefined;
    let embed = new Discord.MessageEmbed()
    .setTitle(`${oldMessage.author.tag}님이 메시지를 수정했습니다.`)
    .setColor('#FFFF')
    .addField('수정 전 메시지:', oldMessage.content)
    .addField('수정 후 메시지:', newMessage.content)
    .setFooter(message.guild.name)
    .setTimestamp()
    client.channels.cache.get('889460394970726401')
    .send(embed)
  })
  
  
  
client.on('messageDelete', async message => {
    if(message.author.bot) return
    let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
    let embed = new Discord.MessageEmbed() 
    .setTitle(`${message.author.tag} 님이 메시지를 삭제했습니다.`)
    .setColor('#FFFF')
    .addField('삭제된 메시지:', message.content)
    .setFooter(message.guild.name)
    .setTimestamp()
    client.channels.cache.get('889460394970726401')
    .send(embed)
  });

client.on("message", (message) => {
  if (message.author.bot) return

  switch(message.content){
    case"!안녕" :
    message.reply('안녕! 이 바부 멍청아!');
     break;
  }
  switch(message.content){
    case"0" :
    message.channel.send(`${message.author.name}`);
     break;
  }
  switch(message.content){
    case"ping3" :
    message.channel.send(`<@${message.author.id}>`+'ping3\n\n멘션O, `,`X');
     break;
  }

  switch(message.content){
   case"!딜레이" :
     setTimeout(function() {
       message.channel.send('메시지');
       }, 5000);
  }

  if(message.content == '!개인') {
     if(message.author.id == '833927440191586305') {
         message.channel.send('메시지')
     } else return message.channel.send("dm에서 사용할 수 없는 명령어 입니다.")
  }
  switch(message.content){
    case"!관리자" :
    if(checkPermission(message)) return
    message.channel.send('메시지');
     break;
  }



  switch(message.content.substring(0,3)) {
    case "!투표" :
    const description = message.content.substring(3);
    const embed = new Discord.MessageEmbed( )
    .setTitle("📢 투표 📢")
    .setDescription(description)
    .setColor("6A5ACD");  
    message.channel.send(embed)
    .then((message) => {
      message.react("👍")
      message.react("👎")
    });
    break;
  }

  if (message.content == "!상태") {
    let embed = new Discord.MessageEmbed()
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]")
    embed.setColor("#642a80")
    embed.setAuthor("봇, 서버 상태")
    embed.setFooter(`${message.guild.name}`)
    embed.addField("작동 시간", `${duration}`, true)
    embed.addField("가입 유저 수", `${client.users.cache.size}`, true)
    embed.addField("가입 서버 수", `${client.guilds.cache.size}`, true)
    embed.addField("서버 생성 날짜", `${message.guild.createdAt}`, true)

    let arr = client.guilds.cache.array()
    let list = ""
    list = `\`\`\`css\n`

    for (let i = 0; i < arr.length; i++) {
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField("server list:", `${list}`)

    embed.setTimestamp()
    message.channel.send(embed)
  }

  if (message.content == "!embed1") {
    
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name}`)
      .setColor("#642a80")
      .addField("부제목", "내용")
      .addField("부제목", "내용", true)
      .addField("부제목", "내용", true)
      .addField("부제목", "내용", true)
      .addField("부제목", "내용1\n내용2\n내용3\n")
      .setTimestamp()
      .setFooter(`${message.guild.name}`)

    message.channel.send(embed)
  } else if (message.content == "!embed2") {
    let commandList = [
      { name: "ping1", desc: "멘션 예시1" },
      { name: "ping2", desc: "멘션 예시2" },
      { name: "ping3", desc: "멘션 예시3" },
      { name: "!봇상태", desc: "봇에 대한 정보" },
      { name: "!명령어1", desc: "embed 예제1" },
      { name: "!명령어2", desc: "embed 예제2" },
      { name: "!전체공지", desc: "dm으로 전체 공지 보내기" },
      { name: "!전체공지2", desc: "dm으로 전체 embed 형식으로 공지 보내기" },
      { name: "!클린", desc: "텍스트 지움" },
      { name: "!초대코드", desc: "해당 채널의 초대 코드 표기" },
      { name: "!초대코드2", desc: "봇이 들어가있는 모든 채널의 초대 코드 표기" },
    ]
    let commandStr = ""
    let embed = new Discord.MessageEmbed().setAuthor(`${message.guild.name}`)
    .setColor("#642a80")
    .setFooter(`${message.guild.name}`)
    .setTimestamp()

    commandList.forEach((x) => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`
    })

    embed.addField("명령어: ", commandStr)

    message.channel.send(embed)
  } else if (message.content == "!초대코드2") {
    client.guilds.cache.array().forEach((x) => {
      x.channels.cache
        .find((x) => x.type == "text")
        .createInvite({ maxAge: 0 })
        .then((invite) => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if (err.code == 50013) {
            message.channel.send(`**${x.channels.cache.find((x) => x.type == "text").guild.name}** 채널 권한이 없어 초대코드 발행 실패`)
          }
        })
    })
  } else if (message.content == "!초대코드") {
    if (message.channel.type == "dm") {
      return message.reply("dm에서 사용할 수 없는 명령어 입니다.")
    }
    message.guild.channels.cache
      .get(message.channel.id)
      .createInvite({ maxAge: 0 })
      .then((invite) => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if (err.code == 50013) {
          message.channel.send(`**${message.guild.channels.cache.get(message.channel.id).guild.name}** 채널 권한이 없어 초대코드 발행 실패`)
        }
      })
  } else if (message.content.startsWith("!공지2")) {
    if (checkPermission(message)) return
    if (message.member != null) {
      let contents = message.content.slice("!공지2".length)
      let embed = new Discord.MessageEmbed()
      .setAuthor('📢' + `${message.guild.name}`+' 서버 공지 입니다📢')
      .setColor("#642a80")
      .setFooter(`${message.guild.name}`)
      .setTimestamp()

      embed.addField("공지사항:", contents)

      message.member.guild.members.cache.array().forEach((x) => {
        if (x.user.bot) return
        x.user.send(embed)
      })

      return message.reply("공지를 전송했습니다.")
    } else {
      return message.reply("채널에서 실행해주세요.")
    }
  } else if (message.content.startsWith("!공지")) {
    if (checkPermission(message)) return
    if (message.member != null) {
      let contents = message.content.slice("!공지".length)
      message.member.guild.members.cache.array().forEach((x) => {
        if (x.user.bot) return
        x.user.send(`<@${message.author.id}> ${contents}`)
      })

      return message.reply("공지를 전송했습니다.")
    } else {
      return message.reply("채널에서 실행해주세요.")
    }
  } else if (message.content.startsWith("!클린")) {5
    if (message.channel.type == "dm") {
      return message.reply("dm에서 사용할 수 없는 명령어 입니다.")
    }

    if (message.channel.type != "dm" && checkPermission(message)) return

    var clearLine = message.content.slice("!클린 ".length)
    var isNum = !isNaN(clearLine)

    if(message.author.bot) return;
    if(message.attachments.array().length > 0) {
        try {
            const result = await fetch(message.attachments.array()[0].proxyURL);
            if (!result.ok) throw new Error('Failed to get the avatar!');
            const avatar = await result.buffer();

            const attachment = new MessageAttachment(avatar, message.attachments.array()[0].name);
            if(message.content.length == 0) {
                message.channel.send(`${message.author}님이 삭제하셨습니다.`);
            } else {
                message.channel.send(`${message.author}님이 \`\`${message.content}\`\`를 삭제하셨습니다.`);
            }
            return message.channel.send(attachment);
        } catch (e) {
            console.log(e);
            return message.channel.send(`An error occurred: **${e.message}**`);
        }
    }
    message.channel.send(`${message.author}님이 \`\`${message.content}\`\`를 삭제하셨습니다.`);
  }
})

keepAlive()
client.login(token)
