import axios from "axios";
import { baseUrl } from "./config";

export const axiosInstance = () => axios.create({ baseURL: baseUrl });

class Api {
  base = "";

  constructor(base) {
    this.base = base;
  }

  async login(username, password) {
    try {
      return await axiosInstance(this.base).post(
        "/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log(e, "e in login");
      return undefined;
    }
  }

  async getUser(id) {
    try {
      return await axiosInstance(this.base).get(
        `/getUser?_id=${encodeURIComponent(id)}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log(e, "e in getUser");
      return undefined;
    }
  }

  async updateUser(id, data) {
    try {
      return await axiosInstance(this.base).post("/updateUser", { id, data });
    } catch (e) {
      console.log(e, "e in updateUser");
      return undefined;
    }
  }

  async addCmp(data, token) {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${this.base}/addCmp`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Cookie: `jwt=${token}`,
        },
        data: data,
      };
      const resp = await axios.request(config);
      if (resp.status === 200) {
        return resp.data.cmps[resp.data.cmps.length - 1];
      }
    } catch (e) {
      return e.response.data;
    }
  }

  async updateCmp(data, token) {
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${this.base}/updateCmp`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Cookie: `jwt=${token}`,
        },
        data: data,
      };
      const resp = await axios.request(config);
      if (resp.status === 200) {
        return resp.status;
      } else {
        return undefined;
      }
    } catch (e) {
      console.log(e.response);
      return undefined;
    }
  }
  async getCmp(data, token) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${this.base}/getCmp?cmpId=${data}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // Cookie: `jwt=${token}`,
        },
      };
      const resp = await axios.request(config);
      if (resp.status === 200) {
        return resp.data;
      }
    } catch (e) {
      if (e?.response?.data) {
        return e.response.data;
      } else {
        return undefined;
      }
    }
  }
  async getAvailableAliases(_id, domain, token) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${this.base}/getAvailableAliases?_id=${_id}&domain=${domain}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // Cookie: `jwt=${token}`,
        },
      };
      const resp = await axios.request(config);
      console.log(resp);
      if (resp.status === 200) {
        return resp.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }

  async getWhitePages(domain, language, topic, token) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${this.base}/whitePage?language=${language}&topic=${topic}&domain=${domain}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.request(config);
      if (resp.status === 200) {
        return resp.data;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  }
  async getSnowData(from, to, id, token) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${this.base}/snowData?from=${from}&to=${to}&cmp=${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.request(config);
      if (resp.status === 200) {
        return resp.data;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  }

  async getSetishData(path, token, bucketName = "") {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${this.base}/getBlackPages?path=${path}&bucketName=${bucketName}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.request(config);
      if (resp.status === 200) {
        return resp.data;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  }
  async getCharacters(path, token) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${this.base}/getCharacters?path=${path}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.request(config);
      if (resp.status === 200) {
        return resp.data;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  }

  async inject(data) {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://bucket-service-020e9961f3af.herokuapp.com/S3/copy-specific-folder`,
        data: data,
      };
      return await axios.request(config);
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }

  async getCharactersByGoe(geo) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://r-prelander-back-d08d492c6242.herokuapp.com/character/get-character-by-country?country=${geo}`,
      };
      return await axios.request(config);
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }
}

export const api = new Api(baseUrl);
