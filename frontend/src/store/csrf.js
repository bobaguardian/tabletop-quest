import Cookies from 'js-cookie'; // to extract XSRF-TOKEN cookie value

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.header to an empty object if there are no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the Content-Type header to
  // application/json, and set the XSRF-TOKEN heaader to the value of the XSRF-TOKEN cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
  }

  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  // if response status code >= 400, throw an error with error being the response
  if (res.status >= 400) throw res;

  // if response status code < 400, then return response to the next promise chain
  return res;
}

// call this to get the XSRF-TOKEN cookie (should only be used in development)
export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}
