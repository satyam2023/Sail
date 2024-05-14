/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { IApiResponse } from "models/ApiResponses/IApiResponse";
import APIConstants from "core/ApiConstants";
import { store } from "redux/store/Store";
import StatusCode from "core/StatusCode";

const token = () => {

  return  `Bearer ${store.getState()?.userAccount?.data?.data?.tokens?.access_token}`;

};
const instance: AxiosInstance = axios.create({
  baseURL: APIConstants.BaseURL,
  timeout: APIConstants.axiosCallTimeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

const baseURL = () => {
  return `${store.getState()?.updatedBaseURL.baseURL}/`;
};
interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

const globalConfig: RetryConfig = {
  retry: APIConstants.axiosCallRetryCount,
  retryDelay: APIConstants.axiosCallRetryTimeout,
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config } = error;

    if (!config || !config.retry) {
      return Promise.reject(error);
    }
    config.retry -= 1;
    const delayRetryRequest = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay);
    });
    return delayRetryRequest.then(() => instance(config));
  },
);
export function sendGetRequest<T>(url: string) {
  instance.defaults.headers.common.Authorization = token();
  const updatedUrl = baseURL() + url;
  return instance
    .get(updatedUrl, globalConfig)
    .then((response: any) => {
      return handleResponse<T>(response.data);
    })
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error("something went wrong");
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {});
}

export function sendPostRequest<T>(url: string, body: any): any {
  const updatedUrl=baseURL()+url; 
  instance.defaults.headers.common.Authorization = token();
  return instance
    .post(updatedUrl, body, globalConfig)
    .then((response: any) => {
      return handleResponse<T>(response.data);
    })
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error("something went wrong");
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {
    });
}

export function sendPutRequest<T>(url: string, body: any): any {
  const updatedUrl = baseURL() + url;
  instance.defaults.headers.common.Authorization = token();
  return instance
    .put(updatedUrl, body, globalConfig)
    .then((response: any) => handleResponse<T>(response.data))
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error("something went wrong");
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {});
}

export function sendPatchRequest<T>(url: string,body:any): any {
  const updatedUrl = baseURL() + url;
  instance.defaults.headers.common.Authorization = token();
  return instance
    .patch(updatedUrl, body,globalConfig)
    .then((response: any) => handleResponse<T>(response.data))
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error("something went wrong");
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {
    });
}

export function deleteRequest<T>(url: string): any {
  const updatedUrl = baseURL() + url;
  return instance
    .delete(updatedUrl, globalConfig)
    .then((response: any) => handleResponse<T>(response.data))
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error("something went wrong");
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {

    });
}

function handleResponse<T>(data: T) {
  const res: IApiResponse<T> = {
    isSuccess: true,
    data,
  };
  return res;
}

function handleError<T>(data: any) {
  const res: IApiResponse<T> = {
    isSuccess: false,
    errors: data,
  };
  return res;
}

export function sendPostMultipartRequest<T>(
  url: any,
  body: object,
):any{
  const updatedUrl = baseURL() + url;
  return instance
    .post(updatedUrl, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response: any) => {
      return handleResponse<T>(response.data);
    })
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error("something went wrong");
      } else if (
        err.response.status === StatusCode.ClientErrorForbidden ||
        err.response.status === StatusCode.ClientErrorConflict
      ) {
       
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {
    });
}




export function sendMultipleGetRequests<T>(urls: string[]): any {
  const promises = urls.map(url => {
    const updatedUrl = baseURL() + url;
    instance.defaults.headers.common.Authorization = token();
    return instance.get(updatedUrl, globalConfig)
      .then((response: any) => {
        return handleResponse<T>(response.data);
      })
      .catch((err: any) => {
        if (err.response === undefined) {
          throw new Error("Something went wrong with the request to " + url);
        }
        return handleError<T>(err.response.data);
      });
  });

  return axios.all(promises)
    .then(axios.spread((...responses) => {
      console.log("network result::::::",responses)
      return responses;
    }))
    .finally(() => {
      console.log("Finally of Parallel Api Calling")
    });
}
