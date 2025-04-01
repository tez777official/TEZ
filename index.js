
  const fs = require("fs");
  const path = require("path");
  
  const embedColor = 0x0099ff;
  
  const qe = {
    err(channelID, text) {
      if (!channelID) return;
      if (!text) return;
      const exampleEmbed = new EmbedBuilder()
        .setColor(embedColor)
        .setTitle("エラー！")
        .setDescription(text);
      client.channels.cache.get(channelID).send({ embeds: [exampleEmbed] });
    },
    embed(channelID, title, text) {
      if (!channelID) return;
      if (!title) return;
      if (!text) return;
      const exampleEmbed = new EmbedBuilder()
        .setColor(embedColor)
        .setTitle(title)
        .setDescription(text);
      client.channels.cache.get(channelID).send({ embeds: [exampleEmbed] });
    },
    intembed(interaction, text) {
      if (!(interaction || text)) return;
      const exampleEmbed = new EmbedBuilder()
        .setColor(embedColor)
        .setDescription(text);
      interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
    },
  };
  
  client.once("ready", () => {
    //client.application.commands.set([])
    client.application.commands
      .create({
        name: "w",
        description: "匿名メッセージを送信します。(匿名チャットのみ)",
        options: [{ name: "内容", description: "msg", type: 3 }],
      })
    console.log("起動完了");
    keyv.get("day_key_1").then((day_key_1) => {
      keyv.get("day_key_2").then((day_key_2) => {
        console.log(
          "\x1b[32m====================================================\x1b[39m"
        );
        console.log(
          `\x1b[32m                 WARAO BOT                 \x1b[39m`
        );
        console.log();
        console.log(`\x1b[32m TIME: ${moment().format()}  \x1b[39m`);
        console.log(`\x1b[32m DAY_KEY: ${day_key_1} ${day_key_2}  \x1b[39m`);
        console.log(`\x1b[32m APPLICATION ID: ${client.user.id}\x1b[39m`);
        console.log(
          "\x1b[32m====================================================\x1b[39m"
        );
      });
    });
  });
  
  
  client.login(token);
  
  const cron = require("node-cron");
  
  const crypto = require("crypto");
  
  const Keyv = require("keyv");
  const keyv = new Keyv("sqlite://test.db");
  keyv.on("error", (err) => console.log("Connection Error", err));
  
  const moment = require("moment-timezone");
  moment.locale("ja");
  moment.tz.setDefault("Asia/Tokyo");
  
  const prefix = "w+";
  
  client.on("ready", () => {
    const guildId = "1040774666794573975";
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      console.log(`Guild with ID ${guildId} not found.`);
      return;
    }
    const channels = guild.channels.cache;
    channels.forEach((channel) => {
      console.log(
        `Channel name: ${channel.name}, type: ${channel.type}, id: ${channel.id}`
      );
    });
  });
  
  cron.schedule("0 0 0 * * *", () => {
    var num = Math.floor(Math.random() * 1000);
    const day_key_1 = String("000" + num).slice(-3);
    var num = Math.floor(Math.random() * 1000);
    const day_key_2 = String("000" + num).slice(-3);
    keyv.set("day_key", day_key_1 + day_key_2);
    keyv.set("day_key_1", day_key_1);
    keyv.set("day_key_2", day_key_2);
    const exampleEmbed = new EmbedBuilder()
      .setColor("#010066")
      .setDescription(`笑ちゃんねるが${moment().format("MM")}月${moment().format("D")}日午前0時をお知らせします\n⊂二二二（　＾ω＾）二⊃ﾌﾞｰﾝ`);
    client.channels.cache.get("1057482565256216628").send({ embeds: [exampleEmbed] });
  });
  cron.schedule("0 0 12 * * *", () => {
    const exampleEmbed = new EmbedBuilder()
      .setColor("#010066")
      .setDescription(`笑ちゃんねるが${moment().format("MM")}月${moment().format("D")}日午前12時をお知らせします\n⊂二二二（　＾ω＾）二⊃ﾌﾞｰﾝ`);
    client.channels.cache.get("1057482565256216628").send({ embeds: [exampleEmbed] });
  });
  
  client.on("messageCreate", async (message) => {
    if (message.member?.id === "1066658936708669531") {
      if (message.content === "ちょっと！今日はもうやったでしょ！") return;
      if (!message.embeds[0]) {
        const backupMemberButtonA = new ButtonBuilder()
          .setCustomId("AIGood")
          .setStyle(ButtonStyle.Primary)
          .setLabel("高評価");
        const backupMemberButtonB = new ButtonBuilder()
          .setCustomId("messageDelete")
          .setStyle(ButtonStyle.Primary)
          .setLabel("削除");
        const row = new ActionRowBuilder()
          .addComponents(backupMemberButtonA)
          .addComponents(backupMemberButtonB);
        message.edit({ components: [row] });
      }
    }
    if (message.content === prefix + "mb") {
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("メンバーバックアップ")
        .setDescription(
          "万が一当鯖が誤BANなどがされてしまった場合に、<@1066658936708669531>からDMで後続サーバーのURLを受け取るように設定することができます。\n\n「滞在時のみ有効に設定」で、当鯖から退出された際に自動で解除されるようにできます。\n※BOTからDMを受け取れるようになっている必用があります。設定方法は[こちら(外部リンク)](https://support.discord.com/hc/ja/articles/115000068672-Discord%E3%82%BB%E3%83%BC%E3%83%95%E3%83%86%E3%82%A3%E3%83%BC-%E5%AE%89%E5%85%A8%E3%81%AA%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8-)"
        );
      const backupMemberButtonA = new ButtonBuilder()
        .setCustomId("backupMemberButtonA")
        .setStyle(ButtonStyle.Primary)
        .setLabel("有効に設定");
      const backupMemberButtonB = new ButtonBuilder()
        .setCustomId("backupMemberButtonB")
        .setStyle(ButtonStyle.Primary)
        .setLabel("滞在時のみ有効に設定");
      const backupMemberButtonC = new ButtonBuilder()
        .setCustomId("backupMemberButtonC")
        .setStyle(ButtonStyle.Danger)
        .setLabel("無効に設定");
      const row = new ActionRowBuilder()
        .addComponents(backupMemberButtonA)
        .addComponents(backupMemberButtonB)
        .addComponents(backupMemberButtonC);
      message.channel.send({
        embeds: [exampleEmbed],
        components: [row],
      });
    }
    if (message.channel.id === "1074103147137609728") {
      if (message.author.bot) return;
      const HIROYKI_C_1 = new WebhookClient({
        url: "https://discord.com/api/webhooks/1092313918396977152/jy634XoltOQp6mP63vr4hjjAheij_lNw7FcVO9xd4N9qH98PWilUMp9onEpPbZKhmTp7",
      });
      const HIROYKI_C_2 = new WebhookClient({
        url: "https://discord.com/api/webhooks/1093052657347874846/dU_265PatTQTowg1Wyq7iZ-_aFb2iVFllp3ilAJH62_FGUyyCjOqbn0kqEYfnMHVMOHQ",
      });
      const HIROYKI_C_3 = new WebhookClient({
        url: "https://discord.com/api/webhooks/1190595226176331806/ED-6fcmsOQZ3Xne2HvGAvugjR6S69-zuEJBjKcnruhSVB-DNYE5EqoaE5hATvgP4f_cK",
      });
      const HIROYKI_C_4 = new WebhookClient({
        url: "https://discord.com/api/webhooks/1190595416434151515/zjuZ3QMLtKOuyl3BKl8dBQeV7CZc_MLLRyd2eaJp4fiZhD-Sm9A4lsxRWI-v9ZhJtrqK",
      });
      const HIROYKI_C_5 = new WebhookClient({
        url: "https://discord.com/api/webhooks/1190595501171675186/cMYmsKGS3R6hI_EVlySm1AU9zVghAGNm-BwXKZpdk6pOCTp81_ggC7HIGxAOyYp6JJA4",
      });
      const HIROYKI_C_6 = new WebhookClient({
        url: "https://discord.com/api/webhooks/1190595600073379920/eBpwUQEpl-sP54hM9_PLEnOk3LobpJynp6pGZtuEGl2ETj6o0UiZOwx5bCY2bvT1xsek",
      });
      const HIROYKI_C_7 = new WebhookClient({
        url: "https://discord.com/api/webhooks/1190595682839580723/wNHfoZ1o_FfdfBPiOF6H2-zb4Z4NW3pXA8yU04hE92XqitYNpaOQLDRbTNwhmad8j28f",
      });
      const HIROYKI_C_8 = new WebhookClient({
        url: "https://discord.com/api/webhooks/1190595772681564180/fxE_27o0oycwqRoLfq10R2gite5s7cCqfu0Mp3VmbKcinCzi_DosG9GG06dhTMNAiX1a",
      });
      for (let i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
          HIROYKI_C_1.send({
            content: "はい？",
            username: "ひろゆき",
            avatarURL:
              "https://media.discordapp.net/attachments/1081426145301504143/1093049415159263242/soretteanatanokansoudesuyone.png?width=477&height=467",
          });
        } else {
          HIROYKI_C_2.send({
            content: "はい？",
            username: "ひろゆき",
            avatarURL:
              "https://media.discordapp.net/attachments/1081426145301504143/1093051098622857286/IMG_1454.jpg?width=847&height=565",
          });
        }
      }
    }
    if (message.channel.id === "1040774666794573975") return;
    if (message.content === prefix + "test") {
      message.channel.send("hey!");
    }
    if (message.channel.id === "1067838934865948763") {
      if (message.author.bot || message.author.system) return;
      message.startThread({
        name: `${message.content}`,
        autoArchiveDuration: 60,
      });
    }
    if (message.thread && message.thread.parentID === "1067838934865948763") {
      fs.readFile(ASC_count.txt, "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        let lines = data.split("\n");
        let found = false;
        let value = "";
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith("data")) {
            found = true;
            value = lines[i].split(":")[1];
            break;
          }
        }
        if (!found) {
          fs.appendFile(
            ASC_count.txt,
            `\n${message.thread.id}:0`,
            function (err) {
              if (err) return console.log(err);
              console.log("Added new line");
            }
          );
        } else {
          console.log("Found value:", value);
        }
      });
    }
    if (message.channel.id === "1061070266886803586") {
      if (message.author.id === "1092078302765789254") {
        keyv.get("AC_count").then((AC_count) => {
          fs.appendFile(
            "ac_messageID_log.txt",
            Number(-1 + AC_count) + ":" + message.id + "\n",
            (err) => {
              if (err) throw err;
            }
          );
        });
        return;
      }
      message.delete();
      if (message.author.bot) return;
      {
        function function_AC_send(text) {
          keyv.get("AC_count").then((AC_count) => {
            keyv.get("AC_user_nickname").then((AC_user_nickname) => {
              keyv.get("day_key").then((day_key) => {
                const AC_user_id_sha256 = crypto
                  .createHash("sha256") ////////////////////////////////////////////////////////////////////////////////////////////
                  .update(message.member.id + moment().format("Y/M"))
                  .digest("hex");
                let AC_user_id = AC_user_id_sha256.substring(0, 8);
                const exampleEmbed = new EmbedBuilder()
                  .setColor(2895667)
                  .setTitle(
                    `[${AC_count}] ${
                      AC_user_nickname || "風吹けば名無し"
                    } ID:${AC_user_id}`
                  )
                  .setDescription(text);
                const webhookClient = new WebhookClient({
                  url: "https://discord.com/api/webhooks/1092078302765789254/3GdaX5WnTsYpFQTiAG5wdFrDH9nmsFV9gJN_ZgnuS9emg5Vb6vVtaNVE5UkbMg4Z88pu",
                });
                webhookClient.send({
                  embeds: [exampleEmbed],
                  username: "匿名chat",
                  avatarURL:
                    "https://media.discordapp.net/attachments/1081426145301504143/1092082340555145216/image0.jpg?width=480&height=480",
                });
                keyv.get("AC_count").then((AC_count) => {
                  const set_AC_count = Number(AC_count) + 1;
                  keyv.set("AC_count", set_AC_count);
                  let log = `number: ${AC_count}, userID: ${message.member.id}, content: ${text}\n`;
                  fs.appendFile("ac_log.txt", log, (err) => {
                    if (err) throw err;
                  });
                });
              });
            });
          });
        }
        if (message.reference) {
          const repliedMessage = message.channel.messages.cache.get(
            message.reference.messageId
          );
          const embed = repliedMessage.embeds[0];
          let regex = /\[(.*?)\]/g;
          let match;
          while ((match = regex.exec(embed.title)) !== null) {
            function_AC_send(
              `[>>${match[1]}](https://discord.com/channels/1056948917633286214/1061070266886803586/${repliedMessage.id})\n` +
                message.content
            );
          }
        } else if (message.content.match(/>>\d+/g)) {
          if (message.content.match(/>>\d+/g)) {
            function function_AC_search(n) {
              let data = fs.readFileSync("ac_messageID_log.txt", "utf8");
              let lines = data.split("\n");
              for (let line of lines) {
                if (line.startsWith(n.toString())) {
                  let index = line.indexOf(":");
                  let repliedMessageID = line.slice(index + 1);
                  return `[>>${n}](https://discord.com/channels/1056948917633286214/1061070266886803586/${repliedMessageID})`;
                }
              }
            }
  
            let numbers = message.content
              .match(/>>\d+/g)
              .map((item) => parseInt(item.replace(">>", "")));
            for (let number of numbers) {
              let message_link = function_AC_search(number);
              if (message_link) {
                let regex = new RegExp(`>>${number}`, "g");
                message.content = message.content.replace(regex, message_link);
              }
            }
  
            function_AC_send(message.content);
          }
        } else {
          function_AC_send(message.content);
        }
      }
    }
    if (message.reference && message.content === "a+go") {
      const referenceMessage = await message.channel.messages.fetch(
        message.reference.messageId
      );
      const jsonMessage = { referenceContent: referenceMessage };
      const formattedJSON = JSON.stringify(jsonMessage, null, 2);
      fs.writeFileSync("referenceMessage.json", formattedJSON);
      message.reply({
        allowedMentions: { repliedUser: false },
        files: [
          {
            attachment: Buffer.from(formattedJSON),
            name: "referenceMessage.json",
          },
        ],
      });
    }
    if (message.channel.id === "1067838934865948763") {
      if (message.author.bot || message.author.system) return;
      message.startThread({
        name: `${message.content}`,
        autoArchiveDuration: 60,
      });
    }
    if (message.content === "unsei") {
      /*
      if (message.member.id === "1002151638028525599") {
        var array_1 = [`シャーペン`];
        var array_2 = [
          `白色`,
          `黄色`,
          `橙色`,
          `赤色`,
          `茶色`,
          `緑色`,
          `黄緑色`,
          `青色`,
          `水色`,
          `紫色`,
          `赤紫`,
          `黒色`,
        ];
        var array_3 = [`★★★★★`];
        var array_4 = [`★★★★★`];
        var array_5 = [`★★★★★`];
        const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("お　み　く　じ")
          .setDescription(
            `<@${
              message.member.id
            }>の運勢は...\n結果: **超大吉**\n\`ラッキーアイテム:\`${
              array_1[Math.floor(Math.random() * array_1.length)]
            }\n\`ラッキーカラー　:\`${
              array_2[Math.floor(Math.random() * array_2.length)]
            }\n\`金運　　　　　　:\`${
              array_3[Math.floor(Math.random() * array_3.length)]
            }\n\`仕事運　　　　　:\`${
              array_4[Math.floor(Math.random() * array_4.length)]
            }\n\`恋愛運　　　　　:\`${
              array_5[Math.floor(Math.random() * array_5.length)]
            }`
          );
        message.channel.send({ embeds: [exampleEmbed] });
        return;
      }
      */
      if (message.channel.id === "1057482565256216628") {
        message.reply({
          content: "ほかのちゃんねるでやってね",
          allowedMentions: { repliedUser: false },
        });
        return;
      }
      keyv.get("tmp_unsei_" + message.member.id).then((data) => {
        if (data === moment().format("YYYY-MM-DD")) {
          message.reply({
            content: "ちょっと！今日はもうやったでしょ！",
            allowedMentions: { repliedUser: false },
          });
          return;
        } else {
          keyv.set(
            "tmp_unsei_" + message.member.id,
            moment().format("YYYY-MM-DD")
          );
          var array = [`大吉`, `吉`, `小吉`, `中吉`, `大凶`, `凶`];
          const unsei = array[Math.floor(Math.random() * array.length)];
          var array_1 = [
            `[Twitter](https://twitter.com/?lang=ja)`,
            `[YouTube](https://www.youtube.com/)`,
            `いちごケーキ`,
            `チョコケーキ`,
            `タコス`,
            `卵焼き`,
            `ぶどう`,
            `焼き芋`,
            `寿司`,
            `りんご`,
            `辞書`,
            `腕時計`,
            `カルピス`,
            `Discord`,
            `えんぴつ`,
            `消しゴム`,
            `サングラス`,
            `メガネ`,
            `虫眼鏡`,
            `2ch`,
            `5ch`,
            `カップラーメン`,
            `エナジードリンク`,
            `[てず](https://discord.com/users/1002151638028525599)`,
            `映画`,
            `チョコレート`,
            `オランジーナ`,
            `箱ティッシュ`,
            `ハッピーターン`,
            `（笑）ちゃんねる`,
            `ラーメン`,
            `大麻グミ`,
          ];
          var array_2 = [
            `白色`,
            `黄色`,
            `橙色`,
            `赤色`,
            `茶色`,
            `緑色`,
            `黄緑色`,
            `青色`,
            `水色`,
            `紫色`,
            `赤紫`,
            `青紫色`,
            `黒色`,
          ];
          if (unsei === "超大吉") {
            var array_3 = [`★★★★★`];
            var array_4 = [`★★★★★`];
            var array_5 = [`★★★★★`];
            const exampleEmbed = new EmbedBuilder()
              .setColor(0x0099ff)
              .setTitle("お　み　く　じ")
              .setDescription(
                `<@${
                  message.member.id
                }>の運勢は...\n結果: **${unsei}**\n\`ラッキーアイテム:\`${
                  array_1[Math.floor(Math.random() * array_1.length)]
                }\n\`ラッキーカラー　:\`${
                  array_2[Math.floor(Math.random() * array_2.length)]
                }\n\`金運　　　　　　:\`${
                  array_3[Math.floor(Math.random() * array_3.length)]
                }\n\`仕事運　　　　　:\`${
                  array_4[Math.floor(Math.random() * array_4.length)]
                }\n\`恋愛運　　　　　:\`${
                  array_5[Math.floor(Math.random() * array_5.length)]
                }`
              );
            message.channel.send({ embeds: [exampleEmbed] });
          }
          if (unsei === "大吉") {
            var array_3 = [`★★★★★`, `★★★★☆`, `★★★☆☆`];
            var array_4 = [`★★★★★`, `★★★★☆`, `★★★☆☆`];
            var array_5 = [`★★★★★`, `★★★★☆`, `★★★☆☆`];
            const exampleEmbed = new EmbedBuilder()
              .setColor(0x0099ff)
              .setTitle("お　み　く　じ")
              .setDescription(
                `<@${
                  message.member.id
                }>の運勢は...\n結果: **${unsei}**\n\`ラッキーアイテム:\`${
                  array_1[Math.floor(Math.random() * array_1.length)]
                }\n\`ラッキーカラー　:\`${
                  array_2[Math.floor(Math.random() * array_2.length)]
                }\n\`金運　　　　　　:\`${
                  array_3[Math.floor(Math.random() * array_3.length)]
                }\n\`仕事運　　　　　:\`${
                  array_4[Math.floor(Math.random() * array_4.length)]
                }\n\`恋愛運　　　　　:\`${
                  array_5[Math.floor(Math.random() * array_5.length)]
                }`
              );
            message.channel.send({ embeds: [exampleEmbed] });
          }
          if (unsei === "吉") {
            var array_3 = [`★★★★★`, `★★★★☆`, `★★★☆☆`, `★★☆☆☆`];
            var array_4 = [`★★★★★`, `★★★★☆`, `★★★☆☆`, `★★☆☆☆`];
            var array_5 = [`★★★★★`, `★★★★☆`, `★★★☆☆`, `★★☆☆☆`];
            const exampleEmbed = new EmbedBuilder()
              .setColor(0x0099ff)
              .setTitle("お　み　く　じ")
              .setDescription(
                `<@${
                  message.member.id
                }>の運勢は...\n結果: **${unsei}**\n\`ラッキーアイテム:\`${
                  array_1[Math.floor(Math.random() * array_1.length)]
                }\n\`ラッキーカラー　:\`${
                  array_2[Math.floor(Math.random() * array_2.length)]
                }\n\`金運　　　　　　:\`${
                  array_3[Math.floor(Math.random() * array_3.length)]
                }\n\`仕事運　　　　　:\`${
                  array_4[Math.floor(Math.random() * array_4.length)]
                }\n\`恋愛運　　　　　:\`${
                  array_5[Math.floor(Math.random() * array_5.length)]
                }`
              );
            message.channel.send({ embeds: [exampleEmbed] });
          }
          if (unsei === "中吉") {
            var array_3 = [`★★★★☆`, `★★★☆☆`, `★★☆☆☆`];
            var array_4 = [`★★★★☆`, `★★★☆☆`, `★★☆☆☆`];
            var array_5 = [`★★★★☆`, `★★★☆☆`, `★★☆☆☆`];
            const exampleEmbed = new EmbedBuilder()
              .setColor(0x0099ff)
              .setTitle("お　み　く　じ")
              .setDescription(
                `<@${
                  message.member.id
                }>の運勢は...\n結果: **${unsei}**\n\`ラッキーアイテム:\`${
                  array_1[Math.floor(Math.random() * array_1.length)]
                }\n\`ラッキーカラー　:\`${
                  array_2[Math.floor(Math.random() * array_2.length)]
                }\n\`金運　　　　　　:\`${
                  array_3[Math.floor(Math.random() * array_3.length)]
                }\n\`仕事運　　　　　:\`${
                  array_4[Math.floor(Math.random() * array_4.length)]
                }\n\`恋愛運　　　　　:\`${
                  array_5[Math.floor(Math.random() * array_5.length)]
                }`
              );
            message.channel.send({ embeds: [exampleEmbed] });
          }
          if (unsei === "小吉") {
            var array_3 = [`★★★★☆`, `★★★☆☆`, `★★☆☆☆`, `★☆☆☆☆`];
            var array_4 = [`★★★★☆`, `★★★☆☆`, `★★☆☆☆`, `★☆☆☆☆`];
            var array_5 = [`★★★★☆`, `★★★☆☆`, `★★☆☆☆`, `★☆☆☆☆`];
            const exampleEmbed = new EmbedBuilder()
              .setColor(0x0099ff)
              .setTitle("お　み　く　じ")
              .setDescription(
                `<@${
                  message.member.id
                }>の運勢は...\n結果: **${unsei}**\n\`ラッキーアイテム:\`${
                  array_1[Math.floor(Math.random() * array_1.length)]
                }\n\`ラッキーカラー　:\`${
                  array_2[Math.floor(Math.random() * array_2.length)]
                }\n\`金運　　　　　　:\`${
                  array_3[Math.floor(Math.random() * array_3.length)]
                }\n\`仕事運　　　　　:\`${
                  array_4[Math.floor(Math.random() * array_4.length)]
                }\n\`恋愛運　　　　　:\`${
                  array_5[Math.floor(Math.random() * array_5.length)]
                }`
              );
            message.channel.send({ embeds: [exampleEmbed] });
          }
          if (unsei === "凶") {
            var array_3 = [`★★★☆☆`, `★★☆☆☆`, `★☆☆☆☆`];
            var array_4 = [`★★★☆☆`, `★★☆☆☆`, `★☆☆☆☆`];
            var array_5 = [`★★★☆☆`, `★★☆☆☆`, `★☆☆☆☆`];
            const exampleEmbed = new EmbedBuilder()
              .setColor(0x0099ff)
              .setTitle("お　み　く　じ")
              .setDescription(
                `<@${
                  message.member.id
                }>の運勢は...\n結果: **${unsei}**\n\`ラッキーアイテム:\`${
                  array_1[Math.floor(Math.random() * array_1.length)]
                }\n\`ラッキーカラー　:\`${
                  array_2[Math.floor(Math.random() * array_2.length)]
                }\n\`金運　　　　　　:\`${
                  array_3[Math.floor(Math.random() * array_3.length)]
                }\n\`仕事運　　　　　:\`${
                  array_4[Math.floor(Math.random() * array_4.length)]
                }\n\`恋愛運　　　　　:\`${
                  array_5[Math.floor(Math.random() * array_5.length)]
                }`
              );
            message.channel.send({ embeds: [exampleEmbed] });
          }
          if (unsei === "大凶") {
            var array_3 = [`★★★☆☆`, `★★☆☆☆`, `★☆☆☆☆`, `★★☆☆☆`, `★☆☆☆☆`];
            var array_4 = [`★★★☆☆`, `★★☆☆☆`, `★☆☆☆☆`, `★★☆☆☆`, `★☆☆☆☆`];
            var array_5 = [`★★★☆☆`, `★★☆☆☆`, `★☆☆☆☆`, `★★☆☆☆`, `★☆☆☆☆`];
            const exampleEmbed = new EmbedBuilder()
              .setColor(0x0099ff)
              .setTitle("お　み　く　じ")
              .setDescription(
                `<@${
                  message.member.id
                }>の運勢は...\n結果: **${unsei}**\n\`ラッキーアイテム:\`${
                  array_1[Math.floor(Math.random() * array_1.length)]
                }\n\`ラッキーカラー　:\`${
                  array_2[Math.floor(Math.random() * array_2.length)]
                }\n\`金運　　　　　　:\`${
                  array_3[Math.floor(Math.random() * array_3.length)]
                }\n\`仕事運　　　　　:\`${
                  array_4[Math.floor(Math.random() * array_4.length)]
                }\n\`恋愛運　　　　　:\`${
                  array_5[Math.floor(Math.random() * array_5.length)]
                }`
              );
            message.channel.send({ embeds: [exampleEmbed] });
          }
        }
      });
    }
    if (message.guild.id === "1056948917633286214") {
      if (message.author.id === "1002151638028525599") return;
      const inviteLinkPattern =
        /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/[^ ]+/g;
      if (inviteLinkPattern.test(message.content)) {
        const matches = message.content.match(inviteLinkPattern);
        try {
          await message.delete();
          qe.embed(
            "1076708515839742073",
            "招待リンクを含むメッセージを削除しました。",
            `*メッセージ送信者*\n${message.member.displayName}(${message.member.id})\n*違反としたリンク*\n${matches}`
          );
          console.log(
            `Deleted a message from ${message.author.username} as it contained an invite link.`
          );
        } catch (err) {
          console.error("Failed to delete the message:", err);
        }
      }
    }
    if (!message.author.bot) {
  
    console.log(message.member.displayName, message.member.presence.clientStatus)
    }
  });
  
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.commandName === "w") {
      const msg = interaction.options.getString("内容");
      if (msg) {
        function function_AC_send(text) {
          keyv.get("AC_count").then((AC_count) => {
            keyv.get("AC_user_nickname").then((AC_user_nickname) => {
              keyv.get("day_key").then((day_key) => {
                const AC_user_id_sha256 = crypto
                  .createHash("sha256")
                  .update(interaction.member.id + moment().format("Y/M"))
                  .digest("hex");
                let AC_user_id = AC_user_id_sha256.substring(0, 8);
                const exampleEmbed = new EmbedBuilder()
                  .setColor(2895667)
                  .setTitle(
                    `[${AC_count}] ${
                      AC_user_nickname || "風吹けば名無し"
                    } ID:${AC_user_id}`
                  )
                  .setDescription(text);
                const webhookClient = new WebhookClient({
                  url: "https://discord.com/api/webhooks/1092078302765789254/3GdaX5WnTsYpFQTiAG5wdFrDH9nmsFV9gJN_ZgnuS9emg5Vb6vVtaNVE5UkbMg4Z88pu",
                });
                webhookClient.send({
                  embeds: [exampleEmbed],
                  username: "匿名chat",
                  avatarURL:
                    "https://media.discordapp.net/attachments/1081426145301504143/1092082340555145216/image0.jpg?width=480&height=480",
                });
                keyv.get("AC_count").then((AC_count) => {
                  const set_AC_count = Number(AC_count) + 1;
                  keyv.set("AC_count", set_AC_count);
                  let log = `number: ${AC_count}, userID: ${interaction.member.id}, content: ${text}\n`;
                  fs.appendFile("ac_log.txt", log, (err) => {
                    if (err) throw err;
                  });
                });
              });
            });
          });
        }
        if (msg.match(/>>\d+/g)) {
          if (msg.match(/>>\d+/g)) {
            function function_AC_search(n) {
              let data = fs.readFileSync("ac_messageID_log.txt", "utf8");
              let lines = data.split("\n");
              for (let line of lines) {
                if (line.startsWith(n.toString())) {
                  let index = line.indexOf(":");
                  let repliedMessageID = line.slice(index + 1);
                  return `[>>${n}](https://discord.com/channels/1056948917633286214/1061070266886803586/${repliedMessageID})`;
                }
              }
            }
  
            let numbers = msg
              .match(/>>\d+/g)
              .map((item) => parseInt(item.replace(">>", "")));
            for (let number of numbers) {
              let message_link = function_AC_search(number);
              if (message_link) {
                let regex = new RegExp(`>>${number}`, "g");
                msgA = msg.replace(regex, message_link);
              }
            }
  
            function_AC_send(msgA);
            interaction
              .reply({ content: "送信したよ！", ephemeral: true })
              .then((msg) => {
                setTimeout(() => msg.delete(), 10000);
              });
          }
        } else {
          function_AC_send(msg);
          interaction
            .reply({ content: "送信したよ！", ephemeral: true })
            .then((msg) => {
              setTimeout(() => msg.delete(), 10000);
            });
        }
      } else {
        const modal = new ModalBuilder()
          .setCustomId("ACModal")
          .setTitle("メッセージ送信");
        const hobbiesInput = new TextInputBuilder()
          .setCustomId("sendMessageText")
          .setLabel("送信するメッセージ")
          .setStyle(TextInputStyle.Paragraph);
        const secondActionRow = new ActionRowBuilder().addComponents(
          hobbiesInput
        );
        modal.addComponents(secondActionRow);
        await interaction.showModal(modal);
      }
    }
    if (interaction.customId.startsWith("backupMemberButton")) {
      const type = interaction.customId.split("backupMemberButton")[1];
      if (!type) return;
      const data = await db.get("backupmemberlist", interaction.member.id);
      if (type === "A") {
        if (data === "A") return qe.intembed(interaction, "既に設定済みです。");
        db.set("backupmemberlist", interaction.member.id, "A");
        return qe.intembed(interaction, "設定しました。");
      } else if (type === "B") {
        if (data === "B") return qe.intembed(interaction, "既に設定済みです。");
        db.set("backupmemberlist", interaction.member.id, "B");
        return qe.intembed(interaction, "設定しました。");
      } else if (type === "C") {
        if (!data) return qe.intembed(interaction, "設定されていませんでした");
        db.delete("backupmemberlist", interaction.member.id);
        return qe.intembed(interaction, "設定を解除しました。");
      }
    }
    if (interaction.customId === "ACModal") {
      const msg = interaction.fields.getTextInputValue("sendMessageText");
      function function_AC_send(text) {
        keyv.get("AC_count").then((AC_count) => {
          keyv.get("AC_user_nickname").then((AC_user_nickname) => {
            keyv.get("day_key").then((day_key) => {
              const AC_user_id_sha256 = crypto
                .createHash("sha256")
                .update(interaction.member.id + moment().format("Y/M"))
                .digest("hex");
              let AC_user_id = AC_user_id_sha256.substring(0, 8);
              const exampleEmbed = new EmbedBuilder()
                .setColor(2895667)
                .setTitle(
                  `[${AC_count}] ${
                    AC_user_nickname || "風吹けば名無し"
                  } ID:${AC_user_id}`
                )
                .setDescription(text);
              const webhookClient = new WebhookClient({
                url: "https://discord.com/api/webhooks/1092078302765789254/3GdaX5WnTsYpFQTiAG5wdFrDH9nmsFV9gJN_ZgnuS9emg5Vb6vVtaNVE5UkbMg4Z88pu",
              });
              webhookClient.send({
                embeds: [exampleEmbed],
                username: "匿名chat",
                avatarURL:
                  "https://media.discordapp.net/attachments/1081426145301504143/1092082340555145216/image0.jpg?width=480&height=480",
              });
              keyv.get("AC_count").then((AC_count) => {
                const set_AC_count = Number(AC_count) + 1;
                keyv.set("AC_count", set_AC_count);
                let log = `number: ${AC_count}, userID: ${interaction.member.id}, content: ${text}\n`;
                fs.appendFile("ac_log.txt", log, (err) => {
                  if (err) throw err;
                });
              });
            });
          });
        });
      }
      if (msg.match(/>>\d+/g)) {
        if (msg.match(/>>\d+/g)) {
          function function_AC_search(n) {
            let data = fs.readFileSync("ac_messageID_log.txt", "utf8");
            let lines = data.split("\n");
            for (let line of lines) {
              if (line.startsWith(n.toString())) {
                let index = line.indexOf(":");
                let repliedMessageID = line.slice(index + 1);
                return `[>>${n}](https://discord.com/channels/1056948917633286214/1061070266886803586/${repliedMessageID})`;
              }
            }
          }
          let numbers = msg.match(/>>\d+/g).map((item) => parseInt(item.replace(">>", "")));
          for (let number of numbers) {
            let message_link = function_AC_search(number);
            if (message_link) {
              let regex = new RegExp(`>>${number}`, "g");
              msgA = msg.replace(regex, message_link);
            }
          }
          function_AC_send(msgA);
          interaction
            .reply({ content: "送信したよ！", ephemeral: true })
            .then((msg) => {
              setTimeout(() => msg.delete(), 10000);
            });
        }
      } else {
        function_AC_send(msg);
        interaction
          .reply({ content: "送信したよ！", ephemeral: true })
          .then((msg) => {
            setTimeout(() => msg.delete(), 10000);
          });
      }
      interaction
        .reply({ content: "送信しました", ephemeral: true })
        .then((msg) => {
          setTimeout(() => msg.delete(), 2000);
        });
      return;
    }
    if (interaction.customId === "messageDelete") {
      interaction.message.delete();
    }
  });
  
  client.on("threadCreate", (thread) => {
    console.log(`A new thread has been created: ${thread.name}`);
  });
  
  process.on("uncaughtException", function (err) {
    console.error(err);
  });
  
  //chat傍受
  client.on("messageCreate", async (message) => {
    if (
      message.guild.id === "1040774666794573975" ||
      message.guild.id === "899144844381917254"
    )
      return;
    if (message.guild.id !== "871295203259056208") {
      console.log(
        message.id + " | " + message.guild.id + "\n ↳" + message.content
      );
    }
    if (message.content === prefix + "jgl") {
      if (message.author.id != "777466773955936266") return;
      const guildList = client.guilds.cache.map(
        (guild) => `${guild.name}\n└>${guild.id}`
      );
      message.channel.send(
        `計 \`${client.guilds.cache.size}\` guild` +
          "```fix\n" +
          guildList.join("\n") +
          "```"
      );
      return;
    }
  });
  
  const userMap = new Map();
  
  client.on("messageCreate", (message) => {
    if (message.author.id !== "777466773955936266") return;
    if (userMap.has(message.author.id)) {
      const userData = userMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
  
      if (difference < 1 * 60 * 1000) {
        clearTimeout(timer);
        userData.warns++;
        if (userData.warns > 2) {
          message.channel
            .send({
              content: "<@777466773955936266>勉強しろあほ",
              flags: [4096],
            })
            .then((msg) => {
              setTimeout(() => msg.delete(), 2000);
            });
        } else {
          userMap.set(message.author.id, userData);
        }
      } else {
        clearTimeout(timer);
        userData.warns = 0;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          userMap.delete(message.author.id);
        }, 3000);
        userMap.set(message.author.id, userData);
      }
    } else {
      let fn = setTimeout(() => {
        userMap.delete(message.author.id);
      }, 3000);
      userMap.set(message.author.id, {
        timer: fn,
        lastMessage: message,
        warns: 0,
      });
    }
  });
  
