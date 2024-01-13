import { Show } from 'solid-js'
import type { Accessor, Setter } from 'solid-js'
import IconEnv from './icons/Env'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}

export const defaultSystemRoleSettings = `You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2021-09. Current date: ${Date()}.`

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }

  return (
    <div class='my-4'>
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class='fi gap-1 op-50 dark:op-60'>
              <IconEnv />
              <span>System Role:</span>
            </div>
            <div class='mt-1'>{props.currentSystemRoleSettings()}</div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class='sys-edit-btn'>
            <IconEnv />
            <span>Add System Role</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class='fi gap-1 op-50 dark:op-60'>
            <IconEnv />
            <span>System Role:</span>
          </div>
          <p class='my-2 leading-normal text-sm op-50 dark:op-60'>{defaultSystemRoleSettings}</p>
          <div>
            <textarea
              ref={systemInputRef!}
              placeholder={defaultSystemRoleSettings}
              autocomplete='off'
              autofocus
              rows='3'
              gen-textarea
            />
          </div>
          <button onClick={handleButtonClick} gen-slate-btn>
            Set
          </button>
        </div>
      </Show>
    </div>
  )
}
