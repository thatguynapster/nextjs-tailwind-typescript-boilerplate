import Router from 'next/router'

/** navigate pages */
export const navigate = (pagename = '', query = {}) => {
  Router.push({
    pathname: `/${pagename}`,
    query: query
  })
}

/** get queries from url */
export const get_query = (query_name: string) => {
  var urlParams = new URLSearchParams(window.location.search)
  var query = urlParams.get(query_name)
  return query
}

/** convert base64/URLEncoded data component to raw binary or blob */
export const dataURItoBlob = (dataURI: any, contentType: string) => {
  // convert  data held in a string
  var sliceSize = 512
  var byteCharacters = atob(dataURI)
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  var blob = new Blob(byteArrays, { type: contentType })

  return blob
}

/** parse string to markdoown */
export const parseMarkdown = (markdownText: string) => {
	const htmlText = markdownText
		.replace(/^### (.*$)/gim, '<h3>$1</h3>')
		.replace(/^## (.*$)/gim, '<h2>$1</h2>')
		.replace(/^# (.*$)/gim, '<h1>$1</h1>')
		.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
		.replace(/\*(.*)\*/gim, '<strong>$1</strong>')
		.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
		.replace(/\n$/gim, '<br />')

	return htmlText.trim()
}
