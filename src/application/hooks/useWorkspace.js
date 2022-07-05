import { useReducer } from "react";
import { reducer } from "../reducers/useWorkspace";

export function useWorkspace({workspaces}) {
    const [state, dispatch] = useReducer(reducer, workspaces)
}