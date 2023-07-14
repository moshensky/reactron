import { MessageType } from '../../types'

type Props = Readonly<{
  type: MessageType
  text: string
  onClose?: () => void
}>

const getIcon = (x: MessageType): JSX.Element => {
  switch (x) {
    case 'danger': {
      return (
        <svg
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          className="bi bi-x"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
          />
          <path
            fillRule="evenodd"
            d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
          />
        </svg>
      )
    }
    case 'info': {
      return (
        <svg
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          className="bi bi-info"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
          <circle cx="8" cy="4.5" r="1" />
        </svg>
      )
    }
    case 'success': {
      return (
        <svg
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          className="bi bi-check"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
          />
        </svg>
      )
    }
    case 'warning': {
      return (
        <svg
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          className="bi bi-exclamation"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
        </svg>
      )
    }
  }
}

const getClasses = (x: MessageType): { root: string; icon: string } => {
  const root = 'z-10000 relative flex items-center border-l-4 py-2 px-3 shadow-md mb-2'
  const icon = 'rounded-full bg-white mr-3'
  switch (x) {
    case 'danger': {
      return {
        root: root + ' bg-red-400 border-red-700',
        icon: icon + ' text-red-500',
      }
    }
    case 'info': {
      return {
        root: root + ' bg-blue-400 border-blue-700',
        icon: icon + ' text-blue-500',
      }
    }
    case 'success': {
      return {
        root: root + ' bg-green-400 border-green-700',
        icon: icon + ' text-green-500',
      }
    }
    case 'warning': {
      return {
        root: root + ' bg-yellow-400 border-yellow-700',
        icon: icon + ' text-yellow-500',
      }
    }
  }
}

export function Toast({ type, text, onClose }: Props): JSX.Element {
  const icon = getIcon(type)
  const classes = getClasses(type)

  return (
    <div className={classes.root}>
      <div className={classes.icon}>{icon}</div>
      <div className="text-white max-w-xs ">{text}</div>
      <button
        onClick={onClose}
        type="button"
        className="text-white absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-1 mr-2 outline-none focus:outline-none"
      >
        <span>×</span>
      </button>
    </div>
  )
}
