import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Graph} from '@/components/Graph';

function GraphSection({title, subtitle, children}) {
  const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      maxWidth: 400,
      marginVertical: 30,
    },
    title: {
      color: '#765000',
      fontWeight: 'bold',
      fontSize: 24,
      alignSelf: 'stretch',
    },
    subtitle: {
      color: '#765000',
      fontSize: 16,
      alignSelf: 'stretch',
    },
    chartContainer: {
      marginTop: 30,
      height: 200,
      width: 300,
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.chartContainer}>{children}</View>
    </View>
  );
}

type InsightsProps = {
  insights: {
    trend: 'up' | 'down';
    text: string;
  }[];
};

export function Insights({insights}: InsightsProps) {
  const styles = StyleSheet.create({
    root: {
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      backgroundColor: '#765000',
    },
    title: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 20,
    },
    text: {
      color: '#FFF',
      fontSize: 16,
    },
    insight: {
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Insights</Text>
      {insights.map(({trend, text}, index) => (
        <View style={styles.insight} key={index}>
          <Text style={styles.text}>{trend}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      ))}
    </View>
  );
}

type Recommendation = {
  title: string;
  backgroundColor: string;
  image: object;
  onPress?: object;
};

type RecommendationsProps = {
  recommendations: Recommendation[];
};

function Recommendations({recommendations}: RecommendationsProps) {
  const styles = StyleSheet.create({
    root: {
      marginVertical: 30,
    },
    title: {
      color: '#765000',
      fontWeight: 'bold',
      fontSize: 24,
      alignSelf: 'stretch',
    },
    recommendationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    recommendation: {
      borderRadius: 30,
      padding: 20,
      width: '30%',
      maxWidth: 200,
    },
    recommendationText: {
      fontWeight: 'bold',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Recommended</Text>
      <View style={styles.recommendationContainer}>
        {recommendations.map(({title, image, backgroundColor}, i) => (
          <View
            key={i}
            style={Object.assign({backgroundColor}, styles.recommendation)}
          >
            <Text style={styles.recommendationText}>{title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function Demo() {
  const styles = StyleSheet.create({
    root: {
      backgroundColor: '#FFF',
      margin: 20,
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      color: '#756000',
      fontWeight: 'bold',
    },
  });

  const recommendations: Recommendation[] = [
    {
      title: 'How to feel better article',
      backgroundColor: '#A1AEFF',
      image: {},
    },
    {
      title: 'Try Deep Breathing',
      backgroundColor: '#AEFFA1',
      image: {},
    },
    {
      title: 'Anxiety and Panic Attack',
      backgroundColor: '#FFE7E7',
      image: {},
    },
  ];

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>My Diary</Text>
      <GraphSection title="Mood 😄" subtitle="Your mood has been Great">
        <Graph
          style={{
            pointColors: pointColors,
          }}
          scales={scalesData}
        />
      </GraphSection>
      <GraphSection
        title="Restfulness Level"
        subtitle="Your restfulness: Fluctuated"
      >
        <Graph
          style={{
            pointColors: pointColors,
          }}
          scales={scalesData}
        />
      </GraphSection>
      <Insights
        insights={[
          {
            trend: 'up',
            text: 'lorem',
          },
          {
            trend: 'down',
            text: 'ipsum',
          },
        ]}
      />
      <Recommendations recommendations={recommendations} />
    </ScrollView>
  );
}

const pointColors = [
  '#8DFAB7',
  '#FADC8D',
  '#8DD0FA',
  '#FA9C93',
  '#FADC8D',
  '#FADC8D',
  '#FADC8D',
];

const scalesData = [
  {
    point: 50,
    label: 'M',
    label2: '18',
  },
  {
    point: 20,
    label: 'T',
    label2: '19',
  },
  {
    point: 30,
    label: 'W',
    label2: '20',
  },
  {
    point: 60,
    label: 'T',
    label2: '21',
    highlight: true,
  },
  {
    point: 20,
    label: 'F',
    label2: '22',
  },
  {
    point: 30,
    label: 'S',
    label2: '23',
  },
  {
    point: 90,
    label: 'S',
    label2: '24',
  },
];
