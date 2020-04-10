import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isFetching: false,
    stories: [],
    story: {},
    errors: {}
}

const storySlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        fetchStories: state => { state.isFetching = true },
        fetchStoriesSuccess: (state, action) => {
            state.isFetching = false
            state.stories = action.payload
        },
        fetchStoriesError: state => {
            state.isFetching = false
        },
        addStory: state => { state.isFetching = true },
        addStorySuccess: (state, action) => {
            state.isFetching = false
            state.stories = [...state.stories, action.payload]
        },
        addStoryError: state => {state.isFetching = false},
        fetchStory: state => { state.isFetching = true },
        fetchStorySuccess: (state, action) => {
            state.isFetching = false
            state.story = action.payload
        },
        fetchStoryError: state => {
            state.isFetching = false
        },
        addComment: state => {
            state.errors = {}
        },
        addCommentSuccess: (state, action) => {
            state.story.comments.push(action.payload)
        },
        addCommentError: (state, action) => {
            action.payload.map(({ propertyPath, message }) => {
                state.errors[propertyPath] = message
            })
        }
    }
})

export const {
    fetchStories, fetchStoriesSuccess, fetchStoriesError, addStory, addStorySuccess, addStoryError,
    fetchStory, fetchStorySuccess, fetchStoryError, addComment, addCommentSuccess, addCommentError
} = storySlice.actions

export default storySlice.reducer

// Services Wrappers
export const fetchAllStories = () => async dispatch => {
    dispatch(fetchStories())
    try {
        const stories = await axios.get('http://127.0.0.1:8000/api/stories')
          .then(response => response.data['hydra:member'])
        dispatch(fetchStoriesSuccess(stories))
    } catch (e) {
        dispatch(fetchStoriesError())
    }
}

export const addNewStory = story => async dispatch => {
    dispatch(addStory())
    try {
        const data = await axios.post('http://127.0.0.1:8000/api/stories', story)
          .then(response => response.data)
        dispatch(addStorySuccess(data))
    } catch (e) {
        dispatch(addStoryError())
    }
}

export const fetchUniqueStory = id => async dispatch => {
    dispatch(fetchStory())
    try {
        const story = await axios.get(`http://127.0.0.1:8000/api/stories/${id}`)
          .then(response => response.data)
        dispatch(fetchStorySuccess(story))
    } catch (e) {
        dispatch(fetchStoryError())
    }
}

export const addStoryComment = comment => async dispatch => {
    dispatch(addComment())
    try {
        const data = await axios.post('http://127.0.0.1:8000/api/comments', comment)
          .then(response => response.data)
        dispatch(addCommentSuccess(data))
    } catch (e) {
        dispatch(addCommentError(e.response.data.violations))
    }
}