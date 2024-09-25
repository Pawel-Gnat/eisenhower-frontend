import { useContext } from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';

import { AppContext } from '@/context/app-context';

export const Pdf = () => {
  const { pdfData } = useContext(AppContext);

  return (
    <Document>
      <Page>
        <Text>Eisenhower Matrix Board</Text>

        {Object.entries(pdfData).map(([key, tasks]) => (
          <>
            <Text>{key}</Text>
            {tasks.map((task, index) => (
              <Text key={index}>{task.title}</Text>
            ))}
          </>
        ))}
      </Page>
    </Document>
  );
};
