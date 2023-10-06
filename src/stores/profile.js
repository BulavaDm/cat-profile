import { defineStore } from 'pinia'
import { getDatabase, ref as dRef, get, child } from "firebase/database";

const useProfileStore = defineStore({
    id: 'profile',

    state: () => ({
        userId: ''
    }),

    getters: {
        authUserId: (state) => state.userId,
    },

    actions: {
        setUserId(userId) {
            this.userId = userId;
        }
    },
})

export {
    useProfileStore
}
