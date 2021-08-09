import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const access = TokenService.getLocalAccessToken();
                if (access) {
                    config.headers["Authorization"] = 'Bearer ' + access;
                }
                return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
        return res;
    },

    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/token/access-refresh/" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await axiosInstance.post("/token/refresh/", {
                    refresh: TokenService.getLocalRefreshToken(),
                });
                const { access } = rs.data;
                store.dispatch('auth/refresh', access);
                TokenService.updateLocalAccessToken(access);
                return axiosInstance(originalConfig);
                }
                catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    });
};

export default setup;
