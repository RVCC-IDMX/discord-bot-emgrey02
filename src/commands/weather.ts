import { Message, MessageEmbed } from 'discord.js';
import 'dotenv/config';
import fetch from 'node-fetch';
import moment from 'moment';

export default {
  callback: (message: Message, ...args: string[]) => {
    const apiKey = process.env.KEY;
    const city = args[0];

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const city = data.name;
        const currentTemp = data.main.temp;
        const feelTemp = data.main.feels_like;
        const humidity = data.main.humidity;
        const description: string = data.weather[0].description;
        const low = data.main.temp_min;
        const high = data.main.temp_max;
        const timezone = data.timezone;
        const sunrise = moment
          .unix(data.sys.sunrise + timezone)
          .utc()
          .format('h:mm a');
        const sunset = moment
          .unix(data.sys.sunset + timezone)
          .utc()
          .format('h:mm a');
        const country = data.sys.country;
        const icon: string = data.weather[0].icon;

        const weatherReport = new MessageEmbed()
          .setTitle(`Current Weather In ${city}, ${country}`)
          .setColor(`DARK_AQUA`)
          .setDescription(`${currentTemp.toFixed()}°F with ${description}`)
          .setThumbnail(`http://openweathermap.org/img/wn/${icon}@2x.png`)
          .addField(`Low`, `${low.toFixed()}°F`, true)
          .addField(`High`, `${high.toFixed()}°F`, true)
          .addField('\u200B', '\u200B')
          .addField('Real Feel', `${feelTemp.toFixed()}°F`, true)
          .addField(`Humidity`, `${humidity}%`, true)
          .addField('\u200B', '\u200B')
          .addField(`Sunrise`, `${sunrise}`, true)
          .addField('Sunset', `${sunset}`, true);

        message.channel
          .send({ embeds: [weatherReport] })
          .then(() => {
            console.log('success');
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        message.reply(`sorry, I can't find that city...`);
        console.error(err);
      });
  },
};
