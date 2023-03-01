import { NotfoundPage } from '../pages/400/400'
import { ServerErrorPage } from '../pages/500/500'
import { HomePage } from '../pages/home/home'
import { ProfilePage } from '../pages/profile/profile'
import { SigninPage } from '../pages/signin/signin'
import { SignupPage } from '../pages/signup/signup'

interface Routes {
  [key: string]: any
}

export const routes: Routes = {
  home: () => new HomePage({state: 'selected'}),
  profile: () => new ProfilePage(),
  signin: () => new SigninPage(),
  signup: () => new SignupPage(),
  not_found: () => new NotfoundPage(),
  server_error: () => new ServerErrorPage(),
  empty: () => new HomePage({state: 'empty'})
}
