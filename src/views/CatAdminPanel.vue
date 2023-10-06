<template>
    <div class="panel">
        <div class="panel__menu">
            <Menu :model="items">
                <template #start>
                    <button @click="profileClick" class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
                        <svg class="svg-icon panel__avatar" style="min-width: 60px; width: 60px; height: 60px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 341.333333 455.253333 345.173333C418.56 301.653333 315.733333 192 213.333333 192 213.333333 192 129.28 318.293333 211.626667 486.826667 188.16 522.24 173.653333 540.586667 170.666667 582.826667L88.32 595.2 97.28 637.013333 172.373333 625.92 178.346667 656.213333 111.36 696.32 131.413333 734.293333 193.28 696.32C242.346667 800.426667 366.506667 853.333333 512 853.333333 657.493333 853.333333 781.653333 800.426667 830.72 696.32L892.586667 734.293333 912.64 696.32 845.653333 656.213333 851.626667 625.92 926.72 637.013333 935.68 595.2 853.333333 582.826667C850.346667 540.586667 835.84 522.24 812.373333 486.826667 894.72 318.293333 810.666667 192 810.666667 192 708.266667 192 605.44 301.653333 568.746667 345.173333L512 341.333333M384 469.333333C407.466667 469.333333 426.666667 488.533333 426.666667 512 426.666667 535.466667 407.466667 554.666667 384 554.666667 360.533333 554.666667 341.333333 535.466667 341.333333 512 341.333333 488.533333 360.533333 469.333333 384 469.333333M640 469.333333C663.466667 469.333333 682.666667 488.533333 682.666667 512 682.666667 535.466667 663.466667 554.666667 640 554.666667 616.533333 554.666667 597.333333 535.466667 597.333333 512 597.333333 488.533333 616.533333 469.333333 640 469.333333M469.333333 597.333333 554.666667 597.333333 524.8 656.64C533.333333 683.946667 557.226667 704 586.666667 704 622.08 704 650.666667 675.413333 650.666667 640L672 640C672 686.933333 633.6 725.333333 586.666667 725.333333 554.666667 725.333333 526.933333 707.84 512 682.666667L512 682.666667 512 682.666667C497.066667 707.84 469.333333 725.333333 437.333333 725.333333 390.4 725.333333 352 686.933333 352 640L373.333333 640C373.333333 675.413333 401.92 704 437.333333 704 466.773333 704 490.666667 683.946667 499.2 656.64L469.333333 597.333333Z"  /></svg>
                        <div class="flex flex-column align">
                            <span class="font-bold">{{ profile.name }}</span>
                            <span class="text-sm">{{ profile.breed }}</span>
                            <span class="text-sm">{{ profile.age }}</span>
                        </div>
                    </button>
                </template>
                <template #item="{ item, label, props }" class="flex-grow-1">
                    <a class="flex" v-bind="props.action" @click="menuClick(item.id)">
                        <span v-bind="props.icon" />
                        <span v-bind="props.label">{{ label }}</span>
                    </a>
                </template>
                <template #end>
                    <button class="w-full p-link flex align-items-center text-color hover:surface-200 border-noround panel__logout-btn" @click="logout">
                        <i class="pi pi-sign-out" />
                        <span class="ml-2">Вийти</span>
                    </button>
                </template>
            </Menu>
        </div>
        <div class="panel__content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Menu from 'primevue/menu';
    import { getAuth, signOut } from "firebase/auth";
    import { useProfileStore } from '../stores/profile';
    import { getDatabase, child, set, get, ref as dRef } from "firebase/database";
    import { breeds } from "../constants/breeds";
    import { menuItems } from "../constants/menu";
    import { getAgeWithMonths } from "../helpers/months";

    export default {
        name: "CatAdminPanel",

        components: {
            Menu
        },

        data() {
            return {
                profile: {
                    name: '',
                    age: '',
                    breed: ''
                }
            }
        },

        created() {
            this.init();
        },

        computed: {
            items() {
                return menuItems;
            },

            authUserId() {
                return useProfileStore().authUserId;
            }
        },

        methods: {
            init() {
                this.getCatProfileFromDatabase();
            },

            getCatProfileFromDatabase() {
                const dbRef = dRef(getDatabase());

                get(child(dbRef, `${this.authUserId}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const profile = snapshot.val();
                            this.profile.name = profile.name;
                            this.profile.breed = breeds.find((breed) => breed.id === profile.breed).name;
                            this.profile.age = getAgeWithMonths().find((breed) => breed.id === profile.breed).name;
                        }
                    })
            },

            profileClick() {
                this.$router.push({ path: '/gallery' });
            },

            menuClick(id) {
                if (id === 1) {
                    this.$router.push({ path: '/notifications' });
                } else if (id === 2) {
                    this.$router.push({ path: '/trends' });
                }
            },

            logout() {
                const auth = getAuth();

                signOut(auth).then(() => {
                    const profile = useProfileStore();
                    profile.setUserId('');

                    this.goToLoginForm();
                })
            },

            goToLoginForm() {
                this.$router.push({ path: '/login' });
            },
        }
    }
</script>

<style scoped lang="scss">
    .panel {
        display: flex;

        &__content {
            flex-grow: 1;
            background-image: url("../assets/background.png");
            background-repeat: repeat;
            background-position: center center;
            background-attachment: fixed;
        }

        &__avatar {
            margin-right: 4px;
        }

        &__logout-btn {
            padding: 0.75rem 1rem;
            margin-left: 2px;
        }
    }
</style>
