import { Message, MessageProps } from '../../index';

export const ErrorMessageInput: React.FC<MessageProps> = ({ ...props }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Message
        {...props}
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'start',
          paddingTop: '0.25rem',
          paddingLeft: '0',
          paddingBottom: '0',
          position: 'absolute',
          top: '100%',
          left: '0',
          color: 'var(--error-500)',
          ...props.style,
        }}
        icon={null}
        pt={{
          icon: { style: { display: 'none' } },
          text: { style: { fontSize: '0.75rem', fontWeight: '400' } },
        }}
      />
    </div>
  );
};
