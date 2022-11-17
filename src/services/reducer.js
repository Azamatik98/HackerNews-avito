import * as actions from "../components/actions/actions";
import { handleActions } from "redux-actions";
import { combineReducers } from "@reduxjs/toolkit";

const news = handleActions(
  {
    [actions.addNews]({ lastNewsIDs }, { payload: { news } }) {
      return { lastNewsIDs, news };
    },
    [actions.addNewsLast](state, { payload: { lastNewsIDs } }) {
      return { lastNewsIDs, news: state.news };
    },
  },
  { lastNewsIDs: [], news: [] }
);

const contentStatus = handleActions(
  {
    [actions.changeStatusLoad](
      { commentBranch },
      { payload: { loadingStatus } }
    ) {
      return { commentBranch, loadingStatus };
    },
    [actions.changeStatusBranch](
      { commentBranch, loadingStatus },
      { payload: { id, status } }
    ) {
      return {
        loadingStatus,
        commentBranch: { ...commentBranch, [id]: status },
      };
    },
    [actions.setStatusBranch](
      { loadingStatus },
      { payload: { commentBranch } }
    ) {
      return {
        loadingStatus,
        commentBranch,
      };
    },
  },
  { loadingStatus: "loading", commentBranch: {} }
);

export default combineReducers({ news, contentStatus });
