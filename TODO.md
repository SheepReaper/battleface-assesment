# Unfinished work

Ran out of time trying to get swagger-ui:
  1. Working _and_
  2. proxied through the app

It may be simpler to have an endpoint that just returns the swagger.json, and find something for Angular to render the UI on the client instead.

Per the Requirement/Challenge doc. They wanted the response to the POST /quotation to be a certain schema. I assure you, It's fully compliant (check in dev-tools) but the app is set up to redirect back to the list of Quotes after creating a new one so you never get to see it.

Upon request, I can re-do this project in my preferred frameworks: 
- .NET 5 (api server) + Vue front-end
- Or do the whole thing in Nuxt (express)
- Or maybe even python api server + Vue

I guess it really just comes down to which styling frameworks are supported by which JavaScript framewroks.

In this order:
1. Vuetify
2. Bulma
3. Bootstrap