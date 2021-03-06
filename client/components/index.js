/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as LandingPage} from './landing-page'
export {default as EditPage} from './edit-page/edit-page'
export {default as PhotoCapture} from './photo-capture'
export {default as Contact} from './contact'
export {default as Tips} from './tips'
