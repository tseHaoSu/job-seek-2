// constants.ts
export type Section = {
  title: string;
  steps: {
    text: string;
    subtext?: string;
    subimage?: string;
  }[];
  question: {
    text: string;
    answer: string;
    explanation: string;
  };
};

export type ModuleData = {
  id: string;
  title: string;
  sections: Section[];
};

export const MODULES_DATA: Record<string, ModuleData> = {
  powerpoint: {
    id: "1",
    title: "How to use PowerPoint",
    sections: [
      {
        title: "Creating a New Slide",
        steps: [
          {
            text: 'Click "New slide" in the upper toolbar to create a new slide page',
          },
          {
            text: "Select the Insert tab at the top.",
            subtext:
              "Click the following icon to choose to insert pictures into PPT",
          },
          {
            text: 'After adding the text box, return to the "Home" tab. You can see that you can start adjusting the text size and font as well as other functions.',
          },
        ],
        question: {
          text: "Can I create a new slide by pressing this icon?",
          answer: "No",
          explanation: "Click the icon to choose to insert pictures into slide",
        },
      },
      {
        title: "How to save the PowerPoint",
        steps: [
          {
            text: "Find the save icon in the upper toolbar and click it to save",
          },
          {
            text: 'Click "File" on the far left of the upper toolbar, and select "Save as" in the list on the left to choose what file to save the file as.',
          },
        ],
        question: {
          text: "Can I save PowerPoint as PDF when saving using the Save as method?",
          answer: "Yes",
          explanation:
            'Click "File" on the far left of the upper toolbar, and select "Save as" in the list on the left to choose what file to save the file as.',
        },
      },
      {
        title: "How to Play the PowerPoint",
        steps: [
          {
            text: "Select the last show icon in the upper toolbar and click it to show the slideshow you made.",
          },
          {
            text: 'Select the "Slide Show" tab and select the two buttons below to start playing the slide show.',
          },
        ],
        question: {
          text: "Can I press this icon to play the slideshow I created from the beginning?",
          answer: "Yes",
          explanation:
            'Select the "Slide Show" tab and select the buttons below to start playing the slide show from beginning.',
        },
      },
    ],
  },
  word: {
    id: "2",
    title: "How to use Microsoft Word",
    sections: [
      {
        title: "Creating a New Document",
        steps: [
          {
            text: "Open Word and click on 'Blank document' from the start screen, or use Ctrl+N shortcut",
          },
          {
            text: "Start typing your content in the blank document",
          },
          {
            text: "Use the ribbon at the top to format your text and paragraphs",
          },
        ],
        question: {
          text: "Can I create a new document using the Ctrl+O shortcut?",
          answer: "No",
          explanation:
            "Ctrl+O is used to open existing documents. For creating new documents, use Ctrl+N.",
        },
      },
      {
        title: "Formatting Text in Word",
        steps: [
          {
            text: "Select the text you want to format by clicking and dragging",
          },
          {
            text: "Use the Home tab to access font options, paragraph settings, and styles",
          },
          {
            text: "Apply headings, bold, italic, or change font size as needed",
          },
        ],
        question: {
          text: "Can I apply multiple formatting options like bold and italic to the same text?",
          answer: "Yes",
          explanation:
            "You can apply multiple formatting options to the same text by selecting it and clicking on different formatting options.",
        },
      },
      {
        title: "Saving Your Word Document",
        steps: [
          {
            text: "Click the Save icon in the Quick Access Toolbar or press Ctrl+S",
          },
          {
            text: "Choose a location, enter a filename, and select the file format",
          },
          {
            text: "Click Save to complete the process",
          },
        ],
        question: {
          text: "Can Word documents be saved in PDF format directly?",
          answer: "Yes",
          explanation:
            "You can save a Word document as PDF by selecting 'PDF' from the 'Save as type' dropdown in the Save dialog.",
        },
      },
    ],
  },
  excel: {
    id: "3",
    title: "How to use Microsoft Excel",
    sections: [
      {
        title: "Creating a New Spreadsheet",
        steps: [
          {
            text: "Open Excel and select 'Blank workbook' or press Ctrl+N",
          },
          {
            text: "Enter data into cells by clicking on a cell and typing",
          },
          {
            text: "Navigate between cells using arrow keys or Tab key",
          },
        ],
        question: {
          text: "Does Excel automatically create multiple sheets in a new workbook?",
          answer: "Yes",
          explanation:
            "Excel typically creates a new workbook with multiple sheets (usually three) by default.",
        },
      },
      {
        title: "Using Basic Formulas",
        steps: [
          {
            text: "To create a formula, click a cell and type '=' followed by your formula",
          },
          {
            text: "Use operators like +, -, *, / for basic calculations",
          },
          {
            text: "Reference other cells by their coordinates (e.g., A1, B2)",
            subtext: "You can also click cells to add them to your formula",
          },
        ],
        question: {
          text: "Can Excel formulas reference cells from different sheets?",
          answer: "Yes",
          explanation:
            "You can reference cells from different sheets using the syntax: SheetName!CellReference (e.g., Sheet2!A1).",
        },
      },
      {
        title: "Creating Charts and Graphs",
        steps: [
          {
            text: "Select the data you want to visualize",
          },
          {
            text: "Go to the Insert tab and choose the desired chart type",
          },
          {
            text: "Customize your chart using the Chart Design and Format tabs",
          },
        ],
        question: {
          text: "Can I change the chart type after creating it?",
          answer: "Yes",
          explanation:
            "You can change the chart type by selecting the chart and using the 'Change Chart Type' option in the Chart Design tab.",
        },
      },
    ],
  },
};
