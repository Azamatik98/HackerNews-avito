import { createAction } from "redux-actions";

export const addNewsLast = createAction("LastNewsAdd");
export const addNews = createAction("NewsAdd");
export const changeStatusLoad = createAction("changeStatusLoad");
export const setStatusBranch = createAction("setStatusBranch");
export const changeStatusBranch = createAction("changeStatusBranch");
