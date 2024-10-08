import { create } from "zustand";

export type User = {
    name: string;
    weight: string;
    height: string;
    age: string;
    level: string;
    objective: string;
    gender: string;
}

type DataState = {
    user: User;
    setPageOne: (data: Omit<User, "level" | "objective" | "gender">) => void; //Metodo do tipo User, porém omitindo os atributos level, objective e gender que são da segunda pag
    setPageTwo: (data: Pick<User, "level" | "objective" | "gender">) => void; //Metodo do tipo User, porém pegando apenas os atributos citados para a segunda pagina
}

export const useDataStore = create<DataState>((set) => ({
    user: {
        name: "",
        weight: "",
        height: "",
        age: "",
        level: "",
        objective: "",
        gender: ""
    },

    setPageOne: (data) => set((state) => ({ user: { ...state.user, ...data }})), //mantem o que já tem o User e preenche com o que vai ser passado no data
    setPageTwo: (data) => set((state) => ({ user: { ...state.user, ...data }}))
})); 