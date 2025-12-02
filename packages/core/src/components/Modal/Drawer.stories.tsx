import type {Meta, StoryObj} from '@storybook/react-vite';
import {useState} from 'react';
import Drawer from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Drawer가 열려있는지 여부',
    },
    anchor: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer가 나타나는 위치',
    },
    disableEscapeKeyDown: {
      control: 'boolean',
      description: 'ESC 키로 닫기 비활성화',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Modal을 재활용한 Drawer 예시
export const Default: Story = {
  args: {
    open: false,
    anchor: 'left',
    disableEscapeKeyDown: false,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);

    return (
      <>
        <div style={{ padding: '20px' }}>
          <button onClick={() => setOpen(true)}>메뉴 열기</button>
          <p style={{ marginTop: '16px', color: '#666' }}>
            Modal을 재활용하여 측면 패널을 구현했습니다.
            <br />
            Portal, FocusTrap, Backdrop, ESC 등 모든 기능을 재사용합니다.
            <br />
            anchor prop을 변경하면 left/right/top/bottom 방향으로 확장 가능합니다.
          </p>
        </div>
        <Drawer
          {...args}
          open={open}
          onClose={(_event, reason) => {
            console.log('Drawer 닫힘:', reason);
            setOpen(false);
          }}
        >
          <div style={{ padding: '24px' }}>
            <h2 style={{ margin: '0 0 24px 0' }}>메뉴</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                홈
              </button>
              <button
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                프로필
              </button>
              <button
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                설정
              </button>
              <button
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                로그아웃
              </button>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: '24px',
                padding: '8px 16px',
                width: '100%',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              닫기
            </button>
          </div>
        </Drawer>
      </>
    );
  },
};
