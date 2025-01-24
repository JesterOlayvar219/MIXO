import { h as s } from "./httpClient.BFRTIcNZ.js";
import { F as e } from "./consts.BqJveuZl.js";
const c = async () =>
    (
      await s.post(
        `${e}/ideasList`,
        {
          all: !0,
        },
        {
          withCredentials: !1,
        }
      )
    ).data.data,
  o = async (a, t = 12) =>
    (
      await s.post(
        `${e}/ideasList`,
        {
          pageNumber: a,
          pageSize: t,
        },
        {
          withCredentials: !1,
        }
      )
    ).data,
  d = async (a) => {
    const t = `${e}/ideas/create`;
    await s.post(t, a, {
      withCredentials: !1,
    });
  };
export { o as a, d as c, c as f };
