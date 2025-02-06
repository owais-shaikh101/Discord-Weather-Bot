require("dotenv").config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const key = process.env.WEATHER_API_KEY;
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Tells the current weather of a city")
    .addStringOption((option) =>
      option.setName("city").setDescription("Enter the name of a city")
    ),
  async execute(interaction) {
    let city = interaction.options.getString("city");
    if (city) {
      city = city.charAt(0).toUpperCase() + city.slice(1);
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
        )
        .then(function (response) {
          // handle success
          console.log(response.data);
          const weatherEmbed = {
            color: 0x0099ff,
            title: "The Weather Bot",
            url: "https://discord.js.org",
            author: {
              name: "Bot",
              icon_url: "https://i.imgur.com/AfFp7pu.png",
              url: "https://discord.js.org",
            },
            description:
              "Shows the current weather information for the selected city",
            thumbnail: {
              url: "https://i.imgur.com/AfFp7pu.png",
            },
            fields: [
              {
                name: "City",
                value: response.data.location.name,
              },
              {
                name: "Region",
                value: response.data.location.region,
              },
              {
                name: "Country",
                value: response.data.location.country,
              },
              {
                name: "\u200b",
                value: "\u200b",
                inline: false,
              },
              {
                name: "Temperature",
                value: `${response.data.current.temp_c} °C`,
                inline: true,
              },
              {
                name: "Condition",
                value: response.data.current.condition.text,
                inline: true,
              },
              {
                name: "Wind Speed",
                value: `${response.data.current.wind_kph} km/h`,
                inline: true,
              },
              {
                name: "Pressure",
                value: `${response.data.current.pressure_mb} mb`,
                inline: true,
              },
              {
                name: "Dew Point",
                value: `${response.data.current.dewpoint_c} °C`,
                inline: true,
              },
              {
                name: "Precipitation",
                value: `${response.data.current.precip_mm} mm`,
                inline: true,
              },
              {
                name: "Humidity",
                value: `${response.data.current.humidity}%`,
                inline: true,
              },
              {
                name: "Cloud Cover",
                value: `${response.data.current.cloud}%`,
                inline: true,
              },
              {
                name: "UV Index",
                value: response.data.current.uv,
                inline: true,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "Weather Information",
              icon_url: "https://i.imgur.com/AfFp7pu.png",
            },
          };
          interaction.reply({ embeds: [weatherEmbed] });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          interaction.reply("Invalid city name provided, please try again");
        });
    } else {
      await interaction.reply("No city name provided, please try again");
    }
  },
};
