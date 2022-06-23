import config from "./config";

class ApiCall {
  async invokeGET(resource, queryParams) {
    //url y parametros de busqueda ["nombre=juan","apellido=perez"]

    queryParams = queryParams || []; //si hay parametros de busqueda, los agrega a la url, si no, no
    const queryString = queryParams.reduce(
      (last, q, i) => last + `${i === 0 ? "?" : "&"}${q}`,
      ""
    );
    let data = {};
    const bearer = localStorage.getItem("token");
    if (bearer) {
      data = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      };
    } else {
      data = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    const url = `${config.api.baseURL}${resource}${queryString}`;
    let response = await (await fetch(url, data)).json();
    return response;
  }

  async invokePUT(resource, body) {
    let data = {};
    const bearer = localStorage.getItem("token");
    console.log("token",bearer);
    if (bearer) {
      data = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      };
    } else {
      data = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    const url = `${config.api.baseURL}${resource}`;
    let response = await (await fetch(url, data)).json();
    return response;
  }

  async invokePOST(resource, body) {
    let data = {};
    const bearer = localStorage.getItem("token");
    if (bearer) {
      data = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      };
    } else {
      data = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    const url = `${config.api.baseURL}${resource}`;
    const response = await (await fetch(url, data)).json();
    return response;
  }

  async invokeDELETE(resource) {
    let data = {};
    const bearer = localStorage.getItem("token");
    if (bearer) {
      data = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      };
    } else {
      data = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    const url = `${config.api.baseURL}${resource}`;
    let response = await (await fetch(url, data)).json();
    return response;
  }
}

export default new ApiCall();
