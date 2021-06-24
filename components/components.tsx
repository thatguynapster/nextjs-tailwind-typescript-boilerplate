import Link from 'next/link'
import Loader from 'react-loader'
import React, { ChangeEvent, FC, ReactNode, useContext, useEffect, useState, useRef } from 'react'
import {
  IFormTextInput,
  IHomeCardProps,
  ILoginCardProps,
  ITableProps,
  IUploadPictureComponentProps,
  ISearchInput,
  IAutocompleteInput,
  IContext,
  ISelectDropdown,
  IFormSelectInput,
  IPhoneNumber,
  IGroupCard,
  IQuizQuestionCard,
  IQuizQuestionOption,
  IQuizQuestionRadio,
  IAuth,
  IUserProps,
  IConversations,
  IQuizQuestion
} from '../types'
import { Autocomplete, LoadScriptNext } from '@react-google-maps/api'
import { toast } from 'react-toastify'
import Cropper from './cropper'
import Select from 'react-select'
import API from '../lib/api'
import { navigate } from '../lib'
import AuthContext from '../context/auth-context'
import { users } from '../configs/global_variables'
import Img from 'react-cool-img'
import PhoneInput from 'react-phone-input-2'

/** Navbar component */
export const Navbar: FC<IUserProps> = ({ name, image }) => {
  const [selectedId, setSelectedId] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const { GLOBAL_OBJ, AUTH_LOGOUT } = useContext(AuthContext)

  useEffect(() => {
    !GLOBAL_OBJ?.isLoggedIn && navigate('./')
  }, [GLOBAL_OBJ])

  return (
    <nav className="py-2 px-1 fixed flex flex-row items-center w-full bg-white">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <div>{/*<img src={image} style={{width: '52px'}} />*/}</div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <small className="font-bold">{name}</small>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              borderRadius: '50%',
              marginLeft: '1em'
            }}
            onClick={() => setShow(!show)}
          ></div>
          {show ? (
            <ProfileContextMenu>
              <div className="py-1" role="none">
                <Link href={`/profile`}>
                  <p
                    className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    View Profile
                  </p>
                </Link>

                <p
                  className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  style={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    AUTH_LOGOUT()
                    // navigate('./index-new')
                  }}
                >
                  Logout
                </p>
              </div>
            </ProfileContextMenu>
          ) : (
            ' '
          )}
        </div>
      </div>
    </nav>
  )
}

/** Divider component */
export const DividerComponent: FC = () => <div className="border-b-2 my-5"></div>

/** Home Card Component */
export const HomeCard: FC<IHomeCardProps> = ({ cardTitle, cardDetails, page }) => (
  <div className="w-auto cursor-pointer">
    <Link href={`/${page}`}>
      <div
        style={{
          padding: '21px 24px',
          minHeight: '130px',
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E5E5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'static'
        }}
      >
        <p style={{ color: '#6A6A6A' }}>{cardTitle}</p>
        <h3 className="text-2xl" style={{ fontWeight: 'bold' }}>
          {cardDetails}
        </h3>
      </div>
    </Link>
  </div>
)

/** Login Card Component */
export const LoginCard: FC<ILoginCardProps> = ({ userRole, userDetails, pageLink, imageSrc }) => (
  <div className="w-auto cursor-pointer">
    <div
      className="text-center"
      style={{
        padding: '21px 24px',
        minHeight: '130px',
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E5E5E5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'static'
      }}
    >
      <div
        className="bg-grey-500 rounded-lg"
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img src={imageSrc} alt={userRole} />
      </div>
      <p style={{ fontWeight: 'bold', color: '#000000' }}>{userRole}</p>
      <span className="mt-2" style={{ color: '#6A6A6A' }}>
        {userDetails}
      </span>
      <Link href={`${pageLink}`}>
        <button className="mt-5 bg-green-700 text-white py-1 px-2 rounded-lg">Access</button>
      </Link>
    </div>
  </div>
)

/** Table Component */
export const Table: FC<ITableProps> = ({ theaders, children }) => {
  return (
    // <div className="w-auto">
    //   <div className="bg-white shadow-md rounded-xl my-6 overflow-auto">
    <table className="min-w-max w-full table-auto bg-white rounded-xl">
      <thead className="break-words whitespace-normal">
        <tr className="text-gray-600 capitalize text-sm leading-normal border-b-2 break-words whitespace-normal">
          {theaders?.map((header, i) => (
            <th key={i} className="py-3 px-6 text-left">
              {' '}
              {header}{' '}
            </th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
    //   </div>
    // </div>
  )
}

/** Upload picture component */
export const UploadPictureComponent: FC<IUploadPictureComponentProps> = ({
  imageSrc,
  onAdd,
  readOnly,
  callback
}) => {
  const [showCropperModal, setCropperModal] = useState<boolean>(false)
  const [imageSource, setImageSource] = useState<string | null | any>(null)
  //const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>(null)
  const [uploadBtn, setUploadBtn] = useState('Upload')

  /** on image upload */
  const image_upload = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files && Array.from(e.target.files)
    setUploadBtn('Please wait...')
    let reader = new FileReader()
    reader.onloadend = () => {
      setImageSource(reader.result)
      after_image_upload(reader.result)
      callback(reader.result)
    }
    if (files) {
      reader.readAsDataURL(files[0])
      files = null
    }
    setUploadBtn('Upload')
  }

  /** after uploading image */
  const after_image_upload = (image: string | ArrayBuffer | null) => {
    setImageSource(image)
    setCropperModal(true)
  }

  /** cropping callback */
  const after_cropping = () => {
    setCropperModal(false)
  }

  useEffect(() => {
    // console.log(imageSrc)
    setImageSource(imageSrc as string)

    return () => {
      setImageSource(null)
    }
  }, [imageSrc])

  return (
    <>
      {imageSource ? (
        <div className="w-full">
          <img src={imageSource} className="w-full rounded-xl" />
        </div>
      ) : (
        <div className="w-full bg-white">
          <div
            className="text-center w-full flex flex-row justify-center items-center cursor-pointer"
            style={{ height: '20em' }}
          >
            <label htmlFor="single" className="cursor-pointer">
              <img src={'/assets/img/add.svg'} className="mx-auto rounded-xl" />
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-row justify-between mt-3 gap-3">
        <button className="w-full py-1 px-3 bg-green-600 hover:bg-green-700 rounded-md text-white text-center">
          <label htmlFor="single" className="cursor-pointer">
            {' '}
            <span>{uploadBtn}</span>
          </label>
        </button>

        <input
          type="file"
          id="single"
          style={{ display: 'none' }}
          onChange={(e) => image_upload(e)}
        />

        {/*<button
          onClick={() => setImageSource(null)}
          className="w-1/2 py-1 px-3 bg-white border border-green-600 rounded-md text-green-600 text-center"
        >
          <span>Remove</span>
        </button>*/}
      </div>

      <Cropper
        status={showCropperModal}
        aspectRatio={1}
        src={imageSource}
        setDisplay={setCropperModal}
        setCropResult={setImageSource}
        callback={after_cropping}
      />
    </>
  )
}

/** Form Text Input */
export const FormTextInput: FC<IFormTextInput> = ({
  label,
  type,
  name,
  defaultValue,
  onInputChange,
  placeholder,
  readOnly
}) => {
  if (readOnly) {
    return (
      <div className="mb-3">
        <div className="text-md">{label}</div>
        <input
          type={type || 'text'}
          style={{ background: '#8080806b', cursor: 'default' }}
          className="appearance-none px-2 py-1 w-full rounded border-2"
          name={name}
          onChange={(e) => onInputChange(name, e.target.value)}
          defaultValue={defaultValue || ''}
          autoComplete="off"
          placeholder={placeholder}
          readOnly
        />
      </div>
    )
  } else {
    return (
      <div className="mb-3">
        <div className="text-md">{label}</div>
        <input
          type={type || 'text'}
          className="appearance-none px-2 py-1 w-full rounded border-2"
          name={name}
          onChange={(e) => onInputChange(name, e.target.value)}
          defaultValue={defaultValue || ''}
          autoComplete="off"
          placeholder={placeholder}
        />
      </div>
    )
  }
}

/** Select input with text search */
export const TextSearchInput: FC<IFormSelectInput> = ({
  label,
  placeholder,
  type,
  defaultValue,
  name,
  options,
  onInputChange,
  onMenuScrollToBottom
}) => {
  // console.log(defaultValue)

  return (
    <div className="mb-3">
      <div className="text-md">{label}</div>
      <Select
        options={options}
        defaultInputValue={defaultValue}
        placeholder={placeholder || 'Search'}
        onChange={(opt) => onInputChange(name, opt?.value || '')}
        onMenuScrollToBottom={(opt) => {
          if (onMenuScrollToBottom) onMenuScrollToBottom(name)
        }}
      />
    </div>
  )
}

/** Autocomplete Input */
export const AutocompleteInput: FC<IAutocompleteInput> = ({
  label,
  placeholder,
  name,
  defaultValue,
  onLocationChange
}) => {
  type locationType = {
    country: string
    country_code: string
  }

  const [autocomplete, setAutocomplete] = useState<any>(null)
  const [location, setLocation] = useState<locationType>({
    country: 'Ghana',
    country_code: 'GH'
  })

  function onLoad(autocomplete: any) {
    setAutocomplete(autocomplete)
  }

  function onPlaceChange() {
    let locationInfo: locationType
    if (autocomplete !== null) {
      // console.log(autocomplete.getPlace())
      let place_data = autocomplete.getPlace()

      let data = {
        latitude: place_data.geometry.location.lat(),
        longitude: place_data.geometry.location.lng(),
        name: place_data.formatted_address,
        country: location.country,
        country_code: location.country_code
      }
      /** get country and country code */
      for (let ac = 0; ac < place_data.address_components.length; ac++) {
        let component = place_data.address_components[ac]
        // console.log('component', component)
        switch (component.types[0]) {
          case 'country':
            locationInfo = {
              country: component?.long_name,
              country_code: component?.short_name
            }

            data.country = locationInfo.country
            data.country_code = locationInfo.country_code

            setLocation(locationInfo)
            break
          default:
            break
        }
      }

      // console.log(data)
      /** handle location change */
      onLocationChange(data)
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}
      libraries={['places']}
    >
      <div className="mb-3">
        <div className="text-md">{label}</div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
          <input
            defaultValue={defaultValue}
            className="px-2 py-1 w-full rounded border-2"
            type="text"
            name={name}
            placeholder={placeholder}
          />
        </Autocomplete>
      </div>
    </LoadScriptNext>
  )
}

/**Phone Number Input**/
export const PhoneNumberInput: FC<IPhoneNumber> = ({
  defaultValue,
  onInputChange,
  inputClass,
  containerClass,
  placeholder
}) => {
  return (
    <PhoneInput
      country={'gh'}
      placeholder={placeholder}
      value={defaultValue}
      onChange={(phone) => onInputChange(phone)}
      inputClass={inputClass}
      containerClass={containerClass}
      inputStyle={{ width: '100%' }}
    />
  )
}

/** Modal */
export const Modal: FC<ReactNode> = ({ children }) => {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

/** Search Input */
export const SearchInput: FC<ISearchInput> = ({
  keyword,
  placeholder,
  setter,
  changeHandler,
  searchHandler
}) => {
  return (
    <div className="mb-3 w-full bg-white rounded-md flex flex-row justify-between items-center">
      <input
        className="appearance-none rounded-md px-2 py-1 mr-2 w-3/4"
        placeholder={placeholder}
        type="text"
        value={keyword}
        onChange={(e) => {
          setter(e.target.value)
          changeHandler(e.target.value)
        }}
      />
      <span className="w-1/4 text-center" onClick={() => searchHandler(keyword)}>
        <i className="fa fa-search cursor-pointer"></i>
      </span>
    </div>
  )
}

/** Context menu */
export const ContextMenu: FC<ReactNode> = ({ children }) => {
  return (
    <div
      className="text-left origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
      role="menu"
      style={{ top: '20px', right: '5px' }}
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      {children}
    </div>
  )
}

export const ProfileContextMenu: FC<ReactNode> = ({ children }) => {
  return (
    <div
      className="text-right origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
      role="menu"
      style={{ top: '40px', right: '5px' }}
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      {children}
    </div>
  )
}

/** Select dropdown */
export const SelectDropdown: FC<ISelectDropdown> = ({ selectTitle, callback, children }) => {
  const [toggle, setToggle] = useState<boolean>(false)

  useEffect(() => {
    setToggle(false)
  }, [selectTitle])
  return (
    <div className="relative inline-block text-left mr-2">
      <div>
        <button
          onClick={() => setToggle(!toggle)}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {selectTitle}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {toggle && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {children}
        </div>
      )}
    </div>
  )
}

/** Group card */
export const GroupCard: FC<IGroupCard> = ({
  id,
  name,
  members,
  conversation_id,
  school_id,
  school_name,
  deleteCallback
}) => {
  const { GLOBAL_OBJ, AUTH_LOGOUT } = useContext(AuthContext)
  console.log(GLOBAL_OBJ.data?.role)
  return (
    <div key={id} className="w-auto cursor-pointer">
      <div className="px-5 py-5 min-h-30 bg-white flex flex-row justify-between items-start static rounded-md">
        <Link href={`conversation?cid=${conversation_id}&id=${id}&sourcePage=groups&name=${name}`}>
          <div>
            <div className="flex flex-col w-full">
              <div>
                <p className="text-base" style={{ color: '#ABABAB' }}>
                  Board Name
                </p>
                <h3 className="text-2xl" style={{ fontWeight: 'bold' }}>
                  {name}
                </h3>
                {GLOBAL_OBJ.data.role == users.admin ? (
                  <p className="text-base" style={{ color: '#ABABAB' }}>
                    {school_name}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>

            <p className="mt-5 w-full text-base" style={{ color: '#ABABAB' }}>
              Members
            </p>
            <div className="flex w-full mt-2 overflow-hidden" style={{ minHeight: '2em' }}>
              {members.map((member, index) => {
                return (
                  <Img
                    key={index}
                    className="w-10 h-10 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                    src={member}
                  />
                )
              })}
            </div>
          </div>
        </Link>
        {GLOBAL_OBJ.data?.role === users.admin ||
        GLOBAL_OBJ.data?.role === users.school ||
        GLOBAL_OBJ.data?.role === users.school ? (
          <div
            className="text-red-600"
            onClick={() => {
              deleteCallback(id, name)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

/** Group card */
export const ConversationCard: FC<IConversations> = ({
  id,
  name,
  moderators,
  participants,
  members
}) => (
  <div key={id} className="w-auto cursor-pointer">
    <Link href={`conversation?cid=${id}&id=${id}&sourcePage=conversations&name=${name}`}>
      <div
        className="px-5 py-5 min-h-30 bg-white flex flex-col justify-between items-start static rounded-md"
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-row w-full justify-between items-center">
          <div>
            {/*<p className="text-base" style={{ color: '#ABABAB' }}>
              Chat Name
            </p>*/}
            <h3 className="text-2xl" style={{ fontWeight: 'bold' }}>
              {name}
            </h3>
          </div>
        </div>

        <p className="mt-5 w-full text-base" style={{ color: '#ABABAB' }}>
          Members
        </p>
        <div className="flex w-full mt-2" style={{ minHeight: '2em' }}>
          {members &&
            members.map((member, index) => {
              return (
                <Img
                  key={index}
                  className="w-10 h-10 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                  src={member}
                />
              )
            })}
        </div>
      </div>
    </Link>
  </div>
)

export const QuizQuestionCard: FC<IQuizQuestionCard> = ({ question, quizId, role, callback }) => {
  // console.log(question)
  const { GLOBAL_OBJ, AUTH_LOGOUT } = useContext<IAuth>(AuthContext)

  const [questionText, setQuestionText] = useState<string>(question.question)
  const [currentOption, setCurrentOption] = useState<IQuizQuestionOption | null>(null)
  const [optionsUpdated, setOptionsUpdated] = useState<boolean>(false)
  const [questionOptions, setQuestionOptions] = useState<Array<any>>(question.options)
  const [correctAnswer, setCorrectAnswer] = useState<number | undefined>(question.answer)
  const [questionUpdated, setQuestionUpdated] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [isEditted, setIsEditted] = useState<boolean>(false)

  const [questionOptionsReady, setQuestionOptionsReady] = useState<boolean>(true)

  // useEffect(() => {

  //   // let updateTimer: any = null
  //   // do update only when user is done changing values
  //   if (isEditted) {
  //     // updateTimer = setTimeout(() => {
  //     let updateTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
  //       // toast.info(`Updating question ${question.position}`)
  //       let payload = {
  //         options: questionOptions,
  //         position: question.position,
  //         question: questionText
  //       }

  //       _handleUpdateQuestion(payload)

  //       setIsEditted(false)
  //     }, 1500)
  //     return () => clearTimeout(updateTimer)
  //   }
  // }, [isEditted])

  const _handleUpdateQuestion = async (payload: IQuizQuestion) => {
    // console.log(payload)

    const endpoint = `/quizes/update-question/${question.id}`
    const response = await API.put(endpoint, payload, {
      headers: { Authoriation: `Bearer ${GLOBAL_OBJ.token}` }
    })
    const { code, message, responses } = response?.data

    if (code === 200) {
      // console.log(responses)
      // toast.success('Question updated')
    } else if (code === 401) {
      AUTH_LOGOUT && AUTH_LOGOUT()
    } else {
      toast.error(message)
    }
  }

  const _handleRemoveQuestion = async () => {
    // console.log(question, quizId)

    if (question.id) {
      // console.log(question, quizId)

      const endpoint = `/quizes/remove-question/${quizId}/${question.id}`
      // console.log(quizId)
      const response = await API.delete(endpoint, {
        headers: { Authoriation: `Bearer ${GLOBAL_OBJ.token}` }
      })
      const { code, message, responses } = response?.data

      if (code === 200) {
        // console.log(responses)
        // toast.success('Question deleted')
        callback({
          position: question.position,
          question: question.question,
          options: [],
          delete: true
        })
      } else if (code === 401) {
        AUTH_LOGOUT && AUTH_LOGOUT()
      } else {
        toast.error(message)
      }
    } else {
      callback({
        position: question.position,
        question: questionText,
        options: questionOptions,
        answer: correctAnswer,
        id: question.id,
        delete: true
      })
    }

    setShowDeleteModal(false)
  }

  //check current option value change and update options
  useEffect(() => {
    // console.log(currentOption)

    if (currentOption) {
      switch (currentOption.position) {
        case 0:
          // console.log('new entry')
          setQuestionOptionsReady(false)
          let curr_opts = questionOptions
          let new_quest = {
            position: curr_opts.length + 1,
            value: '',
            is_answer: false
          }

          curr_opts.push(new_quest)
          setQuestionOptions(curr_opts)
          break
        case -1:
          // console.log('delete entry')

          let q_opts = questionOptions
          q_opts.map((_opt, i) => {
            if (_opt.value === currentOption.value) {
              setQuestionOptionsReady(false)
              // console.log(`${_opt.value}, ${option.value}`);
              q_opts.splice(i, 1)
              // console.log(q_opts)
              setQuestionOptions(q_opts)
              setTimeout(() => {
                setQuestionOptionsReady(true)
              }, 50)
            }
          })

          // correct options positions
          q_opts.map((_opt, i) => {
            // console.log(_opt);
            _opt.position = i + 1
            // console.log(_opt)
          })
          break
        default:
          // console.log('update entry')
          if (currentOption.position !== null) {
            let quest_opts = questionOptions
            // console.log(quest_opts)
            quest_opts.map((_q, i) => {
              // console.log(_q)
              if (_q.position === currentOption.position) {
                // console.log('found option to be updated')
                quest_opts[i] = currentOption
              }
            })
            // console.log(quest_opts)
            setQuestionOptions(quest_opts)
          }
      }
    }

    setOptionsUpdated(true)

    setTimeout(() => {
      setQuestionOptionsReady(true)
    }, 50)

    let updateTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsEditted(true)
      if (question.id) {
        callback({
          position: question.position,
          question: questionText,
          options: questionOptions,
          answer: correctAnswer,
          id: question.id
        })
      } else {
        callback({
          position: question.position,
          question: questionText,
          options: questionOptions,
          answer: correctAnswer
        })
      }
    }, 1000)
    return () => clearTimeout(updateTimer)
  }, [currentOption])

  // check if correct answer has been changed and update options
  useEffect(() => {
    // console.log(correctAnswer)
    let q_opts = questionOptions
    let curr_opt = null
    q_opts.map((_opt, i) => {
      _opt.is_answer = false
      if (_opt.position === correctAnswer) {
        _opt.is_answer = true
        curr_opt = _opt
      }
    })
    // console.log(q_opts)
    setQuestionOptions(q_opts)

    setTimeout(() => {
      if (question.id) {
        callback({
          position: question.position,
          question: questionText,
          options: questionOptions,
          answer: correctAnswer,
          id: question.id
        })
      } else {
        callback({
          position: question.position,
          question: questionText,
          options: questionOptions,
          answer: correctAnswer
        })
      }
    }, 50)
  }, [correctAnswer])

  //check for value changes and update question
  useEffect(() => {
    // console.log(questionText, questionOptions);
    let updateTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (question.id) {
        callback({
          position: question.position,
          question: questionText,
          options: questionOptions,
          answer: correctAnswer,
          id: question.id
        })
      } else {
        callback({
          position: question.position,
          question: questionText,
          options: questionOptions,
          answer: correctAnswer
        })
      }
    }, 50)

    return () => clearTimeout(updateTimer)
  }, [questionText])

  return (
    <div className="w-full rounded-lg bg-white p-4">
      <div className="flex items-center w-full border-b-2 mb-5">
        <h4 className="font-bold text-gray-400"> {question.position}. </h4>

        {/*Allow only staff to edit quest*/}
        {GLOBAL_OBJ.data.role == users.teacher ? (
          <input
            type="text"
            name="question"
            className="h-10 input-component w-full border-gray-300 px-2 transition-all border-blue rounded-sm rounded-md"
            placeholder="Add a new question"
            value={questionText}
            onChange={(ev) => {
              // console.log(ev.currentTarget.value);
              setQuestionText(ev.currentTarget.value)
              setIsEditted(true)
            }}
          />
        ) : (
          <input
            type="text"
            name="question"
            className="h-10 input-component w-full border-gray-300 px-2 transition-all border-blue rounded-sm rounded-md"
            placeholder="Add a new question"
            value={questionText}
            onChange={(ev) => {
              // console.log(ev.currentTarget.value);
              setQuestionText(ev.currentTarget.value)
              setIsEditted(true)
            }}
            readOnly
          />
        )}
      </div>

      <div className="w-full">
        <Loader loaded={questionOptionsReady} className="w-full">
          {questionOptions.length > 0 &&
            // console.log(questionOptions),
            questionOptions.map((option, i) => {
              // console.log(option);
              return (
                <RadioSelect
                  key={i}
                  option={option}
                  callback={(ev) => {
                    // console.log(ev)
                    setCurrentOption(ev)
                  }}
                />
              )
            })}
        </Loader>
      </div>

      {/*Allow only staff to add an answer option*/}
      {GLOBAL_OBJ.data.role == users.teacher ? (
        <div className="flex items-center w-full">
          <button
            className="mb-2 py-1 px-3 bg-transparent hover:bg-green-800 rounded-md text-green hover:text-white border-2 border-green-800 hover:border-transparent"
            onClick={() => {
              setCurrentOption({
                position: 0,
                value: '',
                is_answer: false
              })
            }}
          >
            Add an option
          </button>
        </div>
      ) : (
        ''
      )}

      {/*Allow only staff to select a correct answer option*/}
      {GLOBAL_OBJ.data.role == users.teacher ? (
        <div className="flex items-center w-full mt-10 mb-2">
          <p className=""> Select correct answer </p>
          <div className="relative inline-flex ml-5">
            <svg
              className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232"
            >
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299"
                fillRule="nonzero"
              />
            </svg>
            <select
              className="bg-transparent hover:bg-green-800 rounded-md text-green hover:text-white border-2 border-green-800 hover:border-transparent h-10 pl-5 pr-10  focus:outline-none appearance-none"
              value={Number(correctAnswer)}
              onChange={(ev) => {
                // console.log(ev.currentTarget.value)
                setCorrectAnswer(Number(ev.currentTarget.value))
                setIsEditted(true)
              }}
            >
              <option value={0}>...</option>
              {questionOptions.map((_opt, i) => {
                // console.log(_opt);
                return (
                  <option value={_opt.position} key={i}>
                    Answer {_opt.position}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="mt-5 border-b-2"></div>

      {/*Allow only staff to add an answer option*/}
      {GLOBAL_OBJ.data.role == users.teacher ? (
        <button
          className="mt-3 mb-2 py-1 px-3 bg-transparent hover:bg-red-800 rounded-md text-red-500 font-bold hover:text-white text-center flex flex-row items-center"
          onClick={() => {
            setShowDeleteModal(true)
          }}
        >
          Delete
        </button>
      ) : (
        ''
      )}

      {/* Delete Quiz Modal */}
      <div
        className={`flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-500 bg-opacity-75 ${
          showDeleteModal ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-white rounded-lg w-1/3">
          <div className="flex flex-col items-start p-4">
            <div className="flex items-center w-full">
              <div className="text-gray-900 font-medium text-lg">Delete Question</div>
              <svg
                onClick={() => {
                  setShowDeleteModal(false)
                }}
                className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>

            <div className="my-10 w-full">
              <p className="text-center">
                You are deleting the question "<b>{questionText}</b>".
              </p>
              <p className="text-center">This is irreversible.</p>
            </div>

            <div className="w-full">
              <button
                className={`w-1/2 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded`}
                onClick={_handleRemoveQuestion}
              >
                Delete Question
              </button>
              <button
                className={`w-1/2 bg-transparent text-blue font-bold py-2 px-4 rounded`}
                onClick={() => {
                  setShowDeleteModal(false)
                }}
              >
                Cancel
              </button>
            </div>
            <div className="ml-auto w-50"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const RadioSelect: FC<IQuizQuestionRadio> = ({ option, callback }) => {
  const [optionText, setOptionText] = useState<string>(option.value)
  const { GLOBAL_OBJ, AUTH_LOGOUT } = useContext<IAuth>(AuthContext)

  const _handleRemoveOption = async () => {
    callback({
      position: -1,
      value: optionText,
      is_answer: false
    })
  }

  //check for value changes and update option
  useEffect(() => {
    // console.log(optionText);
    let updateTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      callback({
        position: option.position,
        value: optionText,
        is_answer: option.is_answer
      })
    }, 50)

    return () => clearTimeout(updateTimer)
  }, [optionText])

  return (
    <label className="w-full inline-flex items-center mb-3">
      <input
        type="radio"
        name={`questionOption`}
        className="form-radio h-4 w-4 text-gray-600"
        onClick={(ev) => {
          ev.preventDefault()
        }}
      />
      <input
        type="text"
        name={`questionOptionText_${option.position}`}
        className="h-10 input-component w-full border-gray-300 px-2 transition-all border-blue rounded-sm rounded-md"
        placeholder="Add a new answer"
        value={optionText}
        onChange={(ev) => {
          // console.log(ev.currentTarget.value);
          setOptionText(ev.currentTarget.value)
        }}
      />

      {/*Delete Option*/}
      {GLOBAL_OBJ.data.role == users.teacher ? (
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff0000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={_handleRemoveOption}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      ) : (
        ''
      )}
    </label>
  )
}
