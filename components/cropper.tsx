import React, { useState, useEffect, Fragment, FC, RefAttributes } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import { ICropper } from '../types'

export const ImageCropper: FC<ICropper> = ({
  callback,
  aspectRatio,
  src,
  status,
  setDisplay,
  setCropResult
}) => {
  const [source, setSrc] = useState<string | null>(null)
  const [cropped, setCropped] = useState<string | ArrayBuffer | null>(null)
  const [fileType, setFileType] = useState<string>('')
  const [cropperInstance, setCropperInstance] = useState<any>(null)

  const crop_image = () => {
    var image = cropperInstance?.getCroppedCanvas().toDataURL('image/jpeg', 1)
    setCropped(image)
    setCropResult(image)
    cropperInstance.clear()
    callback()
  }

  const intialize_cropper = (cropper: any) => {
    setCropperInstance(cropper)
  }

  useEffect(() => {
    setSrc(src)

    return () => {
      setFileType('')
      setSrc(null)
    }
  }, [src])

  return (
    <Fragment>
      {status && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/*<!--
                Background overlay, show/hide based on modal state.

                Entering: "ease-out duration-300"
                    From: "opacity-0"
                    To: "opacity-100"
                Leaving: "ease-in duration-200"
                    From: "opacity-100"
                    To: "opacity-0"
                -->*/}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            {/*<!-- This element is to trick the browser into centering the modal contents. --> */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            {/*<!--
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                -->*/}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <Cropper
                    style={{ height: 'auto', width: '100%' }}
                    initialAspectRatio={1}
                    aspectRatio={aspectRatio || 1}
                    guides={false}
                    src={
                      source ||
                      'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg'
                    }
                    onInitialized={intialize_cropper}
                    viewMode={1}
                    dragMode="move"
                    cropBoxMovable={true}
                    responsive={true}
                    scalable={true}
                    zoomable={false}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    setCropResult(null)
                    setDisplay(false)
                  }}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={crop_image}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ImageCropper
