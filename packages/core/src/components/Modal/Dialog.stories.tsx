import type {Meta, StoryObj} from '@storybook/react-vite';
import {useState} from 'react';
import Dialog from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Dialog가 열려있는지 여부',
    },
    disableEscapeKeyDown: {
      control: 'boolean',
      description: 'ESC 키로 닫기 비활성화',
    },
    onClose: {
      action: 'closed',
      description: 'Dialog가 닫힐 때 호출되는 콜백',
    },
    children: {
      control: false,
      description: 'Dialog 내부 콘텐츠',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// 기본 Dialog - Controls 패널로 조작
export const Default: Story = {
  args: {
    open: true,
    disableEscapeKeyDown: false,
  },
  render: (args) => (
    <Dialog
      {...args}
      aria-labelledby="dialog-title"
    >
      <div style={{ padding: '24px' }}>
        <h2 id="dialog-title" style={{ margin: '0 0 16px 0' }}>
          Dialog Title
        </h2>
        <p style={{ margin: '0 0 24px 0' }}>
          Controls 패널에서 open, disableEscapeKeyDown을 변경해보세요.
          <br />
          ESC를 누르거나 바깥을 클릭하면 닫힙니다.
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button>취소</button>
          <button>확인</button>
        </div>
      </div>
    </Dialog>
  ),
};

// 2. Focus Trap 테스트 - Tab/Shift+Tab으로 순환하는지 확인
export const FocusTrapTest: Story = {
  args: {
    open: false,
    disableEscapeKeyDown: false,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <p><strong>테스트 방법:</strong></p>
          <ol style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Dialog를 엽니다</li>
            <li><kbd>Tab</kbd> 키를 눌러 포커스를 이동합니다</li>
            <li>마지막 버튼에서 <kbd>Tab</kbd>을 누르면 첫 번째 input으로 돌아와야 합니다</li>
            <li><kbd>Shift+Tab</kbd>으로 역방향 순환도 테스트합니다</li>
            <li>포커스가 Dialog 밖으로 나가면 안 됩니다</li>
          </ol>
        </div>
        <button onClick={() => setOpen(true)}>Open Dialog</button>
        <Dialog
          {...args}
          open={open}
          onClose={(event, reason) => {
            setOpen(false);
            args.onClose?.(event, reason);
          }}
          aria-labelledby="dialog-title-focus-trap"
        >
          <div style={{ padding: '24px', minWidth: '400px' }}>
            <h2 id="dialog-title-focus-trap" style={{ margin: '0 0 16px 0' }}>
              Focus Trap 테스트
            </h2>
            <p style={{ margin: '0 0 16px 0', color: '#666' }}>
              Tab 키로 포커스를 이동해보세요. 포커스가 Dialog 내부에서만 순환해야 합니다.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label htmlFor="input1" style={{ display: 'block', marginBottom: '4px' }}>
                  첫 번째 Input
                </label>
                <input
                  id="input1"
                  type="text"
                  placeholder="Tab으로 다음으로"
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label htmlFor="input2" style={{ display: 'block', marginBottom: '4px' }}>
                  두 번째 Input
                </label>
                <input
                  id="input2"
                  type="text"
                  placeholder="Tab으로 다음으로"
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label htmlFor="input3" style={{ display: 'block', marginBottom: '4px' }}>
                  세 번째 Input
                </label>
                <input
                  id="input3"
                  type="text"
                  placeholder="Tab으로 버튼으로"
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button onClick={() => setOpen(false)}>취소</button>
              <button onClick={() => setOpen(false)}>확인</button>
            </div>

            <p style={{ marginTop: '16px', fontSize: '12px', color: '#999' }}>
              💡 마지막 버튼에서 Tab → 첫 번째 input으로 순환
            </p>
          </div>
        </Dialog>
      </>
    );
  },
};

// 3. Focus Restore 테스트 - 포커스 복원 확인
export const FocusRestoreTest: Story = {
  args: {
    open: false,
    disableEscapeKeyDown: false,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <p><strong>테스트 방법:</strong></p>
          <ol style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>아래 버튼 중 하나에 포커스를 둡니다</li>
            <li>해당 버튼을 클릭해서 Dialog를 엽니다</li>
            <li>Dialog를 닫습니다 (ESC, Backdrop 클릭, 또는 닫기 버튼)</li>
            <li>포커스가 <strong>원래 클릭했던 버튼</strong>으로 돌아와야 합니다</li>
          </ol>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => setOpen(true)} style={{ padding: '12px 24px', fontSize: '14px' }}>
            버튼 1 (여기서 열었으면 여기로 돌아와야 함)
          </button>
          <button onClick={() => setOpen(true)} style={{ padding: '12px 24px', fontSize: '14px' }}>
            버튼 2 (여기서 열었으면 여기로 돌아와야 함)
          </button>
          <button onClick={() => setOpen(true)} style={{ padding: '12px 24px', fontSize: '14px' }}>
            버튼 3 (여기서 열었으면 여기로 돌아와야 함)
          </button>
        </div>

        <Dialog
          {...args}
          open={open}
          onClose={(event, reason) => {
            setOpen(false);
            args.onClose?.(event, reason);
          }}
          aria-labelledby="dialog-title-restore"
        >
          <div style={{ padding: '24px', minWidth: '400px' }}>
            <h2 id="dialog-title-restore" style={{ margin: '0 0 16px 0' }}>
              Focus Restore 테스트
            </h2>
            <p style={{ margin: '0 0 16px 0', color: '#666' }}>
              Dialog를 닫으면 원래 포커스가 있던 버튼으로 돌아가야 합니다.
            </p>

            <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>
                <strong>현재 테스트:</strong><br />
                이 Dialog를 닫았을 때 포커스가 처음 클릭했던 버튼으로 복원되는지 확인하세요.
              </p>
            </div>

            <input
              type="text"
              placeholder="Dialog 내부 input (테스트용)"
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box' }}
            />

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)}>ESC로 닫기</button>
              <button onClick={() => setOpen(false)}>버튼으로 닫기</button>
            </div>

            <p style={{ marginTop: '16px', fontSize: '12px', color: '#999' }}>
              💡 Backdrop을 클릭해서 닫아도 포커스가 복원되어야 합니다
            </p>
          </div>
        </Dialog>
      </>
    );
  },
};

// 4. ESC 키 비활성화
export const DisableEscapeKey: Story = {
  args: {
    open: false,
    disableEscapeKeyDown: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open Dialog</button>
        <Dialog
          {...args}
          open={open}
          onClose={(event, reason) => {
            setOpen(false);
            args.onClose?.(event, reason);
          }}
          aria-labelledby="dialog-title-esc-disabled"
        >
          <div style={{ padding: '24px' }}>
            <h2 id="dialog-title-esc-disabled" style={{ margin: '0 0 16px 0' }}>
              ESC 비활성화
            </h2>
            <p style={{ margin: '0 0 24px 0' }}>
              ESC 키가 비활성화되었습니다. Backdrop을 클릭하거나 버튼으로만 닫을 수 있습니다.
            </p>
            <button onClick={() => setOpen(false)}>닫기</button>
          </div>
        </Dialog>
      </>
    );
  },
};
