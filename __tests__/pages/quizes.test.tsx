import * as React from 'react'
import { render, RenderResult, screen} from '@testing-library/react'
import Quizes from '../../pages/quizes'
import Router from 'next/router'
import AuthContext from '../../context/auth-context'


//mock loggedIn
document.cookie="loggedIn='true'"

//mock session data
var client = {
    "isLoggedIn": true,
    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWM4MzQwNjM5NjNhNzhmNjdkOGFjMCIsImlhdCI6MTYyMTkxODUyOCwiZXhwIjoxNjI0NTEwNTI4fQ.b8SYziy4BNYPPVMY8XgG2RWBNXjawH_W_3JtUdqTzBiA40ZB8pkV0k7Ixz6sPbQXGXJpekuB4-vxUjNw6d9nQQ",
    "data": {
        "user_id": "6062f8121fb7c061f581822e",
        "name": "Kingsbury international",
        "email": "alphaxsalt@gmail.com",
        "phone_number": "233503995846",
        "image": "https://ananse-temporary.s3.us-east-2.amazonaws.com/school_logo/Kingsbury_international/Kingsbury_international_1617173442376.jpg",
        "role": "School"
    }
}

//mock state
const mockState = {
    isLoggedIn: true,
    token: client.token,
    data: {
      user_id: client.data.user_id,
      name: client.data.name,
      email: client.data.email,
      phone_number: client.data.phone_number,
      image: client.data.image,
      role: client.data.role
    }
}

//mock router
jest.mock('next/router', ()=> ({push: jest.fn()}))

const renderQuizPage = () => {
  const utils: RenderResult = render(<AuthContext.Provider value={{ GLOBAL_OBJ: mockState, AUTH_LOGIN: () => mockState, AUTH_LOGOUT: () => mockState }}><Quizes /></AuthContext.Provider>);
  return utils
}


describe('<Quizes />', () => {
  test('should render without crashing', async () => {
      const {container} = renderQuizPage()
      expect(container).toBeTruthy()
  })
  test('should have a title quiz in the page', async () => {
      //to validate that page is displayed
    const {getByText} = renderQuizPage()
    expect(getByText('Quiz')).toBeInTheDocument()
  })
  test('auth navigation to login should not be called', async () => {
    expect(Router.push).not.toHaveBeenCalled()
  })
  
})
