## This folder contains the router for the Registration

New components routes are added in the `routes` folder.

You will need to add a `<StepRoute />` in the `Registration.router.tsx` You will also need to add the route to the type
`nextRouterPath` You will also define it in `routeToStep`
Also before pushing to next route you will need to dispatch a SET_NEXT_ROUTE action.
