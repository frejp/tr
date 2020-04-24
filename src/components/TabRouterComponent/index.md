## This components handles tabs in the interface

A tab contains a object like this `{ text: 'form', routerPath: 'form' }` This components should be wrapped in a router
component see example: `Registration.router`

A route like this in the router: `<Route component={RegistrationForm} path='/registration/form' />`

Corresponds to an object like this in the TabRouterComponent `{ text: 'form', routerPath: 'form' }
