Besides the technologies I use, look at the part about 
test-utils, including example to mock with router and store, which was kind of tricky.

## Typescript

Typescript for type safety and self-documenting code.

## Formik

I use formik and yup (for validation) for forms. 
Its standardized and relatively easy to use.
I've been building a lot of forms with React and its always a headache especially
if you do it yourself.
My developer experience with Formik is good.

## Redux toolkit

This is the officially opinionated way to use React-Redux. 
I think it married very well with typescript and 
stuff just works out of the box, for example dev-tools for redux.

## React-Redux hooks

I use the React-Redux hooks. 
I think its nice being able to just drop in dispatch and selector like this:

useDispatch();
useTypedSelector()

On the other hand I had some problems testing it (which i solved)

#Testing with jest and testing library

The philsophy of testing-library is, test as like ur the user, not the internal logic of things.
That's sounds reasonable.

## Eslint and prettier

Use both, no comments.

## Test-utils

Test utils contains two functions 

`function renderWithProvider`

Which lets you render a Provider with the real store.

`function renderWithProviderWithMockStore`

Which lets you render a Provider with the a mockStore in case you want to listen
to for example dispatch, like this.

`expect(mockStore.dispatch).toBeCalledWith({ type: 'SET_FINISHED_FORM', payload });`

## Mock Router

Mocking the router to listen to history.push was kind of tricky. 
This is how you do it.

`const mockHistoryPush = jest.fn();`

`jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));`

Then you listen to it like this 

`expect(mockHistory.push).toHaveBeenCalledWith('./privacy');`

## End-to-End testing?

Its always a good idea. But maybe next time ;)