const express = require('express')
const nunjucks = require('nunjucks') //template engine

const server = express()
/** arquivo com os dados dos videos */
const videos = require("./data")

server.set("view engine", "njk")

/** usar arquivos estáticos */
server.use(express.static('public'))

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

/** rotas */
server.get("/", function (req, res) {
  /** Dados da página about */
  const about = {
    avatar_url: "https://avatars1.githubusercontent.com/u/54278346?s=460&u=c45e7ba9846086a3e9371899d0a8427aa8a510d4&v=4",
    name: "Jefferson Vidal",
    role: "CEO da VIDALCORP Solutions",
    description: 'Programador fullstack, focado em trazer o melhor ensino para iniciantes em programação. Colaborador da <a href="" target="_blank" > VIDALCORP</a>.',
    links: [
      { name: "Github", url: "https://github.com/jeffersonvidal" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/jeffersonvidal" }
    ]
  }
  return res.render("about", { about })
})

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos })
})

server.get("/video", function (req, res) {
  const id = req.query.id
  const video = videos.find(function (video) {
    return video.id == id
  })

  if (!video) {
    return res.send("Video not found!")
  }

  return res.render("video", { item: video })
})

/**  */
server.listen(5000, function () {
  console.log("server running")
})