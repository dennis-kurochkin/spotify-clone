import { validateRoute } from '~/helpers/auth'

export default validateRoute((req, res, user) => {
  res.json(user)
})
