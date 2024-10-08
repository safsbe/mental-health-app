import {StyleSheet, Text, View} from 'react-native';

export type GraphProps = {
  style?: CommonStyleProps;
  min?: number;
  max?: number;
  scales: ScaleProps[];
};

type CommonStyleProps = {
  pointColors?: string[];
  pointHeight?: number;
  pointColor?: string;
  slideWidth?: number;
  slideGap?: number;
  slideColor?: string;
};

type ScaleProps = {
  style?: CommonStyleProps;
  point: number;
  label?: string;
  label2?: string;
  color?: string;
  min?: number;
  max?: number;
  highlight?: boolean;
};

function Scale({
  style,
  label,
  label2,
  point,
  color,
  min,
  max,
  highlight,
}: ScaleProps) {
  const slideColor = style?.slideColor || '#F7F7F7';
  const slideWidth = style?.slideWidth || 25;
  const pointHeight = style?.pointHeight || 25;
  const pointColor = color || 'red';
  min = min || 0;
  max = max || 100;
  const pointPosition = `${((point - min) / max) * 100}%`;

  const styles = StyleSheet.create({
    slideOuter: {
      height: '100%',
      alignItems: 'center',
    },
    slideInner: {
      backgroundColor: slideColor,
      borderRadius: 6,
      width: slideWidth,
      flexGrow: 1,
    },
    point: {
      position: 'absolute',
      // @ts-ignore
      bottom: pointPosition,
      backgroundColor: pointColor,
      borderRadius: 6,
      height: pointHeight,
      width: '100%',
    },
    label: {
      fontSize: 20,
    },
    label2: {
      fontSize: 20,
      fontWeight: 900,
    },
    labelHighlight: {
      borderWidth: 3,
      borderColor: '#DDD',
      borderRadius: 5000,
    },
  });

  return (
    <View style={styles.slideOuter}>
      <View style={styles.slideInner}>
        <View style={styles.point} />
      </View>
      <Text style={styles.label}>{label ? label : ' '}</Text>
      <Text
        style={{...styles.label2, ...(highlight ? styles.labelHighlight : {})}}
      >
        {label2 ? label2 : ' '}
      </Text>
    </View>
  );
}

export function Graph({style, scales, min, max}: GraphProps) {
  const styles = StyleSheet.create({
    root: {
      height: '100%',
      width: '100%',
      gap: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  return (
    <View style={styles.root}>
      {scales.map(({point, color, label, label2}, index) => (
        <Scale
          key={index}
          point={point}
          label={label}
          label2={label2}
          color={style?.pointColors[index % style?.pointColors.length] || color}
          style={style}
          min={min}
          max={max}
        />
      ))}
    </View>
  );
}
