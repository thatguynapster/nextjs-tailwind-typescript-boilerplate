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

/** times function  */
export const times = (n: number, iterator: any) => {
  var accum = Array(Math.max(0, n))
  for (var i = 0; i < n; i++) accum[i] = iterator.call()
  return accum
}

export function msToDate(_ms: number) {
  var time = new Date(_ms)

  var year = time.getFullYear()
  var month = time.getMonth() + 1
  var day = time.getDate()

  return `${day}/${month}/${year}`
}

// add or subtract some days from given date
export function addDays(theDate: Date, days: number) {
  return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)
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




/**
 * Implement time ago
 * **************************************************************
 */

 const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


function getFormattedDate(date: Date, prefomattedDate : string | boolean = false, hideYear=false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = parseInt(`0${ minutes }`);
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${ prefomattedDate } at ${ hours }:${ minutes }`;
  }

  if (hideYear) {
    //January 10, at 10:20
    return `${ month } ${ day }, at ${ hours }:${ minutes }`;
  }

  // January 10, 2017 at 10:20
  return `${ month } ${ day }, ${ year } at ${ hours }:${ minutes }`;
}

/** Time Ago main function */
export function timeAgo(dateParam: string | number  | Date) {

  dateParam = new Date(dateParam);
  const date = dateParam
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today.getTime() - DAY_IN_MS);
  const seconds = Math.round((today.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();


  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${ seconds } seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${ minutes } minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today'); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }
  
  console.log(getFormattedDate(date))

  return getFormattedDate(date); // 10. January 2017. at 10:20
}
