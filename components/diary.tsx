import {PropsWithChildren} from 'react';
import {Text, View} from 'react-native';

export function Group({title, children}: PropsWithChildren & {title?: string}) {
  return (
    <View
      style={{
        margin: 6,
        padding: 6,
        borderRadius: 6,
        backgroundColor: '#D9CBAE',
      }}
    >
      {title && (
        <Text
          style={{
            margin: 6,
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </View>
  );
}

export function Section({
  title,
  children,
}: PropsWithChildren & {title?: string}) {
  return (
    <View
      style={{
        borderRadius: 6,
        margin: 6,
        padding: 12,
        backgroundColor: '#FDF6E7',
      }}
    >
      {title && (
        <Text
          style={{
            color: '#765000',
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </View>
  );
}
