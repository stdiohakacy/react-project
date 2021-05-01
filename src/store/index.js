import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './posts/PostSlice'

export default configureStore({
    reducer: {
        posts: postsReducer
    }
})