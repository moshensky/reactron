import { Guid } from '../types'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import { Comments } from './Comments'
import { WriteComment } from './WriteComment'
import { WriteCommentStub } from './WriteCommentStub'

const comments: Comments = [
  {
    id: Guid.of('1'),
    name: 'Pesho',
    text: '@Gosho This is still needed, right?',
    createdAt: new Date('2018-01-01:20:20:20Z'),
    updatedAt: null,
  },
  {
    id: Guid.of('2'),
    name: 'Gosho',
    text: 'Could be! Could be not.',
    createdAt: new Date('2018-01-01:20:22:20Z'),
    updatedAt: null,
  },
  {
    id: Guid.of('3'),
    name: 'Long Long Comment And Avatar Name',
    avatar: './logo-limsnow.svg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: new Date('2018-07-01:20:22:20Z'),
    updatedAt: null,
  },
]

export default {
  title: 'common/Comments',
}

export const _Comments = () => (
  <Comments
    comments={comments}
    name="инж. Никита Мошенский"
    calculateRelativeTime={(x) => x.toDateString()}
    onCreateComment={action('on add comment')}
    onEditComment={action('on edit comment')}
    onDeleteComment={action('on delete comment')}
  />
)

export const CommentsEmpty = () => (
  <Comments
    comments={[]}
    name="инж. Никита Мошенский"
    calculateRelativeTime={(x) => x.toDateString()}
    onCreateComment={action('on add comment')}
    onEditComment={action('on edit comment')}
    onDeleteComment={action('on delete comment')}
  />
)

CommentsEmpty.story = {
  name: 'Comments empty',
}

export const CommentsUpdating = () => (
  <Comments
    updating
    comments={comments}
    name="инж. Никита Мошенский"
    calculateRelativeTime={(x) => x.toDateString()}
    onCreateComment={action('on add comment')}
    onEditComment={action('on edit comment')}
    onDeleteComment={action('on delete comment')}
  />
)

CommentsUpdating.story = {
  name: 'Comments updating',
}

export const AvatarNoImg = () => <Avatar name="инж. Никита Мошенский" />

AvatarNoImg.story = {
  name: 'Avatar no img',
}

export const AvatarImg = () => <Avatar name="инж. Никита Мошенский" avatar={'./logo-limsnow.svg'} />

AvatarImg.story = {
  name: 'Avatar img',
}

export const _Comment = () => (
  <Comment
    name="Gosho"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    avatar={'./logo-limsnow.svg'}
    createdAt={new Date('2018-01-01:20:22:20Z')}
    calculateRelativeTime={(x) => x.toDateString()}
    updatedAt={null}
    onEditComment={action('on edit comment')}
    onDeleteComment={action('on delete comment')}
  />
)

export const CommentShort = () => (
  <div style={{ width: 500 }}>
    <Comment
      name="Gosho"
      text="Could be! Could be not."
      createdAt={new Date('2018-01-01:20:22:20Z')}
      updatedAt={null}
      calculateRelativeTime={(x) => x.toDateString()}
      onEditComment={action('on edit comment')}
      onDeleteComment={action('on delete comment')}
    />
  </div>
)

CommentShort.story = {
  name: 'Comment short',
}

export const _WriteComment = () => (
  <div style={{ width: 500 }} className="card">
    <WriteComment
      defaultValue="test"
      onComment={action('on comment')}
      onCancel={action('on cancel comment')}
    />
  </div>
)

_WriteComment.story = {
  name: 'WriteComment',
}

export const _WriteCommentStub = () => (
  <WriteCommentStub
    name="инж. Никита Мошенский"
    avatar={'./logo-limsnow.svg'}
    onFocus={action('on focus')}
  />
)

_WriteCommentStub.story = {
  name: 'WriteCommentStub',
}
