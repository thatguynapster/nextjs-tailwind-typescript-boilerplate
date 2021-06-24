import { ReactNode, Dispatch, SetStateAction } from 'react'

export interface IHeaderProps {
  title: string
  canonical?: string
}

export interface ICropper {
  callback: () => void
  aspectRatio: number
  src: string | null
  status: boolean
  setDisplay: Dispatch<SetStateAction<boolean>>
  setCropResult: Dispatch<SetStateAction<any>>
}

export interface ILayoutProps {
  pagename: string
  children: ReactNode
  userDetails?: any
}



export interface ILoginCardProps {
  userRole: string
  userDetails: string
  pageLink: string
  imageSrc?: string
}

export interface IHomeCardProps {
  cardTitle: string
  cardDetails: string
  page: string
}

export interface IUserProps {
  name?: string
  image?: string
}

export interface ITableProps {
  theaders: Array<string>
  children: ReactNode
}

export interface IUploadPictureComponentProps {
  imageSrc?: string
  onAdd?: Dispatch<SetStateAction<boolean>>
  readOnly?: boolean
  callback: (image: any) => void
}

export interface IFormTextInput {
  label: string
  placeholder: string
  name: string
  type?: string
  defaultValue?: string
  onInputChange: (name: string, value: string) => void
  readOnly?: boolean
}

export interface IFormSelectInput {
  label?: string
  placeholder?: string
  name: string
  type?: string
  defaultValue?: string
  options: {
    value: string
    label: string
  }[]
  onInputChange: (name: string, value: string) => void
  onMenuScrollToBottom?: (name: string) => void
}

export interface IAutocompleteInput {
  label: string
  placeholder: string
  name: string
  defaultValue?: string
  onLocationChange: (value: {
    latitude: number
    longitude: number
    name: string
    country: string
    country_code: string
  }) => void
}

export interface IUserData {
  user_id?: string
  name?: string
  email?: string
  phone_number?: string
  image?: string
  role?: string
}

export interface IAuthState {
  isLoggedIn?: boolean
  token?: string
  data: any
  rememberMe?: boolean
}

export interface IAuthPayload {
  isLoggedIn?: boolean
  token?: string
  data: any
  rememberMe?: boolean
}

export interface IAuthAction {
  type: string
  payload?: IAuthPayload
}

export interface IAuth {
  GLOBAL_OBJ: IAuthState
  AUTH_LOGIN?: (payload: IAuthPayload) => Dispatch<IAuthState>
  AUTH_LOGOUT?: () => Dispatch<IAuthState>
}

export interface ISchool {
  id: string
  name: string
  email: string
  phone_number: string
  location: string
  head_name: string
  logo: string
}

export interface INewSchool {
  name: string
  email: string
  phone_number: string
  location: {
    latitude: number
    longitude: number
    name: string
    country: string
    country_code: string
  }
  password: string
  school_logo: any
}

export interface ISearchInput {
  keyword: string
  placeholder?: string
  setter: Dispatch<SetStateAction<string>>
  searchHandler: (keyword: string) => Promise<void>
  changeHandler: (value: string) => void
}

export interface IContext {
  deleteCallback: () => void
  editPath: string
}

export interface IParent {
  id: string
  name: string
  email: string
  phone_number: string
  profile_picture: string
}

export interface INewParent {
  full_name: string
  email: string
  phone_number: string
  password: string
  profile_picture: string
  school_id?: string
}

export interface IStudent {
  id: string
  student_number: string
  first_name: string
  last_name: string
  middle_initial: string
  age: string
  email: string
  phone_number: string
  school_id: string
  school_name: string
  class: string
  parent: string
  subscription: string
  profile_picture: string
}

export interface INewStudent {
  first_name: string
  last_name: string
  middle_initial: string
  age: string
  email: string
  phone_number: string
  school_id: string
  school_name: string
  class: string
  parent: string
  subscription: string
  password: string
  profile_picture: string
}

export interface IStaff {
  id: string
  name: string
  first_name: string
  last_name: string
  middle_initial: string
  email: string
  phone_number: string
  profile_picture: string
  role: string
  school_id: string
  school_name: string
}

export interface INewStaff {
  name: string
  first_name: string
  last_name: string
  middle_initial: string
  email: string
  phone_number: string
  password: string
  profile_picture: string
  role: string
  school_id: string
}

export interface IAdmin {
  id: string
  name: string
  email: string
  phone_number: string
  profile_picture: string
  role: string
}

export interface INewAdmin {
  name: string
  email: string
  phone_number: string
  password: string
  profile_picture: string
  role: string
}

export interface ISelectDropdown {
  selectTitle: string
  callback: (option: string) => void
  children: ReactNode
}

export interface IGroup {
  id: string
  name: string
  members: any[]
  conversation_id: string[]
  school_id: string
  school_name?: string
}

export interface IConversations {
  id: string
  name?: string
  moderators: any[]
  participants: any[]
  members?: any[]
}

// export interface IConversations {
//   id: string
//   moderators: [{
//     _id: string
//     full_name: string
//     email: string
//     phone_number: string
//     image: string
//     role: string
//   }] | any[]
//   participants: [{
//     _id: string
//     full_name: string
//     email: string
//     phone_number: string
//     image: string
//     role: string
//   }] | [],
//   school_id?: string
// }

// export interface IGroupCard {
//   id: string
//   name: string
//   members: string[]
//   conversation_id: string[]
//   school_id: string
//   cardTitle: string
//   cardDetails: string
//   page: string
// }

export interface ITableProps {
  theaders: Array<string>
  children: ReactNode
}

export interface IUploadPictureComponentProps {
  imageSrc?: string
  onAdd?: Dispatch<SetStateAction<boolean>>
  readOnly?: boolean
  callback: (image: any) => void
}

export interface IFormTextInput {
  label: string
  placeholder: string
  name: string
  type?: string
  defaultValue?: string
  onInputChange: (name: string, value: string) => void
}

export interface IFormSelectInput {
  label?: string
  placeholder?: string
  name: string
  type?: string
  defaultValue?: string
  options: {
    value: string
    label: string
  }[]
  onInputChange: (name: string, value: string) => void
}

export interface IPhoneNumber {
  defaultValue?: string
  onInputChange: (phone: string) => void
  inputClass?: string
  containerClass?: string
  placeholder?: string
}

export interface IAutocompleteInput {
  label: string
  placeholder: string
  name: string
  defaultValue?: string
  onLocationChange: (value: {
    latitude: number
    longitude: number
    name: string
    country: string
    country_code: string
  }) => void
}

export interface IHeaderProps {
  title: string
}

export interface ILayoutProps {
  pagename: string
  children: ReactNode
}

export interface IAuthState {
  isLoggedIn?: boolean
  token?: string
  data: any
}

export interface IAuthPayload {
  isLoggedIn?: boolean
  token?: string
}

export interface IAuthAction {
  type: string
  payload?: IAuthPayload
}

export interface IAuth {
  GLOBAL_OBJ: IAuthState
  AUTH_LOGIN?: (payload: IAuthPayload) => Dispatch<IAuthState>
  AUTH_LOGOUT?: () => Dispatch<IAuthState>
}

export interface ISchool {
  id: string
  name: string
  email: string
  phone_number: string
  location: string
  head_name: string
  logo: string
}

export interface INewSchool {
  name: string
  email: string
  phone_number: string
  location: {
    latitude: number
    longitude: number
    name: string
    country: string
    country_code: string
  }
  password: string
  school_logo: any
}

export interface ISearchInput {
  keyword: string
  placeholder?: string
  setter: Dispatch<SetStateAction<string>>
  searchHandler: (keyword: string) => Promise<void>
  changeHandler: (value: string) => void
}

export interface IContext {
  deleteCallback: () => void
  editPath: string
}

export interface IParent {
  id: string
  name: string
  email: string
  phone_number: string
  profile_picture: string
}

export interface INewParent {
  full_name: string
  email: string
  phone_number: string
  password: string
  profile_picture: string
}

export interface IStaff {
  id: string
  name: string
  email: string
  phone_number: string
  profile_picture: string
  role: string
  school_id: string
  school_name: string
}

export interface INewStaff {
  name: string
  email: string
  phone_number: string
  password: string
  profile_picture: string
  role: string
  school_id: string
}

export interface IAdmin {
  id: string
  name: string
  email: string
  phone_number: string
  profile_picture: string
  role: string
}

export interface INewAdmin {
  name: string
  email: string
  phone_number: string
  password: string
  profile_picture: string
  role: string
}

export interface ISelectDropdown {
  selectTitle: string
  callback: (option: string) => void
  children: ReactNode
}

export interface IGroup {
  id: string
  name: string
  members: any[]
  conversation_id: string[]
  school_id: string
}

export interface IGroupCard {
  id: string
  name: string
  members: string[]
  conversation_id: string[]
  school_id: string
  school_name?: string
  deleteCallback: (id: string, name: string) => void
}

export interface ISubscriber {
  id: string
  school_id: string
  school_image: string
  school_name: string
  phone: string
  subscription_id: string
  subscription_name: string
  start_date: number
  end_date: number
  renew?: boolean
  payment_status: string
  payment_link?: string | ''
}

export interface ISubcription {
  id: string
  name: string
  description: string
  duration: number
  price: number
  active: boolean
  timestamp: number
}

export interface ISchoolSubcriptions {
  id: string
  subscription_id: string
  name: string
  description: string
  duration: number
  price: number
  active: boolean
  timestamp: number
}

export interface IQuiz {
  id: string
  title: string
  description: string
  response: number
  deadline: number
  timestamp: number
  delete?: boolean
  publish?: boolean
  group_id?: string
  school_id?: string
  school_name?: string
  completed?: boolean
}

export interface IQuizReport {
  id: string
  quiz_title: string
  student_name: string
  student_image: string
  score: number
  date: number
}

export interface IStudentQuizReport {
  id: string
  date: number
  score: number
  quiz: string
}

export interface IQuizQuestion {
  id?: string
  position: number
  question: string
  options: {
    id?: string
    position: number
    is_answer: number
    value: string
  }[]
  answer?: number
  delete?: boolean
}

export interface IQuizQuestionOption {
  position: number
  value: string
  is_answer: boolean
}

export interface IQuizQuestionRadio {
  option: IQuizQuestionOption
  callback: (option: IQuizQuestionOption) => void
}

export interface IQuizQuestionCard {
  question: IQuizQuestion
  quizId: string
  role: string
  callback: (question: IQuizQuestion) => void
}

export interface IRanking {
  id: string
  position: number
  student: {
    name: string
    image: string
  }
  score: number
}
