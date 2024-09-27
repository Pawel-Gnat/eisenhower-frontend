import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { upperCaseFirstLetter } from '@/helpers/helpers';

import { PdfData } from '@/types';

interface PdfProps {
  pdfData: PdfData;
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export const Pdf = ({ pdfData }: PdfProps) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Eisenhower Matrix Board</Text>

        {Object.entries(pdfData).map(([category, tasks]) => (
          <View key={category}>
            <Text style={styles.subtitle}>{upperCaseFirstLetter(category)}</Text>

            {tasks.map((task, index) => (
              <Text key={task.id} style={styles.text}>
                {index + 1}. {task.title}
              </Text>
            ))}
          </View>
        ))}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};
