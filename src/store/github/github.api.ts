import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IRepo, IUser, ServerResponse} from '../../models/models';

// создаём Api, после всех манипуляций Api(githubApi) нужно соединить с store
export const githubApi = createApi({
    // reducerPath - это строка которая будет говорить по какому адресу в нашем store будет храниться все захешированые
    // данные когда мы будем работать с Api
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        // базовый url по которому будем делать запрос
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    // endpoints это функция которая принимает build , возращая объект где мы перечисляем все необходимые endpoint-ы
    endpoints: build => ({
        // searchUsers список пользователей
        // build есть два метода query для получения данных и mutation для изменения данных
        searchUsers: build.query<IUser[], string>({
            // здесь описываеться сам запрос на сервер
            query: (search:string) => ({
                url: `search/users`,
                // параметры запороса
                params: {
                    q: search,
                    per_page: 10
                }
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
        })
    })
})

// обращаемся к githubApi, генеризуеться автомотически хук useSearchUsersQuery(название может быть разным)
export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi