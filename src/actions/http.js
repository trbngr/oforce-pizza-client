import { completeDataFetching, fetchingData, raiseError } from '.';

const opts = (settings = {}) => ({
  ...settings,
  headers: {
    ...settings.headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  }
});

const normalizePath = endpoint =>
  endpoint.startsWith('/') ? endpoint.substr(0, 1) : endpoint;

const makeFqUrl = endpoint => `https://api.oforce.com/${normalizePath(endpoint)}`;

const noact = ({});

const handleResponse = async (dispatch, success, response, options = {
  expectEmptyResponse:false,
  handleError: (message) => {}
}) => {

  const handleSuccess = payload => {
    const actions = (success || noact)(payload);
    let newVar = (Array.isArray(actions) ? actions : [actions]);
    (newVar).forEach(dispatch);
  };

  if (options.expectEmptyResponse === true && response.ok) {
    return handleSuccess({});
  }

  try {
    const json = await response.json();
    response.ok
      ? handleSuccess(json)
      : dispatch((options.handleError || raiseError)([json.message] || ['unknown']));
    dispatch(completeDataFetching);
    return json;
  } catch (e) {
    dispatch(raiseError([e.message]));
    return { errors: [e.message] };
  }
};

export default {
  get: (endpoint, fn) => async dispatch => {
    dispatch(fetchingData);
    const response = await fetch(makeFqUrl(endpoint), opts({
      //IE prefers to cache ajax calls ¯\_(ツ)_/¯
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    }));
    return handleResponse(dispatch, fn, response);
  },
  post: (endpoint, body, fn) => async (dispatch, options) => {
    dispatch(fetchingData);
    const response = await fetch(makeFqUrl(endpoint), opts({
      body: JSON.stringify(body),
      method: 'POST'
    }));
    return handleResponse(dispatch, fn || body, response, options);
  },
  put: (endpoint, body, fn) => async (dispatch, options) => {
    dispatch(fetchingData);
    const response = await fetch(makeFqUrl(endpoint), opts({
      body: JSON.stringify(body),
      method: 'PUT'
    }));
    return handleResponse(dispatch, fn || body, response, options);
  },
  delete: (endpoint, body, fn) => async (dispatch, options) => {
    dispatch(fetchingData);
    const response = await fetch(makeFqUrl(endpoint), opts({
      body: JSON.stringify(body),
      method: 'DELETE'
    }));
    return handleResponse(dispatch, fn || body, response, options);

  }
};
