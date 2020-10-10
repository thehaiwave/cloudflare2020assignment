let myLinks = [{ "name": "Recycling was a Lie", "url": "https://www.cbc.ca/documentaries/the-passionate-eye/recycling-was-a-lie-a-big-lie-to-sell-more-plastic-industry-experts-say-1.5735618"},
              { "name": "On Trust", "url": "https://ncase.me/trust/"},
              { "name": "Donate to The Leukemia & Lymphoma Society", "url": "https://www.lls.org/"}
]

let mySocials = [{ "icon": "https://simpleicons.org/icons/linkedin.svg", "url": "https://www.linkedin.com/in/carlos-britod/"},
              { "icon": "https://simpleicons.org/icons/github.svg", "url": "https://github.com/thehaiwave"}
]

async function handleRequest(request) {
  const lastRoute = request.url.substring(request.url.lastIndexOf('/') + 1)

  if(lastRoute === 'links'){
    return new Response( JSON.stringify(myLinks, null, 2), { headers: { 'Content-Type' : 'application/json' }} )
  }else{
    const site = await fetch( "https://static-links-page.signalnerve.workers.dev", { headers: {"Content-Type": "text/html;charset=UTF-8"}} )
    return thecoolerHTML.transform(site);
  }
}

class LinksTransformer {
  constructor(links) {
    this.links = myLinks
}
  async element(element) {
    this.links.forEach((linkDiv) => {
        element.append(`<a href="${linkDiv.url}">${linkDiv.name}</a>`, { html : true});
    })
  }
}

class SocialsTransformer {
  constructor(socials) {
    this.socials = mySocials
}
  async element(element) {
    this.socials.forEach((socialDiv) => {
        element.append(`<a href="${socialDiv.url}"> <img src="${socialDiv.icon}"/></a>`, { html : true});
    })
  }
}

const thecoolerHTML = new HTMLRewriter()
  .on('div#profile', { element: (element) => {
    element.removeAttribute('style');
  }})
  .on('div#links', new LinksTransformer(myLinks))
  .on('div#social', new SocialsTransformer(mySocials))
  .on('img#avatar', { element: (element) => {
    element.setAttribute('src', 'https://avatars1.githubusercontent.com/u/46984294?s=460&u=23a877e632b7f8af078e1d4bb4ec8b6594d42e71&v=4');
  }})
  .on('h1#name', { element: (element) => {
    element.setInnerContent("Carlos Manuel Brito Díaz");
  }})
  .on('title', { element: (element) => {
    element.setInnerContent("Carlos Brito");
  }})
  .on('body', { element: (element) => {
    element.setAttribute("class", "bg-blue-800");
  }})
  .on('div#social', { element: (element) => {
    element.removeAttribute('style');
  }})

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
