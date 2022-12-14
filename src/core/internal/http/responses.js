export const Response = function Response(statusCode, responseMessage) {
  return {
    status: statusCode,
    message: responseMessage
  };
};

export const Responses = {
  200: "Success",
  202: "Success",
  400: "Some of the mandatory fields in the message body are missing or invalid",
  401: "The app doesn’t exist or the authentication failed",
  403: "App traffic is blocked due to Zero package limit",
  404: "Request failed",
}

export const buildResponseObj = function(response) {
  let responseStatus = response.status;
  if(responseStatus == undefined){
    responseStatus = 404
  }
  let responseMessage = getStatusMessage(responseStatus);
  
  return Response(responseStatus, responseMessage);
};

export const buildResponseMessage = function(apiMethod, responseObj) {
  let statusText = "success";
  if(!ResponseSuccessCodes.includes(responseObj.status)){
    statusText = "failed";
  }

  return apiMethod + ' request ' + statusText + ' with status code: ' + responseObj.status + ' Message: ' + responseObj.message;
};   

export const getStatusMessage = function getStatusMessage(responseStatus){
  let message;
  switch(responseStatus){
    case 200:
      message = Responses[200];
      break;
    case 202:
      message = Responses[202];
      break;
    case 400:
      message = Responses[400];
      break;
    case 401:
      message = Responses[401];
      break;
    case 403:
      message = Responses[403];
      break;
    case 404:
      message = Responses[404];
      break;
    default:
      message = Responses[404];
      break;
    }
    return message;
}

export const ResponseSuccessCodes = [200, 202];