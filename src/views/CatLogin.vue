<template>
    <div class="login">
        <form v-if="showLoginForm" @submit.prevent="loginWithEmail" class="login__form">
            <div class="login-form">
<!--                <div class="login-form__username">-->
<!--                    <div class="flex flex-column gap-2">-->
<!--                        <label for="username">Логін</label>-->
<!--                        <InputText id="username" v-model="login.username" aria-describedby="username-help" />-->
<!--                        <small id="username-help">Введіть адресу пошти</small>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="login-form__password">-->
<!--                    <div class="flex flex-column gap-2">-->
<!--                        <label for="password">Пароль</label>-->
<!--                        <Password id="password" v-model="login.password" aria-describedby="password-help" :feedback="false" toggleMask />-->
<!--                        <small id="password-help">Введіть пароль</small>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="login-form__submit-btn">-->
<!--                    <Button :label=submitBtnText type="submit" class="w-full"/>-->
<!--                </div>-->
<!--                <div class="login-form__mode">-->
<!--                    <div class="flex justify-content-center">-->
<!--                        <div class="login-form__mode-text">-->
<!--                            {{ modeText }}-->
<!--                        </div>-->
<!--                        <Button :label=modeBtnText text @click="toggleModeBtn"/>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="login-form__welcome">Вітаємо!</div>
                <div class="login-form__label">Зареєструйтесь або увійдіть за допомогою Google для створення або входу до особистого кабінету свого котика</div>
                <div class="login-form__google-btn">
                    <div class="flex justify-content-center gap-2 w-full">
                        <Button icon="pi pi-google" label="Продовжити" @click="loginWithGoogle"/>
                    </div>
                </div>
            </div>
        </form>
        <form v-if="showCatProfile" @submit.prevent="createCatProfile" class="login__cat-profile">
            <div class="cat-profile-form">
                <div class="cat-profile-form__name">
                    <div class="flex flex-column gap-2">
                        <label for="catName">Ім'я</label>
                        <InputText id="catName" v-model="profile.name" />
                    </div>
                </div>
                <div class="cat-profile-form__breed">
                    <div class="flex flex-column gap-2">
                        <label for="catBreed">Порода</label>
                        <Dropdown id="catBreed" v-model="selectedBreed" :options="catBreeds" optionLabel="name" class="w-full" />
                    </div>
                </div>
                <div class="cat-profile-form__age">
                    <div class="flex flex-column gap-2">
                        <label for="catAge">Вік</label>
                        <Dropdown id="catAge" v-model="selectedAge" :options="catAges" optionLabel="name" class="w-full" />
                    </div>
                </div>
<!--                <div class="cat-profile-form__avatar">-->
<!--                    <div class="flex flex-column gap-2">-->
<!--                        <label for="catAvatar">Аватар</label>-->
<!--                        <FileUpload id="catAvatar" name="cat[]" @select="onAdvancedUpload($event)" accept="image/*" class="w-full"-->
<!--                            :show-upload-button="false"-->
<!--                            :show-cancel-button="false"-->
<!--                            :max-file-size="1000000"-->
<!--                            :choose-label="'Обрати'"-->
<!--                        >-->
<!--                            <template #empty>-->
<!--                                <p>Перетягніть файли сюди, щоб завантажити.</p>-->
<!--                            </template>-->
<!--                        </FileUpload>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="cat-profile-form__submit-btn">
                    <Button :disabled="!isDisabledCreateCatBtn" label="Зберегти дані" type="submit" class="w-full"/>
                </div>
            </div>
        </form>
        <app-loader v-if="isLoaded"/>
    </div>
</template>

<script>
    import InputText from 'primevue/inputtext';
    import Password from 'primevue/password';
    import Button from 'primevue/button';
    import Dropdown from 'primevue/dropdown';
    import FileUpload from 'primevue/fileupload';
    import AppLoader from "../components/local/AppLoader";
    import { breeds } from "../constants/breeds";
    import { getAgeWithMonths } from "../helpers/months";
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { getDatabase, child, set, get, ref as dRef } from "firebase/database";
    import { useProfileStore } from '../stores/profile';

    export default {
        name: "CatLogin",

        components: {
            InputText,
            Password,
            Button,
            Dropdown,
            FileUpload,
            AppLoader
        },

        data() {
            return {
                isRegistrationMode: true,
                isLoaded: false,
                step: 0,
                login: {
                    username: '',
                    password: ''
                },
                profile: {
                    name: '',
                    age: 0,
                    breed: ''
                },
                selectedBreed: null,
                selectedAge: null
            }
        },

        watch: {
            authUserId() {
                this.init();
            }
        },

        computed: {
            // submitBtnText() {
            //     return this.isRegistrationMode ? 'Реєстрація' : 'Вхід';
            // },
            //
            // modeText() {
            //     return this.isRegistrationMode ? 'Вже є аккаунт?' : 'Немає аккаунта?';
            // },
            //
            // modeBtnText() {
            //     return this.isRegistrationMode ? 'Вхід' : 'Реєстрація';
            // },

            isDisabledCreateCatBtn() {
                return this.profile.name && this.selectedBreed && this.selectedAge;
            },

            showLoginForm() {
                return !this.step && !this.isLoaded;
            },

            showCatProfile() {
                return this.step === 1 && !this.isLoaded;
            },

            catBreeds() {
                return breeds;
            },

            catAges() {
                return getAgeWithMonths();
            },

            authUserId() {
                return useProfileStore().authUserId;
            }
        },

        methods: {
            init() {
                this.isLoaded = true;

                if (this.authUserId) {
                    (async () => {
                        const dbRef = dRef(getDatabase());

                        await get(child(dbRef, `${this.authUserId}`))
                            .then((snapshot) => {
                                if (snapshot.exists()) {
                                    this.goToAdminPanel();
                                }
                            })
                            .finally(() => {
                                this.isLoaded = false;
                            });
                    })();
                } else {
                    this.isLoaded = false;
                }
            },

            createCatProfile() {
                const db = getDatabase();

                set(dRef(db, `${this.authUserId}`), {
                    name: this.profile.name,
                    breed: this.selectedBreed.id,
                    age: this.selectedAge.id
                })
                    .then(() => {
                        this.goToAdminPanel();
                    });
            },

            goToAdminPanel() {
                this.$router.push({ path: '/gallery' });
            },

            loginWithGoogle() {
                const auth = getAuth();
                const provider = new GoogleAuthProvider();

                provider.setCustomParameters({
                    prompt: 'select_account'
                });

                signInWithPopup(auth, provider)
                    .then((result) => {
                        const profile = useProfileStore();
                        profile.setUserId(result.user.uid);

                        this.step += 1;
                    })
            },

            // toggleModeBtn() {
            //     this.isRegistrationMode = !this.isRegistrationMode;
            // },
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("../assets/background.png");
        background-repeat: repeat;
        background-position: center center;
        background-attachment: fixed;

        &__form, &__cat-profile {
            width: 100%;
            max-width: 438px;
            padding: 30px;
            background: #F9F9F9;
            box-shadow: 0 4px 10px rgba(255, 117, 24, 0.5);
            border-radius: 50px;
        }
    }

    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__username, &__password {
            margin-bottom: 15px;
        }

        &__submit-btn {
            margin-bottom: 5px;
        }

        &__mode {
            margin-bottom: 25px;
        }

        &__mode-text {
            margin-right: 4px;
        }

        &__welcome {
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: bold;
        }

        &__label {
            text-align: center;
            margin-bottom: 15px;
        }

        &__google-btn {
            width: 100%;
        }
    }

    .cat-profile-form {
        &__name, &__breed {
            margin-bottom: 15px;
        }

        &__age {
            margin-bottom: 25px;
        }
    }
</style>

<style lang="scss">
    .login-form__mode .p-button {
        padding: 0 !important;

        &:focus {
            box-shadow: unset !important;
        }
    }
</style>