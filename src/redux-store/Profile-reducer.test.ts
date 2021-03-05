import {addPostAC, changeLikesAC, profileReducer, ProfileReducerStateType} from './Profile-reducer';
import {v1} from 'uuid';

test('correct post should be added', () => {
    let startState: ProfileReducerStateType = {
        'posts': [{
            'text': 'This is my first post!',
            'likes': '23',
            'id': v1(),
        },
            {
                'text': 'This is my second post!',
                'likes': '6',
                'id': v1(),
            },
            {
                'text': 'This is my third post!',
                'likes': '901',
                'id': v1(),
            },
            {
                'text': ' I like writing posts!!',
                'likes': '0',
                'id': v1(),
            }
        ]
    }


    let newPostText = 'New post text';
    let endState = profileReducer(startState, addPostAC(newPostText));

    expect(endState.posts.length).toBe(5);
    expect(endState.posts[4].text).toBe(newPostText);

})

test('correct likes count should be added to correct post', () => {
    let id = v1()
    let startState: ProfileReducerStateType = {
        'posts': [{
            'text': 'This is my first post!',
            'likes': '23',
            'id': id,
        },
            {
                'text': 'This is my second post!',
                'likes': '6',
                'id': v1(),
            },
            {
                'text': 'This is my third post!',
                'likes': '901',
                'id': v1(),
            },
            {
                'text': ' I like writing posts!!',
                'likes': '0',
                'id': v1(),
            }
        ]
    }

    let endState = profileReducer(startState, changeLikesAC(id, 'up'));

    expect(endState.posts.length).toBe(4);
    expect(endState.posts[0].likes).toBe('24');
    expect(endState.posts[1].likes).toBe(startState.posts[1].likes);
})

test('correct likes count should be deleted from correct post', () => {
    let id = v1()
    let startState: ProfileReducerStateType = {
        'posts': [{
            'text': 'This is my first post!',
            'likes': '23',
            'id': id,
        },
            {
                'text': 'This is my second post!',
                'likes': '6',
                'id': v1(),
            },
            {
                'text': 'This is my third post!',
                'likes': '901',
                'id': v1(),
            },
            {
                'text': ' I like writing posts!!',
                'likes': '0',
                'id': v1(),
            }
        ]
    }

    let endState = profileReducer(startState, changeLikesAC(id, 'down'));

    expect(endState.posts.length).toBe(4);
    expect(endState.posts[0].likes).toBe('22');
    expect(endState.posts[1].likes).toBe(startState.posts[1].likes);
})